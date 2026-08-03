'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const QuickActions = () => {
  const t = useTranslations('hdbank.home.quickActions');
  const router = useRouter();

  return (
    <div className="flex justify-center gap-10 w-full py-4">
        <div className="flex flex-col items-center gap-2 cursor-pointer " onClick={() => router.push('/hdbank-app/sim-data')}>
            <img src="/figma-images/buttons/mua-sim-hdbank.svg" alt={t('buySim')} className="w-14 h-14" />
            <span className="text-[13px] font-medium text-[#0E0E0F] text-center">{t('buySim')}</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => router.push('/hdbank-app/package')}>
            <img src="/figma-images/buttons/goi-cuoc-hdbank.svg" alt={t('packages')} className="w-14 h-14" />
            <span className="text-[13px] font-medium text-[#0E0E0F] text-center">{t('packages')}</span>
        </div>
        {/* <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => router.push('/hdbank-app/topup')}>
            <img src="/figma-images/buttons/nap-tien.svg" alt={t('topup')} className="w-14 h-14" />
            <span className="text-[13px] font-medium text-[#0E0E0F] text-center">{t('topup')}</span>
        </div> */}
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => router.push('/hdbank-app/travel-esim')}>
            <img src="/figma-images/buttons/esim-du-lich-hdbank.svg" alt={t('travelEsim')} className="w-14 h-14" />
            <span className="text-[13px] font-medium text-[#0E0E0F] text-center">{t('travelEsim')}</span>
        </div>
    </div>
  );
};

export default QuickActions;