"use client";

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function OrderSummaryV2({
                                           packageName = "Power",
                                           dataAmount = "20GB",
                                           giftDataAmount = "500MB",
                                           quantity = 5,
                                           unitPrice = 200000,
                                           onProceedToPayment = () => {},
                                           onReceiveGift = () => {},
                                           showMainPackage = true,
                                           showGiftRow = true,
                                           showReceiveGiftButton = false,
                                           className = ""
                                       }) {
    const t = useTranslations('travelSim.orderSummary');

    const totalPrice = showMainPackage ? quantity * unitPrice : 0;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(price).replace('₫', 'VND');
    };

    return (
        <div className={clsx(
            "bg-gray-100 rounded-lg p-6 w-full",
            className
        )}>
            {/* Header */}
            <h3 className="text-lg font-medium text-gray-800 mb-4">
                {t('title')}
            </h3>
            <div className="md:flex">
                <div className="w-full md:w-5/6">
                    {/* Table Header - Mobile version */}
                    <div className="md:hidden grid grid-cols-4 gap-2 pb-2 mb-3 border-b border-gray-300 text-xs font-medium text-gray-600">
                        <div>{t('packageHeader')}</div>
                        <div className="text-center">{t('dataCapacityHeader')}</div>
                        <div className="text-center">{t('quantityHeaderShort')}</div>
                        <div className="text-right">{t('totalPriceHeader')}</div>
                    </div>

                    {/* Table Header - Desktop version */}
                    <div className="hidden md:grid md:grid-cols-4 gap-4 pb-2 mb-3 border-b border-gray-300 text-sm font-medium text-gray-600">
                        <div>{t('packageHeader')}</div>
                        <div>{t('dataCapacityHeaderDesktop')}</div>
                        <div>{t('quantityHeader')}</div>
                        <div>{t('totalPriceHeader')}</div>
                    </div>

                    {/* Main Package Row */}
                    {showMainPackage && (
                        <div className="border-b border-gray-200 pb-3 mb-3">
                            {/* Mobile Layout - Single Row */}
                            <div className="md:hidden">
                                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                    {/* Package Name */}
                                    <div className="col-span-1">
                                        <div className="font-semibold text-gray-900 leading-tight">
                                            {packageName}
                                        </div>
                                    </div>

                                    {/* Data Amount */}
                                    <div className="col-span-1 text-center">
                                        <div className="text-gray-900">{dataAmount}</div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-1 text-center">
                                        <div className="text-gray-900">{quantity}</div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-1 text-right">
                                        <div className="font-medium text-gray-900">
                                            {formatPrice(unitPrice)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Layout - Grid */}
                            <div className="hidden md:grid md:grid-cols-4 gap-4">
                                <div className="text-lg font-semibold text-gray-900">
                                    {packageName}
                                </div>
                                <span className="text-base text-gray-900">
                                    {dataAmount}
                                </span>
                                <span className="text-base text-gray-900">
                                    {quantity}
                                </span>
                                <span className="text-base font-medium text-gray-900">
                                    {formatPrice(unitPrice)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Gift Data Row */}
                    {showGiftRow && (
                        <div className="border-b border-gray-200 pb-3 mb-3">
                            {/* Mobile Gift Layout - Single Row */}
                            <div className="md:hidden">
                                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                    {/* Gift Icon + Name */}
                                    <div className="col-span-1 flex items-center">
                                        <img src="/images/travelsim/giftIcon.png" alt={t('giftIcon')} className="w-4 h-4 mr-1"/>
                                        <span className="font-medium text-gray-900 text-xs">{t('gift')}</span>
                                    </div>

                                    {/* Data Amount */}
                                    <div className="col-span-1 text-center">
                                        <div className="text-gray-900">{giftDataAmount}</div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-1 text-center">
                                        <div className="text-gray-900">{quantity}</div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-1 text-right">
                                        <div className="font-medium text-green-600">{t('freePrice')}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Gift Layout */}
                            <div className="hidden md:grid md:grid-cols-4 gap-4">
                                <div className="flex items-center">
                                    <img src="/images/travelsim/giftIcon.png" alt={t('giftIcon')} className="w-6 h-6 mr-2"/>
                                    <span className="text-base text-gray-900">{t('gift')}</span>
                                </div>
                                <span className="text-base text-gray-900">{giftDataAmount}</span>
                                <span className="text-base text-gray-900">{quantity}</span>
                                <span className="text-base text-green-600">{t('freePrice')}</span>
                            </div>
                        </div>
                    )}

                    {/* Total Section - Only show if main package exists */}
                    {showMainPackage && (
                        <div className="pt-4">
                            {/* Mobile Total */}
                            <div className="md:hidden text-center">
                                <div className="text-sm text-gray-600 mb-1">{t('totalLabel')}</div>
                                <div className="text-lg font-bold text-red-600">
                                    {formatPrice(totalPrice)}
                                </div>
                            </div>

                            {/* Desktop Total */}
                            <div className="hidden md:grid md:grid-cols-4 gap-4">
                                <div className="col-span-3 flex items-center">
                                    <span className="text-lg font-semibold text-gray-900">
                                        {t('totalLabel')} {quantity>0&&(<>({quantity} eSIM):</>)}
                                    </span>
                                </div>
                                <span className="text-xl font-bold text-red-600">
                                    {formatPrice(totalPrice)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="w-full md:w-1/6 flex justify-center items-center mt-4 md:mt-0">
                    {/* Receive Gift Button (conditional) */}
                    {showReceiveGiftButton && (
                        <button
                            onClick={onReceiveGift}
                            className="px-4 py-2 bg-[#E69818] text-white rounded-lg font-medium hover:bg-[#CC8717] transition-colors text-sm mr-2"
                        >
                            {t('receiveGiftButton')}
                        </button>
                    )}

                    {/* Payment Button */}
                    {showMainPackage && (
                        <button
                            onClick={onProceedToPayment}
                            className="px-6 py-2 bg-[#E69818] text-white rounded-lg font-semibold hover:bg-[#CC8717] transition-colors text-sm"
                        >
                            {t('paymentButton')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
