"use client";

import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import HDBankService from "@/app/services/hdbankService";
import { getCallbackBaseUrl } from "@/app/utils/callbackHelper";
import { useLoad } from "@/app/utils/load";
import { getOrderSourceContext, ORDER_BRANDS } from "@/app/utils/orderSourceContext";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useShipFeeHDBank } from "@/app/hooks/useShipFeeHDBank";
import {
  loadFormDataFromStorage,
  saveFormDataToStorage,
  STORAGE_KEYS,
} from "@/app/utils/formStorageHelper";
import GiftCard from "../components/GiftCard";
import RegisterFAQ from "../components/RegisterFAQ";
import RegisterNavBar from "../components/RegisterNavBar";
import ShippingAddressModal from "../components/ShippingAddressModal";

// Fixed advance for the HDSKY gift package.
const HDSKY_AMOUNT = 50000;

// Debounce a value so the shipping-fee call doesn't fire on every keystroke.
const useDebounce = (value, delay = 800) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

// Outlined field with a floating-style label (matches the mockup)
const Field = ({ label, required, value, onChange, type = "text", placeholder }) => (
  <div className="rounded-2xl border border-[#E5E5E5] bg-white px-4 py-2.5">
    <label className="block text-sm text-[#5C5C5C]">
      {label}
      {required && <span className="text-[#DA2128]"> *</span>}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-0 bg-transparent p-0 text-[17px] text-[#1C1C1E] outline-none placeholder:text-[#A1A1A1]"
    />
  </div>
);

const InfoPage = () => {
  const t = useTranslations("hdbank.registerSim.info");
  const tPayment = useTranslations("hdbank.registerSim.payment");
  const router = useRouter();
  const load = useLoad();
  const searchParams = useSearchParams();
  const simType = searchParams.get("simType") || "ESIM";
  const isPhysical = simType === "USIM";

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState(null); // { city, district, ward }
  const [detailAddress, setDetailAddress] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = !isPhysical || /^0\d{9}$/.test(phone);
  const addressValid = !isPhysical || (region && detailAddress.trim());

  const isValid = emailValid && phoneValid && addressValid;

  // Shipping fee from the selected delivery address (physical SIM only).
  const shipParams = useMemo(() => {
    if (isPhysical && region && detailAddress.trim()) {
      return {
        city_id: region.city.id,
        district_id: region.district.id,
        ward_id: region.ward.id,
        delivery_address: detailAddress.trim(),
        hasPhysicalSim: true,
      };
    }
    return {};
  }, [isPhysical, region, detailAddress]);

  const debouncedShipParams = useDebounce(shipParams);
  const feeShipping = useShipFeeHDBank(debouncedShipParams);
  const shippingFee = feeShipping?.shipping_fee ?? 0;

  const regionLabel = region
    ? `${region.city.name}/${region.district.name}/${region.ward.name}`
    : "";

  // Hand payment off to the host React Native app (same contract as the
  // Vikki/HDBank checkout postMessage flow).
  const sendMessage = (code) => {
    const message = {
      action: "payment",
      bill_id: code,
      bill_type: "online",
      url_callback: `${getCallbackBaseUrl()}/hdbank-app/register-sim/result?simType=${simType}&orderId=${code}`,
    };
    console.info("postMessage payload:", message);
    window?.ReactNativeWebView?.postMessage(JSON.stringify(message));
  };

  // Build the create-order body, mirroring the Vikki checkout payload.
  const buildOrderBody = (selectedSim, totalAmount) => ({
    items: selectedSim
      ? [
          {
            product_name: selectedSim.product_name,
            sim_type: simType,
            pack_code: 'HDB',
            base_price: selectedSim.base_price,
            sale_price: selectedSim.sale_price,
            quantity: 1,
            pack_price: selectedSim.pack_price,
            sim_price: selectedSim.sim_price,
            msisdn_id: selectedSim.msisdn_id,
            product_id: selectedSim.product_id,
            total_price: selectedSim.total_price,
            total_base_price: selectedSim.total_base_price,
          },
        ]
      : [],
    isFullEsim: !isPhysical,
    hasEsim: !isPhysical,
    hasPhysicalSim: isPhysical,
    source: getOrderSourceContext(ORDER_BRANDS.HDBANK).appSource,
    create_from_cart_id: selectedSim?.cart_id || null,
    email,
    contact_phone: isPhysical ? phone : "",
    customer_name: name,
    dataSim: { isSim: isPhysical ? "0" : "1" },
    total_amount: totalAmount,
    shipping_amount: isPhysical ? shippingFee : 0,
    discount_amount: 0,
    ...(isPhysical && region
      ? {
          city_id: region.city.id,
          district_id: region.district.id,
          ward_id: region.ward.id,
          delivery_address: detailAddress.trim(),
        }
      : {}),
  });

  const handleContinue = async () => {
    if (!isValid) return;
    // Merge contact + delivery info into the draft (kept for the result page).
    const draft = loadFormDataFromStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT) || {};
    const nextDraft = {
      ...draft,
      simType,
      email,
      customer_name: name,
      contact_phone: isPhysical ? phone : "",
      shipping_amount: isPhysical ? shippingFee : 0,
      ...(isPhysical && region
        ? {
            city_id: region.city.id,
            district_id: region.district.id,
            ward_id: region.ward.id,
            delivery_address: detailAddress.trim(),
          }
        : {}),
    };
    saveFormDataToStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT, nextDraft);

    // Order total = fixed HDSKY 50,000 + shipping fee (physical SIM only).
    const totalAmount = HDSKY_AMOUNT + (isPhysical ? shippingFee : 0);

    try {
      load.open();
      const res = await HDBankService.createOrder(
        buildOrderBody(draft.selectedSim, totalAmount),
      );
      if (!res || res.success === false || !res?.data?.order_number) {
        showModalMessHDBank({
          label: tPayment("orderErrorTitle"),
          type: "error",
          message: res?.message || tPayment("orderError"),
        });
        return;
      }

      const orderNumber = res.data.order_number;
      saveFormDataToStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT, {
        ...nextDraft,
        order_number: orderNumber,
      });

      // 0đ orders skip payment and go straight to the result page.
      if (res.data.total_amount === 0) {
        router.push(
          `/hdbank-app/register-sim/result?simType=${simType}&orderId=${orderNumber}`,
        );
        return;
      }

      sendMessage(orderNumber);
    } catch (error) {
      showModalMessHDBank({
        label: tPayment("orderErrorTitle"),
        type: "error",
        message: error?.message || tPayment("orderError"),
      });
    } finally {
      load.close();
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F5F5F5]">
      <div className="sticky top-0 z-50">
        <RegisterNavBar title="Thông tin nhận SIM" />
      </div>

      <main className="flex-1 space-y-4 p-4 pb-32">
        {/* Contact information */}
        <section className="space-y-4 rounded-2xl bg-white p-4">
          <div>
            <h1 className="text-xl font-bold text-[#0E0E0F]">{t("title")}</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#5C5C5C]">
              {t("subtitle")}
            </p>
          </div>

          <div className="space-y-3">
            <Field
              label={t("emailLabel")}
              required
              type="email"
              value={email}
              onChange={setEmail}
            />
            {isPhysical && (
              <Field
                label={t("phoneLabel")}
                required
                type="tel"
                value={phone}
                onChange={(v) => setPhone(v.replace(/\D/g, ""))}
              />
            )}
            <Field label={t("nameLabel")} value={name} onChange={setName} />
          </div>
        </section>

        {/* Physical SIM delivery address */}
        {isPhysical && (
          <section className="space-y-3 rounded-2xl bg-white p-4">
            <h2 className="text-xl font-bold text-[#0E0E0F]">{t("addressTitle")}</h2>

            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="flex w-full items-center gap-2 rounded-2xl border border-[#E5E5E5] px-4 py-2.5 text-left"
            >
              <div className="min-w-0 flex-1">
                <span className="block text-sm text-[#5C5C5C]">
                  {t("regionLabel")} <span className="text-[#DA2128]">*</span>
                </span>
                <span className="block truncate text-[17px] text-[#1C1C1E]">
                  {regionLabel}
                </span>
              </div>
              <svg className="h-5 w-5 flex-shrink-0 text-[#DA2128]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Field
              label={t("detailLabel")}
              required
              value={detailAddress}
              onChange={setDetailAddress}
              placeholder={t("detailPlaceholder")}
            />
          </section>
        )}

        {/* Gift summary */}
        <GiftCard physical={isPhysical} shippingFee={shippingFee} />

        {/* Refund note */}
        <div className="flex items-start gap-2 rounded-[16px] bg-[#FFF8E6] px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DA2128]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="M12 11v5M12 7.5h.01" />
          </svg>
          <p className="flex-1 text-sm leading-5 text-[#333333]">
            {t("refundNote")}
          </p>
        </div>
      </main>

      {/* Fixed bottom action */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white px-4 pb-8 pt-4 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full rounded-2xl py-4 text-center text-lg font-semibold transition-colors ${
            isValid ? "text-[#5A3B00]" : "bg-[#EDEDED] text-[#9CA3AF]"
          }`}
          style={
            isValid
              ? { background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }
              : undefined
          }
        >
          {isPhysical ? t("continueShipping") : t("continue")}
        </button>
      </div>

      {pickerOpen && (
        <ShippingAddressModal
          value={region}
          onClose={() => setPickerOpen(false)}
          onSelect={setRegion}
        />
      )}
    </div>
  );
};

export default InfoPage;
