"use client";

import { MinusCircleIcon, PlusCircleIcon } from '@/app/[locale]/app-vikki/cart/page';
import { showModalCart } from '@/app/components/modals/ModalCart';
import { showModalMessVikki } from '@/app/components/modals/modalMess';
import { Button } from '@/app/components/ui/Button';
import { showCountriesModal } from '@/app/components/vikki/modals/CountriesListModal';
import { useUserActions } from '@/app/stores/user';
import { isMobile } from '@/app/utils/device';
import { convertSimTravelToCart, dailySuffix } from '@/app/utils/format';
import { modal, useModal } from '@/app/utils/modal';
import { saveLocal } from '@/app/utils/saveLocal';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NotificationModal = ({ label, message }) => {
  const {close}= useModal();
  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{label}</h2>
      <p className="text-gray-500 mb-6">{message}</p>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => close()}
          className='w-full'

        >
          OK
        </Button>
      </div>
    </div>
  )
}

export default function ESimPackageCard({
  packageData,
  countryName = '',
}) {
  const t = useTranslations('vikki.travelEsim.packageCard');
  const tNotify = useTranslations('vikki.simData');
  const tCommon = useTranslations('common');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setSims } = useUserActions();
  const router = useRouter();


  // Logic adapted from CountryESimPlansPage
  const nameRegion = packageData?.countries_array?.length > 0 ? `${packageData?.countries_array?.length} ${t('country')}` : countryName;
  const data = `${packageData?.data_amount || ''} ${packageData?.data_unit || ''}${dailySuffix(packageData, tCommon('perDay'))}`;
  const validity = packageData?.validity_days;
  const price = packageData?.selling_price || 0;
  const currency = packageData?.currency || 'VND';

  const showNotification = (message) => {
    modal.open({
      render: <NotificationModal label={tNotify('notify')} message={message} />,
      closeButton: false,
      typeModal: isMobile() ? 'sheet' : 'default',
      boxClassName: 'max-w-md',
      
    });
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;

    if (newQuantity > 50) {
      showNotification(t('maxQty'));
      setQuantity(50);
      return;
    }

    if (newQuantity < 1) {
      showNotification(t('minQty'));
      setQuantity(1);
      return;
    }
    setQuantity(newQuantity);
  };

  const onChange = (e) => {
    let newValue = e.target.value;
    
    if(newValue.length > 2) {
      return;
    }

    const RE_DIGIT = new RegExp(/^\d+$/);
    const isTargetValueDigit = RE_DIGIT.test(newValue);

    if (!isTargetValueDigit && newValue !== '') {
      return;
    }

    // Remove leading zeros
    const numValue = Number(newValue);
    
    if (numValue > 50) {
      showNotification(t('maxQty'));
      setQuantity(50);
      return;
    }
    
    setQuantity(numValue === 0 ? '' : numValue);
  };

  const inputOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (Number(quantity) > 50) {
        showNotification(t('maxQty'));
      } else {
        setQuantity(Number(quantity));
        e.target.blur(); // Remove focus from input after Enter
      }
    }
  };

  const handleBuyClick = async (isCountryListClickable) => {
    if (isCountryListClickable) {
      showCountriesModal(packageData);
      return;
    }
    // single-country packages: save and navigate to detail
    saveLocal('packageData', packageData);
    router.push(`/app-vikki/travel-esim/detail`);
    
  };

  const handleAddToCart = async () => {
    const result = await addToCart(convertSimTravelToCart(packageData, quantity));

    if (result === 'MAX_QUANTITY') {
      showModalMessVikki({
        label: 'Thông báo',
        message: `Số lượng tối đa là 50 sản phẩm, vui lòng nhập lại.`,
        type: 'error',
      });
      return;
    }
    return showModalCart();
  };
  
  const getCountryList = () => {
    if(packageData?.countries_array && packageData?.countries_array.length === 1) {
      return packageData.countries_array[0].name;
    }
    if(packageData?.countries_array && packageData?.countries_array.length > 1) {
     return `${packageData?.countries_array?.length} ${t('country')}`
  }
    return countryName;
  }
  const isCountryListClickable = packageData?.countries_array && packageData?.countries_array.length > 1;

  return (
    <div className="bg-white flex flex-col rounded-xl shadow-[0px_4px_16px_0px_rgba(144,118,170,0.08),0px_0px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.03)] overflow-hidden relative isolate"  >
      {/* Header with Package Name and Background Image */}
      <div className="relative h-16 flex items-center justify-start px-4 overflow-hidden bg-[#F5F5F5] rounded-t-xl cursor-pointer" onClick={()=>handleBuyClick(false)} >
        <h3 className="text-[18px] font-semibold text-[#0C0C0E] leading-[24px] z-10 relative">
          {packageData?.name || 'ESIM BASIC'}
        </h3>
      <Image src="/figma-images/packages/bg-vikki-item-package.png" alt="Background" layout="fill" objectFit="cover" className="absolute inset-0" />
       
      </div>

      {/* Package Details */}
      <div className="flex flex-col px-4 py-2">
        {/* Coverage */}
        <div className="flex items-center justify-between py-1">
          <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">
            {t('coverage')}
          </p>
          <p className="text-[13px] font-semibold text-[#0000FF] leading-[24px] text-right underline cursor-pointer" onClick={() =>handleBuyClick(isCountryListClickable)} >
            { getCountryList() }
          </p>
        </div>

        {/* Data Amount */}
        <div className="flex items-center justify-between py-1">
          <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">
            {t('data')}
          </p>
          <p className="text-[13px] font-semibold text-[#0C0C0E] leading-[24px] text-right">
            {data}
          </p>
        </div>

        {/* Validity */}
        <div className="flex items-center justify-between py-1">
          <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">
            {t('validity')}
          </p>
          <p className="text-[13px] font-semibold text-[#0C0C0E] leading-[24px] text-right">
            {validity} {t('day')}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between py-1">
          <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">
            {t('price')}
          </p>
          <div className="flex items-baseline gap-0.5">
            <p className="text-[14px] font-semibold text-[#D2008C] leading-[20px] tracking-[-0.1px]">
              {new Intl.NumberFormat('vi-VN').format(price)}
            </p>
            <p className="text-[12px] font-normal text-[#D2008C] leading-[16px] tracking-[-0.1px]">
              {currency}
            </p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between py-1">
          <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">
            {t('quantity')}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-6 h-6 flex items-center justify-center disabled:opacity-40 transition-opacity"
              aria-label="Giảm số lượng"
              disabled={quantity <= 1}
            >
              <MinusCircleIcon disabled={quantity <= 1} />
            </button>
            <input
              type="number"
              className="text-[16px] font-semibold text-[#0E0E0F] leading-[24px] text-center tracking-[-0.2px] min-w-[32px] w-10 border-none focus:ring-0 bg-transparent"
              value={quantity}
              onChange={onChange}
              onKeyDown={inputOnKeyDown}
              onBlur={(e) => {
                const value = e.target.value;
                if (value === '' || isNaN(value) || Number(value) < 1) {
                  setQuantity(1);
                } else if (Number(value) > 50) {
                  setQuantity(50);
                }
              }}
              maxLength={2}
              min={1}
              max={50}
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-6 h-6 flex items-center justify-center transition-opacity"
              aria-label="Tăng số lượng"
              disabled={quantity >= 50}
            >
              <PlusCircleIcon disabled={quantity >= 50} />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex flex-col items-start justify-center px-4 py-3">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[60px] text-white text-[16px] font-semibold leading-[24px] tracking-[-0.2px] transition-all overflow-hidden relative"
          style={{
            background: 'linear-gradient(39deg, #2C4EFF 0%, #0000FF 4%, #6100FF 47%, #DA0191 78%, #FF8A00 98%, #FFB907 100%)',
          }}
        >
          <span className="relative z-10">{t('buy')}</span>
        </button>
      </div>
    </div>
  );
}