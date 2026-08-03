"use client";

import Header from "@/app/components/vikki/sim-data/Header";
import { trackPageView } from "@/app/utils/trackingHelper";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { showModalMess } from "../../../components/modals/modalMess";
import CheckoutService from "../../../services/checkoutService";
import TopupService from "../../../services/topup";
import { toCurrency } from "../../../utils/format";
import { useLoad } from "../../../utils/load";
import {
  ORDER_BRANDS,
  applyPaymentSourceType,
} from "../../../utils/orderSourceContext";

// Arrow Left Icon
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6L9 12L15 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Check Icon
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.625 6.9375L5.6875 10L11.375 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function VikkiTopupPage() {
  const t = useTranslations('vikki.topup');
  const router = useRouter();
  const load = useLoad();
  const [networks, setNetworks] = useState([]);
  const [topupValues, setTopupValues] = useState([]);

  const { register, handleSubmit, control, setValue, formState } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    trackPageView({
      page_location: window.location.href,
      page_title: "Nạp tiền - Vikki Topup",
      engagement_time_msec: 0,
    });
  }, []);

  const getListNetwork = async () => {
    try {
      const networks = await TopupService.getTopupNetwork();
      if (networks && networks.length > 0) {
        setNetworks(networks);
      }
    } catch (error) {
      console.error("Error fetching networks:", error);
    }
  };

  useEffect(() => {
    getListNetwork();
  }, []);

  const getListTopupValue = async (networkId) => {
    try {
      load.open();
      const topupValues = await TopupService.getTopupValue(
        networkId,
        ORDER_BRANDS.VIKKI,
      );
      if (topupValues && topupValues.length > 0) {
        setTopupValues(topupValues);
        setValue("product_id", topupValues[0].id);
        setValue("total_amount", topupValues[0].value);
      }
    } catch (error) {
      console.error("Error fetching topup values:", error);
    } finally {
      load.close();
    }
  };

  useEffect(() => {
    if (networks.length > 0) {
      getListTopupValue(1);
    }
  }, [networks]);

  const handleBack = () => {
    router.back();
  };

  const handleTopUp = async (data) => {
    try {
      load.open();
      const response = await TopupService.createOrderTopup({
        ...data,
        brand: ORDER_BRANDS.VIKKI,
      });
      if (response.success) {
        const paymentParams = applyPaymentSourceType(ORDER_BRANDS.VIKKI, {
          orderNumber: response.data.order_number,
          orderDescription: "Order description " + response.data.order_number,
          paymentMethod: "GALAXYPAY",
          locale: "vi",
        });
        const paymentLink = await CheckoutService.getlinkPayment(paymentParams);
        if (!paymentLink.redirectUrl) {
          throw new Error("Payment link not found");
        }
        router.push(paymentLink.redirectUrl);
      } else {
        showModalMess({
          label: t('titleMessage'),
          type: "error",
          message: response.message,
        });
      }
    } catch (error) {
      console.error("Error creating topup order:", error);
      showModalMess({
        label: t('titleMessage'),
        type: "error",
        message: error.message,
      });
    } finally {
      load.close();
    }
  };

  return (
    <div className="flex flex-col h-screen" style={{
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 253, 252, 1) 20%, rgba(254, 248, 244, 1) 40%, rgba(252, 241, 238, 1) 60%, rgba(243, 232, 244, 1) 80%, rgba(232, 229, 250, 1) 100%)'
    }}>
      {/* Status Bar */}
      

      {/* Header */}
     <Header title={t('title')} onBack={handleBack} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <form onSubmit={handleSubmit(handleTopUp)} className="px-4 pt-4">
          {/* Phone Number Card */}
          <div className="bg-white rounded-xl shadow-sm mb-4">
            <div className="flex items-center gap-3 p-4">
              {/* SkyFi Logo */}
              <div className="w-[41px] h-[41px] bg-[#0000EA] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="26" height="21" viewBox="0 0 26 21" fill="none">
                  <path d="M13 0L0 7L13 14L26 7L13 0Z" fill="white"/>
                  <path d="M0 14L13 21V14L0 7V14Z" fill="white" opacity="0.7"/>
                  <path d="M26 14L13 21V14L26 7V14Z" fill="white" opacity="0.7"/>
                </svg>
              </div>

              <div className="flex-1 border-b border-[#F1F1F1] pb-1">
                <label className="block text-[14px] text-[#5C5C5C] mb-1 font-normal">
                  {t('phoneNumber')}
                </label>
                <input
                  type="tel"
                  {...register("contact_phone", {
                    required: {
                      value: true,
                      message: t('requiredPhoneNumber'),
                    },
                    pattern: {
                      value: /^(070)(\d{7})$/,
                      message: t('invalidPhoneNumber'),
                    },
                  })}
                  placeholder={t('placeholderPhoneNumber')}
                  maxLength={10}
                  className="w-full text-[18px] font-semibold text-[#333333] placeholder:text-[#CCCCCC] focus:outline-none"
                />
              </div>
            </div>

            {formState.errors.contact_phone && (
              <div className="px-4 pb-4 text-[#FF4444] text-[12px]">
                {formState.errors.contact_phone.message}
              </div>
            )}
          </div>

          {/* Amount Selection */}
          <div className="px-4 mb-4">
            <Controller
              name="product_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="grid grid-cols-2 gap-3">
                  {topupValues &&
                    topupValues.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          onChange(option.id);
                          setValue("total_amount", option.value);
                        }}
                        className={`relative flex items-center justify-center px-4 py-3 rounded-lg border transition-all min-w-[165.5px] overflow-hidden ${
                          value === option.id
                            ? "border-[#D2008C] bg-white"
                            : "border-[#DDDDDD] bg-white hover:border-[#D2008C]"
                        }`}
                      >
                        <span className={`text-[16px] font-medium ${
                          value === option.id ? "text-[#333333]" : "text-[#333333]"
                        }`}>
                          {toCurrency(option.value)} 
                        </span>
                        
                        {value === option.id && (
                          <div className="absolute top-0 right-0 w-6 h-[25px] flex items-start justify-end ">
                            <div className="relative">
                              <div className="absolute top-0 right-0 w-7 h-[27px]  bg-[#D2008C]" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }}></div>
                              <div className="absolute top-[2px] right-[1px]">
                                <CheckIcon />
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                </div>
              )}
            />
          </div>
        </form>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl px-4 pt-4 pb-0">
        <button
          onClick={handleSubmit(handleTopUp)}
          disabled={!formState.isValid}
          className={`w-full py-3 rounded-full font-semibold text-[16px] text-white transition-all ${
            formState.isValid
              ? "opacity-100"
              : "opacity-50 cursor-not-allowed"
          }`}
          style={{
            background: 'linear-gradient(39deg, #2C4EFF 0%, #0000FF 4%, #6100FF 47%, #DA0191 78%, #FF8A00 98%, #FFB907 100%)',
          }}
        >
          {t('topupNowButton')}
        </button>
        
        {/* Home Indicator */}
        <div className="flex justify-center py-2">
          <div className="w-[139px] h-[5px] bg-black opacity-30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
