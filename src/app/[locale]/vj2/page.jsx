"use client";

import Footer from '@/app/components/Footer';
import HeaderVJ from '@/app/components/HeaderVJ';
import {showModalMess} from '@/app/components/modals/modalMess';
import TravelSimService from '@/app/services/travelsim';
import {useLoad} from '@/app/utils/load';
import {yupResolver} from '@hookform/resolvers/yup';
import {useLocale, useTranslations} from 'next-intl';
import {useSearchParams} from 'next/navigation';
import {FormProvider, useForm} from 'react-hook-form';
import {object, string} from 'yup';
import {useRouter} from '../../../i18n/navigation';
import InputField from '../../components/form/inputField';
import {useEffect, useRef, useState} from 'react';
import TravelSimPackagePage from '@/app/components/vj2/TravelSimPackagePage';
import SimPopup from "@/app/components/vj2/SimPopup";
import TravelSimMultiPackagePage from "@/app/components/vj2/TravelSimMultiPackagePage";
import Script from 'next/script';
import Head from "next/head";


export default function Vj2Page() {
    const locale = useLocale();
    const t = useTranslations('travelSim');
    const tErrors = useTranslations('travelSim.errors');
    const travelSimSchema = object().shape({
        bookingCode: string().required("Vui lòng nhập mã đặt chỗ"),
        email: string().required("Vui lòng nhập email").email("Vui lòng nhập email")
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get('type');
    const method = useForm({
        resolver: yupResolver(travelSimSchema),
    });
    const load = useLoad();

    // Page states
    const [currentView, setCurrentView] = useState('multi-package'); // 'form', 'sim-package', 'multi-package'
    const [validationResult, setValidationResult] = useState(null);
    const [bookingCodeValue, setBookingCodeValue] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [typeCode, setTypeCode] = useState(0);
    const allHaveAdditionalPackage = useRef(false);

    // OTP Modal states
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const [resendTimer, setResendTimer] = useState(0);
    const otpInputRefs = useRef([]);
    const [showSimPopup, setShowSimPopup] = useState(false);

    // Timer effect for resend OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);

            // Auto focus next input
            if (value && index < 3) {
                otpInputRefs.current[index + 1]?.focus();
            }
        }
    };

    // Handle OTP input key down
    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        try {
            load.open();
            await TravelSimService.sendOtpEmail(userEmail);
            setResendTimer(48);
            setOtpValues(['', '', '', '']);
        } catch (error) {
            showModalMess({
                label: 'Lỗi',
                message: error.message,
                type: 'error',
            });
        } finally {
            load.close();
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        const otpCode = otpValues.join('');
        if (otpCode.length !== 4) {
            showModalMess({
                label: 'Lỗi',
                message: 'Vui lòng nhập đủ 4 số mã OTP',
                type: 'error',
            });
            return;
        }

        try {
            load.open();
            const verifyResult = await TravelSimService.verifyOtpEmail(userEmail, otpCode);
            setShowOtpModal(false);

            // Handle OTP verification result based on code
            if (verifyResult.success) {
                setCurrentView('multi-package');
            } else {
                showModalMess({
                    label: 'Lỗi',
                    message: verifyResult.message || 'Mã xác thực không hợp lệ',
                    type: 'error',
                });
            }
        } catch (error) {
            showModalMess({
                label: 'Lỗi',
                message: error.message,
                type: 'error',
            });
        } finally {
            load.close();
        }
    };

    // Handle form submission - validate email and PNR first
    const onSubmit = async (data) => {
        try {
            load.open();
            setUserEmail(data.email);
            setBookingCodeValue(data.bookingCode);

            // First call validate-email-pnr API
            const validationResult = await TravelSimService.validateEmailPnr(data.email, data.bookingCode);
            if (validationResult.code === 400) {
                showModalMess({
                    label: tErrors('title'),
                    message: validationResult.message,
                    type: 'error',
                });
                return
            }
            if (validationResult.result?.length > 0) {
                setValidationResult(validationResult.result);
            }


            if (!validationResult || validationResult.result?.length === 0) {
                // Mảng rỗng -> gọi API gửi OTP và xác thực
                await TravelSimService.sendOtpEmail(data.email);
                setTypeCode(validationResult.code)
                setShowOtpModal(true);
                setResendTimer(48);
                setOtpValues(['', '', '', '']);
            } else {
                // Mảng khác rỗng -> xử lý theo logic
                allHaveAdditionalPackage.current = validationResult?.result?.every(item => item.additional_package != null);
                // setShowSimPopup(true);

                if (allHaveAdditionalPackage.current) {
                    // code = 103 -> tất cả bản ghi có additional_package != null -> 3.3.1
                    setShowSimPopup(true);
                    setTypeCode(103)
                    // setCurrentView('sim-item');
                } else {
                    if (validationResult?.result?.every(item => item.additional_package == null)) {
                        setCurrentView('sim-package');
                    } else {
                        setShowSimPopup(true);
                    }
                    // code = 102 -> còn lại -> 3.3.2 show các số có additional_package
                    // setCurrentView('sim-package');
                }
            }

        } catch (error) {
            showModalMess({
                label: tErrors('title'),
                message: error.message,
                type: 'error',
            });
        } finally {
            load.close();
        }
    };
    const handleBuyData = () => {
        if (allHaveAdditionalPackage.current) {
            setCurrentView('multi-package');
        } else {
            setCurrentView('sim-package');
        }

        setShowSimPopup(false);
    };
    const handleCloseSimPopup = () => {
        setShowSimPopup(false);
    };

    useEffect(() => {
        console.log(showSimPopup, validationResult)
    }, [showSimPopup, validationResult])

    // Render based on current view
    if (currentView === 'multi-package') {
        return (
            <>
                <HeaderVJ/>
                <TravelSimMultiPackagePage code={bookingCodeValue} email={userEmail} validationData={validationResult}
                                           typeCode={typeCode}/>
                <Footer/>
            </>
        );
    }

    if (currentView === 'sim-package') {
        return (
            <>
                <HeaderVJ/>
                <TravelSimPackagePage code={bookingCodeValue} email={userEmail} validationData={validationResult}/>
                <Footer/>
            </>
        );
    }

    // Default form view
    return (
        <>
            {process.env.NEXT_PUBLIC_API_BASE_URL?.includes("skyfi.pro") && (
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T54TSR6P');`
                    }} />
                </Head>
            )}
            <HeaderVJ/>
            <div className=" bg-gray-100 flex items-center justify-center px-4 py-10 md:py-20 ">
                <div
                    className="min-h-screen md:min-h-full md:bg-white rounded-2xl md:shadow-lg md:p-10 w-full max-w-[900px]">


                    {/* Title Section */}
                    <div className="text-center mb-5">
                        <h1 className="text-[28px] font-semibold text-gray-900 leading-[1.2] mb-1">
                            {t('titleFreemium')}
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-center text-gray-900  text-sm md:text-base leading-6 mb-5">
                        {t('descriptionFreemium')}
                    </p>
                    <div
                        className=" mb-6 md:mb-8 text-sm md:text-xl bg-[#FDCD084D] p-2 flex items-center gap-2 rounded-lg">
                        <img src="/images/travelsim/infoIcon.png" alt="" className={"w-[20px] h-[20px]"}/>
                        <div>
                            <p className="text-[#3C3C3C] font-koho">
                                {t('warning')}
                            </p>
                        </div>
                    </div>
                    <FormProvider {...method}>
                        <form className="space-y-6" onSubmit={method.handleSubmit(onSubmit)}>
                            {/* Input Fields */}
                            <div className="w-full space-y-4">
                                {/* Booking Code Field */}
                                <div className="relative">
                                    <div className="border border-gray-300 rounded-xl px-4 py-2 bg-white">
                                        <div className="flex flex-col">
                                            <InputField
                                                label={t('bookingCodeLabel')}
                                                type="text"
                                                name="bookingCode"
                                                placeholder={t('bookingCodePlaceholder')}
                                                required
                                                control={method.control}
                                                classInput="border-none !p-0 !rounded-none "
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <div className="border border-gray-300 rounded-xl px-4 py-2 bg-white">
                                        <div className="flex flex-col">
                                            <InputField
                                                label={t('emailLabel')}
                                                type="email"
                                                name="email"
                                                placeholder={t('emailPlaceholder')}
                                                required
                                                control={method.control}
                                                classInput="border-none !p-0 !rounded-none "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"

                                className="w-full bg-primary hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base leading-6"
                            >
                                {t("continueButton")}
                            </button>
                        </form>
                    </FormProvider>

                </div>
            </div>
            {showSimPopup && validationResult && (
                <SimPopup
                    validationResult={validationResult}
                    onClose={handleCloseSimPopup}
                    onBuyData={handleBuyData}
                />
            )}
            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        {/* Close button */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setShowOtpModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-center mb-6">
                            {t('notification')}
                        </h2>

                        {/* Message */}
                        <p className="text-center text-gray-700 mb-6">
                            {t('otpSend')}
                        </p>

                        {/* OTP Input */}
                        <div className="flex justify-center gap-4 mb-4">
                            {otpValues.map((value, index) => (
                                <input
                                    key={index}
                                    ref={el => otpInputRefs.current[index] = el}
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-primary focus:outline-none"
                                    maxLength="1"
                                />
                            ))}
                        </div>

                        {/* OTP Label */}
                        <p className="text-center text-gray-600 text-sm mb-4">
                            {t("otpLabel")}
                        </p>

                        {/* Resend Code */}
                        <div className="text-center mb-6">
                            {resendTimer > 0 ? (
                                <span className="text-gray-500">
                                    {t('resendOtp')} ({resendTimer}s)
                                </span>
                            ) : (
                                <button
                                    onClick={handleResendOtp}
                                    className="text-primary hover:text-orange-600 underline"
                                >
                                    {t('resendOtp')}
                                </button>
                            )}
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            {t("continueButton")}
                        </button>
                    </div>
                </div>
            )}
            {process.env.NEXT_PUBLIC_API_BASE_URL?.includes("skyfi.pro") && (
                <>
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-HR88CB3F4Y"
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics-skyboss" strategy="afterInteractive">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-HR88CB3F4Y');
                      `}
                    </Script>
                    <noscript>
                        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T54TSR6P"
                                height="0" width="0" style="display:none;visibility:hidden"></iframe>
                    </noscript>
                </>
            )}

            <Footer/>
        </>
    );
}
