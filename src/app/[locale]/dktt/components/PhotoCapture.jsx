import React, { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const CARD_TYPE={
    FRONT_CARD:"frontCard",
    BACK_CARD:"backCard",
    FACE:"avatar",
}

const PhotoCapture = ({
    currentStep,
    selectedCardType,
    capturedImages,
    handleImageClick,
    retakePhoto,
    isLoading,
    isCardProcessing,
    handleFileUpload
}) => {
    const fileInputRef = useRef(null);
    const t = useTranslations('dktt.photoCapture');

    const getStepInfo = (step) => {
        switch(step) {
            case 4:
                return {
                    type: CARD_TYPE.FRONT_CARD,
                    title: t('frontCardTitle', {
                        cardType: t(`cardTypes.${selectedCardType}`)
                    }),
                    description: t('cardDescription'),
                    imageSrc: selectedCardType === 'cccd' ? "/images/dktt/front-card.png" : "/images/dktt/front-card.png",
                    isCard: true
                };
            case 5:
                return {
                    type: CARD_TYPE.BACK_CARD,
                    title: t('backCardTitle', {
                        cardType: t(`cardTypes.${selectedCardType}`)
                    }),
                    description: t('cardDescription'),
                    imageSrc: selectedCardType === 'cccd' ? "/images/dktt/back-card.png" : "/images/dktt/passport-back.png",
                    isCard: true
                };
            case 6:
                return {
                    type: CARD_TYPE.FACE,
                    title: t('faceVerificationTitle'),
                    description: t('faceDescription'),
                    imageSrc: "/images/dktt/avatar.png",
                    isCard: false
                };
            default:
                return null;
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Kiểm tra định dạng file
            if (!file.type.startsWith('image/')) {
                alert(t('errors.invalidFileType'));
                return;
            }

            // Kiểm tra kích thước file (tối đa 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert(t('errors.fileSizeTooBig'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                handleFileUpload && handleFileUpload(stepInfo.type, imageData);
            };
            reader.onerror = () => {
                alert(t('errors.fileReadError'));
            };
            reader.readAsDataURL(file);
        }
        // Reset input để có thể chọn lại cùng file
        event.target.value = '';
    };

    const stepInfo = getStepInfo(currentStep);
    if (!stepInfo) return null;

    const { type, title, description, imageSrc, isCard } = stepInfo;
    const capturedImage = capturedImages[type];

    const imageIconSrc = currentStep===4 ? "/images/dktt/icon-front-card.png" : "/images/dktt/icon-back-card.png";

    return (
        <div className="text-center px-6">
            {/* Icon và tiêu đề */}
            <div className="mb-6">
                {isCard && (
                    <div className="w-16 h-10 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <img src={imageIconSrc} alt=""/>
                    </div>
                )}
                <h2 className="text-xl font-bold text-black mb-2">{title}</h2>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>

            {/* Khung hình ảnh */}
            <div className="mb-6">
                {capturedImage ? (
                    <div className="relative">
                        <img
                            src={capturedImage}
                            alt={`Ảnh ${type}`}
                            className={`mx-auto ${
                                type === 'avatar' 
                                    ? 'w-48 h-48 rounded-full object-cover' 
                                    : 'w-full max-w-sm rounded-xl'
                            }`}
                        />
                    </div>
                ) : (
                    <div className={`mx-auto ${type === 'avatar' ? 'w-48 h-48 flex items-center justify-center' : 'max-w-sm'}`}>
                        <Image
                            src={imageSrc}
                            alt={`Mẫu ${title.toLowerCase()}`}
                            width={type === 'avatar' ? 120 : 300}
                            height={type === 'avatar' ? 120 : 200}
                            className={type === 'avatar' ? '' : 'w-full rounded-xl'}
                        />
                    </div>
                )}
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {/* Nút chụp ảnh và upload */}
            {!capturedImage && (
                <div className="mb-8 space-y-3">
                    <button
                        onClick={() => handleImageClick(type)}
                        disabled={isLoading || isCardProcessing}
                        className="w-full py-3 bg-[#F4B321] text-white rounded-xl font-semibold disabled:opacity-50"
                    >
                        {isLoading ? t('buttons.initializingCamera') :
                         isCardProcessing ? t('buttons.processing') : t('buttons.takePhoto')}
                    </button>

                    {/* <div className="flex items-center justify-center my-2">*/}
                    {/*    <div className="flex-1 h-px bg-gray-300"></div>*/}
                    {/*    <span className="px-3 text-gray-500 text-sm">{t('or')}</span>*/}
                    {/*    <div className="flex-1 h-px bg-gray-300"></div>*/}
                    {/*</div>*/}

                    {/*<button*/}
                    {/*    onClick={handleUploadClick}*/}
                    {/*    disabled={isLoading || isCardProcessing}*/}
                    {/*    className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50"*/}
                    {/*>*/}
                    {/*    {isCardProcessing ? t('buttons.processing') : t('buttons.uploadFromDevice')}*/}
                    {/*</button>*/}
                </div>
            )}

            {/* Nút hành động */}
            {capturedImage && (
                <div className="space-y-4">
                    <button
                        onClick={() => retakePhoto(type)}
                        disabled={isCardProcessing}
                        className="w-full py-3 bg-yellow-200 text-yellow-600 rounded-xl font-semibold disabled:opacity-50"
                    >
                        {isCardProcessing ? t('buttons.processing') : t('buttons.retakePhoto')}
                    </button>

                    {/* <button
                        onClick={handleUploadClick}
                        disabled={isCardProcessing}
                        className="w-full py-3 bg-blue-200 text-blue-600 rounded-xl font-semibold disabled:opacity-50"
                    >
                        {isCardProcessing ? t('buttons.processing') : t('buttons.uploadAnotherPhoto')}
                    </button> */}
                </div>
            )}
        </div>
    );
};

export default PhotoCapture;
