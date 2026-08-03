"use client";

import clsx from 'clsx';
import {useTranslations} from 'next-intl';

export default function InfoSimV2({
                                      simNumbers = [],
                                      selectedSims = [],
                                      onSimSelect = () => {},
                                      onSelectAll = () => {},
                                      type = "multiple", // "single", "multiple", "travel"
                                      className = ""
                                  }) {
    const t = useTranslations('travelSim.infoSim');

    const handleCheckboxChange = (simNumber) => {
        onSimSelect(simNumber);
    };

    const handleSelectAllChange = () => {
        onSelectAll();
    };

    const isAllSelected = simNumbers.length > 0 && selectedSims.length === simNumbers.length;

    const renderSimInfo = () => {
        if (type === "single" && simNumbers.length === 1) {
            // Hiển thị 1 số điện thoại như hình 2
            return (
                <div className="text-lg md:text-xl font-semibold text-[#333333] leading-[1.4]">
                    {simNumbers[0]}
                </div>
            );
        } else if (type === "multiple" && simNumbers.length > 1) {
            // Hiển thị "XX eSIM" như hình 1
            return (
                <div className="text-lg md:text-xl font-semibold text-[#333333] leading-[1.4]">
                    {String(simNumbers.length).padStart(2, '0')} eSIM
                </div>
            );
        } else if (type === "travel") {
            // Hiển thị "eSIM du lịch Việt Nam" như hình 3
            return (
                <div className="text-lg md:text-xl font-semibold text-[#333333] leading-[1.4]">
                    {t('travelEsimVietnam')}
                </div>
            );
        } else {
            // Default fallback
            return (
                <div className="text-lg md:text-xl font-semibold text-[#333333] leading-[1.4]">
                    {t('travelEsimVietnam')}
                </div>
            );
        }
    };

    const getSimLabelText = () => {
        if (type === "single") {
            return t('yourSimNumber');
        } else if (type === "multiple") {
            return t('yourSimNumber');
        } else {
            return t('yourGift');
        }
    };

    const shouldShowSimList = type === "multiple" && simNumbers.length > 1;

    return (
        <div>
            <div className={clsx(
                "relative bg-[#F5F5F5] rounded-xl p-2 md:p-4 overflow-hidden",
                className
            )}>
                {/* Price Badge */}
                <div className="absolute -top-[100px] -right-[140px]">
                    <div
                        className="bg-red-600  px-3 py-2 min-w-[200px] min-h-[200px] text-center rotate-45">
                    </div>
                </div>
                <p className="absolute top-[0px] right-[15px] text-white text-lg md:text-3xl font-bold font-koho">0</p>
                <p className="absolute top-[30px] right-[5px] text-white text-lg md:text-xl font-koho">VND</p>

                {/* Header with Gift Icon */}
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="w-3/4 md:flex md:justify-between">
                        <div className="">
                            <div className="text-sm text-[#5C5C5C] mb-1">
                                {getSimLabelText()}
                            </div>
                            {renderSimInfo()}
                        </div>

                        <div className="">
                            <div className="text-sm text-[#5C5C5C] mb-1">
                                {t('giftDataLabel')}
                            </div>
                            <div className="text-lg font-semibold text-[#333333]">
                                {t('giftDataAmount')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-4 ">
                <p className="text-lg text-[#333333] mb-2 font-bold !font-koho ">
                    {t('descriptionText')}
                </p>
                <p className="text-xl font-bold text-green-600 uppercase !font-koho">
                    {t('upgradeDataText')}
                </p>
            </div>

            {/* SIM Numbers List (only for multiple type) */}
            {shouldShowSimList && (
                <div className="space-y-2 mt-4">
                    {/* Select All Option */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAllChange}
                                className="sr-only"
                            />
                            <div className={clsx(
                                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                isAllSelected
                                    ? "bg-orange-400 border-orange-400"
                                    : "bg-white border-gray-300"
                            )}>
                                {isAllSelected && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <span className="text-sm text-[#333333]">
                            {t('buyDataForAllSims')}
                        </span>
                    </label>

                    {/* Individual SIM Numbers */}
                    {simNumbers.map((simNumber, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={selectedSims.includes(simNumber)}
                                    onChange={() => handleCheckboxChange(simNumber)}
                                    className="sr-only"
                                />
                                <div className={clsx(
                                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                    selectedSims.includes(simNumber)
                                        ? "bg-orange-400 border-orange-400"
                                        : "bg-white border-gray-300"
                                )}>
                                    {selectedSims.includes(simNumber) && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm text-[#333333]">
                                {simNumber}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
