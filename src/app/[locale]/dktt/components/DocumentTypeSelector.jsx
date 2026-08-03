import React from 'react';
import PackageInfo from './PackageInfo';
import { useTranslations } from 'next-intl';

const DocumentTypeSelector = ({selectedCardType, setSelectedCardType, registrationType, simType, watch}) => {
    const t = useTranslations('dktt.documentSelector');
    
    return (
        <div className="text-center px-6">
            <h1 className="text-2xl font-bold text-black mb-2">{t('title')}</h1>
            <h2 className="text-2xl font-bold text-black mb-8">{t('subtitle')}</h2>

            {/* Thông tin gói cước */}
            <PackageInfo simType={simType}
                         registrationType={registrationType}
                         watch={watch}/>

            {/* Chọn loại giấy tờ */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-left mb-4 text-gray-600">{t('documentTypeLabel')}</h3>
                <div className="flex gap-4">
                    <button
                        onClick={() => setSelectedCardType('passport')}
                        className={`flex-1 p-4 border rounded-lg transition-colors ${
                            selectedCardType === 'passport'
                                ? 'border-2 border-[#F4B321] bg-orange-50 font-semibold'
                                : 'border border-gray-300 text-gray-600'
                        }`}
                    >
                        {t('passport')}
                    </button>
                    <button
                        onClick={() => setSelectedCardType('cccd')}
                        className={`flex-1 p-4 border rounded-lg transition-colors ${
                            selectedCardType === 'cccd'
                                ? 'border-2 border-[#F4B321] bg-orange-50  font-semibold'
                                : 'border border-gray-300 text-gray-600'
                        }`}
                    >
                        {t('cccd')}
                    </button>
                </div>
                <p className="text-sm text-gray-500 text-left mt-2">
                    {selectedCardType === ""
                        ? t('instructions.selectDocument')
                        : selectedCardType === 'passport'
                            ? t('instructions.passportInfo')
                            : t('instructions.cccdInfo')
                    }
                </p>
            </div>
        </div>
    );
};

export default DocumentTypeSelector;
