'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PoweredBySection = () => {
  const t = useTranslations('home.powered');

  const features = [
    {
      icon: '/assets/icons/powered/gdpr-icon.svg',
      title: t('gdpr.title'),
      description: t('gdpr.description'),
    },
    {
      icon: '/assets/icons/powered/secure-servers-icon.svg',
      title: t('secure.title'),
      description: t('secure.description'),
    },
    {
      icon: '/assets/icons/powered/ccpa-icon.svg',
      title: t('privacy.title'),
      description: t('privacy.description'),
    },
  ];

  return (
    <section className="w-full bg-[#F7F7F7] py-16 md:py-20 lg:py-[120px] px-4 md:px-8 lg:px-[164px]">
      <div className="container">
        {/* Title */}
        <div className="text-center mb-10 md:mb-12 lg:mb-[60px]">
          <h2 className="text-2xl md:text-3xl lg:text-[46px] font-bold text-[#FAA61A] leading-tight lg:leading-[1.1] tracking-[-0.03em]">
            {t('title')}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 md:gap-10 lg:gap-[50px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-4 md:gap-5 w-full lg:w-[341px]"
            >
              {/* Icon Container */}
              <div className="w-[62px] h-[62px] bg-white rounded-lg flex items-center justify-center shadow-[inset_0px_1px_6px_0px_rgba(169,169,169,0.1)] mb-1">
                <div className="relative w-[50px] h-[50px]">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl lg:text-[28px] font-semibold text-[#333333] leading-tight lg:leading-[1.286] w-full max-w-[181px]">
                {feature.title}
              </h3>

              {/* Divider Line */}
              <div className="w-[83px] h-0.5 bg-[#ED1B2F]"></div>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-[18px] font-normal text-[#333333] leading-relaxed lg:leading-[1.444] w-full">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoweredBySection;
