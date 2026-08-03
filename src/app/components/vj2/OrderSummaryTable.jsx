"use client";

import clsx from 'clsx';
import {useTranslations} from 'next-intl';

export default function OrderSummaryTable({
                                              selectedPackages = [],
                                              onProceedToPayment = () => {
                                              },
                                              className = "",
                                              typeCode = 0
                                          }) {
    const t = useTranslations('travelSim.orderSummary');

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(price).replace('₫', 'VND');
    };

    // Calculate total price
    const totalPrice = selectedPackages.reduce((total, pkg) => {
        return total + (pkg.rawPrice * pkg.quantity);
    }, 0);
    const totalPackage = selectedPackages.reduce((total, pkg) => {
        return total + pkg.quantity
    }, 0);

    // Check if should show gift row
    const showGiftRow = typeCode === 101;


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
                    <div
                        className="md:hidden grid grid-cols-4 gap-2 pb-2 mb-3 border-b border-gray-300 text-xs font-medium text-gray-600">
                        <div>{t('packageHeader')}</div>
                        <div className="text-center">{t('dataCapacityHeader')}</div>
                        <div className="text-center">{t('quantityHeaderShort')}</div>
                        <div className="text-right">{t('totalPriceHeader')}</div>
                    </div>

                    {/* Table Header - Desktop version */}
                    <div
                        className="hidden md:grid md:grid-cols-4 gap-4 pb-2 mb-3 border-b border-gray-300 text-sm font-medium text-gray-600">
                        <div>{t('packageHeader')}</div>
                        <div>{t('dataCapacityHeaderDesktop')}</div>
                        <div>{t('quantityHeader')}</div>
                        <div>{t('totalPriceHeader')}</div>
                    </div>

                    {/* Main Package Rows */}
                    {selectedPackages.map((pkg, index) => {
                        const itemTotal = pkg.rawPrice * pkg.quantity;
                        return (
                            <div key={`${pkg.packageCode}-${index}`}
                                 className="border-b border-gray-200 pb-3 mb-3 last:border-b-0">

                                {/* Mobile Layout - Single Row */}
                                <div className="md:hidden">
                                    <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                        {/* Package Name */}
                                        <div className="col-span-1">
                                            <div className="font-semibold text-gray-900 leading-tight">
                                                {pkg.packageName}
                                            </div>
                                        </div>

                                        {/* Data Amount */}
                                        <div className="col-span-1 text-center">
                                            <div className="text-gray-900">{pkg.dataAmount}</div>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-1 text-center">
                                            <div className="text-gray-900">{pkg.quantity}</div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-1 text-right">
                                            <div className="font-medium">
                                                {pkg.isFree ? (
                                                    <span className="text-green-600">{t('free')}</span>
                                                ) : (
                                                    <span className="text-gray-900">{formatPrice(itemTotal)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Layout - Grid */}
                                <div className="hidden md:grid md:grid-cols-4 gap-4">
                                    <div className="text-lg font-semibold text-gray-900">
                                        {pkg.packageName}
                                    </div>
                                    <span className="text-base text-gray-900">
                        {pkg.dataAmount}
                    </span>
                                    <span className="text-base text-gray-900">
                        {pkg.quantity}
                    </span>
                                    <span className="text-base font-medium text-gray-900">
                        {pkg.isFree ? (
                            <span className="text-green-600">{t('free')}</span>
                        ) : (
                            formatPrice(itemTotal)
                        )}
                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Gift Data Row - Only show when typeCode === 101 */}
                    {showGiftRow && (
                        <div className="border-b border-gray-200 pb-3 mb-3">
                            {/* Mobile Gift Layout - Single Row */}
                            <div className="md:hidden">
                                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                    {/* Gift Icon + Name */}
                                    <div className="col-span-1 flex items-center">
                                        <img src="/images/travelsim/giftIcon.png" alt="Gift" className="w-4 h-4 mr-1"/>
                                        <span className="font-medium text-gray-900 text-xs">{t('gift')}</span>
                                    </div>

                                    {/* Data Amount */}
                                    <div className="col-span-1 text-center">
                                        <div className="text-gray-900">500MB</div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-1 text-center">
                                        <div className="text-gray-900">
                                            {totalPackage === 0 ? 1 : totalPackage}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-1 text-right">
                                        <div className="font-medium text-green-600">0 VND</div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Gift Layout */}
                            <div className="hidden md:grid md:grid-cols-4 gap-4">
                                <div className="flex items-center">
                                    <img src="/images/travelsim/giftIcon.png" alt="Gift" className="w-6 h-6 mr-2"/>
                                    <span className="text-base text-gray-900">{t('gift')}</span>
                                </div>
                                <span className="text-base text-gray-900">500MB</span>
                                <span className="text-base text-gray-900">
                    {totalPackage === 0 ? 1 : totalPackage}
                </span>
                                <span className="text-base text-green-600">0 VND</span>
                            </div>
                        </div>
                    )}

                    {/* Total Section */}
                    <div className=" border-gray-300 pt-4">
                        {/* Mobile Total */}
                        <div className="md:hidden text-center">
                            <div className="text-sm text-gray-600 mb-1">{t('totalLabel')} {totalPackage>0&&(<>({totalPackage} eSIM):</>)} </div>
                            <div className="text-lg font-bold text-red-600">
                                {totalPrice === 0 ? (
                                    <span className="text-green-600">{t('free')}</span>
                                ) : (
                                    formatPrice(totalPrice)
                                )}
                            </div>
                        </div>

                        {/* Desktop Total */}
                        <div className="hidden md:grid md:grid-cols-4 gap-4">
                            <div className="col-span-3 flex items-center">
                <span className="text-lg font-semibold text-gray-900">
                    {t('totalLabel')} {totalPackage>0&&(<>({totalPackage} eSIM):</>)}
                </span>
                            </div>
                            <span className="text-xl font-bold text-red-600">
                {totalPrice === 0 ? (
                    <span className="text-green-600">{t('free')}</span>
                ) : (
                    formatPrice(totalPrice)
                )}
            </span>
                        </div>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="md:w-1/6 flex justify-center items-center">
                    <button
                        onClick={onProceedToPayment}
                        className="px-6 py-2 bg-[#E69818] text-white rounded-lg font-semibold hover:bg-[#CC8717] transition-colors text-sm"
                    >
                        {typeCode === 101 && totalPackage === 0 ? t('receiveGiftButton') : t('paymentButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}
