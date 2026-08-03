"use client";

import { Dialog, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React, { Fragment, useState } from 'react';
import CountriesPopup from './CountriesPopup';
import { showModalMess } from './modals/modalMess';
import DevicesEsim from "@/app/components/modals/my-esim/DevicesEsim";

// Icons from Figma (or similar representations)
// It's better to use SVG components or an icon library for these
const DataIconFigma = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 12.6667H8.66667V8.66667H12.6667V7.33333H8.66667V3.33333H7.33333V7.33333H3.33333V8.66667H7.33333V12.6667ZM8 14.6667C7.27778 14.6667 6.58917 14.5444 5.93417 14.2999C5.27917 14.0555 4.69278 13.7222 4.175 13.3C3.65722 12.8778 3.22778 12.3778 2.88667 11.8C2.54556 11.2222 2.33611 10.5833 2.25833 9.88333L3.54167 9.61667C3.60278 10.1111 3.75833 10.5528 4.00833 10.9417C4.25833 11.3306 4.58056 11.6528 4.975 11.9083C5.36944 12.1639 5.79722 12.3417 6.25833 12.4417C6.71944 12.5417 7.16667 12.5833 7.59917 12.5667L7.33333 14.4333C7.55556 14.5222 7.77778 14.5889 8 14.6333C8.22222 14.5889 8.44444 14.5222 8.66667 14.4333L8.40083 12.5667C8.83333 12.5833 9.28056 12.5417 9.74167 12.4417C10.2028 12.3417 10.6306 12.1639 11.025 11.9083C11.4194 11.6528 11.7417 11.3306 11.9917 10.9417C12.2417 10.5528 12.3972 10.1111 12.4583 9.61667L13.7417 9.88333C13.6639 10.5833 13.4544 11.2222 13.1133 11.8C12.7722 12.3778 12.3428 12.8778 11.825 13.3C11.3072 13.7222 10.7208 14.0555 10.0658 14.2999C9.41083 14.5444 8.72222 14.6667 8 14.6667ZM8 6.13333L8.26583 4.26667C7.83333 4.25 7.38611 4.29167 6.925 4.39167C6.46389 4.49167 6.03611 4.66944 5.64167 4.925C5.24722 5.18056 4.925 5.50278 4.675 5.89167C4.425 6.28056 4.27083 6.72222 4.20833 7.21667L2.925 6.95C3.00278 6.25 3.21222 5.61111 3.55333 5.03333C3.89444 4.45556 4.32389 3.95556 4.84167 3.53333C5.35944 3.11111 5.94583 2.77778 6.60083 2.53333C7.25583 2.28889 7.94444 2.16667 8.66667 2.16667H7.33333V0.333333H8.66667V2.16667C9.38889 2.16667 10.0778 2.28889 10.7328 2.53333C11.3878 2.77778 11.9742 3.11111 12.4917 3.53333C13.0094 3.95556 13.4389 4.45556 13.78 5.03333C14.1211 5.61111 14.3306 6.25 14.4083 6.95L13.125 7.21667C13.0639 6.72222 12.9097 6.28056 12.6597 5.89167C12.4097 5.50278 12.0875 5.18056 11.6931 4.925C11.2986 4.66944 10.8708 4.49167 10.4097 4.39167C9.94861 4.29167 9.50278 4.25 9.06917 4.26667L9.33333 6.13333H8Z" fill="#333333" /> </svg>;
const CalendarIconFigma = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3333 2.66667H12.6667V1.33333H11.3333V2.66667H4.66667V1.33333H3.33333V2.66667H2.66667C2.29812 2.66667 1.94424 2.80714 1.68086 3.05036C1.41748 3.29357 1.26667 3.62662 1.26667 4V13.3333C1.26667 13.7019 1.41748 14.0349 1.68086 14.2781C1.94424 14.5214 2.29812 14.6667 2.66667 14.6667H13.3333C13.7019 14.6667 14.0558 14.5214 14.3191 14.2781C14.5825 14.0349 14.7333 13.7019 14.7333 13.3333V4C14.7333 3.62662 14.5825 3.29357 14.3191 3.05036C14.0558 2.80714 13.7019 2.66667 13.3333 2.66667ZM2.53333 5.33333H13.4667V4H2.53333V5.33333ZM13.4667 13.3333H2.53333V6.66667H13.4667V13.3333Z" fill="#333333" /> </svg>;
const QuantityMinusIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9.5" stroke="#DDDDDD" /><path d="M6 10H14" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const QuantityPlusIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary"><circle cx="10" cy="10" r="9.5" fill="currentColor" stroke="currentColor" /><path d="M10 6V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function PlanCard( { plan, locale, onBuyNowClick, sim } ) {
  const t = useTranslations( 'countryPlansPage' );
  const tCommon = useTranslations( 'common' );
  const [ quantity, setQuantity ] = React.useState( 1 );
  const [ isPopupOpen, setIsPopupOpen ] = useState( false );
  const [ searchDeviceTerm, setSearchDeviceTerm ] = useState( '' );
  const [ activeAccordion, setActiveAccordion ] = useState( null );
  const [ showCountriesPopup, setShowCountriesPopup ] = useState( false );
  const isClosingCountriesPopup = React.useRef( false );

  const toggleAccordion = ( brand ) => {
    setActiveAccordion( activeAccordion === brand ? null : brand );
  };
  function closeModal() {
    setIsPopupOpen( false );
  }

  function openModal() {
    setIsPopupOpen( true );
  }

  const handleQuantityChange = ( amount ) => {
    if(quantity>=50 && amount>0){
      showModalMess( {
        label: tCommon("notification"),
        message: tCommon("maxQuantity",{quantity:50}),
        type: 'error',
      } );
      setQuantity(50)
      return
    }
    setQuantity( prev => Math.max( 1, prev + amount ) );
  };

  const handleCardClick = () => {
    // Chỉ mở modal detail khi CountriesPopup không đang mở và không đang trong quá trình đóng
    if (!showCountriesPopup && !isClosingCountriesPopup.current) {
      openModal();
    }
  };

  const handleCloseCountriesPopup = () => {
    isClosingCountriesPopup.current = true;
    setShowCountriesPopup(false);
    // Reset flag sau một khoảng thời gian ngắn
    setTimeout(() => {
      isClosingCountriesPopup.current = false;
    }, 100);
  };

  const onChange = ( e ) => {
    let newValue = e.target.value;
    const RE_DIGIT = new RegExp( /^\d+$/ );
    const isTargetValueDigit = RE_DIGIT.test( newValue );

    if ( !isTargetValueDigit && newValue !== '' ) {
      return;
    }
    if ( Number( newValue ) >= 50 ) {
      showModalMess( {
        label: tCommon("notification"),
        message: tCommon("maxQuantity",{quantity:50}),
        type: 'error',
      } );
      setQuantity( 50 );
    }
    setQuantity( Number( newValue ) );
  };

  const showOriginalPrice = plan.originalPrice && plan.originalPrice !== plan.price;

  // Figma: Best offer badge I545:19733;3733:128115
  // This is an approximation. Exact SVG shape and positioning would be more complex.
  const bestOfferBadge = plan.isBestOffer && (
    <div
      className="absolute -top-[1px] -right-[1px] z-10" // Adjusted for corner
      style={ { // Using style for the complex shape, ideally an SVG
        width: '94px', // Approximate from Figma
        height: '94px', // Approximate from Figma
      } }
    >
      <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L94 0L94 94L0 0Z" fill="url(#paint0_linear_545_19733_best_offer)" />
        <defs>
          <linearGradient id="paint0_linear_545_19733_best_offer" x1="0" y1="0" x2="94" y2="94" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FAD593" />
            <stop offset="1" stop-color="#CC8F2D" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className="absolute top-[10px] right-[10px] transform rotate-[45deg] origin-bottom-right font-koho text-[13px] font-bold uppercase text-white"
        style={ { textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)' } } // effect_FUQRIY
      >
        { t( 'bestOffer', { defaultValue: 'Best Offer' } ) }
      </span>
    </div>
  );
  // If the card is a "Best Offer" card, it has a different border stroke_OOCW21
  const cardBorderStyle = plan.isBestOffer
    ? "border-[3px] border-gradient-to-r from-[#FAD593] to-[#CC8F2D]" // This needs a custom CSS for gradient border or use an image.
    : "border border-transparent"; // Default or non-best-offer border

  // Note: The gradient border is tricky with Tailwind alone.
  // For a true gradient border, you might need custom CSS or pseudo-elements.
  // As a fallback, a solid color from the gradient can be used or an image border.
  // For now, I'm using a placeholder class "border-gradient-to-r..."

  const onBuyNowClickHandler = ( type = "cart" ) => {
    closeModal();
    onBuyNowClick( sim, quantity, type );
  };

  const inputOnKeyDown = ( e ) => {
    if ( e.key === 'Enter' ) {
      if ( Number( quantity ) > 50 ) {
        showModalMess( {
          label: tCommon("notification"),
          message: tCommon("maxQuantity",{quantity:50}),
          type: 'error',
        } );
      } else {
        setQuantity( Number( quantity ) );
        e.target.blur(); // Remove focus from input after Enter
      }
    }
  };

  return (
    <div
      className={ `relative bg-white rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),_0px_1px_6px_-1px_rgba(0,0,0,0.05),_0px_1px_2px_0px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col cursor-pointer ${ cardBorderStyle }` }
      onClick={handleCardClick}
    >
      { bestOfferBadge }

      {/* Plan Name Section - I545:19733;1953:63675 */ }
      {/* Figma has a colored background for "ESIM BASIC" when it's best offer, white otherwise. */ }
      {/* For simplicity here, keeping background consistent or white and applying styles to text directly */ }
      <div className={ `px-[16px] h-[64px] text-left` }
        style={ { backgroundImage: 'url(/assets/bgcard.png)', backgroundSize: 'cover', backgroundPosition: 'center' } }
      >
        <div className="text-left w-full h-full flex flex-col justify-center">
          <h3 className="font-inter font-semibold text-[20px] text-[#333333] leading-tight">
            { plan.name }
          </h3>
        </div>
      </div>

      <div className="p-[16px] flex flex-col flex-grow">
        {/* Info Section - I545:19733;1953:63680 */ }
        <div className="space-y-[8px] mb-[16px]">
          {/* Coverage - Not explicitly in current data structure but often present */ }
           <div className="flex justify-between items-center">
            <span className="font-inter text-[14px] text-[#333333]">{t('coverage', {defaultValue: "Phạm vi phủ sóng"})}:</span>
            <span
              className={`font-inter text-[16px] font-medium ${
                plan.countries_array?.length === 1 
                  ? "text-[#333333]" 
                  : "text-blue-500 underline cursor-pointer hover:text-blue-600"
              }`}
              onClick={plan.countries_array?.length === 1 ? undefined : (e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowCountriesPopup(true);
              }}
            >
              {plan.countries_array?.length === 1
                ? plan.countries_array[0]?.title || plan.countries_array[0]?.name || "1 quốc gia"
                : plan.countries_array?.length + " " + t("nationality")
              }
            </span>
          </div>

          <div className="flex justify-between items-center"> {/* Changed to justify-between */ }
            <div className="flex items-center gap-[8px]">
              {/*<DataIconFigma /> */}
              {/* Using Figma like icon */ }
              <span className="font-inter text-[14px] text-[#333333]">{ t( 'data', { defaultValue: "Dung lượng" } ) }:</span>
            </div>
            <span className="font-inter text-[16px] font-medium text-[#333333]">  {/* Adjusted: text-16px, font-medium, color */ }
              { plan.data === 'Unlimited' ? t( 'unlimitedData' ) : plan.data }
            </span>
          </div>

          <div className="flex justify-between items-center"> {/* Changed to justify-between */ }
            <div className="flex items-center gap-[8px]">
              {/*<CalendarIconFigma /> */}
              {/* Using Figma like icon */ }
              <span className="font-inter text-[14px] text-[#333333]">{ t( 'validityLabel', { defaultValue: "Hiệu lực" } ) }:</span>
            </div>
            <span className="font-inter text-[16px] font-medium text-[#333333]"> {/* Adjusted: text-16px, font-medium, color */ }
              { plan.validity } { t( 'day', { defaultValue: "Ngày " } ) }
            </span>
          </div>
          <div className="flex justify-between items-center"> {/* Changed to justify-between */ }
            <div className="flex items-center gap-[8px]">
              {/*<CalendarIconFigma /> */}
              {/* Using Figma like icon */ }
              <span className="font-inter text-[14px] text-[#333333]">{ t( 'price', { defaultValue: "Giá" } ) }:</span>
            </div>
            <div className=" text-right"> {/* Align price to right as per Figma */ }
              { showOriginalPrice && (
                  <span className="font-inter text-[14px] text-[#A1A1A1] line-through mr-[8px]"> {/* text color A1A1A1 */ }
                    { plan.originalPrice }
              </span>
              ) }
              <span className="font-inter font-medium text-[20px] "> {/* Adjusted: text-20px, font-medium */ }
                { plan.price }
            </span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-[16px]"> {/* Added border-top for separation */ }

          {/* Quantity - I545:19733;2079:73064 */ }
          <div className="flex items-center justify-between mb-[16px] border-b border-[#F1F1F1] pb-4">
            <span className="font-inter text-[14px] text-[#333333]">{ t( 'quantity', { defaultValue: "Số lượng" } ) }:</span> {/* color #333333 */ }
            <div className="flex items-center gap-[10px]" onClick={(e) => e.stopPropagation()}> {/* Gap from Figma */ }
              <button
                onClick={ () => {
                  if ( quantity > 1 ) { // Ensure minimum quantity is 1
                    handleQuantityChange( -1 );
                  } else {
                      showModalMess( {
                          label: tCommon("notification"),
                          message: tCommon("minQuantity",{quantity:1}),
                          type: 'error',
                      } );
                  }
                } }
                className="text-[#A0A0A0] hover:text-[#262626]"
                aria-label={ t( 'decreaseQuantity', { defaultValue: "Giảm số lượng" } ) }
              >
                <QuantityMinusIcon />
              </button>
              <input className="font-inter text-[16px] font-semibold text-[#333333] max-w-[40px] text-center"
                value={ quantity }
                onKeyDown={ inputOnKeyDown }
                onBlur={ ( e ) => {
                  const value = e.target.value;
                  if ( value === '' || isNaN( value ) || Number( value ) < 1 ) {
                    setQuantity( 1 );
                  }
                  else if ( Number( value ) > 50 ) {
                    setQuantity( 50 );
                  }
                } }
                onChange={ onChange } maxLength={ 2 } />
              <button
                onClick={ () => {
                  if ( quantity < 50 ) { // Ensure max quantity is 50
                    handleQuantityChange( 1 );
                  }
                  else {
                      showModalMess( {
                          label: tCommon("notification"),
                          message: tCommon("maxQuantity",{quantity:50}),
                          type: 'error',
                      } );
                  }
                } }
                className="text-[#A0A0A0] hover:text-[#262626]"
                aria-label={ t( 'increaseQuantity', { defaultValue: "Tăng số lượng" } ) }
              >
                <QuantityPlusIcon />
              </button>
            </div>
          </div>
          {/* CTA Button - I545:19733;2536:70559 */ }
          <button
            type='button'
            onClick={ (e) => {
              e.stopPropagation();
              onBuyNowClickHandler( "cart" );
            }}
            className="block w-full bg-[#E69818] text-white text-center font-inter font-semibold text-[16px] py-[12px] rounded-[8px] hover:bg-[#D0840A] transition-colors mb-[16px]"
            aria-label={ t( 'buyNowButton', { defaultValue: "Mua ngay" } ) }
          > {/* BG color #E69818, hover adjusted */ }
            { t( 'selectPlanButton', { defaultValue: "Chọn mua" } ) }
          </button>
        </div>
      </div>

      <Transition appear show={ isPopupOpen } as={ Fragment }>
        <Dialog as="div" className="relative z-50" onClose={ closeModal }>
          <Transition.Child
            as={ Fragment }
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={ Fragment }
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* --- Figma Popup Start - Matched to Figma node 545:19790 --- */ }
                <Dialog.Panel className="relative w-full max-w-[1080px] transform overflow-hidden rounded-[16px] bg-white text-left align-middle shadow-xl transition-all flex flex-col pb-[40px]">
                  {/* Close button - Absolute positioned at top-right */ }
                  <div className="max-w-[1080px] h-[200px] bg-[#F7F7F7] hidden md:block overflow-hidden"
                    style={ { backgroundImage: `url(/assets/bg-esim-info.png)`, backgroundSize: 'cover', backgroundPosition: 'center' } }
                  ></div>
                  <button
                    onClick={ closeModal }
                    className="absolute top-[20px] right-[20px] z-[1000]"
                    aria-label={ t( 'closePopup', { defaultValue: 'Đóng' } ) }
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 6L18 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="flex flex-col md:flex-row  flex-grow">
                    {/* Left Column - Banner Image */ }
                    {/* Right Column - Content */ }
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1 overflow-y-auto py-[20px] px-[20px] space-y-[20px]">
                        {/* Title Section */ }
                        <div className=' '>
                          <h3 className="font-inter font-semibold text-[22px] text-[#333333] mb-1" style={ { lineHeight: '1.2' } }>
                            { plan.name }
                          </h3>
                          <p className="font-inter mt-2 text-[16px] text-[#333333]">
                            { sim.countries_array && (
                              <span className={sim.countries_array.length === 1 ? "text-[#333333]" : "text-[#333333]"}>
                                {sim.countries_array.length === 1
                                  ? sim.countries_array[0]?.title || sim.countries_array[0]?.name || "1 quốc gia được hỗ trợ"
                                  : sim.countries_array.length + " " + t( 'supportedCountries', { defaultValue: 'quốc gia được hỗ trợ' })
                                }
                              </span>
                            ) }
                          </p>
                        </div>

                        {/* Alert Toast */ }
                        <div className="bg-[#FFF1E5] border border-[#FF831E] rounded-[8px] px-[16px] py-[8px] space-y-[4px]">
                          <div className="flex items-center gap-[4px] pr-[12px]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M10 1.66666C5.40001 1.66666 1.66667 5.39999 1.66667 10C1.66667 14.6 5.40001 18.3333 10 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.39999 14.6 1.66666 10 1.66666ZM9.16667 11.6667V13.3333H10.8333V11.6667H9.16667ZM9.16667 6.66666V10H10.8333V6.66666H9.16667Z" fill="#FF831E" />
                            </svg>
                            <span className="font-inter font-semibold text-[16px] text-[#FF831E]">{ t( 'noteTitle', { defaultValue: 'Lưu ý' } ) }</span>
                          </div>
                          <div>
                            <p className="font-inter text-[16px] text-[#333333] pl-[24px]">
                              { t( 'esimDeviceCompatNotePopup', { defaultValue: 'eSIM chỉ sử dụng được trên các thiết bị di động có hỗ trợ. Xem danh sách thiết bị.' } ) }
                            </p>
                          </div>
                        </div>

                        {/* Description Section */ }
                        <div className="space-y-[8px]">
                          <h4 className="font-inter font-semibold text-[18px] text-[#333333]">{ t( 'description', { defaultValue: 'Mô tả' } ) }</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[0px]">
                            { renderDetailItem( t( 'data', { defaultValue: 'Dung lượng' } ), plan.data === 'Unlimited' ? t( 'unlimitedData' ) : plan.data ) }
                            { renderDetailItem( t( 'validityLabel', { defaultValue: 'Hiệu lực' } ), t( 'validityValue', { number: sim.validity_days } ) ) }
                            { renderDetailItem( t( 'provider', { defaultValue: 'Cung cấp bởi' } ), plan.provider || 'SkyFi' ) }
                            { renderDetailItem( t( 'activationPolicy', { defaultValue: 'Chính sách kích hoạt' } ), plan.activationPolicy || t( 'activateOnInstall', { defaultValue: 'Thời hạn hiệu lực sẽ bắt đầu lúc cài đặt' } ) ) }
                            { renderDetailItem( t( 'planType', { defaultValue: 'Loại gói' } ), plan.planType || t( 'dataOnly', { defaultValue: 'Chỉ dữ liệu' } ) ) }
                            {/*{ renderDetailItem( t( 'ekyc', { defaultValue: 'eKYC (Xác minh danh tính)' } ), plan.ekycRequired ? t( 'required', { defaultValue: 'Bắt buộc' } ) : t( 'notRequired', { defaultValue: 'Không bắt buộc' } ) ) }*/}
                          </div>
                        </div>

                        {/* Supported Countries Section */ }
                        <div className="space-y-[8px]">
                          <h4 className="font-inter font-semibold text-[18px] text-[#333333]">{ t( 'supportedCountries', { defaultValue: 'Quốc gia được hỗ trợ' } ) }</h4>
                          <div className='flex flex-col  border-b border-[#F1F1F1] py-4 overflow-y-scroll max-h-80 hide-scrollbar'>
                            { sim.countries_array && sim.countries_array.map( ( country, index ) => {
                              let nameRegion = country.name ;

                              let flagUrl = country.image && country.image.includes( 'https://' ) ? country.image : `https://flagcdn.com/w80/${country.code.toLowerCase()}.png`;
                              return (
                                <div key={ index } className="flex items-center py-4 gap-[8px] border-b border-[#F1F1F1]  last:border-b-0">
                                  { flagUrl &&
                                    <div className="w-[30px] h-[30px] bg-gray-200 rounded-full">
                                      <img src={ flagUrl } alt={ nameRegion } width={ 30 } height={ 30 } className="rounded-full object-contain w-full h-full" />
                                    </div>
                                  }
                                  <span className="font-inter font-semibold text-[16px] text-[#333333]">
                                    { nameRegion || 'Singapore' }
                                  </span>
                                </div>
                              );
                            } ) }
                          </div>
                        </div>

                        {/* eSIM Compatible Devices Section */ }
                        <div className="space-y-[8px]">

                          {/* Device List - Accordion style */ }
                          <div className="space-y-0 pt-[8px]">
                            <DevicesEsim showHeader={false}></DevicesEsim>
                            </div>
                        </div>
                      </div>


                    </div>
                    {/* Sticky Bottom Section - Plan Summary & CTAs */ }
                    <div className="md:w-[340px] px-[20px] py-[20px]">
                      <div className="bg-white rounded-[8px] shadow">
                        <div className="px-[20px] pt-[20px] pb-[12px]">
                          <h5 className="font-inter font-semibold text-[18px] text-[#333333] mb-[12px]">{ t( 'yourSelectedPlan', { defaultValue: 'Gói cước của bạn' } ) }</h5>
                          <div className="space-y-[8px]">
                            { renderSummaryItem( t( 'data', { defaultValue: 'Dung lượng' } ), plan.data === 'Unlimited' ? t( 'unlimitedData' ) : plan.data ) }
                            { renderSummaryItem( t( 'validityLabel', { defaultValue: 'Hiệu lực' } ), t( 'validityValue', { number: sim.validity_days } ) ) }
                            <div className="flex justify-between items-center">
                              <span className="font-inter text-[14px] text-[#333333]">{ t( 'price', { defaultValue: 'Giá' } ) }</span>
                              <span className="font-inter font-medium text-[16px] text-[#333333]">{ plan.price }</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-inter text-[14px] text-[#333333]">{ t( 'quantity', { defaultValue: 'Số lượng' } ) }</span>
                              <div className="flex items-center gap-[8px]">
                                <button
                                  onClick={ () => handleQuantityChange( -1 ) }
                                  aria-label={ t( 'decreaseQuantity' ) }
                                  className="p-1"
                                >
                                  <QuantityMinusIcon />
                                </button>
                                <input className="font-inter text-[16px] font-semibold text-[#333333] max-w-[40px] text-center"
                                  value={ quantity }
                                  onBlur={ ( e ) => {
                                    const value = e.target.value;
                                    if ( value === '' || isNaN( value ) || Number( value ) < 1 ) {
                                      setQuantity( 1 );
                                    }
                                    else if ( Number( value ) > 50 ) {
                                      setQuantity( 50 );
                                    }
                                  } }
                                  onChange={ onChange } maxLength={ 2 } />
                                <button
                                  onClick={ () => handleQuantityChange( 1 ) }
                                  aria-label={ t( 'increaseQuantity' ) }
                                  className="p-1"
                                >
                                  <QuantityPlusIcon />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-[20px] pb-[20px] pt-[12px]">
                          <div className="flex flex-col gap-[8px]">
                            <button onClick={ () => onBuyNowClickHandler( "cart" ) }
                              className="block w-full bg-white text-[#E69818] border border-[#E69818] text-center font-inter font-semibold text-[16px] py-[12px] rounded-[8px] hover:bg-orange-50 transition-colors">
                              { t( 'addToCartButton', { defaultValue: 'Thêm vào giỏ hàng' } ) }
                            </button>
                            <button onClick={ () => onBuyNowClickHandler( "buy" ) }
                              className="block w-full bg-[#E69818] text-white text-center font-inter font-semibold text-[16px] py-[12px] rounded-[8px] hover:bg-[#D0840A] transition-colors">
                              { t( 'buyNowButton', { defaultValue: 'Mua ngay' } ) }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Countries Popup */}
      <CountriesPopup
        isOpen={showCountriesPopup}
        onClose={handleCloseCountriesPopup}
        countries={plan.countries_array || []}
      />
    </div>
  );
}

// Helper function to render detail items - adapt as needed
const renderDetailItem = ( label, value ) => (
  <div className="py-[8px] border-b border-[#F1F1F1] flex justify-between items-start last:border-b-0 md:last:border-b"> {/* Figma: border #F1F1F1, last item might not have border or it might, check Figma */ }
    <span className="font-inter text-[16px] text-[#333333] w-2/5 pr-2">{ label }</span> {/* style_S2KEOL (label) */ }
    <span className="font-inter font-medium text-[16px] text-[#333333] w-3/5 text-right">{ value }</span> {/* style_FD1HKR (value) */ }
  </div>
);

// Helper function to render summary items
const renderSummaryItem = ( label, value ) => (
  <div className="flex justify-between items-center py-[4px]"> {/* Figma might have specific padding */ }
    <span className="font-inter text-[14px] text-[#333333]">{ label }</span> {/* style_QS1QJM */ }
    <span className="font-inter font-medium text-[16px] text-[#333333]">{ value }</span> {/* style_FD1HKR */ }
  </div>
);

// Helper function to render device brand accordion (simplified)
// Updated to match Figma's accordion style and manage its own state
const RenderDeviceBrandAccordion = ( { brand, devices, searchTerm, isActive, toggleAccordion, t } ) => {
  const filteredDevices = devices.filter( device =>
    device.toLowerCase().includes( searchTerm?.toLowerCase() || '' )
  );

  if ( searchTerm && filteredDevices.length === 0 ) {
    return null;
  }

  const displayDevices = searchTerm ? filteredDevices : devices;

  return (
    <div className="border-b border-[#F1F1F1] last:border-b-0"> {/* Figma: border #F1F1F1, last item in list has no border typically */ }
      <button
        onClick={ () => toggleAccordion( brand ) }
        className="w-full flex justify-between items-center py-[12px] font-inter text-[14px] font-semibold text-[#333333]" // style_7RZVI4 (similar)
      >
        <span>{ brand } ({ displayDevices.length })</span> {/* Display count */ }
        <svg className={ `w-5 h-5 transform transition-transform ${ isActive ? 'rotate-180' : '' }` } fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      { isActive && (
        <ul className="pl-[16px] pt-[4px] pb-[12px] space-y-[4px]"> {/* Figma: padding might vary */ }
          { displayDevices.length > 0 ? displayDevices.map( ( device, index ) => (
            <li key={ index } className="font-inter text-[14px] text-[#333333]">{ device }</li> // style_QS1QJM (similar)
          ) ) : (
            <li className="font-inter text-[14px] text-gray-500">{ t( 'noMatchingDevices', { defaultValue: 'Không tìm thấy thiết bị nào.' } ) }</li>
          ) }
        </ul>
      ) }
    </div>
  );
};

// Update renderDeviceBrand to use the new accordion component and filter by search term
const renderDeviceBrand = ( brand, deviceList, searchTerm, activeAccordion, toggleAccordion, t ) => {
  // Filtering is now done inside RenderDeviceBrandAccordion, but we can keep a top-level filter
  // if we want to hide the brand entirely if no devices match the search term (even before opening accordion)
  const hasMatchingDevices = deviceList.some( device => device.toLowerCase().includes( searchTerm?.toLowerCase() || '' ) );

  if ( searchTerm && !hasMatchingDevices ) {
    // return null; // Option: hide brand if search term matches none of its devices
  }

  return (
    <RenderDeviceBrandAccordion
      brand={ brand }
      devices={ deviceList }
      searchTerm={ searchTerm }
      isActive={ activeAccordion === brand }
      toggleAccordion={ toggleAccordion }
      t={ t }
    />
  );
};
