"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";

export default function HeroSection() {
  const locale = useLocale();
  const t = useTranslations('home.hero');

  return (
    <section className="relative w-full flex flex-row items-center justify-center  bg-[#D9D9D9] overflow-hidden ">
      {/* Ảnh nền chính */}
      <img
        src="/assets/hero/hero2.webp"
        alt="Hero Background"
        width={1728}
        height={648}

        className=" w-full h-full object-cover z-0 aspect-[1728/648]"
        priority
      />
      {/* Nội dung text và ảnh phụ */}

    </section>
  );
}
