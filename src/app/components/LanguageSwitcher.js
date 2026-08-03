'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { saveLocal } from '../utils/saveLocal';

export default function LanguageSwitcher({isExtend=false}) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'vi', name: 'Tiếng Việt' },
        ...isExtend ? [
            { code: 'ko', name: '한국어' },//Hàn
            { code: 'zh-TW', name: '繁體中文' },//Đài loan
            { code: 'zh-CN', name: '简体中文' },//Trung
            { code: 'ja', name: '日本語' },//Nhật
            { code: 'th', name: 'ไทย' },//Thái
            { code: 'ru', name: 'Русский' },//Nga
        ] : []
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const switchLanguage = (newLocale) => {
        const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
        const newPath = `/${newLocale}${pathnameWithoutLocale || ''}`;
        const searchString = searchParams.toString();
        const finalUrl = searchString ? `${newPath}?${searchString}` : newPath;
        saveLocal('language', newLocale);
        router.push(finalUrl);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    return (
        <div ref={dropdownRef} className="sm:flex items-center justify-center gap-1 lg:gap-2 p-2 lg:px-3 lg:py-2 cursor-pointer hover:bg-gray-50 rounded-lg border border-[#DDDDDD]" onClick={toggleDropdown}>
            <Image src="/assets/globe-03.svg" alt="Globe" width={20} height={20} />
            <div className="relative">
        <span className="hidden xl:flex items-center gap-1">
          <span className='text-neutral-800'>{currentLanguage.name}</span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    className={`block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 ${locale === lang.code ? 'font-medium' : ''}`}
                                    role="menuitem"
                                    onClick={() => switchLanguage(lang.code)}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
