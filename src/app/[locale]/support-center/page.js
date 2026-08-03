"use client"

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from "next/image";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {trackPageView} from "@/app/utils/trackingHelper";
import {useEffect} from "react";

export default function SupportCenterPage() {
  const locale = useLocale();
  const t = useTranslations('supportCenter'); // Changed to 'supportCenter'
    useEffect(() => {
        trackPageView().catch(err => console.error('Track page view error:', err));
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full bg-white">
        {/* Banner */}
          <div className="w-full h-[340px] md:h-[340px] flex items-center relative bg-[#ED1B2F] bg-center text-white rounded-b-3xl">
              <img src="/assets/policy_header.png" alt=""/>
          <h1 className="font-inter font-bold text-[40px] md:text-[70px] leading-[1.2em] z-10 text-center px-4">
            {t('title')}
          </h1>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col items-center gap-[16px] py-[40px] md:py-[80px] px-[20px] md:px-[100px] lg:px-[200px] xl:px-[402px]">
          <h2 className="font-inter font-semibold text-[32px] leading-[1.2em] text-[#333] w-full text-center">
            {t('faqTitle')}
          </h2>

          {/* FAQ Sections */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => {
            const question = t.rich(`faq${index}.question`, { br: () => "\n" });
            const answer = t.rich(`faq${index}.answer`, { br: () => "\n" }); // Use t.rich for answers to parse <br>
            // Check if answer exists. Some FAQs in Figma only had questions.
            const answerExists = !!t(`faq${index}.answer`, {}, { returnObjects: true });

            return (
              <div key={index} className="w-full border-b border-[#DDDDDD] py-[12px]">
                <h3 className="font-inter font-semibold text-[20px] leading-[1.2em] text-[#5C5C5C]">
                  {question}
                </h3>
                {answerExists && (
                  <p className="text-[16px] leading-[1.5em] text-[#5C5C5C] w-full whitespace-pre-line pt-[12px]" dangerouslySetInnerHTML={{ __html: answer.replace(/\\n/g, '<br>') }} />
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
