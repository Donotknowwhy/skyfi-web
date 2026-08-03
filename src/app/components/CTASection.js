"use client";

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const locale = useLocale();
  const t = useTranslations('home.cta');
  
  return (
    <section className="w-full flex justify-center py-20">
      <div className=" rounded-[16px] w-full max-w-[1400px] h-[380px] flex flex-col items-start gap-5 px-[120px] py-[80px]"
          style={{backgroundImage: 'url(/assets/cta.png)', backgroundSize: '100% 100%', backgroundPosition: 'right'}}
    
      >
        <h2 className="font-inter font-semibold text-[48px] leading-[1.2] text-white text-left mb-4 ml-[60px]">{t('title')}</h2>
        <p className="font-inter text-[24px] text-white text-left mb-8 ml-[60px]">{t('subtitle')}</p>
        <button className="rounded-lg px-8 py-4 font-semibold text-lg text-white bg-gradient-to-r from-[#F9A51A] via-[#F9A51A] via-[#F9A51A] to-[#FFDD00] hover:opacity-90 transition ml-[60px] text-left border-0 shadow-lg">{t('button')}</button>
      </div>
    </section>
  );
} 