"use client";

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function OrderSummary( {
    packageCode = "SF90T",
    quantity = 5,
    unitPrice = 90000,
    onGoBack = () => {},
    onProceedToPayment = () => {},
    className = ""
} ) {
    const t = useTranslations( 'travelSim.orderSummary' );

    const totalPrice = quantity * unitPrice;

    const formatPrice = ( price ) => {
        return new Intl.NumberFormat( 'vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        } ).format( price ).replace( '₫', 'VND' );
    };

    return (
        <div className={clsx(
            "md:bg-red-600 bg-white md:relative fixed bottom-0 left-0 z-20 rounded-xl shadow-lg p-4 md:p-5 w-full",
            className
        )}>
            {/* Order Details Title */}
            <h3 className="hidden md:block text-lg md:text-[22px] font-medium text-white leading-[1.27] mb-4">
                {t('orderDetailsTitle')}
            </h3>

            {/* Price Calculation Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center  gap-4 text-white flex-1 ">
                    {/* Package Info */}
                    <div className="hidden md:flex flex-col items-start">
                        <div className="text-sm md:text-base font-medium mb-1">
                            {t('packageLabel')}
                        </div>
                        <div className="text-lg md:text-xl font-semibold">
                            {packageCode}
                        </div>
                    </div>

                    {/* Multiplication Sign */}
                    <div className=" text-lg font-bold text-center sm:mx-4 hidden md:block">
                        x
                    </div>

                    {/* Quantity Info */}
                    <div className="hidden md:flex flex-col items-start">
                        <div className="text-sm md:text-base font-medium mb-1">
                            {t('quantityLabel')}
                        </div>
                        <div className="text-lg md:text-xl font-semibold">
                            {quantity}
                        </div>
                    </div>

                    {/* Equals Sign */}
                    <div className="text-lg font-bold text-center sm:mx-4 hidden md:block">
                        =
                    </div>

                    {/* Total Price Info */}
                    <div className="flex md:flex-col md:items-start justify-between items-center w-full md:w-auto">
                        <div className=" text-neutral-800 md:text-white text-sm md:text-base font-medium mb-1">
                            {t('totalOrderLabel')}
                        </div>
                        <div className="text-neutral-800 md:text-white text-lg md:text-xl font-semibold">
                            {formatPrice(totalPrice)}
                        </div>
                    </div>
                </div>

                {/* Button Group */}
                <div className="flex justify-center lg:justify-end lg:ml-6">
                    <button
                        onClick={onProceedToPayment}
                        className="bg-[#E69818] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#CC8717] transition-colors text-sm md:text-base w-full w-auto"
                    >
                        {t('paymentButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}
