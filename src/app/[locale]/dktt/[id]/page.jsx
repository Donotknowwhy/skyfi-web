"use client";

import React from 'react';
import {
    ProgressBar,
    DocumentTypeSelector,
    PhotoCapture,
    InfoReview,
    SignatureCapture,
    VideoRecording,
    CameraPopup,
    NavigationButtons,
    SuccessScreen
} from "../components";
import { useDKTTLogic } from "../hooks/useDKTTLogic";
import Image from "next/image";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { useTranslations } from 'next-intl';

const DKTT = ({ params }) => {
    // Unwrap params Promise using React.use()
    const { id, locale } = React.use(params);
    const t = useTranslations('dktt');

    const {
        // Refs
        webcamRef,
        signatureRef,

        // State
        currentStep,
        isPopupOpen,
        setIsPopupOpen,
        currentImageType,
        capturedImages,
        recordedVideo,
        recordedVideoLink,
        setSignatureData,
        isRecording,
        recordingTime,
        cameraError,
        setCameraError,
        isLoading,
        isCardProcessing,
        selectedCardType,
        setSelectedCardType,
        simType,
        registrationType,
        isSubmittingRegistration,
        isSubmitSuccess,

        // Form methods
        handleSubmit,
        watch,
        setValue,
        control,
        formData,

        // Actions
        checkCameraPermission,
        handleImageClick,
        capturePhoto,
        onUserMedia,
        onUserMediaError,
        startRecording,
        saveRecording,
        stopRecording,
        retakeVideo,
        clearSignature,
        retakePhoto,
        handleFileUpload,
        getVideoConstraints,
        isStepComplete,
        handleNextStep,
        handlePrevStep,
        handleInfoDataChange,
        infoReviewData,
        formDataChanged,
        onSubmit,
        getForm,
        registerForm
    } = useDKTTLogic(id); // Truyền id vào hook


    // Render nội dung theo bước
    const renderStepContent = () => {
        switch(currentStep) {
            case 3:
                return (
                    <DocumentTypeSelector
                        selectedCardType={selectedCardType}
                        setSelectedCardType={setSelectedCardType}
                        simType={simType}
                        registrationType={registrationType}
                        watch={watch}
                    />
                );

            case 4:
            case 5:
            case 6:
                // Đối với hộ chiếu, bỏ qua bước 5
                if (currentStep === 5 && selectedCardType === 'passport') {
                    return null;
                }

                return (
                    <PhotoCapture
                        currentStep={currentStep}
                        selectedCardType={selectedCardType}
                        capturedImages={capturedImages}
                        handleImageClick={handleImageClick}
                        retakePhoto={retakePhoto}
                        isLoading={isLoading}
                        isCardProcessing={isCardProcessing}
                        handleFileUpload={handleFileUpload}
                    />
                );

            case 7:
                return (
                    <InfoReview
                        key={`info-review-${formDataChanged}`}
                        capturedImages={capturedImages}
                        watch={watch}
                        setValue={setValue}
                        control={control}
                    />
                );

            case 8:
                return (
                    <SignatureCapture
                        signatureRef={signatureRef}
                        setSignatureData={setSignatureData}
                        clearSignature={clearSignature}
                        getForm={getForm}
                        registerForm={registerForm}
                    />
                );

            case 9:
                return (
                    <VideoRecording
                        webcamRef={webcamRef}
                        recordedVideo={recordedVideo}
                        recordedVideoLink={recordedVideoLink}
                        isRecording={isRecording}
                        recordingTime={recordingTime}
                        startRecording={startRecording}
                        saveRecording={saveRecording}
                        stopRecording={stopRecording}
                        retakeVideo={retakeVideo}
                        isLoading={isLoading}
                        isSubmittingRegistration={isSubmittingRegistration}
                        formData={formData}
                    />
                );

            case 10:
                return <SuccessScreen />;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="w-full flex sticky top-0 left-0 z-50 items-center justify-between px-4 sm:px-6 lg:px-20 h-[80px] bg-white border-b border-[#F1F1F1] " style={ { fontFamily: 'Inter' } }>

                {/* Logo */ }
                <div className="flex items-center cursor-pointer" >
                    <Image src="/assets/logo.svg" alt="SkyFi Logo" width={ 120 } height={ 40 } priority className="max-w-[100px] sm:max-w-[120px]" />
                </div>

                {/* Language Switcher */ }
                <LanguageSwitcher />
            </header>
            <div className='max-w-md mx-auto px-4 py-6 bg-white min-h-screen relative'>
                {/* Progress Bar */}
                <ProgressBar
                    currentStep={currentStep}
                    selectedCardType={selectedCardType}
                />

                {/* Step Content */}
                {renderStepContent()}

                {/* Navigation Buttons - Ẩn khi ở bước thành công */}
                {currentStep !== 10 && (
                    <NavigationButtons
                        currentStep={currentStep}
                        isStepComplete={isStepComplete}
                        handlePrevStep={handlePrevStep}
                        handleNextStep={handleNextStep}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        isCardProcessing={isCardProcessing}
                        isSubmittingRegistration={isSubmittingRegistration}
                    />
                )}

                {/* Spacing for fixed button */}
                <div className="h-20"></div>

                {/* Webcam Popup */}
                <CameraPopup
                    isPopupOpen={isPopupOpen}
                    setIsPopupOpen={setIsPopupOpen}
                    currentImageType={currentImageType}
                    selectedCardType={selectedCardType}
                    webcamRef={webcamRef}
                    cameraError={cameraError}
                    setCameraError={setCameraError}
                    checkCameraPermission={checkCameraPermission}
                    getVideoConstraints={getVideoConstraints}
                    onUserMedia={onUserMedia}
                    onUserMediaError={onUserMediaError}
                    capturePhoto={capturePhoto}
                />

                {/* Loading Overlay cho nhận diện thẻ */}
                {isCardProcessing && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full text-center">
                            <div className="mb-4">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {t('loadingCardProcessing')}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {t('cardProcessingDescription')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Loading Overlay cho đăng ký thông tin */}
                {isSubmittingRegistration && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full text-center">
                            <div className="mb-4">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {t('loadingRegistration')}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {t('registrationDescription')}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DKTT;
