"use client";

import Footer from '@/app/components/Footer';
import HeaderVJ from '@/app/components/HeaderVJ';
import CheckoutService from '@/app/services/checkoutService';
import {useLoad} from '@/app/utils/load';
import {getLocal} from '@/app/utils/saveLocal';
import {useRouter} from '@/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function Vj2ResultPage() {
    const locale = useLocale();
    const tSuccess = useTranslations('travelSim.success');
    const tErrors = useTranslations('travelSim.errors');
    const tButtons = useTranslations('travelSim.buttons');
    const router = useRouter();

    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const pathname = usePathname();

    const [dataOrder, setDataOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const load = useLoad();
    const language = getLocal('language') || locale;

    const switchLanguage = (newLocale) => {
        const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
        const newPath = `/${newLocale}${pathnameWithoutLocale || ''}`;
        const searchString = searchParams.toString();
        const finalUrl = searchString ? `${newPath}?${searchString}` : newPath;
        router.push(finalUrl);
    };

    useEffect(() => {
        if (language === locale) return;
        switchLanguage(language);
    }, []);

    const getOrderDetails = async (orderId) => {
        try {
            load.open();
            setIsLoading(true);
            const orderDetails = await CheckoutService.getOrder(orderId);
            setDataOrder(orderDetails.order);
        } catch (error) {
            console.error('Error fetching order details:', error);
            setDataOrder({status: 'ERROR'});
        } finally {
            load.close();
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            getOrderDetails(orderId);
        } else {
            setIsLoading(false);
        }
    }, [orderId]);

    const handleBackToHome = () => {
        router.push("/vj2");
    };

    // Show loading state
    if (isLoading || !dataOrder || Object.keys(dataOrder).length === 0) {
        return (
            <>
                <HeaderVJ/>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-400"></div>
                </div>
                <Footer/>
            </>
        );
    }

    // Determine if order is successful
    const isSuccess = dataOrder.status && dataOrder.status !== 'CREATED' && dataOrder.status !== 'ERROR';

    return (
        <>
            <HeaderVJ/>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4">
                <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full mx-4 p-8">
                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Status Icon */}
                        <div className="relative">
                            {isSuccess ? (
                                <img src="/images/travelsim/Success.png" alt="success" className="w-20 h-20"/>
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className={`text-2xl font-bold font-quicksand ${
                            isSuccess ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {isSuccess ? tSuccess('receivedVietnamEsim') : tErrors("generalError")}
                        </h1>

                        {/* Message */}
                        <div className="p-6 max-w-md">
                            <p className="text-gray-700 text-center leading-relaxed">
                                {isSuccess
                                    ? tSuccess('esimSentMessage')
                                    :tErrors("paymentOrderError")
                                }
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            {/* Back to Home Button */}
                            <button
                                onClick={handleBackToHome}
                                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
                            >
                                {tButtons('backToHome')}
                            </button>

                            {/* Try Again Button for failed orders */}
                            {/*{!isSuccess && (*/}
                            {/*    <button*/}
                            {/*        onClick={() => router.push('/vj2')}*/}
                            {/*        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"*/}
                            {/*    >*/}
                            {/*        Thử lại*/}
                            {/*    </button>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
