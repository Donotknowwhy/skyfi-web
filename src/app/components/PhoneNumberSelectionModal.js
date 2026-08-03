"use client";

import { Dialog, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

export default function PhoneNumberSelectionModal({ isOpen, closeModal, onSelectNumber }) {
  const t = useTranslations('phoneNumberModal');
  const [searchNumber, setSearchNumber] = useState(['', '', '', '', '', '']);
  const [selectedNumber, setSelectedNumber] = useState({ number: '0772 123 234', price: '100.000' });

  const phoneNumbers = [
    { number: '0772 123 456', price: '70.000', originalPrice: '100.000' },
    { number: '0772 123 456', price: '70.000', originalPrice: '100.000' },
    { number: '0772 123 234', price: '100.000', isSelected: true },
    { number: '0772 123 66', price: '69.000' },
    { number: '0772 123 77', price: '69.000' },
    { number: '0772 123 88', price: '69.000' },
  ];

  const handleInputChange = (index, value) => {
    const newSearch = [...searchNumber];
    newSearch[index] = value;
    setSearchNumber(newSearch);
  };

  const handleSelectNumber = (number) => {
    setSelectedNumber(number);
  };

  const handleConfirm = () => {
    onSelectNumber(selectedNumber);
    closeModal();
  };

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
              <Dialog.Panel className="w-[772px] max-h-[800px] transform overflow-hidden rounded-[12px] bg-white shadow-xl transition-all">
                {/* Close button */}
                <div className="flex justify-end items-center p-[20px_20px_0px]">
                  <button onClick={closeModal} className="focus:outline-none">
                    <Image src="/assets/x-close.svg" width={24} height={24} alt="Close" />
                  </button>
                </div>

                <div className="px-[40px] pb-[40px]">
                  {/* Title */}
                  <div className="flex items-center w-full">
                    <div className="flex flex-col gap-[4px] w-full">
                      <Dialog.Title as="h3" className="font-inter font-semibold text-[28px] leading-[1.2em] text-[#333]">
                        {t('title')}
                      </Dialog.Title>
                    </div>
                  </div>

                  {/* Search section */}
                  <div className="mt-[20px] flex flex-col items-center gap-[8px] px-[16px]">
                    <div className="flex flex-row justify-center items-center gap-[12px] h-[60px]">
                      <span className="font-inter font-semibold text-[28px] leading-[1.2em] text-[#333]">0772</span>

                      {/* Input fields */}
                      {searchNumber.map((value, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={value}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className="w-[48px] h-[60px] border border-[#DDDDDD] rounded-[8px] text-center font-inter font-semibold text-[28px]"
                        />
                      ))}

                      {/* Search button */}
                      <button className="w-[36px] h-[60px] flex items-center justify-center border border-[#E69818] rounded-[8px] px-[24px] py-[8px]">
                        <Image src="/assets/search-icon.svg" width={24} height={24} alt="Search" />
                      </button>
                    </div>
                    <span className="font-inter text-[14px] leading-[1.5em] text-[#5C5C5C]">{t('searchHint')}</span>
                  </div>

                  {/* Phone numbers list */}
                  <div className="mt-[20px] flex flex-col gap-[16px] max-h-[400px] overflow-y-auto pr-[8px]">
                    {phoneNumbers.map((phone, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectNumber(phone)}
                        className={`flex flex-col justify-center gap-[4px] p-[16px] w-full rounded-[12px] border ${phone.isSelected || (selectedNumber && phone.number === selectedNumber.number) ? 'border-[2px] border-[#E69818]' : 'border-[#F1F1F1]'} shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] cursor-pointer relative`}
                      >
                        <span className="font-inter font-semibold text-[20px] leading-[1.2em] text-[#333]">{phone.number}</span>
                        <div className="w-full h-[1px] bg-[#F1F1F1]"></div>
                        <div className="flex flex-row items-center gap-[4px]">
                          {phone.originalPrice && (
                            <span className="font-inter text-[12px] leading-[1.5em] line-through text-[#A1A1A1]">{phone.originalPrice} VND</span>
                          )}
                          <span className="font-inter font-medium text-[16px] leading-[1.5em] text-[#ED1B2F]">{phone.price} VND</span>
                        </div>

                        {/* Radio button */}
                        <div className="absolute top-[10px] right-[10px]">
                          <div className={`w-[20px] h-[20px] rounded-full border-[1.5px] ${phone.isSelected || (selectedNumber && phone.number === selectedNumber.number) ? 'border-[#FFAA00] flex items-center justify-center' : 'border-[#333]'}`}>
                            {(phone.isSelected || (selectedNumber && phone.number === selectedNumber.number)) && (
                              <div className="w-[10px] h-[10px] rounded-full bg-[#FFAA00]"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-[20px] flex flex-row justify-end gap-[16px]">
                    <button
                      onClick={closeModal}
                      className="font-inter font-semibold text-[16px] text-[#5C5C5C] px-[24px] py-[12px] rounded-[8px] border border-[#DDDDDD]"
                    >
                      {t('cancelButton')}
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="font-inter font-semibold text-[16px] text-white px-[24px] py-[12px] rounded-[8px] bg-[#E69818]"
                    >
                      {t('confirmButton')}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}