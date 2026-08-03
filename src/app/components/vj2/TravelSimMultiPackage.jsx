"use client";

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toCurrency } from '../../utils/format';

export default function TravelSimMultiPackage({
                                                  packageName = "SF65T",
                                                  dataAmount = "5 GB",
                                                  validity = "7 days",
                                                  price = "65,000 VND",
                                                  description = "5GB high-speed data/day for 5-7 day journey",
                                                  rawPrice = 65000,
                                                  initialQuantity = 0,
                                                  minQuantity = 0,
                                                  maxQuantity = 10,
                                                  onQuantityChange = () => { },
                                                  isFree = false,
                                                  className = ""
                                              }) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const t = useTranslations('travelSim.travelSimPackage');

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const handleDecrease = () => {
        if (quantity > minQuantity) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const isSelected = quantity > 0;

    return (
        <div className={clsx(
            'bg-white rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-md',
            className,
            isSelected
                ? 'border-primary shadow-md'
                : 'border-[#99A5B2] hover:border-primary/50'
        )}>
            {/* Header Section - Red Background */}
            <div className="text-white p-3 md:p-4 relative">
                <img
                    src="/images/travelsim/bg_tittle_pack.png"
                    alt="bg_tittle_pack"
                    className='absolute inset-0 w-full h-full object-fill'
                />
                <div className="text-xs md:text-sm font-medium relative z-10">
                    {packageName}
                </div>
                {/* Data Amount and Validity */}
                <div className="text-base md:text-lg font-semibold relative z-10">
                    {dataAmount} - {validity}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 md:p-4">
                {/* Price Section */}
                <div className="flex justify-between items-center">
                    <div className="text-base md:text-lg font-bold text-[#EC2029]">
                        {price}
                    </div>
                    {isSelected && (
                        <div className="text-sm font-semibold text-gray-600">
                            = {isFree ? t('freeLabel') : toCurrency(rawPrice * quantity)}
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="bg-gray-200 rounded p-2">
                    <p className="text-xs text-[#333333] leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Quantity Selector - Similar to SimItem */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-gray-700">
                        {t('quantityLabel')}:
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Decrease Button */}
                        <button
                            onClick={handleDecrease}
                            disabled={quantity <= minQuantity}
                            className={clsx(
                                "w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center transition-colors",
                                quantity <= minQuantity
                                    ? "border-[#DDDDDD] text-[#DDDDDD] cursor-not-allowed"
                                    : "border-primary text-primary hover:bg-primary hover:text-white"
                            )}
                            aria-label={t('decreaseQuantityAriaLabel')}
                        >
                            <MinusIcon className="w-4 h-4" />
                        </button>

                        {/* Quantity Display */}
                        <div className="w-8 text-center">
                            <span className="text-base font-semibold text-[#333333]">
                                {quantity}
                            </span>
                        </div>

                        {/* Increase Button */}
                        <button
                            onClick={handleIncrease}
                            disabled={quantity >= maxQuantity}
                            className={clsx(
                                "w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center transition-colors",
                                quantity >= maxQuantity
                                    ? "border-[#DDDDDD] text-[#DDDDDD] cursor-not-allowed"
                                    : "border-primary text-primary hover:bg-primary hover:text-white"
                            )}
                            aria-label={t('increaseQuantityAriaLabel')}
                        >
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Max quantity info */}
                {quantity >= maxQuantity && (
                    <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        {t('maxQuantityReached', { maxQuantity })}
                    </div>
                )}
            </div>
        </div>
    );
}
