"use client";

import { useTranslations } from 'next-intl';

export default function DeviceCompatibilityModal({ isOpen, onClose }) {
  const t = useTranslations('deviceCompatibilityModal');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#333]">{t('title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label={t('closeButton')}
          >
            &times;
          </button>
        </div>
        
        <div className="prose max-w-none"> 
          <p>{t('intro')}</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">{t('generalRequirements.title')}</h3>
          <ul>
            <li>{t('generalRequirements.unlocked')}</li>
            <li>{t('generalRequirements.esimSupport')}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">{t('apple.title')}</h3>
          <p>{t('apple.models')}</p>
          {/* Add more specific device lists or sections as needed */}
          
          <h3 className="text-xl font-semibold mt-4 mb-2">{t('samsung.title')}</h3>
          <p>{t('samsung.models')}</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">{t('google.title')}</h3>
          <p>{t('google.models')}</p>

          <p className="mt-4">{t('note')}</p>
          <p>
            {t.rich('checkOfficialSite', {
              link: (chunks) => <a href="https://www.skyfi.vn/esim-devices" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{chunks}</a>
            })}
          </p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t('closeButton')}
          </button>
        </div>
      </div>
    </div>
  );
} 