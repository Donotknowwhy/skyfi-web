'use client';

import { modal, useModal } from '@/app/utils/modal';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Activate SIM Modal Content Component
const ActivateSimContent = () => {
  const { close } = useModal();
  const t = useTranslations('hdbank.modals.activateSim');
  const router = useRouter();

  const handleBuySim = () => {
    close();
    router.push('/hdbank-app/sim-data');
  };

  return (
    <div className="w-full flex flex-col">
      {/* Content */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        {/* Icon */}
        <div className="w-20 h-20 flex items-center justify-center">
          <Image src="/wating.png" width={80} height={80} alt="Waiting" className="w-full h-full" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 px-2">
          <h3 className="text-2xl font-semibold text-[#0E0E0F] leading-tight" style={{ letterSpacing: '-1.08%' }}>
            {t('title')}
          </h3>
          <p className="text-sm text-[rgba(50,52,56,0.7)] leading-[1.43] mt-1" style={{ letterSpacing: '-1.64%' }}>
            {t('description')}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 px-4 pt-4">
        {/* Close Button */}
        <button
          onClick={close}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[rgba(84,85,86,0.12)] rounded-full shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08),inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]"
        >
          <span className="text-base font-semibold text-[#0E0E0F] leading-6 text-center" style={{ letterSpacing: '-2.69%' }}>
            {t('closeButton')}
          </span>
        </button>

        {/* Buy SIM Button */}
        <button
          onClick={handleBuySim}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08),inset_0px_4px_5px_0px_rgba(255,255,255,0.08),inset_0px_4px_10px_0px_rgba(255,255,255,0.35),inset_0px_0px_39px_0px_rgba(255,255,255,0.25)] border border-[rgba(84,85,86,0.12)] relative overflow-hidden"
        >
          {/* Gradient Background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)',
            }}
          />
          <span className="relative text-base font-semibold text-white leading-6 text-center" style={{ letterSpacing: '-2.69%' }}>
            {t('buySim')}
          </span>
        </button>
      </div>
    </div>
  );
};

// Function to open Activate SIM modal
export const showActivateSimModal = () => {
  modal.sheet({
    render: <ActivateSimContent />,
    boxClassName: 'max-w-md',
    classContainer: '!p-0',
  });
};

export default ActivateSimContent;
