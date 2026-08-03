"use client";

import { MinusCircleIcon, PlusCircleIcon } from '@/app/[locale]/hdbank-app/cart/page';
import { showModalCartHDBank } from '@/app/components/modals/hdbank/ModalCartHDBank';
import { showModalMessHDBank } from '@/app/components/modals/modalMess';
import Tooltip from '@/app/components/hdbank/Tooltip';
import useMyEsim from '@/app/hooks/useMyEsim';
import { useUserActions } from '@/app/stores/user';
import { isMobile } from '@/app/utils/device';
import { convertSimTravel, convertSimTravelToCart, dailySuffix } from '@/app/utils/format';
import { modal, useModal } from '@/app/utils/modal';
import { getLocal } from '@/app/utils/saveLocal';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const InfoCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13.3333V10M10 6.66667H10.0083M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#DA2128" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NotificationModal = ({ label, message }) => {
  const { close } = useModal();
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
        <button
          onClick={() => close()}
          className="w-full px-4 py-2 bg-[#DA2128] text-white rounded-lg hover:bg-[#B71C22]"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default function ESimDetailPage() {
  const t = useTranslations('hdbank.travelEsim.packageDetail');
  const tCard = useTranslations('hdbank.travelEsim.packageCard');
  const tNotify = useTranslations('hdbank.simData');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const {addToCart, setSims}= useUserActions()
  const [packageData, setPackageData] = useState(null);
  const locale = useLocale();

  useEffect(() => {
    // Get package data from localStorage
    const storedPackageData = getLocal('packageData');
    if (storedPackageData) {
      console.log('data from localStorage', storedPackageData);
      setPackageData(storedPackageData);
    }
  }, []);

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const nameRegion = packageData?.countries_array?.length > 0
    ? `${packageData?.countries_array?.length} ${tCard('country')}`
    : '';
  const data = `${packageData?.data_amount || ''} ${packageData?.data_unit || ''}${dailySuffix(packageData, tCommon('perDay'))}`;
  const validity = packageData?.validity_days;
  const price = packageData?.selling_price || 0;
  const currency = packageData?.currency || 'VND';
  const { showDevicesEsimHDBank } = useMyEsim();

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
      showNotification(tCard('maxQty'));
      setQuantity(50);
      return;
    }

    if (newQuantity < 1) {
      showNotification(tCard('minQty'));
      setQuantity(1);
      return;
    }
    setQuantity(newQuantity);
  };

  const onChange = (e) => {
    let newValue = e.target.value;

    if (newValue.length > 2) {
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
      showNotification(tCard('maxQty'));
      setQuantity(50);
      return;
    }

    setQuantity(numValue === 0 ? '' : numValue);
  };

  const inputOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (Number(quantity) > 50) {
        showNotification(tCard('maxQty'));
      } else {
        setQuantity(Number(quantity));
        e.target.blur(); // Remove focus from input after Enter
      }
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(convertSimTravelToCart(packageData, quantity));

    if (result === 'MAX_QUANTITY') {
      showModalMessHDBank({
        label: tNotify('notify'),
        message: tCard('maxQtyMessage'),
        type: 'error',
      });
      return;
    }
    showModalCartHDBank();
  };

  const handleBuyNow =  () => {
    console.log('Buy now clicked',convertSimTravel(packageData, quantity));
    setSims([convertSimTravel(packageData, quantity)]);
     router.push( `/${locale}/hdbank-app/checkout/payment` );

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9F5] via-[#FFF3EA] via-[#FFECD9] via-[#FFF7E7] via-[#FFFDFC] to-white pb-40">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white">
        {/* Status Bar */}


        {/* Navigation Bar */}
        <div className=" flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="w-6 h-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#0C0C0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-sm font-semibold text-[#0C0C0E]">{t('title')}</h1>
          <div className="w-6 h-6" />{/* Placeholder for alignment */}
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[73px] w-full">
        <Image
          src="/figma-images/packages/bg-vikki-item-package.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Body Content */}
      <div className="px-4 py-4 space-y-6">
        {/* Package Details Card */}
        <div className="space-y-4">
          <h2 className="text-[16px] font-semibold text-[#DA2128]">
            {packageData?.name || 'Discover'}
          </h2>

          <div className="bg-white rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.03),0px_0px_1px_0px_rgba(0,0,0,0.15),0px_4px_16px_0px_rgba(144,118,170,0.08)] p-4 space-y-1">
            <h3 className="text-sm font-semibold text-[#0C0C0E] mb-4">{t('yourPackage')}</h3>

            {/* Data Amount */}
            <div className="flex items-center justify-between py-1">
              <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">{tCard('data')}</p>
              <p className="text-[13px] font-semibold text-[#0C0C0E] leading-[24px]">{data}</p>
            </div>

            {/* Validity */}
            <div className="flex items-center justify-between py-1">
              <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">{tCard('validity')}</p>
              <p className="text-[13px] font-semibold text-[#0C0C0E] leading-[24px]">{validity} {tCard('day')}</p>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between py-1">
              <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">{tCard('price')}</p>
              <div className="flex items-baseline gap-0.5">
                <p className="text-sm font-semibold text-[#DA2128] leading-[20px]">
                  {new Intl.NumberFormat('vi-VN').format(price)}
                </p>
                <p className="text-[12px] font-normal text-[#DA2128] leading-[16px]">
                  {currency}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between py-1">
              <p className="text-[13px] font-normal text-[#0C0C0E] leading-[20px]">{tCard('quantity')}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-6 h-6 flex items-center justify-center disabled:opacity-40 transition-opacity"
                  aria-label={t('decreaseQty')}
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
                  aria-label={t('increaseQty')}
                  disabled={quantity >= 50}
                >
                  <PlusCircleIcon disabled={quantity >= 50} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <h2 className="text-[16px] font-semibold text-[#DA2128]">{t('description')}</h2>

          <div className="bg-white rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.03),0px_0px_1px_0px_rgba(0,0,0,0.15),0px_4px_16px_0px_rgba(144,118,170,0.08)] p-4 divide-y divide-[#F3F4F6]">
            {/* Coverage */}
            <div className="flex items-center justify-between py-3">
              <p className="text-[13px] font-normal text-[#0C0C0E]">{tCard('coverage')}</p>
              <p className="text-[13px] font-semibold text-[#DA2128] underline">{nameRegion}</p>
            </div>

            {/* Provider */}
            <div className="flex items-center justify-between py-3">
              <p className="text-[13px] font-normal text-[#0C0C0E]">{t('providedBy')}</p>
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold text-[#0C0C0E]">{packageData?.provider}</p>
                <Tooltip content={t('speedVaries')} className='!w-[300px]'>
                  <InfoCircleIcon />
                </Tooltip>
              </div>
            </div>

            {/* Activation Policy */}
            <div className="py-3 space-y-1 flex items-center">
              <p className="flex-1 text-[13px] font-normal text-[#0C0C0E]">{t('activationPolicy')}</p>
              <p className="flex-1 text-[13px] font-semibold text-[#0C0C0E] text-end">
                {t('validityStartsOnSetup')}
              </p>
            </div>

            {/* Data Amount */}
            <div className="flex items-center justify-between py-3">
              <p className="text-[13px] font-normal text-[#0C0C0E]">{tCard('data')}</p>
              <p className="text-[13px] font-semibold text-[#0C0C0E]">{data}</p>
            </div>

            {/* Validity */}
            <div className="flex items-center justify-between py-3">
              <p className="text-[13px] font-normal text-[#0C0C0E]">{tCard('validity')}</p>
              <p className="text-[13px] font-semibold text-[#0C0C0E]">{validity} {tCard('day')}</p>
            </div>

            {/* Package Type */}
            <div className="flex items-center justify-between py-3">
              <p className="text-[13px] font-normal text-[#0C0C0E]">{t('packageType')}</p>
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold text-[#0C0C0E]">{t('dataOnly')}</p>
                <Tooltip content={t('dataOnlyTooltip')} className='!w-[250px]'>
                  <InfoCircleIcon />
                </Tooltip>
              </div>
            </div>

            {/* eKYC */}
            <div className="py-3 space-y-1 border-t-0">
              <p className="text-[13px] font-normal text-[#0C0C0E]">
                {t('ekyc')}
              </p>
              <p className="text-[13px] font-semibold text-[#0C0C0E]">{t('notRequired')}</p>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-[#FFF5E9] rounded-xl p-3 flex gap-4">
          <div className="w-6 h-6 rounded-full bg-[#FFF0DD] flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6.66667V10M10 13.3333H10.0083M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#FF8A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[12px] font-normal text-[#0C0C0E] leading-[16px]">
            {t('deviceWarning')}
            <span className='text-[#DA2128] underline cursor-pointer' onClick={showDevicesEsimHDBank}>
              {t('ViewDevices')}
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Docked Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-5 pb-8 px-4 space-y-2">
        <button
          onClick={() => handleAddToCart()}
          className="w-full py-3 px-4 bg-[#F3F4F6] border border-[#F3F4F6] rounded-full text-[16px] font-semibold text-[#0C0C0E] hover:bg-[#E5E7EB] transition-colors"
        >
          {t('addToCart')}
        </button>
                <button
                  onClick={() => handleBuyNow()}
          className="w-full py-3 px-4 rounded-[60px] text-white text-[16px] font-semibold transition-all"
          style={{
            background: 'linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)',
          }}
        >
          {t('buyNow')}
        </button>

        {/* Home Indicator */}
        <div className="flex justify-center pt-2">
          <div className="w-[134px] h-[5px] bg-black rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
}
