"use client";

import { JitsiMeeting } from "@jitsi/react-sdk";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const JitsiMeetingClient = () => {
  const searchParams = useSearchParams();
  const refRoom = useRef(null);
  const apiRef = useRef(null);

  // Get parameters from URL
  const url = searchParams.get("url");
  const token = searchParams.get("token");
  const roomName = searchParams.get("roomName");

  const [isReady, setIsReady] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState({
    camera: null,
    microphone: null,
  });
  const [permissionError, setPermissionError] = useState(null);

  // Check camera and microphone permissions
  const checkPermissions = async () => {
    try {
      // Check if we're on Android
      const isAndroid = /Android/i.test(navigator.userAgent);

      if (isAndroid) {
        // Request camera and microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // If we get here, permissions are granted
        setPermissionStatus({
          camera: "granted",
          microphone: "granted",
        });

        // Stop the stream immediately as we just needed to check permissions
        stream.getTracks().forEach(track => track.stop());

        return true;
      } else {
        // For non-Android devices, assume permissions are OK
        setPermissionStatus({
          camera: "granted",
          microphone: "granted",
        });
        return true;
      }
    } catch (error) {
      console.error("Permission error:", error);
      setPermissionError(error.message);
      setPermissionStatus({
        camera: "denied",
        microphone: "denied",
      });
      return false;
    }
  };

  const onReadyToClose = () => {
    redirect('https://skyfi.network/jitsi-meeting?status=client-stop-call');
  };

  useEffect(() => {
    // Hide header if it exists
    const head = document.getElementById("headerVideoCall");
    if (head) head.style.display = "none";

    // Check if all required parameters are present
    if (url && token && roomName) {
      // Check permissions before setting ready
      checkPermissions().then((hasPermissions) => {
        if (hasPermissions) {
          setIsReady(true);
        }
      });
    }
  }, [url, token, roomName]);

  const handleApiReady = (externalApi) => {
    apiRef.current = externalApi;

    apiRef.current.on("videoConferenceLeft", () => {
      console.log("User left the conference");
      // You can add custom logic here when user leaves
    });

    apiRef.current.on("participantJoined", () => {
      apiRef.current.executeCommand("toggleTileView");
    });
  };

  if (!isReady) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <div className="text-center">
          {permissionError ? (
            <>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6"
                  />
                </svg>
              </div>
              <p className="text-lg text-red-600 font-semibold mb-2">
                Camera & Microphone Permission Required
              </p>
              <p className="text-sm text-neutral-600 mb-4">
                Please allow camera and microphone access to join the meeting.
              </p>
              <p className="text-xs text-neutral-500 mb-4">
                Error: {permissionError}
              </p>
              <button
                onClick={() => {
                  setPermissionError(null);
                  checkPermissions().then((hasPermissions) => {
                    if (hasPermissions) {
                      setIsReady(true);
                    }
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <p className="text-xs text-neutral-400 mt-4">
                On Android: Go to Settings → Apps → Browser → Permissions → Enable Camera & Microphone
              </p>
            </>
          ) : !url || !token || !roomName ? (
            <>
              <p className="text-lg text-neutral-500">
                {!url && !token && !roomName
                  ? "Missing required parameters: url, token, and roomName"
                  : `Missing parameters: ${[
                      !url && "url",
                      !token && "token",
                      !roomName && "roomName",
                    ]
                      .filter(Boolean)
                      .join(", ")}`}
              </p>
              <p className="text-sm text-neutral-400 mt-2">
                Please provide all required URL parameters
              </p>
            </>
          ) : (
            <>
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
              <p className="text-lg text-neutral-600">
                Checking camera and microphone permissions...
              </p>
              <p className="text-sm text-neutral-400 mt-2">
                Please allow access when prompted
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container p-0 m-0">
      <div className="h-screen">
        <JitsiMeeting
          domain={url}
          jwt={token}
          roomName={roomName}
          configOverwrite={{
            prejoinPageEnabled: false,
            welcomePageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            deeplinking: { disabled: true },
            enableNoisyMicDetection: false,
            prejoinConfig: {
              enabled: false,
            },
            lobby: {
              enableChat: false,
            },
            securityUi: {
              hideLobbyButton: true,
            },
            disableSimulcast: false,
            startAudioMuted: 5,
            startVideoMuted: 5,
            quality: 720,
            resolution: 1080,
            constraints: {
              video: {
                height: {
                  ideal: 720,
                  max: 720,
                  min: 240,
                },
              },
            },
            videoQuality: {
              maxBitratesVideo: {
                low: 200000,
                standard: 500000,
                high: 1500000,
              },
            },
          }}
          interfaceConfigOverwrite={{
            TOOLBAR_BUTTONS: [
              "microphone",
              "hangup",
              "camera",
              "toggle-camera",
            ],
            TOOLBAR_ALWAYS_VISIBLE: true,
          }}
          onApiReady={handleApiReady}
          onReadyToClose={onReadyToClose}
          getIFrameRef={(ref) => {
            refRoom.current = ref;
            ref.style.width = "100%";
            ref.style.height = "100%";
          }}
        />
      </div>
    </div>
  );
};

export default JitsiMeetingClient;