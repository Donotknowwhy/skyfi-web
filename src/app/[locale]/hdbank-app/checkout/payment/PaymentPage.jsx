'use client';

import { useRouter } from '@/i18n/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { showModalMessHDBank } from '@/app/components/modals/modalMess';
import { showAlertHDBank } from '@/app/components/modals/hdbank/modalAlertHDBank';
import { ButtonHD } from '@/app/components/ui/ButtonHD';
import Delivery from '@/app/components/hdbank/checkout/Delivery';
import InfoClient from '@/app/components/hdbank/checkout/InfoClient';
import ListProduct from '@/app/components/hdbank/checkout/ListProduct';
import SummaryCheckout from '@/app/components/hdbank/checkout/SummaryCheckout';
import Header from '@/app/components/hdbank/sim-data/Header';
import CheckoutService from '@/app/services/checkoutService';
import { useUserActions, useUserState } from "@/app/stores/user";
import {
    loadFormDataFromStorage,
    saveFormDataToStorage,
    STORAGE_KEYS
} from '@/app/utils/formStorageHelper';
import { useLoad } from '@/app/utils/load';
import { trackAddPaymentInfo, trackAddShippingInfo } from "@/app/utils/trackingHelper";
import { validateHDBankCheckout } from '@/app/utils/validate';
import { getCallbackBaseUrl } from '@/app/utils/callbackHelper';
import { ORDER_BRANDS, getOrderSourceContext } from '@/app/utils/orderSourceContext';
import useMyEsim from '@/app/hooks/useMyEsim';

export default function PaymentPage() {
    const t = useTranslations('hdbank.checkout.payment');
    const locale = useLocale();
    const { showDevicesEsimHDBank } = useMyEsim();
    const router = useRouter();
    const { sims } = useUserState();
    const { setSims, getCartItems } = useUserActions();
    const { open, close } = useLoad();



    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const isLoadingFromStorage = useRef(false);

    const method = useForm({
        resolver: yupResolver(validateHDBankCheckout)
    });

    const isFullEsim = sims?.every((item) => item.sim_type != 'USIM');
    const hasEsim = sims?.some((item) => item.sim_type != 'USIM');
    const hasPhysicalSim = sims?.some((item) => item.sim_type === 'USIM');
    const cart_id = sims?.[0]?.cart_id || null;

    const debounceTimeoutRef = useRef(null);
    const debouncedSaveFormData = useCallback((formData) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (!isLoadingFromStorage.current) {
                saveFormDataToStorage(STORAGE_KEYS.CHECKOUT_FORM, formData);
            }
        }, 1000);
    }, []);

    const watchedValues = method.watch();

    useEffect(() => {
        if (watchedValues && Object.keys(watchedValues).length > 0) {
            debouncedSaveFormData(watchedValues);
        }
    }, [watchedValues, debouncedSaveFormData]);

    useEffect(() => {
        const savedFormData = loadFormDataFromStorage(STORAGE_KEYS.CHECKOUT_FORM);
        if (savedFormData) {
            isLoadingFromStorage.current = true;
            Object.keys(savedFormData).forEach(key => {
                // Exclude dynamic calculated fields to prevent caching stale values
                if (key !== 'items' &&
                    key !== 'isFullEsim' &&
                    key !== 'hasEsim' &&
                    key !== 'source' &&
                    key !== 'create_from_cart_id' &&
                    key !== 'shipping_amount' &&
                    key !== 'discount_amount' &&
                    key !== 'total_amount' &&
                    key !== 'coupon_code') {
                    method.setValue(key, savedFormData[key]);
                }
            });
            setTimeout(() => {
                isLoadingFromStorage.current = false;
            }, 100);
        }
    }, [method]);

    useEffect(() => {
        console.log('sims', sims);

        if (sims?.length > 0) {
            localStorage.setItem('sims', JSON.stringify(sims));
        } else {
            setSims(JSON.parse(localStorage.getItem('sims')) || []);
        }

        method.setValue('isFullEsim', isFullEsim);
        method.setValue('hasEsim', hasEsim);
        method.setValue('hasPhysicalSim', hasPhysicalSim);
        method.setValue('items', sims);
        method.setValue('dataSim', { isSim: isFullEsim ? '1' : '0' });
        method.setValue('source', getOrderSourceContext(ORDER_BRANDS.HDBANK).appSource);
        method.setValue('create_from_cart_id', cart_id);
        method.setValue('agreeTerms', false);
        method.setValue('agreeTermsPhysical', false);
        method.setValue('agreeTermsEsim', false);

    }, [sims]);

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    let agreeTerms = method.watch('agreeTerms');

    const handleTermsClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowTermsPopup(true);
    };

    const renderTermsText = () => {
        return (
            <>
                <span>{t('agreeTermsEsimPrefix')}</span>
                <span onClick={showDevicesEsimHDBank}
                    className="text-[#DA2128] cursor-pointer underline font-semibold">{t('esimModal')}</span>
                <span> {t('agreeTermsPrefix')} </span>
                <span onClick={handleTermsClick}
                    className="text-[#DA2128] cursor-pointer underline font-semibold"
                >
                    {t('agreeTerms')}
                </span>
            </>
        );
    };

    const renderPhysicalTermsText = () => {
        return (
            <>
                <span> {t('agreeTermsPrefix')} </span>
                <span onClick={handleTermsClick}
                    className="text-[#DA2128] cursor-pointer underline font-semibold"
                >
                    {t('agreeTerms')}
                </span>
                <span> {t('and')} </span>
                <span
                    onClick={handleTermsClick}
                    className="text-[#DA2128] cursor-pointer underline font-semibold"
                >
                    {t('Policy')}
                </span>
            </>
        );
    };

    const renderTermsCheckbox = (id, checked, onChange, label) => (
        <div className="flex items-start gap-3 mb-3" >
            <div
                onClick={onChange}
                className={`w-5 h-5 rounded flex items-center justify-center border ${checked ? 'bg-[#DA2128] border-[#DA2128]' : 'border-[#C7C7CC] bg-white'}`}>
                {checked && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            <label htmlFor={id} className="text-sm text-[#333] leading-[20px] select-none cursor-pointer flex-1" >
                {label}
            </label>
        </div>
    );

    const scrollToFirstError = (errors) => {
        if (!errors || Object.keys(errors).length === 0) return;

        // Define field order (top to bottom)
        const fieldOrder = [
            'email',
            'contact_phone',
            'customer_name',
            'delivery_address',
            'city_id',
            'district_id',
            'ward_id'
        ];

        // Find first error field
        const firstErrorField = fieldOrder.find(field => errors[field]);
        if (!firstErrorField) return;

        // Try to find the element by name attribute
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
            // Calculate offset for fixed header and bottom action bar
            const offset = 100; // Adjust based on your fixed elements
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Optional: focus the field after scrolling
            setTimeout(() => {
                element.focus();
            }, 300);
        }
    };

    const sendMessage = (code) => {
        if (typeof window !== 'undefined') {
            const message = {
                "action": "payment",
                "bill_id": code,
                "bill_type": "online",
                "url_callback": `${getCallbackBaseUrl()}/hdbank-app/checkout/result?orderId=${code}`
            }
            if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                console.info("postMessage payload:", message);
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
            }


        } else {
            alert('ReactNativeWebView is not available. This page needs to be loaded in a React Native WebView.');
        }
    };

    const handleSubmit = async (data) => {
        try {
            open();

            if (!agreeTerms) {
                showModalMessHDBank({
                    label: t('titleMessage'),
                    type: 'error',
                    message: t('validationErrorTermsEsim'),
                });
                close();
                return;
            }

            // Validate shipping fee for physical SIM
            if (hasPhysicalSim && (!data.shipping_amount || data.shipping_amount === 0)) {
                showModalMessHDBank({
                    label: t('titleMessage'),
                    type: 'error',
                    message: 'Vui lòng chờ hệ thống tính phí vận chuyển',
                });
                close();
                return;
            }

            if (data.coupon_code && data.coupon_code.trim()) {
                try {
                    const couponValidation = await CheckoutService.validateCoupon({
                        coupon_code: data.coupon_code,
                        items: data.items,
                        contact_phone: data.contact_phone,
                        email: data.email,
                        customer_name: data.customer_name,
                        shipping_amount: data.shipping_amount,
                        source: "HDBANK"
                    });

                    if (!couponValidation.is_valid) {
                        showAlertHDBank({
                            type: 'error',
                            title: t('titleMessage'),
                            message: couponValidation.message || 'Mã giảm giá không hợp lệ',
                        });
                        close();
                        return;
                    }
                    data.discount_amount = couponValidation.discount_amount;
                } catch (error) {
                    showAlertHDBank({
                        type: 'error',
                        title: t('titleMessage'),
                        message: 'Lỗi khi kiểm tra mã giảm giá: ' + error.message,
                    });
                    close();
                    return;
                }
            }

            if (data.isFullEsim) {
                delete data.city_id;
                delete data.district_id;
                delete data.ward_id;
                delete data.delivery_address;
            }

            trackAddShippingInfo({
                cart_total: data.total_amount,
                currency: 'VND',
                shipping_tier: hasPhysicalSim ? 'physical' : 'standard',
                shipping_cost: data.shipping_amount || 0
            });

            if (data.payment_method) {
                trackAddPaymentInfo({
                    cart_total: data.total_amount,
                    currency: 'VND',
                    payment_method: data.payment_method.name || data.payment_method.method || 'unknown',
                    payment_type: data.payment_method.type || 'e_wallet'
                });
            }

            const items = (data.items || []).map((item) => ({
                product_name: item.product_name,
                sim_type: item.sim_type,
                pack_code: item.pack_code,
                base_price: item.base_price,
                sale_price: item.sale_price,
                quantity: item.quantity,
                pack_price: item.pack_price,
                sim_price: item.sim_price,
                msisdn_id: item.msisdn_id,
                product_id: item.product_id,
                total_price: item.total_price,
                total_base_price: item.total_base_price
            }));

            const res = await CheckoutService.createOrder({
                ...data,
                items,
                referral_code: data.referral_code?.trim(),
                payment_method: data.payment_method,
                shipping_amount: hasPhysicalSim ? data.shipping_amount : 0
            });

            if (!res || res.success === false || !res.order_number) {
                showModalMessHDBank({
                    label: t('titleMessage'),
                    type: 'error',
                    message: res?.message || 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.',
                });
                close();
                return;
            }

            // Check if order total is 0đ and was created successfully
            if (res.order_number && res.total_amount === 0) {
                // Navigate to order detail page for 0đ orders
                getCartItems();
                close(); // Close loading before navigation

                const orderDetailUrl = `/hdbank-app/checkout/result?orderId=${res.order_number}`;
                setTimeout(() => {
                    window.location.href = orderDetailUrl;
                }, 100);
                return;
            }

            sendMessage(res.order_number);
            getCartItems();
            close();
            return;


        } catch (error) {
            showAlertHDBank({
                type: 'error',
                title: t('titleMessage'),
                message: error.message,
            });
            close();
        }
    };

    if (!sims || sims.length === 0) {
        return (
            <div className="bg-[#F5F5F5] font-koho min-h-screen flex flex-col">
                <Header title={t('title')} />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="relative w-[100px] h-[100px] mb-4">
                        <Image
                            src="/images/my-esim/empty-esim.png"
                            alt="Empty eSIM"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h2 className="text-lg font-semibold text-[#333333] text-center mb-2">
                        {t('noSimsTitle')}
                    </h2>
                    <p className="text-sm text-[#5C5C5C] text-center mb-6">
                        {t('noSimsDescription')}
                    </p>
                    <ButtonHD
                        onClick={() => router.push('/hdbank-app/sim-data')}
                        className="w-full max-w-xs"
                        variant="normal"
                    >
                        {t('buyButton')}
                    </ButtonHD>
                </div>
            </div>
        );
    }

    return (
        <FormProvider {...method}>
            <div className="bg-[#F2F2F7] min-h-screen flex flex-col pb-32">
                <Header title={t('title')} />
                {/* <StepIndicator currentStep={2} /> */}

                <main className="flex-1 p-4 space-y-4 pb-20">
                    {/* Info Client */}
                    <InfoClient isFullEsim={isFullEsim} />

                    {/* Shipping Address - Only if physical sim involved */}
                    {isFullEsim ? null : (
                        <Delivery />
                    )}

                    {/* Order Summary */}
                    <div className="bg-white rounded-[16px] p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] space-y-4">
                        <SummaryCheckout />
                        <ListProduct />
                    </div>

                    {/* Payment Method */}
                    {/* <PaymentMethod /> */}

                    {/* Terms and Conditions */}

                </main>

                {/* Fixed Bottom Action */}
                <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[16px] p-4 pb-8 z-40 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]">
                    <div className="bg-white rounded-[16px] p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">


                        {!isFullEsim ? renderTermsCheckbox(
                            'agreeTerms',
                            agreeTerms,
                            () => {
                                method.setValue('agreeTerms', !agreeTerms)
                            },
                            renderPhysicalTermsText()
                        ) : renderTermsCheckbox(
                            'agreeTerms',
                            agreeTerms,
                            () => method.setValue('agreeTerms', !agreeTerms),
                            renderTermsText()
                        )}

                        <span className="text-xs text-[#E60A32]">
                            {method.formState.errors.agreeTerms?.message ||
                                method.formState.errors.agreeTermsPhysical?.message ||
                                method.formState.errors.agreeTermsEsim?.message}
                        </span>
                    </div>
                    <ButtonHD
                        variant="normal"
                        size="lg"
                        className="w-full  disabled:opacity-50"
                        disabled={!agreeTerms}
                        onClick={method.handleSubmit(handleSubmit, (errors) => {
                            scrollToFirstError(errors);
                        })}
                    >
                        {t('completePayment')}
                    </ButtonHD>
                </div>

                {/* Terms Popup */}
                {showTermsPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[12px] w-[90vw] h-[90vh] overflow-hidden flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <iframe
                                    src={`/${locale}/terms-and-conditions?src=app`}
                                    className="w-full h-full border-0"
                                    title={t('termsAndConditions')}
                                />
                            </div>
                            <div className="border-t p-4">
                                <ButtonHD
                                    onClick={() => setShowTermsPopup(false)}
                                    className="w-full"
                                >
                                    {t('close')}
                                </ButtonHD>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FormProvider>
    );
}
