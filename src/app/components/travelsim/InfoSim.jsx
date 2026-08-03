"use client";

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function InfoSim({
    type = "single", // "single" or "many"
    simNumbers = [],
    selectedSims = [],
    onSimSelect = () => { },
    onSelectAll = () => { },
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

    if (type === "single") {
        return (
            <div className={clsx(
                "flex flex-col md:flex-row items-start md:items-center gap-3 w-full",
                className
            )}>
                {/* SIM Icon */}
                <div className="flex-shrink-0">
                    <div className="flex  items-center gap-2">
                        {/* SIM Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-[54px] h-[54px] bg-red-600 rounded-xl flex items-center justify-center">
                                <img
                                    src="/assets/icons/sim-card-icon.svg"
                                    alt="SIM Card"
                                    className="w-[37px] h-[31px] brightness-0 invert"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="flex-1 md:hidden">
                            <h3 className="text-base md:text-lg font-semibold text-[#333333] leading-[1.33]">
                                {t('selectFreeSimTitle')}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* SIM Info */}
                <div className="flex flex-col gap-1 flex-1">
                    <div className="text-sm md:text-base font-normal text-[#5C5C5C] leading-6">
                        {t('yourSimNumber')}
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-[#333333] leading-[1.4]">
                        {simNumbers[0] || "0772 123 234"}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={clsx(
            "flex flex-col gap-2 w-full",
            className
        )}>
            {/* Header with Icon and Title */}
            <div className="flex  items-start sm:items-center gap-2">
                {/* SIM Icon */}
                <div className="flex-shrink-0">
                    <div className="w-[54px] h-[54px] bg-red-600 rounded-xl flex items-center justify-center">
                        <img
                            src="/assets/icons/sim-card-icon.svg"
                            alt="SIM Card"
                            className="w-[37px] h-[31px] brightness-0 invert"
                        />
                    </div>
                </div>

                {/* Title */}
                <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-[#333333] leading-[1.33]">
                        {t('selectFreeSimTitle')}
                    </h3>
                </div>
            </div>

            {/* SIM List with Checkboxes */}
            <div className="flex flex-col gap-1 ml-0 sm:ml-14">
                {/* Select All Option */}
                <label className="flex items-center gap-2 cursor-pointer mt-4">
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
                                ? "bg-primary border-primary"
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
                    <span className="text-sm font-normal text-[#333333] leading-[1.43]">
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
                                    ? "bg-primary border-primary"
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
                        <span className="text-sm font-normal text-[#333333] leading-[1.43]">
                            {simNumber}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
