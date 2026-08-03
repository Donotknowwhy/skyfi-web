import { useTranslations } from 'next-intl';
import Image from 'next/image';

const EmptyESim = ({ onBuyClick }) => {
  const t = useTranslations('esim.empty');

  return (
    <div className="flex flex-col items-center gap-5 py-20 px-40 w-full bg-[#F5F5F5]">
      <div className="relative w-[100px] h-[100px]">
        <Image
          src="/images/my-esim/empty-esim.png"
          alt="Empty eSIM"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-3 w-[361px]">
        <h2 className="text-lg font-semibold text-[#333333] text-center">
          {t('title')}
        </h2>

        <p className="text-sm text-[#5C5C5C] text-center">
          {t('description')}
        </p>

        <button
          onClick={onBuyClick}
          className="w-full py-4 px-6 bg-[#E69818] text-white font-semibold text-lg rounded-lg"
        >
          {t('buyButton')}
        </button>
      </div>
    </div>
  );
};

export default EmptyESim;
