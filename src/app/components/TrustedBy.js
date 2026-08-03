"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const logos = [
  { src: "/figma-section-images/image_445@2x.png", alt: "Logo 1", width: 80, height: 80 },
  { src: "/figma-section-images/image_446@2x.png", alt: "Logo 2", width: 217.84, height: 217.84 },
  { src: "/figma-section-images/image_447@2x.png", alt: "Logo 3", width: 214.26, height: 214.26 },
  { src: "/figma-section-images/image_448@2x.png", alt: "Logo 4", width: 214.06, height: 214.06 },
  { src: "/figma-section-images/image_449@2x.png", alt: "Logo 5", width: 213.57, height: 213.57 },
  { src: "/figma-section-images/image_450@2x.png", alt: "Logo 6", width: 226.86, height: 226.86 },
  { src: "/figma-section-images/image_451@2x.png", alt: "Logo 7", width: 202.82, height: 202.82 },
  { src: "/figma-section-images/image_452@2x.png", alt: "Logo 8", width: 221.88, height: 221.88 },
  { src: "/figma-section-images/image_453@2x.png", alt: "Logo 9", width: 200, height: 200 },
];

export default function TrustedBy() {
  const locale = useLocale();
  const t = useTranslations('home.trustedBy');
  
  return (
    <section className="why-choose-skyfi w-full flex justify-center py-20">
      <div className="w-full flex flex-col items-center gap-20 px-[40px] md:px-[163px] py-[80px]">
        <h2 className="font-inter font-semibold text-[48px] leading-[1.2] text-[#333] text-center mb-8">{t('title')}</h2>
        <div className="flex flex-row gap-4 md:gap-6 lg:gap-10 w-full justify-center overflow-x-auto">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-[#FAD496] rounded-[40px] p-[10px] shadow-md"
              style={{ width: logo.width, height: logo.height, minWidth: logo.width, minHeight: logo.height }}
            >
              <Image
                src={logo.src}
                alt={t('logoAlt', { number: i + 1 })}
                width={logo.width - 20}
                height={logo.height - 20}
                className="object-cover rounded-[32px]"
                style={{ borderRadius: 32 }}
                draggable={false}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 