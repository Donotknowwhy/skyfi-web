"use client";

import {useLocale, useTranslations} from 'next-intl';

import {MinusCircleIcon, PlusCircleIcon, TrashIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import {showModalMess} from '../../components/modals/modalMess';
import {useUserActions, useUserState} from "../../stores/user";
import {toCurrency} from '../../utils/format';
import {getTotalQuantity} from "@/app/utils/cartService";
import HeaderCart from "@/app/components/HeaderCart";
import {trackBeginCheckout, trackPageView} from "@/app/utils/trackingHelper";


export default function CartPage() {
    const router = useRouter();
    const locale = useLocale();
    const searchParams = useSearchParams();
    const viewSrc = searchParams.get('src') || 'skyfi';
    const {cartItems} = useUserState();
    const {setSims, removeItem, pusQuantity, minusQuantity, updateQuantity} = useUserActions();

    const t = useTranslations('cart');

    useEffect(() => {
        trackPageView({
            page_location: window.location.href,
            page_title: 'Giỏ hàng - Cart',
            engagement_time_msec: 0
        });
    }, []);

    const continueShopping = () => {
        if (viewSrc === "vj") {
            router.push(`/${locale}/travel-esim?type=national&src=vj`);
        } else {
            router.push(`/${locale}/sim-data`);
        }
    };

    // Proceed to checkout
    const proceedToCheckout = () => {
        setSims(cartItems);
        trackBeginCheckout({
            cart_total: totalPrice,
            currency: 'VND',
            items: cartItems.map(item => ({
                product_id: item.product_id || item.id,
                product_name: `eSIM ${item.region_name || item.product_name}`,
                quantity: item.quantity || 1,
                price: item.sale_price || item.price
            })),
            coupon_code: undefined // Add coupon code if available in cart
        });
        if (viewSrc === "vj") {
            router.push(`/${locale}/checkout/payment?src=vj`);
        } else {
            router.push(`/${locale}/checkout/payment`);
        }
    };

    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.total_price ?? 0);
    }, 0);
    const totalQuantity = getTotalQuantity(cartItems);

    return (
        <div className="flex flex-col min-h-screen">
            {viewSrc === "vj" ? <HeaderCart/> : <Header/>}

            <main className="flex-1 flex flex-col items-center w-full bg-white container mb-10 mt-4">
                {/* Back to Shopping Link */}
                <div className="w-full flex items-center gap-2 ">
                    <button
                        onClick={continueShopping}
                        className="flex items-center gap-2 text-primary"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.5 16.6L7.0667 11.1667C6.42503 10.525 6.42503 9.47499 7.0667 8.83333L12.5 3.39999"
                                stroke="currentColor" strokeWidth="1.75" strokeMiterlimit="10" strokeLinecap="round"
                                strokeLinejoin="round"/>
                        </svg>
                        <span
                            className="font-koho font-bold text-[16px] leading-[1.5em]">{t('page.continueShopping')}</span>
                    </button>
                </div>

                {/* Page Title */}
                <div className="w-full flex pt-4">
                    <h1 className="font-inter font-semibold text-[24px] leading-[1.2em] text-[#333]">{t('page.title')}</h1>
                </div>
                <div className="w-full flex py-[8px]">
                      <span className="font-inter text-[16px] text-[#333]">
                        {totalQuantity} {t('page.products')} | {toCurrency(totalPrice)}
                      </span>
                </div>

                {/* Content */}
                {cartItems.length > 0 ? (
                    <div className="w-full flex flex-col xl:flex-row flex-wrap gap-6 xl:gap-[80px] mt-10 ">
                        {/* Left Column - Cart Items */}
                        <div className="flex-1">
                            {/* Table Header */}
                            <div className="flex flex-row border-b border-[#F1F1F1] py-[12px] px-[0px_40px_12px_0px]">
                                <div
                                    className="w-2/3  font-inter font-semibold text-[16px] text-[#333]">{t('page.productColumn')}</div>
                                <div
                                    className="hidden sm:block text-center font-inter font-semibold text-[16px] text-[#333]">{t('page.quantityColumn')}</div>
                                <div
                                    className="w-1/4 text-right font-inter font-semibold text-[16px] text-[#333]">{t('page.priceColumn')}</div>
                            </div>

                            {/* Cart Items */}
                            {cartItems.map(item => {
                                let base_price = (item.base_price ?? 0) + (item.pack_price ?? 0);

                                return (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        removeItem={removeItem}
                                        pusQuantity={pusQuantity}
                                        minusQuantity={minusQuantity}
                                        updateQuantity={updateQuantity}

                                    />
                                );
                            })}
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="xl:max-w-[440px] w-full basis-[400px]">
                            <div className="flex flex-col gap-[20px]">
                                {/* Order Summary */}
                                <div className="flex flex-col gap-[8px]">
                                    <h3 className="font-inter font-semibold text-[22px] leading-[1.2em] text-[#333]">{t('page.orderSummary')}</h3>

                                    <div className="flex flex-col">
                                        {/* Products Total */}
                                        <div className="flex justify-between py-[8px]">
                      <span className="font-inter text-[16px] text-[#333]">
                        {totalQuantity} {t('page.products')}
                      </span>
                                            <span className="font-inter font-medium text-[16px] text-[#333]">
                        {toCurrency(totalPrice)}
                      </span>
                                        </div>

                                        {/* Tax & Service Fee */}
                                        <div className="flex justify-between py-[8px] border-b border-[#F1F1F1]">
                      <span className="font-inter text-[16px] text-[#333]">
                        {t('page.taxAndService')}
                      </span>
                                            <span className="font-inter font-medium text-[16px] text-[#333]">
                        {t('page.included')}
                      </span>
                                        </div>

                                        {/* Total */}
                                        <div className="flex justify-between py-[12px]">
                      <span className="font-inter font-semibold text-[18px] text-[#333]">
                        {t('page.totalAmount')}
                      </span>
                                            <span className="font-inter font-semibold text-[20px] text-[#333]">
                        {toCurrency(totalPrice)}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={proceedToCheckout}
                                    className="bg-[#E69818] text-white font-inter font-semibold text-[16px] py-[12px] px-[24px] rounded-[8px] w-full"
                                >
                                    {t('checkout')}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex justify-center p-0 sm:p-[0px_164px]">
                        <div className="flex flex-col items-center gap-[40px] w-full sm:w-[361px]">
                            {/* Empty Cart Illustration */}
                            <Image
                                src="/assets/empty-cart.svg"
                                width={104}
                                height={107}
                                alt="Empty cart"
                                priority
                            />

                            {/* Empty Cart Message */}
                            <div className="flex flex-col items-center gap-[12px] w-full mb-[100px]">
                                <h3 className="font-inter font-semibold text-[18px] leading-[1.44em] text-[#333] w-full text-center">
                                    {t('page.emptyCartMessage')}
                                </h3>
                                <p className="font-koho text-[16px] leading-[1.5em] text-[#5C5C5C] text-center">
                                    {t('page.emptyCartDescription')}
                                </p>
                                <button
                                    onClick={continueShopping}
                                    className="bg-[#E69818] text-white font-inter font-semibold text-[18px] leading-[1.44em] py-[16px] px-[24px] rounded-[8px] w-full"
                                >
                                    {t('page.buySim')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            {viewSrc === "vj" ? null : <Footer/>}

        </div>
    );
}

const CartItem = ({item, removeItem, pusQuantity, minusQuantity, updateQuantity}) => {
    const [quantity, setQuantity] = useState(item.quantity || 1);
    const tCommon = useTranslations('common');
    const onChange = (e) => {
        let newValue = e.target.value;
        const RE_DIGIT = new RegExp(/^\d+$/);
        const isTargetValueDigit = RE_DIGIT.test(newValue);
        if (!isTargetValueDigit && newValue !== '') {
            return;
        }
        if (Number(newValue) >= 50) {
            setQuantity(50);
        }
        setQuantity(newValue);
    };
    const inputOnBlur = (e) => {
        const newQuantity = Number(quantity);

        if (newQuantity > 50) {
            showModalMess({
                label: tCommon("notification"),
                message: tCommon("maxQuantity", {quantity: 50}),
                type: 'error',
            });
            setQuantity(50); // reset về giá trị cũ
        } else if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity);
        } else {
            // Nếu quantity <= 0, reset về 1
            showModalMess({
                label: tCommon("notification"),
                message: tCommon("minQuantity", {quantity: 1}),
                type: 'error',
            });
            setQuantity(1);
            updateQuantity(item.id, 1);
        }
    };


    useEffect(() => {
        if (quantity !== item.quantity) {
            setQuantity(item.quantity || 1);
        }
    }, [item.id, pusQuantity, minusQuantity, updateQuantity]);
    let base_price = (item.base_price ?? 0) + (item.pack_price ?? 0);

    return (
        <div key={item.id} className="flex flex-row items-center border-b border-[#F1F1F1] py-[8px]">
            {/* Product Info */}
            <div className="w-2/3 flex items-center gap-[12px] ">
                {/* Icon/Image */}

                <img src={item.icon} alt={item.product_name} width={40} height={40}
                     className="object-cover block w-[40px] h-[40px] shadow-sm rounded-full"/>


                {/* Product Details */}
                <div className="flex flex-col">
                    <div className="font-inter font-semibold text-[16px] text-[#333]">{item.product_name}</div>
                    {item.sim_type != 'ESIM_TRAVEL' &&
                        <div className="font-inter text-[14px] text-[#333]">{item.sim_type}</div>}
                    <div
                        className="font-inter text-[14px] text-[#333]">{item.sim_type == 'ESIM_TRAVEL' ? item.pack_code : item.pack_code}</div>
                    {/* Quantity Control */}
                    {item.sim_type == 'ESIM_TRAVEL' && (
                        <div className="flex sm:hidden items-center justify-center gap-[4px]">
                            <button
                                onClick={() => {
                                    if (item.quantity <= 1) {
                                        showModalMess({
                                            label: tCommon("notification"),
                                            message: tCommon("minQuantity", {quantity: 1}),
                                            type: 'error',
                                        });
                                        return;
                                    }
                                    minusQuantity(item.id);
                                }}
                                disabled={item.quantity <= 1}
                                className="flex items-center justify-center"
                            >
                                <MinusCircleIcon
                                    className={clsx("w-6 h-6  transition-colors", item.quantity <= 1 ? "text-neutral-300" : 'text-primary')}/>
                            </button>
                            <input
                                className="font-inter text-[16px] font-semibold text-[#333333] max-w-[40px] text-center"
                                value={quantity}
                                onBlur={inputOnBlur}
                                onChange={onChange} maxLength={2}/>
                            <button
                                onClick={() => {
                                    if (item.quantity >= 50) {
                                        showModalMess({
                                            label: tCommon("notification"),
                                            message: tCommon("maxQuantity", {quantity: 50}),
                                            type: 'error',
                                        });
                                        return;
                                    }
                                    pusQuantity(item.id);
                                }}
                                disabled={item.quantity >= 50}
                                className="flex items-center justify-center"
                            >
                                <PlusCircleIcon
                                    className={clsx("w-6 h-6  transition-colors", item.quantity >= 50 ? "text-neutral-300" : "text-primary")}/>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quantity Control */}
            {item.sim_type == 'ESIM_TRAVEL' && (
                <div className="hidden sm:flex items-center justify-center gap-[4px] ">
                    <button
                        onClick={() => {
                            if (item.quantity <= 1) {
                                showModalMess({
                                    label: tCommon("notification"),
                                    message: tCommon("minQuantity", {quantity: 1}),
                                    type: 'error',
                                });
                                return;
                            }
                            minusQuantity(item.id);
                        }}
                        disabled={item.quantity <= 1}
                        className="flex items-center justify-center"
                    >
                        <MinusCircleIcon
                            className={clsx("w-6 h-6  transition-colors", item.quantity <= 1 ? "text-neutral-300" : 'text-primary')}/>
                    </button>
                    <input className="font-inter text-[16px] font-semibold text-[#333333] max-w-[40px] text-center"
                           value={quantity}
                           onBlur={inputOnBlur}
                           onChange={onChange} maxLength={2}/>
                    <button
                        onClick={() => {
                            if (item.quantity >= 50) {
                                showModalMess({
                                    label: tCommon("notification"),
                                    message: tCommon("maxQuantity", {quantity: 50}),
                                    type: 'error',
                                });
                                return;
                            }
                            pusQuantity(item.id);
                        }}
                        disabled={item.quantity >= 50}
                        className="flex items-center justify-center"
                    >
                        <PlusCircleIcon
                            className={clsx("w-6 h-6  transition-colors", item.quantity >= 50 ? "text-neutral-300" : "text-primary")}/>
                    </button>
                </div>
            )}

            {/* Price & Delete */}
            <div className=" flex ml-auto w-1/4 justify-end gap-4  ">
                {/* Price */}
                <div className="flex flex-col items-end">
          <span
              className={`font-koho font-medium text-[16px] ${item.originalPrice ? 'text-[#E4262B]' : 'text-[#333]'}`}>
            {toCurrency(item.total_price)}
          </span>
                </div>

                {/* Delete Button */}
                <button
                    onClick={() => removeItem(item.id)}
                >
                    <TrashIcon className="w-6 h-6 text-[#333333] hover:text-primary transition-colors"/>
                </button>
            </div>
        </div>
    );
};
