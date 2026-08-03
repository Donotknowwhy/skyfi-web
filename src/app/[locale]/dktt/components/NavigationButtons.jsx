import React from 'react';
import { useTranslations } from 'next-intl';

const NavigationButtons = ({
    currentStep,
    isStepComplete,
    handlePrevStep,
    handleNextStep,
    handleSubmit,
    onSubmit,
    isCardProcessing,
    isSubmittingRegistration = false
}) => {
    const t = useTranslations('dktt.navigationButtons');
    
    const getStepErrorMessage = (step) => {
        switch (step) {
            case 3: return t('stepErrors.step3');
            case 4: return t('stepErrors.step4');
            case 5: return t('stepErrors.step5');
            case 6: return t('stepErrors.step6');
            case 7: return t('stepErrors.step7');
            case 8: return t('stepErrors.step8');
            case 9: return t('stepErrors.step9');
            default: return t('stepErrors.default');
        }
    };

    const handleNextClick = async () => {
        if (isStepComplete(currentStep)) {
            if (currentStep === 9) {
                handleSubmit(onSubmit)();
            } else {
                await handleNextStep();
            }
        } else {
            alert(getStepErrorMessage(currentStep));
        }
    };

    return (
        <div className="fixed z-20 bottom-0 left-0 right-0 bg-white p-4 border-t max-w-md mx-auto">
            <div className="flex gap-4">
                {/* Nút quay lại - chỉ hiển thị khi không phải bước đầu tiên */}
                {currentStep > 3 && (
                    <button
                        onClick={handlePrevStep}
                        disabled={isCardProcessing || isSubmittingRegistration}
                        className="flex-1 py-4 rounded-xl font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCardProcessing || isSubmittingRegistration ? t('processingButton') : t('backButton')}
                    </button>
                )}

                {/* Nút tiếp tục */}
                <button
                    onClick={handleNextClick}
                    disabled={!isStepComplete(currentStep) || isCardProcessing || isSubmittingRegistration}
                    className={`${currentStep > 3 ? 'flex-1' : 'w-full'} py-4 rounded-xl font-semibold text-white ${
                        (isStepComplete(currentStep) && !isCardProcessing && !isSubmittingRegistration)
                            ? 'bg-[#F4B321] '
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    {isCardProcessing || isSubmittingRegistration ? t('processingButton') :
                     currentStep === 9 ? t('completeButton') : t('continueButton')}
                </button>
            </div>
        </div>
    );
};

export default NavigationButtons;
