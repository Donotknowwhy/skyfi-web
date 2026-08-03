import React from 'react';
import {useTranslations} from "next-intl";

const ProgressBar = ({ currentStep, selectedCardType }) => {
    const t = useTranslations("dktt.progressBar");

    // Đảm bảo có selectedCardType trước khi render progress bar
    if (!selectedCardType) return null;

    // Ẩn progress bar khi ở bước cuối (step 9 - Quay video chân dung)
    if (currentStep >= 9) return null;

    const getProgressStep = (currentStep) => {
        if (currentStep <= 6) return 1; // Chụp ảnh giấy tờ và chân dung
        if (currentStep === 7) return 2; // Xem thông tin
        if (currentStep === 8) return 3; // Xác thực chữ ký
        if (currentStep === 9) return 4; // Quay video chân dung
        return 4; // Default cuối cùng
    };

    const getStepStatus = (step, currentProgressStep) => {
        if (step < currentProgressStep) return 'completed';
        if (step === currentProgressStep) return 'current';
        return 'pending';
    };

    const getAriaLabel = (step, status) => {
        const stepName = t(`steps.step${step}`);
        const statusText = t(`accessibility.${status}`);
        return `${stepName} - ${statusText}`;
    };

    const currentProgressStep = getProgressStep(currentStep);
    const totalSteps = 4; // Chỉ hiển thị 4 bước chính

    return (
        <div
            className="flex items-center justify-center mb-8"
            role="progressbar"
            aria-label={t("accessibility.progressBar")}
            aria-valuenow={currentProgressStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
        >
            {[1, 2, 3, 4].map((step, index) => {
                const status = getStepStatus(step, currentProgressStep);
                const isCurrentStep = status === 'current';
                const isCompletedStep = status === 'completed';

                return (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                isCompletedStep
                                    ? 'bg-green-500 text-white'
                                    : isCurrentStep
                                        ? 'bg-[#F4B321] text-white'
                                        : 'bg-gray-300 text-gray-500'
                            }`}
                            aria-label={getAriaLabel(step, status)}
                            title={t(`steps.step${step}`)}
                        >
                            {isCompletedStep ? '✓' : step}
                        </div>
                        {index < totalSteps - 1 && (
                            <div className={`w-12 h-0.5 mx-2 ${
                                isCompletedStep ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default ProgressBar;
