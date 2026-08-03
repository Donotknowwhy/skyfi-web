import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import { routing } from '../../i18n/routing';
import "../globals.css";
import { UserProvider } from '../stores/user';
import ModalProvider from "../utils/modal";
import PrivacyPolicyPopup from '../components/PrivacyPolicyPopup';
import { WarningProvider } from '../contexts/WarningContext';
import WarningPopup from '../components/WarningPopup';

import { Abyssinica_SIL, Geist, Geist_Mono, Indie_Flower, Instrument_Serif, Inter, KoHo } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { LoadProvider } from '../utils/load';

const inter = Inter( { subsets: [ 'latin' ], variable: '--font-inter' } );
const koho = KoHo( { subsets: [ 'latin' ], weight: [ '300', '400', '500', '600', '700' ], variable: '--font-koho' } );
const instrumentSerif = Instrument_Serif( { subsets: [ 'latin' ], weight: [ '400' ], style: [ 'normal', 'italic' ], variable: '--font-instrument-serif' } );
const indieFlower = Indie_Flower( { subsets: [ 'latin' ], weight: '400', variable: '--font-indie-flower' } );
const abyssinicaSIL = Abyssinica_SIL( { subsets: [ 'latin' ], weight: '400', variable: '--font-abyssinica' } );


const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
} );

const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
} );

export const metadata = {
  title: "SkyFi",
  description: "SkyFi là nhà cung cấp dịch vụ eSIM (4G, 5G) tốc độ cao toàn cầu, kết nối với các tiện ích: hàng không, ăn uống, vui chơi, giải trí, mua sắm...",
};

// Define the locales that are supported
export function generateStaticParams() {
  return locales.map( locale => ( { locale } ) );
}

async function getMessages( locale ) {
  try {
    return ( await import( `../../messages/${ locale }/index.json` ) ).default;
  } catch ( error ) {
    console.error( 'Error loading messages:', error );
    return null;
  }
}

export default async function LocaleLayout( { children, params } ) {
  // Await và validate params

  const { locale } = await params;
  if ( !hasLocale( routing.locales, locale ) ) {
    notFound();
  }
  const messages = await getMessages( locale );
  if ( !messages ) {
    notFound();
  }

  return (
    <html lang={ locale } suppressHydrationWarning={ true }>

      <body
        suppressHydrationWarning={ true }
        className={ `${ geistSans.variable } ${ geistMono.variable } ${ inter.variable } ${ koho.variable } ${ instrumentSerif.variable } ${ indieFlower.variable } ${ abyssinicaSIL.variable } antialiased` }
      >
        <NextIntlClientProvider locale={ locale } messages={ messages }>
          <LoadProvider>
            <UserProvider>
              <WarningProvider>
                { children }
                <WarningPopup />
                <ModalProvider />
                <PrivacyPolicyPopup />
              </WarningProvider>
            </UserProvider>
          </LoadProvider>
          <ToastContainer />
        </NextIntlClientProvider>
        <div id="__loading" />
      </body>
    </html>
  );
}
