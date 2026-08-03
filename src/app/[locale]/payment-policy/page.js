"use client"

import { trackPageView } from "@/app/utils/trackingHelper";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import { useEffect } from "react";
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function PaymentPolicyPage({ searchParams }) {

  const t = useTranslations('paymentPolicy');
  const src = searchParams?.src;
  const isVikki = src === 'vikki';
  const router = useRouter();
  useEffect(() => {
    trackPageView().catch(err => console.error('Track page view error:', err));
  }, []);
  return (
    <div className="flex flex-col min-h-screen font-koho">
   {(src != "app" && !isVikki)  && (<Header />)}
      <main className="flex-1 flex flex-col items-center w-full bg-white">
        {isVikki && (
          <button
            onClick={() => router.back()}
            className="self-start w-10 h-10 justify-center rounded-full bg-gray-200 hover:bg-gray-300 flex items-center gap-2 fixed top-4 left-4 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {/* Banner */}
        <div className="w-full h-[55px] md:h-[340px] flex items-center relative bg-[#ED1B2F] bg-center text-white rounded-b-3xl">
          <img src="/assets/policy_header.png" alt="" className={"w-1/6 sm:w-fit"}/>
          <h1 className="font-bold text-[24px] md:text-[70px] leading-[1.2em]  z-10 text-center px-4">
            {t('title')}
          </h1>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col items-center gap-[16px] py-[40px] md:py-[80px] px-[20px] md:px-[100px] lg:px-[200px] xl:px-[402px]">
          {/* Main title */}
          <h2 className="font-semibold text-[20px] leading-[1.2em] text-[#333] w-full">
            {t('mainTitle')}
          </h2>

          {/* Section I */}
          <h2 className="font-semibold text-[20px] leading-[1.2em] text-[#333] w-full">
            {t('section1.title')}
          </h2>

          <h3 className="font-semibold text-[20px] leading-[1.2em] text-[#333] w-full">
            {t('section1.subtitle1')}
          </h3>

          <div className="text-[16px] leading-[1.5em] text-[#333] w-full whitespace-pre-line">
            {t('section1.content1')}
          </div>

          <h3 className="font-semibold text-[20px] leading-[1.2em] text-[#333] w-full">
            {t('section1.subtitle2')}
          </h3>

          <div className="text-[16px] leading-[1.5em] text-[#333] w-full whitespace-pre-line">
            {t('section1.content2')}
          </div>

          <h3 className="font-semibold text-[20px] leading-[1.2em] text-[#333] w-full">
            {t('section1.subtitle3')}
          </h3>

          <div className="text-[16px] leading-[1.5em] text-[#333] w-full whitespace-pre-line">
            {t('section1.content3')}
          </div>

          <h2 className="font-semibold text-[20px] leading-[1.2em] text-[#333] w-full">
            {t('section2.title')}
          </h2>

          <div className="text-[16px] leading-[1.5em] text-[#333] w-full whitespace-pre-line">
            {t('section2.content')}
          </div>
        </div>
      </main>
     {src !== "app" && !isVikki && (<Footer />)}
    </div>
  );
}
