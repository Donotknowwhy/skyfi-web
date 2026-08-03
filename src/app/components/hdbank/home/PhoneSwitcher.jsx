'use client';
import { useUserActions, useUserState } from '@/app/stores/user';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const PhoneSwitcher = () => {
    const t = useTranslations('hdbank.home.phoneSwitcher');
    const { phoneDktts, cartId, user } = useUserState();
    const { switchPhone, convertPhoneFormat } = useUserActions();
    const [isOpen, setIsOpen] = useState(false);

    // Combine original phone with phone_dktts and remove duplicates
    const getAllPhones = () => {
        const phones = [];

        // Add original phone if exists
        if (user?.phone) {
            phones.push(user.phone);
        }

        // Add phone_dktts
        if (phoneDktts && Array.isArray(phoneDktts)) {
            phones.push(...phoneDktts);
        }

        // Remove duplicates and convert to 0xxx format
        const uniquePhones = [...new Set(phones)];
        return uniquePhones;
    };

    const allPhones = getAllPhones();
    const availablePhones = allPhones.map(phone => convertPhoneFormat(phone));

    // Don't show switcher if only one phone or no phones available
    if (allPhones.length <= 1) {
        return null;
    }

    const handlePhoneSwitch = (phone) => {
        switchPhone(phone);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Current Phone Display Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E0E0E0] rounded-lg hover:bg-gray-50 transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8195C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.6079 13.3983 14.6298 13.2133 14.6127C11.1619 14.3904 9.19136 13.6894 7.46 12.5667C5.84919 11.5431 4.48353 10.1774 3.46 8.56666C2.33334 6.82745 1.6322 4.84731 1.41333 2.78666C1.39633 2.60229 1.41804 2.41649 1.47712 2.24107C1.53621 2.06564 1.6311 1.90444 1.75591 1.76773C1.88072 1.63102 2.03268 1.52179 2.20213 1.44718C2.37159 1.37257 2.55464 1.33421 2.74 1.33333H4.74C5.06353 1.33013 5.37721 1.4447 5.62248 1.65568C5.86775 1.86667 6.02804 2.15963 6.07333 2.48C6.15779 3.12004 6.31434 3.74848 6.54 4.35333C6.62974 4.59193 6.64908 4.85127 6.59591 5.10058C6.54274 5.34989 6.41928 5.57873 6.24 5.76L5.39333 6.60666C6.34235 8.27568 7.72431 9.65764 9.39333 10.6067L10.24 9.76C10.4213 9.58072 10.6501 9.45726 10.8994 9.40409C11.1487 9.35092 11.4081 9.37026 11.6467 9.46C12.2515 9.68566 12.88 9.84221 13.52 9.92666C13.8439 9.97234 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.953 14.6667 11.28Z" stroke="#DA2128" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium text-[#333333]">{cartId}</span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-20 overflow-hidden">
                        <div className="py-1">
                            {availablePhones.map((phone, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePhoneSwitch(allPhones[index])}
                                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${phone === cartId ? 'bg-red-50 text-[#DA2128]' : 'text-[#333333]'
                                        }`}
                                >
                                    <span className="font-medium">{phone}</span>
                                    {phone === cartId && (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#DA2128" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PhoneSwitcher;
