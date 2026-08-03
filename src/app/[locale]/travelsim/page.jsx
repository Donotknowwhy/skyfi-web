"use client";

import Footer from '@/app/components/Footer';
import HeaderVJ from '@/app/components/HeaderVJ';
import { showModalMess } from '@/app/components/modals/modalMess';
import TravelSimService from '@/app/services/travelsim';
import { useLoad } from '@/app/utils/load';
import { saveLocal } from '@/app/utils/saveLocal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useRouter } from '../../../i18n/navigation';
import InputField from '../../components/form/inputField';


export default function TravelSimPage() {
    const locale = useLocale();
    const t = useTranslations( 'travelSim' );
    const tErrors = useTranslations( 'travelSim.errors' );
    const travelSimSchema = object().shape( {
        bookingCode: string().required( t( 'errors.required' ) ).min( 3, t( 'errors.min', { min: 3 } ) )
    } );
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get( 'type' );
    const method = useForm( {
        resolver: yupResolver( travelSimSchema ),
    } );
    const load = useLoad();


    const onSubmit = ( data ) => {
        saveLocal( 'type', type || 'skyboss' );
        if ( type == 'freemium' ) {
            const link = `/travelsim/${ data.bookingCode }?type=${ type }`;
            return router.push( link );
        }
        checkRecivedSkyboss( data.bookingCode );
        // showModalSimNotActive( {
        //     simData: [
        //         {
        //             id: '1',
        //             phoneNumber: '0707 123 456',
        //             packageInfo: 'Gói SF90T/5 GB - 10 ngày'
        //         },
        //         {
        //             id: '2',
        //             phoneNumber: '0708 234 567',
        //             packageInfo: 'Gói SF65T/3 GB - 7 ngày'
        //         },
        //         {
        //             id: '3',
        //             phoneNumber: '0709 345 678',
        //             packageInfo: 'Gói SF30T/2 GB - 5 ngày'
        //         }
        //     ],
        //     onClose: () => console.log( 'Modal closed' )
        // } );


    };

    const checkRecivedSkyboss = async ( code ) => {
        try {
            load.open();
            const msisdnData = await TravelSimService.getMsisdnByCode( code, { source: type, locale } );
            let link = '';
            if ( msisdnData && msisdnData.received_sim == 1 ) {
                link = `/travelsim/confirm?orderId=${ code }`;
            }
            link = link || `/travelsim/${ code }?type=skyboss`;
            router.push( link );
        } catch ( error ) {
            showModalMess( {
                label: tErrors( 'title' ),
                message: error.message,
                type: 'error',
            } );
        } finally {
            load.close();
        }
    };

    if ( !type ) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-[900px]">
                    <h1 className="text-center text-2xl font-semibold text-gray-900 mb-5">
                        { t( 'errorTitle' ) }
                    </h1>
                    <p className="text-center text-gray-700 mb-5">
                        { t( 'errorMessage' ) }
                    </p>
                </div>
            </div>
        );
    }


    return (
        <>
            <HeaderVJ />
            <div className=" bg-gray-100 flex items-center justify-center px-4 py-10 md:py-20 ">
                <div className="min-h-screen md:min-h-full md:bg-white rounded-2xl md:shadow-lg md:p-10 w-full max-w-[900px]">


                    {/* Title Section */ }
                    <div className="text-center mb-5">
                        <h1 className="text-[28px] font-semibold text-gray-900 leading-[1.2] mb-1">
                            { type === 'skyboss' ? t( 'titleSkyboss' ) : t( 'titleFreemium' ) }
                        </h1>
                    </div>

                    {/* Description */ }
                    <p className="text-center text-gray-900  text-sm md:text-base leading-6 mb-5">
                        { type === 'skyboss' ? t( 'descriptionSkyboss' ) : t( 'descriptionFreemium' ) }
                    </p>

                    <FormProvider { ...method }>
                        <form className="space-y-6" onSubmit={ method.handleSubmit( onSubmit ) }>
                            {/* Input Field */ }
                            <div className="w-full">
                                <div className="relative">
                                    <div className="border border-gray-300 rounded-xl px-4 py-2 bg-white">
                                        <div className="flex flex-col">
                                            {/* Label */ }
                                            <InputField
                                                label={ t( 'bookingCodeLabel' ) }
                                                type="text"
                                                name="bookingCode"
                                                placeholder={ t( 'bookingCodePlaceholder' ) }
                                                required
                                                control={ method.control }
                                                classInput="border-none !p-0 !rounded-none "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */ }
                            <button
                                type="submit"

                                className="w-full bg-primary hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base leading-6"
                            >
                                { t( 'continueButton' ) }
                            </button>
                        </form>
                    </FormProvider>

                </div>
            </div>
            <div className='hidden md:block'>

                <Footer />
            </div>
            { type == 'freemium' ? (
                <>
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-JWM8CQNVB2"
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics-freemium" strategy="afterInteractive">
                        { `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JWM8CQNVB2');
          `}
                    </Script>
                </>
            ) : (
                <>
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-F9HQDJ3267"
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics-skyboss" strategy="afterInteractive">
                        { `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F9HQDJ3267');
          `}
                    </Script>
                </>
            ) }
        </>
    );


}