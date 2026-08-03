"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Link } from '../../i18n/navigation';
import homeService from '../services/homeService';
import {useRouter} from "next/navigation";

export default function Footer() {
  const locale = useLocale();
  const router=useRouter()
  const t = useTranslations( 'footer' );

  const [menus, setMenus] = useState([]);


  const getMenuFooter = async () => {
    try {
      const res = await homeService.getMenuFooter(locale);
      setMenus(res.filter(menu => menu.children && menu.children.length > 0));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( () => {
    getMenuFooter();
  }, [locale]);


  return (
    <footer className="relative w-full bg-[#ED1B2F] font-inter text-white overflow-hidden rounded-t-3xl py-6 md:py-10  ">

      <div className='container'>


      <div className="absolute inset-0 z-0 flex items-end justify-end  ">
        <Image
          src="/assets/iconfooter.png"
          alt="Footer Background"
          width={ 400 }
          height={ 300 }
          className='w-auto object-contain h-[150px]   md:h-[200px]   xl:h-[300px]'
        />
      </div>

      {/* Main footer content */ }
      <div className="relative z-10  ">
        {/* Footer links sections */ }
          <div className="flex  flex-wrap flex-col xl:flex-row  ">

            { menus.length > 0 ? (
              <div className='flex flex-wrap gap-6 flex-1 order-2 lg:order-1 sm:gap-8 lg:gap-10 xl:gap-12 py-6 lg:py-8 '>
              { menus.map( ( menu, index ) => (
                <div key={ index } className="flex flex-col flex-1 basis-52 gap-3 lg:gap-5">
                  <h3 className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4]">
                    { menu.display_title }
                  </h3>
                  <div className="flex flex-col gap-2">
                    { menu.children.map( ( link, linkIndex ) => (
                        <p
                            key={ linkIndex }
                            onClick={()=>router.push(`/${locale}/${link.url}`)}
                            className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200 cursor-pointer"
                        >
                          { link.display_title }
                        </p>
                    ) ) }
                  </div>
                </div>
              ) ) }
                    <div className="flex flex-col flex-1 gap-3 basis-52 lg:gap-5 sm:col-span-2 lg:col-span-1 xl:col-span-1">
                <h3 className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4]">
                  { t( 'contact.title' ) }
                </h3>
                <div className="flex flex-col gap-2">
                  {/* Phone */ }
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/assets/icons/phone-call-01.svg"
                        alt="Phone"
                        width={ 20 }
                        height={ 20 }
                        className="filter brightness-0 invert sm:w-6 sm:h-6"
                      />
                    </div>
                    <span className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5]">
                      { t( 'contact.phone' ) }
                    </span>
                  </div>

                  {/* Email */ }
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/assets/icons/mail-01.svg"
                        alt="Email"
                        width={ 20 }
                        height={ 20 }
                        className="filter brightness-0 invert sm:w-6 sm:h-6"
                      />
                    </div>
                    <span className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] break-all">
                      { t( 'contact.email' ) }
                    </span>
                  </div>
                </div>
              </div>
            </div> ) : (

            <div className='flex flex-wrap gap-6 flex-1 order-2 lg:order-1 sm:gap-8 lg:gap-10 xl:gap-12 py-6 lg:py-8 '>
              {/* Giới thiệu */ }
              <div className="flex flex-col flex-1 basis-52 gap-3 lg:gap-5">
                <h3 className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4]">
                  { t( 'about.title' ) }
                </h3>
                <div className="flex flex-col gap-2">
                  <Link
                    href={ `/` }
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'about.aboutSkyFi' ) }
                  </Link>
                </div>
              </div>

              {/* Điều khoản */ }
              <div className="flex flex-col flex-1 basis-52 gap-3 lg:gap-5">
                <h3 className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4]">
                  { t( 'terms.title' ) }
                </h3>
                <div className="flex flex-col gap-2">
                  <Link
                    href={ `/refund-policy` }
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'terms.refundPolicy' ) }
                  </Link>
                  <Link
                    href={ `/payment-policy` }
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'terms.paymentPolicy' ) }
                  </Link>
                  <Link
                    href={ `/terms-and-conditions` }
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'terms.generalTerms' ) }
                  </Link>
                  <Link
                    href='/cookies-policy'
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'terms.privacyPolicy' ) }
                  </Link>
                  <Link
                    href='/personal-data-protection-policy'
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'terms.personalDataProtectionPolicy' ) }
                  </Link>
                  <Link
                    href='/sample-contract'
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'terms.sampleContract' ) }
                  </Link>
                  <Link
                    href='/service-quality-management'
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'terms.serviceQualityManagement' ) }
                  </Link>
                </div>
              </div>

              {/* Thông tin khác */ }
              <div className="flex flex-col  flex-1 basis-52 gap-3 lg:gap-5">
                <h3 className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4]">
                  { t( 'otherInfo.title' ) }
                </h3>
                <div className="flex flex-col gap-2">
                  <Link
                    href={ `/support-center` }
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'otherInfo.supportCenter' ) }
                  </Link>
                  {/*<a*/}
                  {/*  href="#"*/}
                  {/*  className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"*/}
                  {/*>*/}
                  {/*  { t( 'otherInfo.news' ) }*/}
                  {/*</a>*/}
                  <Link
                    href={ `/contact` }
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'otherInfo.contactUs' ) }
                  </Link>
                  <Link
                    href='/esimGuide'
                    className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200"
                  >
                    { t( 'otherInfo.esimGuide' ) }
                  </Link>
                </div>
              </div>

              {/* Liên hệ */ }
              <div className="flex flex-col flex-1 gap-3 basis-52 lg:gap-5 sm:col-span-2 lg:col-span-1 xl:col-span-1">
                <h3 className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4]">
                  { t( 'contact.title' ) }
                </h3>
                <div className="flex flex-col gap-2">
                  {/* Phone */ }
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/assets/icons/phone-call-01.svg"
                        alt="Phone"
                        width={ 20 }
                        height={ 20 }
                        className="filter brightness-0 invert sm:w-6 sm:h-6"
                      />
                    </div>
                    <span className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5]">
                      { t( 'contact.phone' ) }
                    </span>
                  </div>

                  {/* Email */ }
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/assets/icons/mail-01.svg"
                        alt="Email"
                        width={ 20 }
                        height={ 20 }
                        className="filter brightness-0 invert sm:w-6 sm:h-6"
                      />
                    </div>
                    <span className="text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] break-all">
                      { t( 'contact.email' ) }
                    </span>
                  </div>
                </div>
              </div>
                </div>

            )}

          {/* Social Media Icons */ }
          <div className={" order-1 lg:order-2"}>
            <div className="flex  py-6   gap-4 justify-center w-full md:justify-start md:w-auto">
              <a
                  href="https://zalo.me/4027302975952039719"
                  aria-label="Zalo"
                  className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] flex items-center justify-center   transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <Image src="/assets/zalo.png" alt={"zalo"} width={ 40 }
                       height={ 40 }/>

              </a>
              <a
                  href="https://www.facebook.com/skyfi.vn"
                  aria-label="Facebook"
                  className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] flex items-center justify-center  transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-inside-1_1273_70617" fill="white">
                    <path d="M0 0.00488281H50V50.0049H0V0.00488281Z" />
                  </mask>
                  <path d="M50 50.0049V48.0049H0V50.0049V52.0049H50V50.0049Z" fill="white" mask="url(#path-1-inside-1_1273_70617)" />
                  <g clipPath="url(#clip0_1273_70617)">
                    <path d="M41.0001 25.1029C41.0001 16.2109 33.8361 9.00293 25.0001 9.00293C16.1601 9.00493 8.99609 16.2109 8.99609 25.1049C8.99609 33.1389 14.8481 39.7989 22.4961 41.0069V29.7569H18.4361V25.1049H22.5001V21.5549C22.5001 17.5209 24.8901 15.2929 28.5441 15.2929C30.2961 15.2929 32.1261 15.6069 32.1261 15.6069V19.5669H30.1081C28.1221 19.5669 27.5021 20.8089 27.5021 22.0829V25.1029H31.9381L31.2301 29.7549H27.5001V41.0049C35.1481 39.7969 41.0001 33.1369 41.0001 25.1029Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1273_70617">
                      <rect width="32" height="32" fill="white" transform="translate(9 9.00488)" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                  href="https://www.youtube.com/@SkyFi_Official"
                  aria-label="Youtube"
                  className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] flex items-center justify-center  transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <Image src="/assets/youtube.png" alt={"youtube"} width={ 40 }
                       height={ 40 }/>
              </a>

            </div>
            <a href="http://online.gov.vn/Home/WebDetails/120763">
              <img src="/assets/footer/bo_cong_thuong.webp" alt="" width={182}/>
            </a>

          </div>


        </div>
        {/* Separator line */ }
        <div className="w-full h-px bg-[#DDDDDD] mb-4 sm:mb-5 lg:mb-7" />

        {/* Company info */ }
        <div className="max-w-[80%] ">
          <strong className='text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold leading-[1.4]'>{ t( 'companyInfo.title' ) }</strong>
          <br />

          { t( 'companyInfo.info' )
            .split( /\\n|\\L|\n/ )
            .map( ( line, index, arr ) => (
              <span key={ index } className='text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200'>
                { line }
                { index < arr.length - 1 && <br /> }
              </span>
            ) ) }
        </div>

        {/* Copyright */ }
        <div className="text-white  sm:text-[15px] lg:text-[16px] leading-[1.5] text-left mt-6">
          { t( 'copyright' ) }
        </div>
        </div>
           </div>
    </footer>
  );
}

