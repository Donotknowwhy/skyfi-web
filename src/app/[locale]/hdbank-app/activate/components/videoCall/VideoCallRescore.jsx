"use client";

import dkttService from "@/app/services/dkttService";
import { useLoad } from "@/app/utils/load";
import CryptoJS from "crypto-js";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useActivateHDBank from "../../hook/useActivateHDBank";
import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import { useRouter } from "@/i18n/navigation";
import { useUserState } from "@/app/stores/user";

const MAX_RECORDING_TIME = 20; // 20 seconds countdown

const VideoCallRescore = () => {
  const t = useTranslations("hdbank.videoCall.rescore");
  const { setValue, watch } = useFormContext();
  const router = useRouter();
  const { onBack } = useActivateHDBank();
  const phone = watch("data.phone") || "";
  const idCall = watch("data.call_id") || "";

  const videoRef = useRef(null);
  const previewVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const { open, close } = useLoad();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sessionId } = useUserState();

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Validate call_id format
  const isValidCallId = (id) => {
    return id && typeof id === "string" && id.trim().length > 0;
  };

  // Generate HMAC SHA256 code
  const generateCode = (id) => {
    const hashKey = "c2t5ZmkyMDI1";
    const code = CryptoJS.HmacSHA256(id.toString(), hashKey).toString();
    return code;
  };

  // Cleanup camera function
  // resetVideoState: if true, also reset video preview state (blob, url, etc.)
  const cleanupCamera = useCallback(
    (currentStream, resetVideoState = false) => {
      // Stop media recorder if recording
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {
          console.log("MediaRecorder already stopped");
        }
      }
      mediaRecorderRef.current = null;

      // Stop all tracks from streamRef
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }

      // Also stop tracks from stream state (passed as parameter to avoid stale closure)
      if (currentStream) {
        const tracks = currentStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      }

      // Clear video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.load();
      }

      // Revoke video URL only if resetting video state
      if (resetVideoState && videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }

      setStream(null);
      setIsRecording(false);

      // Only reset video state if explicitly requested
      if (resetVideoState) {
        setVideoBlob(null);
        setVideoUrl(null);
        setIsPreview(false);
        setRecordingTime(0);
      }
    },
    [videoUrl],
  );

  // Initialize camera
  useEffect(() => {
    let isMounted = true;

    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });

        if (isMounted) {
          streamRef.current = mediaStream;
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } else {
          // Component unmounted before stream was ready, clean up
          mediaStream.getTracks().forEach((track) => track.stop());
        }
      } catch (error) {
        console.error("Camera error:", error);
        if (isMounted) {
          setPermissionError(error.message);
        }
      }
    };

    if (!isPreview) {
      initCamera();
    }

    return () => {
      isMounted = false;
      cleanupCamera();
    };
  }, [isPreview]);

  // Watch for page changes and cleanup
  const currentPage = watch("page");
  const typeVideoCall = watch("typeVideoCall");

  // Cleanup camera when typeVideoCall is set to 'start'
  useEffect(() => {
    if (typeVideoCall === "start") {
      cleanupCamera();
    }
  }, [typeVideoCall, cleanupCamera]);

  // Cleanup camera when component unmounts
  useEffect(() => {
    return () => {
      cleanupCamera();
    };
  }, []);

  // Handle video preview playback
  useEffect(() => {
    if (isPreview && videoUrl && previewVideoRef.current) {
      const video = previewVideoRef.current;
      video.load();
      video.play().catch((e) => console.log("Autoplay prevented:", e));
    }
  }, [isPreview, videoUrl]);

  // Recording timer with countdown
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          // Auto stop at 20 seconds
          if (newTime >= MAX_RECORDING_TIME) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    if (!stream) return;

    // Reset previous recording
    setVideoBlob(null);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(null);
    setIsPreview(false);
    chunksRef.current = [];

    // Check supported mimeTypes
    const mimeTypes = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
      "video/mp4",
    ];

    let selectedMimeType = "";
    for (const type of mimeTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        selectedMimeType = type;
        break;
      }
    }

    const options = selectedMimeType ? { mimeType: selectedMimeType } : {};
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onerror = (e) => {
      console.error("MediaRecorder error:", e);
    };

    mediaRecorder.onstop = () => {
      if (chunksRef.current.length === 0) {
        console.error("No video data recorded");
        alert(t("noVideoData"));
        // Reset inline instead of calling handleReset
        setVideoBlob(null);
        setVideoUrl(null);
        setIsPreview(false);
        setRecordingTime(0);
        return;
      }

      const mimeType = selectedMimeType || "video/webm";
      const blob = new Blob(chunksRef.current, { type: mimeType });

      if (blob.size === 0) {
        console.error("Video blob is empty");
        alert(t("videoEmpty"));
        setVideoBlob(null);
        setVideoUrl(null);
        setIsPreview(false);
        setRecordingTime(0);
        return;
      }

      const url = URL.createObjectURL(blob);
      console.log("Video URL:", url);

      setVideoBlob(blob);
      setVideoUrl(url);

      // Stop camera stream for preview
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }
      setStream(null);
      setIsPreview(true);
    };

    mediaRecorderRef.current = mediaRecorder;
    // Start recording with timeslice of 100ms to collect data continuously
    mediaRecorder.start(100);
    console.log("MediaRecorder started, state:", mediaRecorder.state);
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleReset = async () => {
    // Revoke old video URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoBlob(null);
    setVideoUrl(null);
    setIsPreview(false);
    setRecordingTime(0);

    // Reinitialize camera
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });
      streamRef.current = mediaStream;
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera error:", error);
      setPermissionError(error.message);
    }
  };

  const handleGoHome = () => {
    cleanupCamera(stream, true);
    setValue("page", "scanQR");
    setValue("typeVideoCall", "start");
  };
  const handleResetVideo = () => {
    cleanupCamera(stream, true);
    setValue("typeVideoCall", "start");
  };

  const handleSubmitVideo = async () => {
    console.log("handleSubmitVideo - videoBlob:", videoBlob, "idCall:", idCall);

    // Enhanced validation for idCall
    if (!videoBlob) {
      console.error("Missing video blob");
      showModalMessHDBank({
        label: t("notification"),
        message: t("noVideoData"),
        type: "error",
      });
      return;
    }

    if (!isValidCallId(idCall)) {
      console.error("Invalid or missing call_id:", idCall);
      showModalMessHDBank({
        label: t("notification"),
        message: t("invalidCallInfo"),
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      open();
      const code = generateCode(idCall);
      const formData = new FormData();
      formData.append("id", idCall);
      formData.append("code", code);
      formData.append("files", videoBlob, "video.webm");

      console.log("Submitting video with call_id:", idCall);
      const result = await dkttService.saveVideoBusy(formData);
      console.log("Video uploaded:", result);

      if (result && result.code == 200) {
        showModalMessHDBank({
          label: t("notification"),
          message: result?.message || t("uploadFailed"),
          type: "success",
          labelConfirm: t("goHome"),
          onConfirm: () => {
            cleanupCamera(stream, true);
            setValue("page", "inputActivate");
            router.push(`/hdbank-app?sessionId=${sessionId}`);
          },
        });
      } else {
        console.error("Video upload failed:", result?.message);

        showModalMessHDBank({
          label: t("notification"),
          message: result?.message || t("uploadFailed"),
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      showModalMessHDBank({
        label: t("notification"),
        message: t("uploadFailed"),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      close();
    }
  };

  if (permissionError) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-lg text-red-600 font-semibold mb-2">
            {t("permissionRequired")}
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            {t("errorLabel")}: {permissionError}
          </p>
          <button
            onClick={handleGoHome}
            className="px-4 py-2 border border-gray-300 rounded-full"
          >
            {t("goHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-4">
      {/* Header */}
      <div className="flex items-center justify-center py-4 relative">
        <button
          onClick={handleResetVideo}
          className="absolute left-0 w-6 h-6 flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#333333"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-[16px] font-bold text-[#333333]">
          {t("registrationTitle")}
        </h1>
      </div>

      {/* Instructions */}
      <p className="text-[12px] text-[#0E0E0F] leading-[1.5]">
        {t("instructionIntro")}
        <br />
        <span className="font-semibold text-[#B71C22]">
          {t("step1Label")}
        </span>{" "}
        {t("step1Text")}
        <br />
        <span className="font-semibold text-[#B71C22]">
          {t("step2Label")}
        </span>{" "}
        {t("step2Text")}
        <br />
        <span className="font-semibold text-[#B71C22]">
          {t("step3Label")}
        </span>{" "}
        {t("step3Text")}{" "}
        <span className="font-semibold text-[#B71C22]">
          {phone || "0707123456"}
        </span>{" "}
        <br />
        <span className="font-semibold text-[#B71C22]">
          {t("step4Label")}
        </span>{" "}
        {t("step4Text")}
      </p>

      {/* Video Preview */}
      <div className="flex-1 py-4 flex flex-col items-center">
        <div className="w-full h-[450px] rounded-xl overflow-hidden relative bg-gray-900">
          {isPreview && videoBlob ? (
            // Preview recorded video using object URL directly
            <video
              key="preview-video"
              ref={(el) => {
                previewVideoRef.current = el;
                if (el && videoBlob) {
                  // Create a new object URL each time
                  const url = URL.createObjectURL(videoBlob);
                  el.src = url;
                  el.onloadedmetadata = () => {
                    console.log(
                      "Video metadata loaded, duration:",
                      el.duration,
                    );
                    el.play().catch((e) => console.log("Play failed:", e));
                  };
                }
              }}
              controls
              playsInline
              muted
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            // Live camera feed
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          )}

          {/* Recording Timer / Countdown */}
          <div className="absolute top-4 right-4 flex items-center gap-2  px-3 py-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="#667080"
                strokeWidth="1.5"
              />
              <path
                d="M10 5V10L13 13"
                stroke="#667080"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`text-[18px] font-bold ${isRecording && recordingTime >= MAX_RECORDING_TIME - 5 ? "text-red-500" : "text-[#0E0E0F]"}`}
            >
              {formatTime(recordingTime)}
            </span>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium">REC</span>
            </div>
          )}

          {/* Preview Badge */}
          {isPreview && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-500/80 rounded-xl px-3 py-1">
              <span className="text-white text-sm font-medium">
                {t("preview")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white px-4 rounded-t-2xl">
        <div className="py-4 flex gap-3 justify-center">
          {isPreview ? (
            // Preview mode buttons
            <>
              <button
                onClick={handleReset}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-full font-semibold text-[16px] text-[#0E0E0F] bg-white border border-[rgba(84,85,86,0.12)] disabled:opacity-50"
              >
                {t("retake")}
              </button>
              <button
                onClick={handleSubmitVideo}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-full text-white font-semibold text-[16px] disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)",
                }}
              >
                {isSubmitting ? t("sending") : t("sendVideo")}
              </button>
            </>
          ) : (
            // Recording mode buttons
            <>
              {/* <button
                                onClick={handleGoHome}
                                disabled={isRecording}
                                className="flex-1 py-3 px-4 rounded-full font-semibold text-[16px] text-[#0E0E0F] bg-white border border-[rgba(84,85,86,0.12)] disabled:opacity-50"
                            >
                                Về trang chủ
                            </button> */}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="flex-1 py-3 px-4 rounded-full text-white font-semibold text-[16px]"
                style={{
                  background: isRecording
                    ? "#EF4444"
                    : "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)",
                }}
              >
                {isRecording ? t("stopRecording") : t("startRecording")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallRescore;
