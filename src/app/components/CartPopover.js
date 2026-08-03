"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useUserActions } from '../stores/user';
import cartService, {getTotalQuantity} from '../utils/cartService';
import { toCurrency } from '../utils/format';
import { ItemSimCheckout } from './checkout/listProduc';

const CartPopover = ({ cartItems, closePopover, cartButtonRef }) => {
  const t = useTranslations('cart');
  const locale = useLocale();
  const popoverRef = useRef(null);
  const backdropRef = useRef(null);
  const router = useRouter();
  const { setSims } = useUserActions();
  const currentPath=window.location.pathname;
  const openCartPath=sessionStorage.getItem('openCartPath')
  const searchParams = useSearchParams();
  const viewSrc = searchParams.get( 'src' ) || 'skyfi';

  useEffect(() => {
    if(currentPath !== openCartPath) {
      closePopover();
    }
  }, [currentPath]);

  useEffect(() => {
    // Handle click outside to close popover
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        closePopover();
      }
    };

    // Handle backdrop click
    const handleBackdropClick = (event) => {
      if (backdropRef.current && event.target === backdropRef.current) {
        closePopover();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleBackdropClick);

    // Prevent body scroll when popover is open
    document.body.style.overflow = 'hidden';

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleBackdropClick);
      document.body.style.overflow = 'unset';
    };
  }, [closePopover, cartButtonRef]);

  const handleCheckout = () => {
    setSims(cartItems);
    if(viewSrc==="vj"){
       router.push(`/${locale}/checkout/payment?src=vj`);
    }
    else {
      router.push(`/${locale}/checkout/payment`);
    }
    closePopover();
  };

  const handleViewCart = () => {
    closePopover();
    if(viewSrc==="vj"){
      return router.push(`/${locale}/cart?src=vj`);
    }
    router.push(`/${locale}/cart`);
  };

  const handleRemoveItem = (itemId) => {
    cartService.removeItem(itemId);
  };

  // Check if cart is empty
  const isEmpty = !cartItems || cartItems.length === 0;

  const totalQuantity = getTotalQuantity(cartItems);

  const totalPrice = isEmpty ? 0 : cartItems.reduce((total, item) => {
    const basePrice = (item.base_price ?? 0) + (item.pack_price ?? 0);
    return total + (item.total_price ?? basePrice);
  }, 0);

  return (
    <>
      {/* Background overlay */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        style={{ zIndex: 9998 }}
      />

      {/* Popover content */}
      <div
        ref={popoverRef}
        className="fixed z-50 w-[100vw] sm:w-[480px] max-h-[90vh] rounded-[12px] bg-white shadow-[0px_3px_8px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.05)]
                   bottom-0 left-0 right-0 sm:absolute sm:top-full sm:right-0 sm:bottom-auto sm:left-auto sm:mt-2
                   rounded-b-none sm:rounded-[12px]"
        style={{ zIndex: 9999 }}
      >
        {/* Top triangle/arrow - Only show on desktop */}
        <div className="hidden sm:block absolute top-[-8px] right-8 w-4 h-4 bg-white transform rotate-45"></div>

        {/*/!* Mobile handle bar *!/*/}
        {/*<div className="block sm:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-2"></div>*/}

        {/* Title with check icon */}
        <div className="flex flex-row items-center gap-[8px] px-[20px] py-[16px]">
          <div className="w-[24px] h-[24px]">
            <Image src="/assets/check-circle.svg" width={24} height={24} alt="Thành công" />
          </div>
          <h3 className="font-inter font-semibold text-[18px] leading-[1.44em] text-[#00B141]">
            {t('addedSuccessfully')}
          </h3>
        </div>

        {/* Cart items list */}
        <div className="px-[20px] max-h-[400px] overflow-y-auto relative">
          {isEmpty ? (
            // Hiển thị thông báo khi giỏ hàng trống
            <div className="text-center py-[40px]">
              <p className="font-inter text-[16px] text-[#666] mb-[8px]">{t("empty")}</p>
              <p className="font-inter text-[14px] text-[#999]">{t("continueShopping")}</p>
            </div>
          ) : (
            <>
              {/* Scrollbar - For decoration, actual scrolling is handled by overflow */}
              {/*<div className="absolute right-[2px] top-0 h-[150px] w-[4px]">*/}
              {/*  <div className="w-full h-[50px] bg-[#C0C0C0] rounded-[100px]"></div>*/}
              {/*</div>*/}

              {/* Cart items */}
              {cartItems.map((item, index) => (
                <ItemSimCheckout item={item} key={index} isDelete={true} />
              ))}
            </>
          )}
        </div>

        {/* Total price - Chỉ hiển thị khi có items */}
        {!isEmpty && (
          <div className="flex flex-row justify-between items-center px-[20px] py-[16px]">
            <span className="font-inter font-semibold text-[18px] leading-[1.44em] text-[#333]">{t('total')}</span>
            <span className="font-inter font-semibold text-[20px] leading-[1.2em] text-[#333]">{toCurrency(totalPrice)}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-row gap-[12px] p-[16px_20px] border-t border-[#F1F1F1] pb-[20px] sm:pb-[16px]">
          {isEmpty ? (
            // Khi giỏ hàng trống - chỉ có button đóng
            <button
              onClick={closePopover}
              className="flex-1 font-inter font-semibold text-[16px] leading-[1.5em] text-[#E69818] border border-[#E69818] rounded-[8px] py-[12px] px-[24px]"
            >
              {t("closeButton")}
            </button>
          ) : (
            // Khi có items - hiển thị buttons bình thường
            <>
              <button
                onClick={handleViewCart}
                className="flex-1 font-inter font-semibold text-[16px] leading-[1.5em] text-[#E69818] border border-[#E69818] rounded-[8px] py-[12px] px-[24px]"
              >
                {t('viewCart')} ({totalQuantity})
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 font-inter font-semibold text-[16px] leading-[1.5em] text-white bg-[#E69818] rounded-[8px] py-[12px] px-[24px]"
              >
                {t('checkout')}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPopover;
