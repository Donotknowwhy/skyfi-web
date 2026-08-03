"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FeedbackSection() {
  const locale = useLocale();
  const t = useTranslations('home.feedback');

  const feedbacks = [
    {
      name: t('customers.customer1.name'),
      content: t('customers.customer1.content'),
    },
    {
      name: t('customers.customer2.name'),
      content: t('customers.customer2.content'),
    },
    {
      name: t('customers.customer3.name'),
      content: t('customers.customer3.content'),
    },
  ];

  function QuoteIcon() {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
        <path d="M18 24C18 17.3726 23.3726 12 30 12V16C25.5817 16 22 19.5817 22 24H26L18 36L10 24H14C14 17.3726 19.3726 12 26 12V16C21.5817 16 18 19.5817 18 24Z" fill="#7C3AED"/>
      </svg>
    );
  }

  return (
    <section className="w-full flex justify-center py-20">
      <div className="rounded-[40px] w-full flex flex-col items-center gap-10 px-[162px] py-[80px]">
        <h2 className="font-inter font-semibold text-[48px] leading-[1.2] text-[#333] text-center mb-8">{t('title')}</h2>
        <div className="w-full flex justify-center">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            className="w-[1156px]"
          >
            {feedbacks.map((fb, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative min-w-[1156px] min-h-[610px] bg-[#E5D4FE] rounded-[16px]">
                  {/* Background decoration Rectangle 30111 */}
                  <Image
                    src="/figma-section-images/feedback-bg.png"
                    alt="Feedback decoration"
                    width={530}
                    height={530}
                    className="absolute top-[40px] right-[40px] rounded-[12px] z-0 select-none pointer-events-none"
                    style={{objectFit: 'cover'}}
                    priority
                  />
                  {/* Feedback content */}
                  <div className="z-10 flex flex-col pt-[170px] px-[50px] text-center justify-center w-[580px]">
                    <div className="text-[60px]">&quot;</div>
                    <div className="font-inter font-semibold text-[28px] leading-[1.2] text-[#333] mb-6 max-w-2xl mx-auto">{fb.content}</div>
                    <div className="font-inter text-[16px] text-[#5C5C5C]">{fb.name}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}