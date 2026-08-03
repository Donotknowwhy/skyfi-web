'use client';

import { useTranslations } from 'next-intl';
import { useWarning } from '@/app/contexts/WarningContext';

const WarningPopup = () => {
  const { showWarning, closeWarning } = useWarning();
  const t = useTranslations('warning');

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {t('title')}
          </h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4 inline">
            {t('message')}
          </p>
          <a
            href="https://skyfi.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {t('linkText')}
          </a>
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeWarning}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {t('closeButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;
