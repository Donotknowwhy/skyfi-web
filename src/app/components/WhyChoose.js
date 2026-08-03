"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function WhyChoose() {
  const locale = useLocale();
  const t = useTranslations('home.whyChoose');
  
  const reasons = [
    {
      img: "/assets/why-choose-skyfi/image-441@2x.png",
      number: "01",
      title: t('reason1'),
      desc: t('reason1Description')
    },
    {
      img: "/assets/why-choose-skyfi/image-442@2x.png",
      number: "02",
      title: t('reason2'),
      desc: t('reason2Description')
    },
    {
      img: "/assets/why-choose-skyfi/image-443@2x.png",
      number: "03",
      title: t('reason3'),
      desc: t('reason3Description')
    }
  ];

  return (
    <section className="w-full flex justify-center py-[120px] bg-[#fff]">
      <div className="w-full max-w-[1728px] flex flex-col items-center gap-20 px-[163px] py-[120px]">
        <h2 className="font-inter font-semibold text-[48px] leading-[1.2] text-[#333] text-center mb-8 tracking-tight">{t('title')}</h2>
        <div className="flex flex-row gap-12 w-full justify-center">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="w-[390px] h-[390px] bg-[#F5F5F5] rounded-[32px] flex flex-col items-center justify-center shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-8 text-center border border-[#E5E5E5] relative z-10"
            >
              <div className="flex flex-col items-center w-full mb-4">
                <div className="w-14 h-14 flex items-center justify-center font-bold text-b mb-2 select-none">
                  {r.number}
                </div>
              </div>
              <div className="font-inter font-semibold text-[28px] text-[#333] mb-3 leading-tight tracking-tight">
                {r.title}
              </div>
              <Image
                src={r.img}
                alt={r.title}
                width={189}
                height={123}
                className="mb-8 object-contain w-[189px] h-[123px]"
                draggable="false"
                priority
              />
              <div className="font-inter text-[20px] text-[#505050] leading-snug">
                {r.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 