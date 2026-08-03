"use client";

import Footer from '@/app/components/Footer';
import HeaderVJ from '@/app/components/HeaderVJ';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function TravelSimSuccessPage() {
    const locale = useLocale();
    const t = useTranslations( 'travelSim.confirm' );
    const router = useRouter();

    const searchParams = useSearchParams();
    const orderId = searchParams.get( 'orderId' );



    const handleGoHome = () => {
        router.push( `/travelsim/${ orderId }?type=skyboss` );
    };


    return (
        <>
            <HeaderVJ />
            <div className="min-h-screen bg-gray-50 flex md:items-center justify-center px-4 py-8 relative overflow-hidden">
                {/* Main Content Container */ }
                <div className="relative  max-w-7xl w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        {/* Left Side - Success Message */ }
                        <div className="text-center lg:text-left space-y-6">
                            {/* Success Title */ }
                            <h1 className=" text-lg md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#ED1B2F] uppercase !leading-[1.5]">

                                { t( 'title' ) }
                            </h1>
                            {/* Success Description */ }
                            <p className=" md:text-lg text-gray-600">
                                { t( 'description' ) }
                            </p>

                            {/* Action Button */ }
                            <div className="hidden md:flex flex-wrap justify-center  lg:justify-start gap-8">
                                <button
                                    onClick={ () => router.back() }
                                    className=" flex-1 basis-[300px] border md:max-w-fit  border-primary hover:bg-primary text-primary rounded-md font-bold py-3 px-8  transition-colors duration-200 text-base"
                                >
                                    { t( 'backButton' ) }
                                </button>
                                <button
                                    onClick={ handleGoHome }
                                    className="bg-primary flex-1 basis-[300px] md:max-w-fit hover:bg-primary rounded-md text-white font-bold py-3 px-8  transition-colors duration-200 text-base"
                                >
                                    { t( 'confirmButton' ) }
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Decorative Elements */ }
                        <div className="relative h-96 lg:h-[500px] xl:h-[600px]">
                            {/* Main background image */ }
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

                        <div className=" fixed z-20 bottom-0 w-full left-0 p-4 bg-white flex md:hidden flex-wrap justify-center  lg:justify-start gap-2">
                            <button
                                onClick={ () => router.back() }
                                className=" flex-1 basis-[300px] border md:max-w-fit border-primary hover:bg-primary text-primary rounded-md font-bold py-3 px-8  transition-colors duration-200 text-base"
                            >
                                { t( 'backButton' ) }
                            </button>
                            <button
                                onClick={ handleGoHome }
                                className="bg-primary flex-1 basis-[300px] md:max-w-fit hover:bg-primary text-white rounded-md font-bold py-3 px-8  transition-colors duration-200 text-base"
                            >
                                { t( 'confirmButton' ) }
                            </button>
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
