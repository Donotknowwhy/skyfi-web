'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const ModalCodeAndroid = ({ data, onClose }) => {
  const t = useTranslations('my-esim.modalCodeAndroid');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(data?.qrcode || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-xl w-full max-w-[740px] mx-auto">
      {/* Header with close button */}
      <div className="flex justify-end items-center p-5 pb-0">
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <Image
            src="/assets/x-close.svg"
            alt="Close"
            width={12}
            height={12}
            className="text-gray-600"
          />
        </button>
      </div>

      {/* Content */}
      <div className="px-10 pb-10">
        {/* Title */}
        <div className="mb-5">
          <h2 className="text-[28px] font-semibold text-[#333333] leading-[1.29] font-inter">
            {t('title')}
          </h2>
        </div>

        {/* Main content */}
        <div className="space-y-5 pb-10">
          {/* SM-DP Address section */}
          <div className="space-y-3">
            {/* Section header with copy button */}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-[#333333] font-inter flex-1">
                {t('smdpAddressTitle')}
              </h3>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-[#FAA61A] rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-200"
              >
                <Image
                  src="/assets/copy-01.svg"
                  alt="Copy"
                  width={16}
                  height={16}
                  className="text-[#FAA61A]"
                />
                {copied ? 'Copied!' : t('copyCodeButton')}
              </button>
            </div>

            {/* Code display box */}
            <div className="bg-[#F5F5F5] rounded-xl p-4">
              <div className="text-base font-medium text-[#333333] text-center break-all font-inter leading-6">
                {data?.qrcode || 'LPA:1$sin.prod.ondemandconnectivity.com$2FB6416833BE87F8D9DF9DE9302155EBA7F389F39C8301FA619688A824625CE7'}
              </div>
            </div>

            {/* Note */}
            <p className="text-sm text-[#8A8A8A] leading-[1.43] font-inter">
              {t('note')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCodeAndroid;
