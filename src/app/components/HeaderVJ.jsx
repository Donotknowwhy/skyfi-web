"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { saveLocal } from "../utils/saveLocal";
import LanguageSwitcher from "./LanguageSwitcher";

export default function HeaderVJ() {
  const router = useRouter();
  // const pathname = usePathname();
  // const language = getLocal('language') ;
  // const searchParams = useSearchParams();
  const locale = useLocale();






  useEffect(() => {
    saveLocal('language', locale);
  }, [locale]); // Empty useEffect to ensure component mounts correctly
  // Scroll to top on route change

  return (
    <header className="w-full flex sticky top-0 left-0 z-50 items-center justify-between px-4 sm:px-6 lg:px-20 h-[80px] bg-white border-b border-[#F1F1F1] " style={{ fontFamily: 'Inter' }}>
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
        <Image src="/assets/logo.svg" alt="SkyFi Logo" width={120} height={40} priority className="max-w-[100px] sm:max-w-[120px]" />
      </div>

      {/* Actions - Only Language Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-end">
        {/* Language Switcher - Hidden on small mobile, icon only on tablet, with text on desktop */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}