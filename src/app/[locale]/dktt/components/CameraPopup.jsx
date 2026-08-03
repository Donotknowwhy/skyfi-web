import React from 'react';
import Webcam from 'react-webcam';
import {CARD_TYPE} from "@/app/[locale]/dktt/components/PhotoCapture";
import { useTranslations } from 'next-intl';

const CameraPopup = ({
    isPopupOpen,
    setIsPopupOpen,
    currentImageType,
    selectedCardType,
    webcamRef,
    cameraError,
    setCameraError,
    checkCameraPermission,
    getVideoConstraints,
    onUserMedia,
    onUserMediaError,
    capturePhoto
}) => {
    const t = useTranslations('dktt.camera');

    if (!isPopupOpen) return null;

    const getImageLabel = (type) => {
        const cardTypeName = selectedCardType === 'cccd'
            ? t('cardTypes.cccd')
            : t('cardTypes.passport');

        switch(type) {
            case CARD_TYPE.FACE:
                return t('imageLabels.faceAuth');
            case CARD_TYPE.FRONT_CARD:
                return t('imageLabels.frontCard', { cardType: cardTypeName });
            case CARD_TYPE.BACK_CARD:
                return t('imageLabels.backCard', { cardType: cardTypeName });
            default:
                return '';
        }
    };

    const getImageDescription = (type) => {
        switch(type) {
            case CARD_TYPE.FACE:
                return t('descriptions.face');
            case CARD_TYPE.FRONT_CARD:
            case CARD_TYPE.BACK_CARD:
                return t('descriptions.card');
            default:
                return '';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-black overflow-hidden w-[100vw] h-[100vh] flex flex-col">
                {/* Description - Floating overlay */}
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-4 z-10">
                    <p className="text-base text-white text-center leading-tight">
                        {getImageDescription(currentImageType)}
                    </p>
                </div>

                {/* Camera View - Full screen */}
                <div className="relative bg-black flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                        {cameraError ? (
                            <div className="flex items-center justify-center h-full w-full bg-red-50">
                                <div className="text-center p-3">
                                    <div className="text-red-500 text-xl mb-1">⚠️</div>
                                    <h4 className="text-red-700 font-semibold mb-1 text-xs">{t('error.title')}</h4>
                                    <p className="text-red-600 text-[10px] mb-2 px-2">{cameraError}</p>
                                    <button
                                        onClick={async () => {
                                            setCameraError(null);
                                            await checkCameraPermission();
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[10px]"
                                    >
                                        Thử lại
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Webcam
                                    ref={webcamRef}
                                    className="w-full h-full"
                                    screenshotFormat="image/jpeg"
                                    screenshotQuality={1}
                                    audio={false}
                                    forceScreenshotSourceSize={true}
                                    videoConstraints={getVideoConstraints()}
                                    onUserMedia={onUserMedia}
                                    onUserMediaError={onUserMediaError}
                                    mirrored={currentImageType === 'avatar'}
                                />

                                {/* Overlay khung hướng dẫn cho avatar */}
                                {currentImageType === 'avatar' && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        {/* Overlay mờ toàn màn hình với lỗ thủng hình tròn */}
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-70"
                                            style={{
                                                mask: 'radial-gradient(circle 160px at center, transparent 160px, black 160px)',
                                                WebkitMask: 'radial-gradient(circle 160px at center, transparent 160px, black 160px)'
                                            }}
                                        ></div>
                                        {/* Khung hướng dẫn tròn */}
                                        <div className="w-80 h-80 border-2 border-white rounded-full opacity-70 relative z-10"></div>
                                    </div>
                                )}

                                {/* Overlay khung hướng dẫn cho thẻ */}
                                {(currentImageType === CARD_TYPE.FRONT_CARD || currentImageType === CARD_TYPE.BACK_CARD) && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        {/* Vùng mờ phía trên */}
                                        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70" style={{height: '35%'}}></div>
                                        {/* Vùng mờ phía dưới */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70" style={{height: '35%'}}></div>
                                        {/* Vùng mờ bên trái (chỉ ở giữa, không chồng với trên/dưới) */}
                                        <div className="absolute left-0 bg-black bg-opacity-70" style={{top: '35%', height: '30%', width: '7%'}}></div>
                                        {/* Vùng mờ bên phải (chỉ ở giữa, không chồng với trên/dưới) */}
                                        <div className="absolute right-0 bg-black bg-opacity-70" style={{top: '35%', height: '30%', width: '7%'}}></div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Controls - Floating at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 pb-10 pt-4 flex justify-center flex-shrink-0 z-10">
                    <button
                        onClick={capturePhoto}
                        disabled={cameraError}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 disabled:opacity-50 shadow-lg"
                    >
                        <div className="w-10 h-10 bg-white rounded-full"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraPopup;
