"use client";

import {yupResolver} from '@hookform/resolvers/yup';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';

import useMyEsim from "@/app/hooks/useMyEsim";
import {useEffect, useCallback, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useRouter} from '../../../../i18n/navigation';
import InfoClient from '../../../components/checkout/infoClient';
import ListProduct from '../../../components/checkout/listProduc';
import PaymentMethod from '../../../components/checkout/paymentMethod';
import ShippingAddress from '../../../components/checkout/shippingAddress';
import SummaryCheckout from '../../../components/checkout/summaryCheckout';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import {showModalMess} from '../../../components/modals/modalMess';
import Step from '../../../components/simData/step';
import CheckoutService from '../../../services/checkoutService';
import {useUserActions, useUserState} from "../../../stores/user";
import {useLoad} from '../../../utils/load';
import {validateCheckout} from '../../../utils/validate';
import {
    saveFormDataToStorage,
    loadFormDataFromStorage,
    clearFormDataFromStorage,
    STORAGE_KEYS
} from '../../../utils/formStorageHelper';
import {useSearchParams} from "next/navigation";
import HeaderCart from "@/app/components/HeaderCart";
import Link from "next/link";
import {trackAddPaymentInfo, trackAddShippingInfo} from "@/app/utils/trackingHelper";

const ArrowLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 19L8 12L15 5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function PaymentPage() {
    const locale = useLocale();
    const t = useTranslations('checkout');
    const tCommon = useTranslations('common');
    const searchParams = useSearchParams();
    const viewSrc = searchParams.get( 'src' ) || 'skyfi';
    const router = useRouter();
    const {sims} = useUserState();
    const {setSims} = useUserActions();
    const {open, close} = useLoad();
    const {showDevicesEsim} = useMyEsim();

    // State để quản lý popup điều khoản
    const [showTermsPopup, setShowTermsPopup] = useState(false);

    // Ref để theo dõi việc có đang loading dữ liệu từ localStorage không
    const isLoadingFromStorage = useRef(false);

    console.log('sims', sims);

    const method = useForm({
        resolver: yupResolver(validateCheckout)
    });

    const isFullEsim = sims?.every((item) => item.sim_type != 'USIM');
    const hasEsim = sims?.some((item) => item.sim_type != 'USIM');
    const hasPhysicalSim = sims?.some((item) => item.sim_type === 'USIM');
    const cart_id = sims?.[0]?.cart_id || null;

    // Debounce để tránh lưu quá nhiều lần
    const debounceTimeoutRef = useRef(null);
    const debouncedSaveFormData = useCallback((formData) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (!isLoadingFromStorage.current) {
                saveFormDataToStorage(STORAGE_KEYS.CHECKOUT_FORM, formData);
            }
        }, 1000); // Lưu sau 1 giây không có thay đổi
    }, []);

    // Watch tất cả form values để tự động lưu
    const watchedValues = method.watch();

    // Effect để lưu form data khi có thay đổi
    useEffect(() => {
        if (watchedValues && Object.keys(watchedValues).length > 0) {
            debouncedSaveFormData(watchedValues);
        }
    }, [watchedValues, debouncedSaveFormData]);

    // Effect để load dữ liệu khi component mount
    useEffect(() => {
        const savedFormData = loadFormDataFromStorage(STORAGE_KEYS.CHECKOUT_FORM);
        if (savedFormData) {
            isLoadingFromStorage.current = true;

            // Reset form với dữ liệu đã lưu
            Object.keys(savedFormData).forEach(key => {
                if (key !== 'items' && key !== 'isFullEsim' && key !== 'hasEsim' && key !== 'source' && key !== 'create_from_cart_id') {
                    method.setValue(key, savedFormData[key]);
                }
            });

            // Đặt lại flag sau một khoảng thời gian ngắn
            setTimeout(() => {
                isLoadingFromStorage.current = false;
            }, 100);
        }
    }, [method]);

    useEffect(() => {
        if (sims?.length > 0) {
            localStorage.setItem('sims', JSON.stringify(sims));
        } else {
            setSims(JSON.parse(localStorage.getItem('sims')) || []);
        }

        method.setValue('isFullEsim', isFullEsim);
        method.setValue('hasEsim', hasEsim);
        method.setValue('hasPhysicalSim', hasPhysicalSim);
        method.setValue('items', sims);
        if(viewSrc==="vj"){
            method.setValue('source', 'WEB_VJ');
        }
        else {
            method.setValue('source', 'WEB');
        }
        method.setValue('create_from_cart_id', cart_id);
        method.setValue('agreeTerms', false); // Set initial boolean value
        method.setValue('agreeTermsPhysical', false); // Set initial boolean value for physical sim
        method.setValue('agreeTermsEsim', false); // Set initial boolean value for eSIM

    }, [sims]);

    // Cleanup debounce timeout khi component unmount
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);


    let agreeTerms = method.watch('agreeTerms');
    let agreeTermsPhysical = method.watch('agreeTermsPhysical');
    let agreeTermsEsim = method.watch('agreeTermsEsim');

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleTermsClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowTermsPopup(true);
    };

    const handleDeviceCompatibilityClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('Nhấn vào Thiết bị tương thích eSIM');
        showDevicesEsim()
        // Thêm logic xử lý khi nhấn vào tương thích thiết bị
        // Ví dụ: mở modal hướng dẫn, kiểm tra thiết bị, v.v.
    };

    const renderTermsText = () => {
        const devicePrefixText = t('devicePrefix');
        const deviceCompatibilityText = t('deviceCompatibility');
        const agreeWithText = t('agreeWith');
        const termsAndConditionsText = t('termsAndConditions');

        return (
            <>
                <span>{devicePrefixText} </span>
                <span
                    onClick={handleDeviceCompatibilityClick}
                    className="text-[#E69818] underline cursor-pointer hover:text-[#D18500] transition-colors"
                >
          {deviceCompatibilityText}
        </span>
                <span>. {agreeWithText} </span>
                <span
                    onClick={handleTermsClick}
                    className="text-[#E69818] underline cursor-pointer hover:text-[#D18500] transition-colors"
                >
          {termsAndConditionsText}
        </span>
                <span>.</span>
            </>
        );
    };

    const renderPhysicalTermsText = () => {

        return (
            <>
                <span>{t('agreeTermsPhysicalPrefix')} </span>
                <span
                    onClick={handleTermsClick}
                    className="text-[#E69818] underline cursor-pointer hover:text-[#D18500] transition-colors"
                >
                    {t('agreeTermsPhysicalLink')}
                </span>
            </>
        );
    };

    const renderTermsCheckbox = (id, checked, onChange, label, isEsim = false) => (
        <div className="flex items-start gap-3 mb-3">
            <div className="relative flex items-center h-6 w-6 mt-0.5">
                <input
                    id={id}
                    type="checkbox"
                    onChange={onChange}
                    className="opacity-0 absolute h-6 w-6 cursor-pointer"
                />
                <div
                    className={`w-5 h-5 border rounded flex items-center justify-center ${checked ? 'border-primary bg-primary' : 'border-[#A1A1A1]'}`}>
                    {checked && (
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    )}
                </div>
            </div>
            <label htmlFor={id} className="font-inter font-medium text-[16px] text-[#333]">
                {label}
            </label>
        </div>
    );

    const handleSubmit = async (data) => {
        try {
            open();

            // Kiểm tra việc đồng ý với điều khoản theo loại sim
            if (hasPhysicalSim && hasEsim) {
                // Nếu có cả sim vật lý và eSIM, cần check cả 2 checkbox
                if (!agreeTermsPhysical || !agreeTermsEsim) {
                    showModalMess({
                        label: t('titleMessage'),
                        type: 'error',
                        message: t('validationErrorTermsBoth'),
                        onClose: () => {
                        }
                    });
                    return;
                }
            } else if (isFullEsim) {
                // Nếu chỉ có eSIM, check checkbox agreeTerms
                if (!agreeTerms) {
                    showModalMess({
                        label: t('titleMessage'),
                        type: 'error',
                        message: t('validationErrorTermsEsim'),
                        onClose: () => {
                        }
                    });
                    return;
                }
            } else if (hasPhysicalSim && !hasEsim) {
                // Nếu chỉ có sim vật lý, check checkbox agreeTermsPhysical
                if (!agreeTermsPhysical) {
                    showModalMess({
                        label: t('titleMessage'),
                        type: 'error',
                        message: t('validationErrorTermsPhysical'),
                        onClose: () => {
                        }
                    });
                    return;
                }
            }

            // Validate mã giảm giá một lần nữa trước khi tạo đơn hàng nếu có
            if (data.coupon_code && data.coupon_code.trim()) {
                try {
                    const couponValidation = await CheckoutService.validateCoupon({
                        coupon_code: data.coupon_code,
                        items: data.items,
                        contact_phone: data.contact_phone,
                        email: data.email,
                        customer_name: data.customer_name,
                        shipping_amount: data.shipping_amount,
                        source: viewSrc==="vj"?"WEB_VJ":"WEB"
                    });

                    if (!couponValidation.is_valid) {
                        showModalMess({
                            label: t('titleMessage'),
                            type: 'error',
                            message: couponValidation.message || 'Mã giảm giá không hợp lệ',
                            onClose: () => {
                            }
                        });
                        return;
                    }

                    // Cập nhật lại discount_amount từ kết quả validation
                    data.discount_amount = couponValidation.discount_amount;
                } catch (error) {
                    showModalMess({
                        label: t('titleMessage'),
                        type: 'error',
                        message: 'Lỗi khi kiểm tra mã giảm giá: ' + error.message,
                        onClose: () => {
                        }
                    });
                    return;
                }
            }

            if(data.isFullEsim){
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

            const res = await CheckoutService.createOrder({
                ...data,
                referral_code:data.referral_code?.trim(),
                payment_method:viewSrc==='vj'?"SKYJOY":data.payment_method
            });
            if (!res.order_number) {
                showModalMess({
                    label: t('titleMessage'),
                    type: 'error',
                    message: res.message,
                    onClose: () => {
                        closeModal();
                    }
                });
                return
            }
            if (data.payment_method === 'COD') {
                router.push('/checkout/result?orderId=' + res.order_number);
                return;
            }

            const paymentParams = {
                orderNumber: res.order_number,
                orderDescription: 'Order description ' + res.order_number,
                paymentMethod: data.payment_method,
                locale: locale,
                sourceType: ""
            };
            const paymentLink =viewSrc==='vj'? await CheckoutService.getlinkPayment_SKYJOY(paymentParams): await CheckoutService.getlinkPayment(paymentParams);
            if (!paymentLink.redirectUrl) {
                throw new Error('Liên kết thanh toán không tìm thấy');
            }
            router.push(paymentLink.redirectUrl);

        } catch (error) {
            showModalMess({
                label: t('titleMessage'),
                type: 'error',
                message: error.message,
                onClose: () => {
                    closeModal();
                }
            });
        } finally {
            close();
        }
    };
    const handleBack = () => {
        if (viewSrc === "vj") router.push('/travel-esim?type=national&src=vj')
        router.back()
    }

    if (!sims || sims.length === 0) {
        return (
            <div className="bg-[#F5F5F5] font-koho">
                {viewSrc==="vj"?<HeaderCart/>: <Header />}
                <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            <h1 className="text-lg font-semibold text-[#333]">{t('noSims')}</h1>

                            <div className="flex flex-col items-center gap-5 py-20 px-40 w-full bg-[#F5F5F5]">
                                <div className="relative w-[100px] h-[100px]">
                                    <Image
                                        src="/images/my-esim/empty-esim.png"
                                        alt="Empty eSIM"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-3 w-[361px]">
                                    <h2 className="text-lg font-semibold text-[#333333] text-center">
                                        {t('noSimsTitle')}
                                    </h2>

                                    <p className="text-sm text-[#5C5C5C] text-center">
                                        {t('noSimsDescription')}
                                    </p>

                                    <button
                                        onClick={() => router.push('/sim-data')}
                                        className="w-full py-4 px-6 bg-[#E69818] text-white font-semibold text-lg rounded-lg"
                                    >
                                        {t('buyButton')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }

    return (
        <FormProvider {...method}  >
            <div className="flex flex-col min-h-screen">
                {viewSrc==="vj"?<HeaderCart/>: <Header />}
                <main className="flex-1 flex flex-col items-center w-full bg-[#F5F5F5]">
                    {/* Progress Steps */}
                    <Step isCheckOut={true}/>

                    {/* Page Content */}
                    <div className="w-full max-w-[1136px] px-4 md:px-0 mb-[80px]">
                        {/* Page Title */}
                        <div className="mb-[20px]">
                            <p onClick={handleBack} className="w-fit flex items-center text-sm text-[#333] hover:text-[#ED1B2F] font-medium cursor-pointer mb-2">
                                <ArrowLeftIcon />
                                <span className="ml-2">{t('back')}</span>
                            </p>
                            <h1 className="font-inter font-semibold text-[32px] leading-[1.2em] text-[#333]">{t('title')}</h1>
                        </div>


                        <div className="flex flex-col lg:flex-row gap-3 sm:gap-[80px]">
                            {/* Left Column - Form Sections */}
                            <div className="flex-1">
                                {/* Section: Contact Information */}

                                <InfoClient/>
                                {/* Section: Shipping Address */}

                                <ShippingAddress fields={['city_id', 'district_id', 'ward_id', 'delivery_address']}
                                                 isHidden={isFullEsim}/>
                                {/* Section: Payment Method */}
                                <PaymentMethod/>
                                {/* Terms and Submit */}
                                <div className=" hidden sm:block bg-white rounded-[12px] p-[24px]">
                                    <div className='mb-[24px]'>
                                        {/* Nếu có cả sim vật lý và eSIM */}
                                        {hasPhysicalSim && hasEsim && (
                                            <>
                                                {renderTermsCheckbox(
                                                    'agreeTermsPhysicalDesktop',
                                                    agreeTermsPhysical,
                                                    () => method.setValue('agreeTermsPhysical', !agreeTermsPhysical),
                                                    renderPhysicalTermsText()
                                                )}
                                                {renderTermsCheckbox(
                                                    'agreeTermsEsimDesktop',
                                                    agreeTermsEsim,
                                                    () => method.setValue('agreeTermsEsim', !agreeTermsEsim),
                                                    <>
                                                        {renderTermsText()}
                                                    </>
                                                )}
                                            </>
                                        )}

                                        {/* Nếu chỉ có eSIM */}
                                        {isFullEsim && (
                                            <>
                                                {renderTermsCheckbox(
                                                    'agreeTermsDesktop',
                                                    agreeTerms,
                                                    () => method.setValue('agreeTerms', !agreeTerms),
                                                    renderTermsText()
                                                )}
                                            </>
                                        )}

                                        {/* Nếu chỉ có sim vật lý */}
                                        {hasPhysicalSim && !hasEsim && (
                                            <>
                                                {renderTermsCheckbox(
                                                    'agreeTermsPhysicalOnlyDesktop',
                                                    agreeTermsPhysical,
                                                    () => method.setValue('agreeTermsPhysical', !agreeTermsPhysical),
                                                    renderPhysicalTermsText()
                                                )}
                                            </>
                                        )}

                                        <span className="text-xs text-[#E60A32]">
                      {method.formState.errors.agreeTerms?.message ||
                          method.formState.errors.agreeTermsPhysical?.message ||
                          method.formState.errors.agreeTermsEsim?.message}
                    </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full bg-[#E69818] text-white font-inter font-semibold text-[16px] rounded-[8px] py-[12px] hover:bg-[#E69818] transition-colors"
                                        onClick={method.handleSubmit(handleSubmit)}
                                    >
                                        {t('completeOrder')}
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="w-full lg:w-[440px]">
                                <div className="bg-white rounded-[12px] p-[24px] sticky top-[20px]">
                                    <SummaryCheckout/>
                                    <ListProduct/>

                                </div>
                            </div>
                            <div className=" block sm:hidden bg-white rounded-[12px] p-[24px] mt-3">
                                <div className='mb-[24px]'>
                                    {/* Nếu có cả sim vật lý và eSIM */}
                                    {hasPhysicalSim && hasEsim && (
                                        <>
                                            {renderTermsCheckbox(
                                                'agreeTermsPhysicalMobile',
                                                agreeTermsPhysical,
                                                () => method.setValue('agreeTermsPhysical', !agreeTermsPhysical),
                                                renderPhysicalTermsText()
                                            )}
                                            {renderTermsCheckbox(
                                                'agreeTermsEsimMobile',
                                                agreeTermsEsim,
                                                () => method.setValue('agreeTermsEsim', !agreeTermsEsim),
                                                <>
                                                    {renderTermsText()}
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* Nếu chỉ có eSIM */}
                                    {isFullEsim && (
                                        <>
                                            {renderTermsCheckbox(
                                                'agreeTermsMobile',
                                                agreeTerms,
                                                () => method.setValue('agreeTerms', !agreeTerms),
                                                renderTermsText()
                                            )}
                                        </>
                                    )}

                                    {/* Nếu chỉ có sim vật lý */}
                                    {hasPhysicalSim && !hasEsim && (
                                        <>
                                            {renderTermsCheckbox(
                                                'agreeTermsPhysicalOnlyMobile',
                                                agreeTermsPhysical,
                                                () => method.setValue('agreeTermsPhysical', !agreeTermsPhysical),
                                                renderPhysicalTermsText()
                                            )}
                                        </>
                                    )}

                                    <span className="text-xs text-[#E60A32]">
                    {method.formState.errors.agreeTerms?.message ||
                        method.formState.errors.agreeTermsPhysical?.message ||
                        method.formState.errors.agreeTermsEsim?.message}
                  </span>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-[#E69818] text-white font-inter font-semibold text-[16px] rounded-[8px] py-[12px] hover:bg-[#E69818] transition-colors"
                                    onClick={method.handleSubmit(handleSubmit)}
                                >
                                    {t('completeOrder')}
                                </button>
                            </div>
                        </div>

                    </div>
                </main>
                {viewSrc==="vj"?null:  <Footer/>}


                {/* Popup Điều khoản và Điều kiện */}
                {showTermsPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[12px] w-[90vw] h-[90vh] overflow-hidden flex flex-col">

                            {/* Content */}
                            <div className="flex-1 overflow-hidden">
                                <iframe
                                    src={`/${locale}/terms-and-conditions?src=app`}
                                    className="w-full h-full border-0"
                                    title="Điều khoản và Điều kiện"
                                />
                            </div>

                            {/* Footer */}
                            <div className="border-t p-6">
                                <button
                                    onClick={() => setShowTermsPopup(false)}
                                    className="w-full bg-[#E69818] text-white font-semibold text-[16px] rounded-[8px] py-3 hover:bg-[#D18500] transition-colors"
                                >
                                    {tCommon('close')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FormProvider>
    );
}
