"use client";

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function TravelSimPackage({
    packageName = "SF65T",
    dataAmount = "5 GB",
    validity = "7 ngày",
    price = "65,000 VND",
    description = "5GB data tốc độ cao/ngày cho hành trình 5-7 ngày",
    isSelected = false,
    onSelect = () => { },
    className = ""
}) {
    const t = useTranslations('travelSim.travelSimPackage');

    return (
        <div className={clsx('bg-white rounded-lg cursor-pointer shadow-sm border overflow-hidden w-full', className, isSelected
            ? 'border-primary'
            : 'border-[#99A5B2]')}
            onClick={onSelect}
        >
            {/* Header Section - Red Background */}
            <div className="text-white p-3 md:p-4 relative">
                <img src="/images/travelsim/bg_tittle_pack.png" alt="bg_tittle_pack"
                    className='absolute inset-0 w-full h-full object-fill' />
                <div className="text-xs md:text-sm font-medium relative z-10">
                    {packageName}
                </div>
                {/* Data Amount and Validity */}
                <div className="text-base md:text-lg font-semibold relative z-10">
                    {dataAmount} - {validity}
                </div>
            </div>

            {/* Content Section - White Background */}
            <div className="px-3 md:px-4 pb-3 md:pb-4 flex flex-col gap-2">
                {/* Price Section */}
                <div className="flex">
                    <div className="text-base md:text-lg font-bold text-[#EC2029]">
                        {price}
                    </div>
                </div>

                {/* Description */}
                <div className="bg-gray-200 rounded p-2">
                    <p className="text-xs text-[#333333] leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Radio Button */}
                <div className="flex justify-end">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            checked={isSelected}
                            onChange={onSelect}
                            className="sr-only"
                        />
                        <div className={clsx('w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white transition-colors',
                            isSelected ? 'border-primary' : 'border-[#99A5B2]'
                        )}>
                            {isSelected && (
                                <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
