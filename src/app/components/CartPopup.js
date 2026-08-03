"use client";

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';

export default function CartPopup({ isOpen, closeModal, cartItems, totalPrice }) {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[480px] max-h-[90vh] transform overflow-hidden rounded-[12px] bg-white shadow-[0px_3px_8px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all">
                {/* Title with check icon */}
                <div className="flex flex-row items-center gap-[8px] px-[20px] py-[16px]">
                  <div className="w-[24px] h-[24px]">
                    <Image src="/assets/check-circle.svg" width={24} height={24} alt="Success" />
                  </div>
                  <h3 className="font-inter font-semibold text-[18px] leading-[1.44em] text-[#00B141]">
                    Thêm giỏ hàng thành công
                  </h3>
                </div>

                {/* Cart items list */}
                <div className="px-[20px] max-h-[400px] overflow-y-auto relative">
                  {/* Scrollbar - For decoration, actual scrolling is handled by overflow */}
                  <div className="absolute right-[2px] top-0 h-[150px] w-[4px]">
                    <div className="w-full h-[50px] bg-[#C0C0C0] rounded-[100px]"></div>
                  </div>

                  {/* Cart items */}
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-[12px] py-[8px] border-b border-[#F1F1F1] w-full"
                    >
                      {/* Item logo/icon */}
                      {item.type === 'sim' ? (
                        <div className="w-[40px] h-[40px] rounded-full bg-[#ED1B2F] flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.35416 1.33337H4.6875C2.95833 1.33337 2 2.29171 2 4.02087V11.9792C2 13.7084 2.95833 14.6667 4.6875 14.6667H11.3125C13.0417 14.6667 14 13.7084 14 11.9792V9.31254" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.1333 2.08329L5.36665 6.84996C5.14998 7.06663 4.93331 7.49163 4.88998 7.79996L4.58998 9.77496C4.48165 10.525 5.00831 11.0433 5.75831 10.9433L7.73331 10.6433C8.03331 10.6 8.46665 10.3833 8.67498 10.1666L13.4416 5.39996C14.2916 4.54996 14.6833 3.57496 13.4416 2.33329C12.2 1.09996 10.9833 1.23329 10.1333 2.08329Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.46667 2.75C9.87667 4.185 11.015 5.32333 12.45 5.73333" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ) : item.type === 'premium' ? (
                        <div className="w-[40px] h-[40px] rounded-full border border-[#DDDDDD] flex items-center justify-center bg-[#F1F1F1]">
                          <span className="font-inter font-semibold text-[16px] text-[#333]">P</span>
                        </div>
                      ) : item.type === 'global' ? (
                        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-[#DDDDDD]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
                            <path d="M3.51562 9H20.4844" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.51562 15H20.4844" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 20.7656C14.0711 20.7656 15.75 16.8412 15.75 12.0001C15.75 7.15912 14.0711 3.23438 12 3.23438C9.92893 3.23438 8.25 7.15912 8.25 12.0001C8.25 16.8412 9.92893 20.7656 12 20.7656Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
                          </svg>
                        </div>
                      ) : item.type === 'northAmerica' ? (
                        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-[#DDDDDD]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="currentColor"/>
                            <path d="M12.5 7.5L12 5L11.5 7.5L9 8L11.5 8.5L12 11L12.5 8.5L15 8L12.5 7.5Z" fill="currentColor"/>
                            <path d="M8.5 14.5L8 12L7.5 14.5L5 15L7.5 15.5L8 18L8.5 15.5L11 15L8.5 14.5Z" fill="currentColor"/>
                            <path d="M16.5 14.5L16 12L15.5 14.5L13 15L15.5 15.5L16 18L16.5 15.5L19 15L16.5 14.5Z" fill="currentColor"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ED1B2F]"></div>
                      )}

                      {/* Item info */}
                      <div className="flex flex-col justify-center flex-1">
                        <span className="font-inter font-semibold text-[16px] leading-[1.5em] text-[#333]">
                          {item.title}
                        </span>
                        <span className="font-inter text-[16px] leading-[1.5em] text-[#5C5C5C]">
                          {item.description}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col items-end">
                        {item.originalPrice && (
                          <span className="font-inter text-[14px] leading-[1.5em] line-through text-[#A1A1A1]">
                            {item.originalPrice} VND
                          </span>
                        )}
                        <span className="font-inter font-medium text-[16px] leading-[1.5em] text-[#333]">
                          {item.price} VND
                        </span>
                      </div>

                      {/* Delete icon */}
                      <button className="focus:outline-none">
                        <Image src="/assets/trash-icon.svg" width={24} height={24} alt="Delete" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total price */}
                <div className="flex flex-row justify-between items-center px-[20px] py-[16px]">
                  <span className="font-inter font-semibold text-[18px] leading-[1.44em] text-[#333]">Tổng cộng</span>
                  <span className="font-inter font-semibold text-[20px] leading-[1.2em] text-[#333]">{totalPrice} VND</span>
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-[12px] p-[16px_20px] border-t border-[#F1F1F1]">
                  <button
                    onClick={closeModal}
                    className="flex-1 font-inter font-semibold text-[16px] leading-[1.5em] text-[#E69818] border border-[#E69818] rounded-[8px] py-[12px] px-[24px]"
                  >
                    Xem giỏ hàng (5)
                  </button>
                  <button className="flex-1 font-inter font-semibold text-[16px] leading-[1.5em] text-white bg-[#E69818] rounded-[8px] py-[12px] px-[24px]">
                    Thanh toán
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}