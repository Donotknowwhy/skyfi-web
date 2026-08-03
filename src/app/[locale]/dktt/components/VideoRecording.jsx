import React, { useState } from 'react';
import Webcam from 'react-webcam';
import {useTranslations} from "next-intl";

const FACING_MODE_USER = 'user';

const getVideoConstraints = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    return {
        facingMode: FACING_MODE_USER,
        width: { ideal: 640, max: 1280 },
        height: { ideal: 480, max: 720 },
        frameRate: { ideal: 30, max: 30 },
        ...(isIOS && {
            aspectRatio: 4/3,
            resizeMode: 'crop-and-scale'
        })
    };
};

const VideoRecording = ({
    webcamRef,
    recordedVideo,
    isRecording,
    recordingTime,
    startRecording,
    saveRecording,
    stopRecording,
    retakeVideo,
    recordedVideoLink,
    isSaving = false,
    isLoading = false,
    isSubmittingRegistration = false,
                            formData
}) => {
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const t = useTranslations("dktt.videoRecording");

    const handleShowVideoSample = () => {
        setShowVideoPopup(true);
    };

    const handleCloseVideoPopup = () => {
        setShowVideoPopup(false);
    };

    return (
        <div className="text-center px-6">
            <h2 className="text-xl font-bold text-black mb-2">{t("title")}</h2>
            <div className="text-gray-600 text-sm mb-2">
                {t("description")}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-2 text-left">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">{t("formInfo.phoneLabel")}</span>
                            <span className="text-gray-900">{formData.phone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">{t("formInfo.fullNameLabel")}</span>
                            <span className="text-gray-900">{formData.full_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">{t("formInfo.birthDayLabel")}</span>
                            <span className="text-gray-900">{formData.birth_day}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">{t("formInfo.idNumberLabel")}</span>
                            <span className="text-gray-900">{formData.id_number}</span>
                        </div>
                    </div>
                </div>
                <span>{t("formInfo.sampleVideoText")}</span>
                <span
                    className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                    onClick={handleShowVideoSample}
                >{t("sampleVideoLink")}
                </span>
            </div>

            {/* Video Sample Popup */}
            {showVideoPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">{t("samplePopup.title")}</h3>
                            <button
                                onClick={handleCloseVideoPopup}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                            >
                                {t("samplePopup.closeButton")}
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600 mb-4">
                                {t("samplePopup.description")}
                            </p>
                            <div className="relative w-full" style={{paddingBottom: '177.78%'}}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src="https://www.youtube-nocookie.com/embed/vyboH-6jnaA?playsinline=1&rel=0"
                                    title={t("samplePopup.videoTitle")}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    webkitallowfullscreen="true"
                                    mozallowfullscreen="true"
                                    style={{border: 'none'}}
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading overlay when reading information */}
            {(isLoading || isSubmittingRegistration) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-3"></div>
                        <p className="text-gray-700 font-medium">
                            {isSubmittingRegistration ? t("loading.submittingRegistration") : t("loading.savingVideo")}
                        </p>
                    </div>
                </div>
            )}

            {/* Video container */}
            <div className="mb-6">
                {recordedVideo ? (
                    <div className="relative">
                        <video
                            src={recordedVideo}
                            controls
                            className="w-full max-w-sm mx-auto rounded-xl bg-gray-200"
                            style={{ maxHeight: '300px' }}
                            playsInline
                            preload="metadata"
                        />
                        {/* Loading overlay for video when saving */}
                        {isSaving && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                                <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mb-2"></div>
                                    <p className="text-gray-700 text-sm font-medium">{t("loading.savingVideo")}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : isRecording ? (
                    <div className="relative w-full max-w-sm mx-auto">
                        <Webcam
                            ref={webcamRef}
                            className="w-full rounded-xl"
                            audio={false}
                            videoConstraints={getVideoConstraints()}
                            style={{ maxHeight: '300px' }}
                            forceScreenshotSourceSize={true}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={0.8}
                            mirrored={true}
                        />
                        {/* Overlay recording indicator */}
                        <div className="absolute top-4 left-4 flex items-center bg-red-500 text-white px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                            <span className="text-sm font-semibold">{t("recording.isRecording", { time: recordingTime })}</span>
                        </div>

                        {/* Time limit warning */}
                        {recordingTime >= 25 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full">
                                <span className="text-sm font-semibold">{t("recording.timeRemaining", { time: 30 - recordingTime })}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-sm mx-auto bg-gray-200 rounded-xl flex items-center justify-center" style={{ height: '300px' }}>
                        <div className="text-gray-400 text-center">
                            <div className="text-4xl mb-2">{t("recording.readyIcon")}</div>
                            <p>{t("recording.ready")}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="mb-8">
                {!recordedVideo && !isRecording && (
                    <button
                        onClick={startRecording}
                        disabled={isLoading || isSaving || isSubmittingRegistration}
                        className={`w-16 h-16 border-4 border-gray-300 rounded-full flex items-center justify-center mx-auto transition-colors ${
                            isLoading || isSaving || isSubmittingRegistration 
                                ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                                : 'bg-white hover:border-orange-400'
                        }`}
                        title={isLoading || isSaving || isSubmittingRegistration ? t("tooltips.processing") : t("tooltips.startRecording")}
                    >
                        <div className={`w-6 h-6 rounded-full ${
                            isLoading || isSaving || isSubmittingRegistration ? 'bg-gray-400' : 'bg-red-500'
                        }`}></div>
                    </button>
                )}

                {isRecording && (
                    <button
                        onClick={stopRecording}
                        disabled={isLoading || isSaving || isSubmittingRegistration}
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors ${
                            isLoading || isSaving || isSubmittingRegistration 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-red-500 hover:bg-red-600'
                        }`}
                        title={isLoading || isSaving || isSubmittingRegistration ? t("tooltips.processing") : t("tooltips.stopRecording")}
                    >
                        <div className="w-6 h-6 bg-white rounded-sm"></div>
                    </button>
                )}
            </div>

            {/* Action buttons */}
            {recordedVideo && (
                <div className="space-y-4">
                    <button
                        onClick={retakeVideo}
                        disabled={isLoading || isSaving || isSubmittingRegistration}
                        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                            isLoading || isSaving || isSubmittingRegistration 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title={isLoading || isSaving || isSubmittingRegistration ? t("tooltips.processing") : t("tooltips.retakeVideo")}
                    >
                        {t("buttons.retake")}
                    </button>

                    <button
                        onClick={saveRecording}
                        disabled={!!recordedVideoLink || isLoading || isSaving || isSubmittingRegistration}
                        className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center ${
                            recordedVideoLink 
                                ? 'bg-green-200 text-green-700 cursor-not-allowed' 
                                : isSaving 
                                    ? 'bg-orange-100 text-orange-400 cursor-not-allowed'
                                    : isLoading || isSubmittingRegistration
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-orange-200 text-orange-600 hover:bg-orange-300'
                        }`}
                        title={
                            recordedVideoLink
                                ? t("tooltips.videoSaved")
                                : isSaving
                                    ? t("tooltips.savingVideo")
                                    : isLoading || isSubmittingRegistration
                                        ? t("tooltips.processing")
                                        : t("tooltips.saveVideo")
                        }
                    >
                        {isSaving ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                                {t("buttons.saving")}
                            </>
                        ) : recordedVideoLink ? (
                            t("buttons.saved")
                        ) : isLoading || isSubmittingRegistration ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                                {t("buttons.processing")}
                            </>
                        ) : (
                            t("buttons.save")
                        )}
                    </button>

                    {recordedVideoLink && !isSaving && !isSubmittingRegistration && (
                        <div className="text-sm text-green-600 text-center">
                            {t("messages.videoSaved")}
                        </div>
                    )}

                    {isSaving && (
                        <div className="text-sm text-orange-600 text-center">
                            {t("messages.uploading")}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoRecording;
