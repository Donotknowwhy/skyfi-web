"use client";

import Footer from '@/app/components/Footer';
import HeaderVJ from '@/app/components/HeaderVJ';
import CheckoutService from '@/app/services/checkoutService';
import { useLoad } from '@/app/utils/load';
import { getLocal } from '@/app/utils/saveLocal';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TravelSimSuccessPage() {
    const locale = useLocale();
    const t = useTranslations('travelSim.travelSimSuccess');
    const router = useRouter();

    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const type = getLocal('type') || 'skyboss';
    const pathname = usePathname();

    const [dataOrder, setDataOrder] = useState({});
    const load = useLoad();
    const language = getLocal('language') || locale;

    const switchLanguage = (newLocale) => {
        // Tạo URL mới thay thế locale và giữ lại search params
        const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
        const newPath = `/${newLocale}${pathnameWithoutLocale || ''}`;

        // Giữ lại các search params hiện tại
        const searchString = searchParams.toString();
        const finalUrl = searchString ? `${newPath}?${searchString}` : newPath;
        saveLocal('language', newLocale);
        router.push(finalUrl);
        setIsOpen(false);
    };
    useEffect(() => {
        if(language===locale) return;
        switchLanguage(language);
    }, []); // Empty useEffect to ensure component mounts correctly



    const getOrderDetails = async (orderId) => {
        try {
            load.open();
            const orderDetails = await CheckoutService.getOrder(orderId);
            setDataOrder(orderDetails.order);

        } catch (error) {
            console.error(error);

        } finally {
            load.close();
        }
    };
    useEffect(() => {
        getOrderDetails(orderId);
    }, [orderId]);



    const handleGoHome = () => {
        router.push('/travelsim?type=' + type);
    };

    if (!dataOrder || Object.keys(dataOrder).length === 0) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8" />
    );

    return (
        <>
            <HeaderVJ />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
                {/* Main Content Container */}
                <div className="relative z-10 max-w-7xl w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        {/* Left Side - Success Message */}
                        <div className="text-center lg:text-left space-y-6">
                            {/* Success Title */}
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#ED1B2F] uppercase leading-tight">
                                {dataOrder.status !== 'CREATED' ? t('titleFreemiumSuccess') : t('titleFreemiumFail')}
                            </h1>
                            {/* Success Description */}
                            <p className="text-lg text-gray-600">
                                {dataOrder.status !== 'CREATED' ? t('descriptionFreemiumSuccess') : t('descriptionFreemiumFail')}
                            </p>

                            {/* Action Button */}
                            <div className="flex justify-center lg:justify-start">
                                <button
                                    onClick={handleGoHome}
                                    className="bg-[#ED1B2F] hover:bg-[#d41729] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-base"
                                >
                                    {t('backToHome')}
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Decorative Elements */}
                        <div className="relative h-96 lg:h-[500px] xl:h-[600px]">
                            {/* Main background image */}
                            <div className=" inset-0">
                                <Image
                                    src="/figma-section-images/imgsuccess.png"
                                    alt="Success Background"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md:block'>

                <Footer />
            </div>

        </>
    );
}
