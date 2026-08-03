'use client';

import { JitsiMeeting } from "@jitsi/react-sdk";
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from "react";
import useActivateVikki from '../../hook/useActivateVikki';
import { getMeetUrl } from "@/app/utils/callbackHelper";


const VideoCallOnGoing = () => {
    const t = useTranslations('vikki.videoCall.ongoing');
    const refRoom = useRef(null);
    const apiRef = useRef(null);
    const { jitsiData, stopCall } = useActivateVikki();

    const [isReady, setIsReady] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState({
        camera: null,
        microphone: null,
    });
    const [permissionError, setPermissionError] = useState(null);

    const { roomName, token } = jitsiData || {};

    // dev : meet.skyfi.network
    //  prod : https://meet.skyfi.pro
    const url = getMeetUrl();

    // Check camera and microphone permissions
    const checkPermissions = async () => {
        try {
            const isAndroid = /Android/i.test(navigator.userAgent);

            if (isAndroid) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                setPermissionStatus({
                    camera: "granted",
                    microphone: "granted",
                });

                stream.getTracks().forEach(track => track.stop());
                return true;
            } else {
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
        stopCall();
    };

    useEffect(() => {
        const head = document.getElementById("headerVideoCall");
        if (head) head.style.display = "none";

        if (roomName && token) {
            checkPermissions().then((hasPermissions) => {
                if (hasPermissions) {
                    setIsReady(true);
                }
            });
        } else if (roomName) {
            // If no token required, just check permissions
            checkPermissions().then((hasPermissions) => {
                if (hasPermissions) {
                    setIsReady(true);
                }
            });
        }
    }, [roomName, token]);

    const handleApiReady = (externalApi) => {
        apiRef.current = externalApi;

        apiRef.current.on("videoConferenceLeft", () => {
            console.log("User left the conference");
            stopCall();
        });

        apiRef.current.on("participantJoined", () => {
            apiRef.current.executeCommand("toggleTileView");
        });
    };

    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-screen">
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
                                {t('permissionRequired')}
                            </p>
                            <p className="text-sm text-neutral-600 mb-4">
                                {t('allowCameraAccess')}
                            </p>
                            <p className="text-xs text-neutral-500 mb-4">
                                {t('errorLabel')}: {permissionError}
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
                                {t('retry')}
                            </button>
                            <p className="text-xs text-neutral-400 mt-4">
                                {t('androidInstruction')}
                            </p>
                        </>
                    ) : !roomName ? (
                        <>
                            <p className="text-lg text-neutral-500">
                                {t('missingRoomInfo')}
                            </p>
                            <p className="text-sm text-neutral-400 mt-2">
                                {t('pleaseTryAgain')}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            </div>
                            <p className="text-lg text-neutral-600">
                                {t('checkingPermissions')}
                            </p>
                            <p className="text-sm text-neutral-400 mt-2">
                                {t('pleaseAllow')}
                            </p>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="p-0 m-0">
            <div className="h-[100dvh] w-full">
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

export default VideoCallOnGoing;
