import React from 'react';
import { useTranslations } from 'next-intl';

const SuccessScreen = () => {
    const t = useTranslations('dktt.successScreen');

    const handleReturnHome = () => {
        // Có thể thêm logic chuyển về trang chủ
        window.location.href = '/';
    };

    return (
        <div className="text-center px-6 py-0">
            {/* Success Icon */}
            <div className="mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            <h2 className="text-xl font-bold text-black mb-4">
                {t('title')}
            </h2>

            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                {t('message')}
            </p>
            <div className={"flex justify-center items-center"}>
                <img src="/images/dktt/sucessImage.png" alt=""/>
            </div>

            {/* Return Button */}
            <button
                onClick={handleReturnHome}
                className="w-full py-4 bg-[#FAA61A] text-white font-semibold rounded-xl transition-colors"
            >
                {t('returnHomeButton')}
            </button>
        </div>
    );
};

export default SuccessScreen;
