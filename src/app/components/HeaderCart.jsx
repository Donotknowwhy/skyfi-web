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

export default function HeaderCart() {
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

    const tCommon= useTranslations('common')

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
        console.log("laal")
        if ( cartItems.length === 0 ) {
            router.push( `/${ locale }/cart?src=vj` );
        } else {
            sessionStorage.setItem( 'openCartPath', window.location.pathname );
            // Otherwise toggle the cart popover
            setIsCartOpen( !isCartOpen );
        }
    };

    const closeCart = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
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
    useEffect(()=>{
        console.log("isCartOpen",isCartOpen)
    },[isCartOpen])
    const totalQuantity = getTotalQuantity(cartItems);

    return (
        <header className="w-full flex sticky top-0 left-0 z-50 items-center justify-end md:justify-between px-4 sm:px-6 xl:px-20 h-[80px] bg-white border-b border-[#F1F1F1] " style={ { fontFamily: 'Inter' } }>
            {/* Logo */ }
            <div className="hidden md:flex items-center cursor-pointer gap-2" >
                <p className={'text-base text-gray-600'}>{tCommon('distributedBy')}</p>
                <Image src="/assets/logo.svg" alt="SkyFi Logo" width={ 100 } height={ 40 } priority className="max-w-[100px] sm:max-w-[120px] pr-1 border-r" />
                <Image src="/assets/SkyJoy.png" alt="SkyJoy Logo" width={ 100 } height={ 40 } priority className="max-w-[100px] sm:max-w-[120px]" />
            </div>

            {/* Actions - Icons only on mobile/tablet, text+icons on desktop */ }
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-end">

                {/* Language Switcher - Hidden on small mobile, icon only on tablet, with text on desktop */ }
                {/*<LanguageSwitcher isExtend={true}/>*/}
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
                    <div className="absolute top-8 left-[38%] cursor-pointer">
                        <Image src="/assets/logo.svg" alt="SkyFi Logo" width={ 120 } height={ 40 } priority className="max-w-[100px] sm:max-w-[120px]" />
                    </div>

                </div>
            ) }
        </header>
    );
}
