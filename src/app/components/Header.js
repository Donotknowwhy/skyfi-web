"use client";

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Link } from '../../i18n/navigation';
import { useUserActions, useUserState } from '../stores/user';
import CartPopover from "./CartPopover";
import LanguageSwitcher from "./LanguageSwitcher";
import UserDropdown from "./UserDropdown";
import {getTotalQuantity} from "@/app/utils/cartService";

const menuItems = [
  { label: "SIM data", href: "/sim-data", translationKey: "navigation.simData" },
  { label: "eSIM du lịch", href: "/travel-esim", translationKey: "navigation.travelESim" },
  { label: "Gói cước", href: "/package", translationKey: "navigation.plans" },
  { label: "Nạp thẻ", href: "/topup", translationKey: "navigation.topUp" },
  // { label: "Giới thiệu về SkyFi", href: "/about", translationKey: "navigation.about" },
  // { label: "Liên hệ", href: "/contact", translationKey: "navigation.contact" },
];

export default function Header() {
  const router = useRouter();
  const locale = useLocale();

  const [ totalPrice, setTotalPrice ] = useState( "0" );
  const cartButtonRef = useRef( null );
  const userButtonRef = useRef( null );
  const t = useTranslations();
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState( false );
  const [ isUserDropdownOpen, setIsUserDropdownOpen ] = useState( false );
  const [ userHoverTimeout, setUserHoverTimeout ] = useState( null );
  const { setIsCartOpen } = useUserActions();
  const { cartItems, isCartOpen, isLoggedIn } = useUserState();

  useEffect( () => {
    // Initialize cart from storage on mount



    // Close mobile menu when screen size changes to desktop
    const handleResize = () => {
      if ( window.innerWidth >= 1024 ) {
        setIsMobileMenuOpen( false );
      }
    };

    window.addEventListener( 'resize', handleResize );

    return () => {

      window.removeEventListener( 'resize', handleResize );
    };
  }, [] );

  const toggleCart = ( e ) => {
    // If there are no items, navigate to cart page directly
    if ( cartItems.length === 0 ) {
      router.push( `/${ locale }/cart` );
    } else {
      sessionStorage.setItem( 'openCartPath', window.location.pathname );
      // Otherwise toggle the cart popover
      setIsCartOpen( !isCartOpen );
    }
  };

  const closeCart = () => {
    setIsCartOpen( false );
  };

  const closeUserDropdown = () => {
    setIsUserDropdownOpen( false );
    if (userHoverTimeout) {
      clearTimeout(userHoverTimeout);
      setUserHoverTimeout(null);
    }
  };

  const handleUserHover = () => {
    if (isLoggedIn && window.innerWidth >= 1024) {
      // Clear any existing timeout
      if (userHoverTimeout) {
        clearTimeout(userHoverTimeout);
        setUserHoverTimeout(null);
      }
      setIsUserDropdownOpen( true );
    }
  };

  const handleUserLeave = () => {
    if (window.innerWidth >= 1024) {
      // Set a timeout to close the dropdown
      const timeout = setTimeout(() => {
        setIsUserDropdownOpen( false );
      }, 150);
      setUserHoverTimeout(timeout);
    }
  };

  const handleDropdownHover = () => {
    if (window.innerWidth >= 1024) {
      // Clear the timeout when hovering over dropdown
      if (userHoverTimeout) {
        clearTimeout(userHoverTimeout);
        setUserHoverTimeout(null);
      }
    }
  };



  const handleUserClick = () => {
    if (isLoggedIn) {
      if (window.innerWidth < 1024) {
        // On mobile/tablet, toggle dropdown on click
        setIsUserDropdownOpen( !isUserDropdownOpen );
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen( !isMobileMenuOpen );
    // Close cart and user dropdown if mobile menu is opening
    if ( !isMobileMenuOpen ) {
      setIsCartOpen( false );
      setIsUserDropdownOpen( false );
    }
  };
  const totalQuantity = getTotalQuantity(cartItems);

  return (
    <header className="w-full flex sticky top-0 left-0 z-50 items-center justify-between px-4 sm:px-6 lg:px-20 h-[80px] bg-white border-b border-[#F1F1F1] " style={ { fontFamily: 'Inter' } }>
      {/* Mobile Menu Button - Only visible on mobile and tablet */ }
      <div className="lg:hidden flex items-center">
        <button
          onClick={ toggleMobileMenu }
          className="p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6 fill-primary text-primary" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={ isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }></path>
          </svg>
        </button>
      </div>

      {/* Logo */ }
      <div className="flex items-center cursor-pointer" onClick={ () => router.push( '/' ) }>
        <Image src="/assets/logo.svg" alt="SkyFi Logo" width={ 120 } height={ 40 } priority className="max-w-[100px] sm:max-w-[120px]" />
      </div>

      {/* Desktop Menu - Only visible on desktop */ }
      <nav className="hidden lg:flex flex-row gap-5 flex-1 ml-8">
        { menuItems.map( ( item ) => (
          <p
            key={ item.label }
            // href={ item.href }
            onClick={()=>{
              if (item.href) {
                router.push(item.href);
              }
            }}
            className="text-[#333] text-sm font-normal xl:text-[18px] px-3 py-2 hover:font-semibold transition-all cursor-pointer"
            style={ { fontFamily: 'Inter' } }
          >
            { item.translationKey ? t( item.translationKey ) : item.label }
          </p>
        ) ) }
      </nav>

      {/* Actions - Icons only on mobile/tablet, text+icons on desktop */ }
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-end">
        {/* User/Login - Icon only on mobile and tablet, with text on desktop */ }
        <div
          className="flex items-center gap-1 p-2 lg:px-3 lg:py-2 border border-neutral-300 cursor-pointer hover:bg-gray-50 rounded-lg relative"
          ref={ userButtonRef }
          onMouseEnter={ handleUserHover }
          onMouseLeave={ handleUserLeave }
          onClick={ handleUserClick }
        >
          { !isLoggedIn ? (
             <Link href={'/login'} className="flex items-center gap-1">
              <Image src="/assets/user-circle.svg" alt="User" width={ 24 } height={ 24 } />
              <span className="hidden xl:inline text-[#333]  font-normal" style={ { fontFamily: 'Inter' } }>
                { t( 'common.login' ) }
              </span>
             </Link>

          ) : (
              <div className="flex items-center gap-1">
                <Image src="/assets/user-circle.svg" alt="User" width={ 24 } height={ 24 } />
                <span className="hidden xl:inline text-[#333]   font-normal" style={ { fontFamily: 'Inter' } }>
                  { t( 'common.myEssim' ) }
                </span>
                {/* Dropdown arrow for visual indication on larger screens */}
                <svg
                  className="hidden lg:block w-4 h-4 text-gray-400 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
          )}

          {/* User Dropdown */ }
          { isLoggedIn && (
            <UserDropdown
              isOpen={ isUserDropdownOpen }
              closeDropdown={ closeUserDropdown }
              userButtonRef={ userButtonRef }
              onMouseEnter={ handleDropdownHover }

            />
          ) }
        </div>

        {/* Language Switcher - Hidden on small mobile, icon only on tablet, with text on desktop */ }
        <LanguageSwitcher />
        {/* Line chia - Hidden on mobile and tablet, visible on desktop */ }
        <div className="hidden lg:block w-px h-8 bg-[#DDDDDD] mx-1 lg:mx-2" />

        {/* Giỏ hàng - Icon only on mobile and tablet, with text on desktop */ }
        <div
          ref={ cartButtonRef }
          onClick={ toggleCart }
          className={ clsx( "flex items-center gap-1 lg:gap-2 p-2 lg:px-3 lg:py-2 cursor-pointer hover:bg-gray-50 rounded-lg border border-[#DDDDDD] relative",
            cartItems.length > 0 ? 'border-primary' : 'border-[#DDDDDD]' ) }
        >
          <ShoppingCartIcon className={ clsx('w-6 h-6 ', cartItems.length > 0?'text-primary':'text-neutral-800') } />
          <span className={ clsx("hidden xl:inline text-[18px] font-normal", cartItems.length > 0 ? 'text-primary' : 'text-neutral-800') } style={ { fontFamily: 'Inter' } }>
            { t( 'common.cart' ) }
          </span>

          {/* Cart badge */ }
          { cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-[#E69818] text-white text-[12px] w-[20px] h-[20px] rounded-full flex items-center justify-center">
              {totalQuantity }
            </div>
          ) }


          { isCartOpen && (

            <CartPopover
              cartItems={ cartItems }
              closePopover={ closeCart }
              cartButtonRef={ cartButtonRef }
            />
          ) }
        </div>
      </div>



      {/* Mobile Menu - Full screen overlay */ }
      { isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col pt-20 px-6">
          <div className="absolute top-8 left-[38%] cursor-pointer" onClick={ () => router.push( '/' ) }>
            <Image src="/assets/logo.svg" alt="SkyFi Logo" width={ 120 } height={ 40 } priority className="max-w-[100px] sm:max-w-[120px]" />
          </div>
          <div className="absolute top-6 right-6">
            <button
              onClick={ toggleMobileMenu }
              className="p-2 focus:outline-none"
              aria-label="Close Menu"
            >
              <svg className="w-6 h-6 text-primary" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>


          <nav className="flex flex-col space-y-4 mt-3">
            { menuItems.map( ( item ) => (
              <a
                key={ item.label }
                href={ item.href }
                className="text-[#333] font-bold text-base py-1 border-b border-gray-100 hover:font-semibold transition-all"
                onClick={ () => setIsMobileMenuOpen( false ) }
                style={ { fontFamily: 'Inter' } }
              >
                { item.translationKey ? t( item.translationKey ) : item.label }
              </a>
            ) ) }
          </nav>

          {/* Language switcher in mobile menu */ }
          {/*<LanguageSwitcher />*/}
        </div>
      ) }
    </header>
  );
}
