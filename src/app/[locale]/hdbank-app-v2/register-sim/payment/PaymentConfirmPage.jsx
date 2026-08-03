"use client";

import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import HDBankService from "@/app/services/hdbankService";
import { formatPhoneNumber, toCurrency } from "@/app/utils/format";
import {
  loadFormDataFromStorage,
  saveFormDataToStorage,
  STORAGE_KEYS,
} from "@/app/utils/formStorageHelper";
import { useLoad } from "@/app/utils/load";
import { getCallbackBaseUrl } from "@/app/utils/callbackHelper";
import { getOrderSourceContext, ORDER_BRANDS } from "@/app/utils/orderSourceContext";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Fixed advance for the HDSKY gift package.
const HDSKY_AMOUNT = 50000;

// Sample plan/account values — placeholders until wired to the real response.
const PAY = {
  data: "3 GB/ngày",
  call: "10 phút gọi liên mạng",
  cycle: "30 ngày",
  plan: "HDSKY",
  esimOld: 50000,
  packageOld: 100000,
  totalOld: 150000,
  account: "0987653332",
  balance: 5500000,
};

// Amount without the " VND" suffix so it can be styled separately.
const money = (n) => toCurrency(n).replace(/\s*VND$/, "");

// Spec line inside the plan card (muted label / bold value).
const SpecRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2.5">
    <span className="text-[15px] text-[#8A8A8E]">{label}</span>
    <span className="text-[16px] font-bold text-[#1C1C1E]">{value}</span>
  </div>
);

// Big amount with optional struck-through original price.
const Money = ({ value, old, strong }) => (
  <div className="text-right leading-tight">
    <p className={strong ? "text-[20px] font-extrabold text-[#1C1C1E]" : "text-[18px] font-extrabold text-[#1C1C1E]"}>
      {value}
      <span className="ml-1 text-[12px] font-medium text-[#A1A1A1]">VND</span>
    </p>
    {old != null && (
      <p className="text-[13px] text-[#A1A1A1] line-through">{money(old)} VND</p>
    )}
  </div>
);

// Price breakdown row with a red bullet on the left.
const PriceRow = ({ label, children }) => (
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-2.5 pt-1">
      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#ED1B2F]" />
      <span className="text-[16px] text-[#333333]">{label}</span>
    </div>
    {children}
  </div>
);

// iOS-style toggle (visual only — autobill enrolment is a post-activation flow).
const Toggle = ({ on, onClick }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={onClick}
    className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${
      on ? "bg-[#ED1B2F]" : "bg-[#D8D8D8]"
    }`}
  >
    <span
      className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
        on ? "translate-x-[22px]" : "translate-x-0.5"
      }`}
    />
  </button>
);

const PaymentConfirmPage = () => {
  const t = useTranslations("hdbank.registerSim.payment");
  const router = useRouter();
  const load = useLoad();
  const searchParams = useSearchParams();

  // Draft carried over from the gift + info steps (selected number, contact,
  // delivery address, shipping fee).
  const [draft] = useState(
    () =>
      (typeof window !== "undefined"
        ? loadFormDataFromStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT)
        : null) || {},
  );

  // Autobill preference — visual state only; not sent with the order.
  const [autoBill, setAutoBill] = useState(false);

  const simType = draft.simType || searchParams.get("simType") || "ESIM";
  const isPhysical = simType === "USIM";

  const selectedSim = draft.selectedSim;
  const phoneDisplay = selectedSim?.msisdn
    ? formatPhoneNumber(selectedSim.msisdn)
    : "";

  // Order total = fixed HDSKY 50,000 + shipping fee (physical SIM only).
  const shipFee = isPhysical ? draft.shipping_amount || 0 : 0;
  const totalAmount = HDSKY_AMOUNT + shipFee;

  // Build the create-order body, mirroring the Vikki checkout payload.
  const buildOrderBody = () => ({
    items: selectedSim
      ? [
          {
            product_name: selectedSim.product_name,
            sim_type: simType,
            pack_code: selectedSim.pack_code,
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
    email: draft.email || "",
    contact_phone: draft.contact_phone || "",
    customer_name: draft.customer_name || "",
    dataSim: { isSim: isPhysical ? "0" : "1" },
    total_amount: totalAmount,
    shipping_amount: isPhysical ? shipFee : 0,
    discount_amount: 0,
    ...(isPhysical
      ? {
          city_id: draft.city_id,
          district_id: draft.district_id,
          ward_id: draft.ward_id,
          delivery_address: draft.delivery_address,
        }
      : {}),
  });

  const sendMessage = (code) => {
    if (typeof window !== "undefined") {
      const message = {
        action: "payment",
        bill_id: code,
        bill_type: "online",
        url_callback: `${getCallbackBaseUrl()}/hdbank-app-v2/register-sim/result?simType=${simType}&orderId=${code}`,
      };
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        console.info("postMessage payload:", message);
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
    } else {
      alert('ReactNativeWebView is not available. This page needs to be loaded in a React Native WebView.');
    }
  };

  const handleConfirm = async () => {
    try {
      load.open();
      const res = await HDBankService.createOrder(buildOrderBody());
      if (!res || res.success === false || !res?.data?.order_number) {
        showModalMessHDBank({
          label: t("orderErrorTitle"),
          type: "error",
          message: res?.message || t("orderError"),
        });
        return;
      }

      const orderNumber = res.data.order_number;
      saveFormDataToStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT, {
        ...draft,
        order_number: orderNumber,
      });

      // 0đ orders skip payment and go straight to the result page.
      if (res.data.total_amount === 0) {
        router.push(
          `/hdbank-app-v2/register-sim/result?simType=${simType}&orderId=${orderNumber}`,
        );
        return;
      }

      sendMessage(orderNumber);
    } catch (error) {
      showModalMessHDBank({
        label: t("orderErrorTitle"),
        type: "error",
        message: error?.message || t("orderError"),
      });
    } finally {
      load.close();
    }
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url(/images/hdbank/background.png)" }}
    >
      <main className="flex-1 space-y-4 px-4 pb-56 pt-4">
        {/* Debit account */}
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)]">
          <img src="/images/hdbank/BenefitBadge.svg" alt=""/>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] text-[#8A8A8E]">
              {t("debitAccount")}{" "}
              <span className="font-bold text-[#1C1C1E]">{PAY.account}</span>
            </p>
            <p className="text-[20px] font-bold text-[#1C1C1E]">{money(PAY.balance)} VND</p>
          </div>
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F2F2F2]">
            <svg className="h-5 w-5 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Plan + SIM card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)]">
          <div
            className="flex items-center gap-3 px-4 py-4"
            style={{ background: "linear-gradient(180deg, #FFF1E6 0%, #FFFFFF 100%)" }}
          >
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)]">
              <img src="/assets/logo.svg" alt="SkyFi" className="h-7 w-12 object-contain" />
            </span>
            <div>
              <p className="text-[15px] text-[#8A8A8E]">{t("title")}</p>
              <p className="text-[20px] font-bold leading-tight text-[#1C1C1E]">
                {t("planTitle")}
              </p>
            </div>
          </div>
          <div className="divide-y divide-[#F2F2F2] px-4 pb-2">
            <SpecRow label={t("phoneLabel")} value={phoneDisplay} />
            <SpecRow label={t("planNameLabel")} value={t("planNameValue")} />
            <SpecRow label={t("dataLabel")} value={PAY.data} />
            <SpecRow label={t("callLabel")} value={PAY.call} />
            <SpecRow label={t("cycleLabel")} value={PAY.cycle} />
          </div>
        </div>

        {/* Price breakdown */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)]">
          <div className="space-y-4 px-4 pb-4 pt-4">
            <PriceRow label={isPhysical ? t("simLabel") : t("esimLabel")}>
              <Money value="0" old={PAY.esimOld} />
            </PriceRow>
            <PriceRow label={t("packageLabel")}>
              <Money value="0" old={PAY.packageOld} />
            </PriceRow>
            {isPhysical && (
              <PriceRow label={t("shipLabel")}>
                <Money value={money(shipFee)} />
              </PriceRow>
            )}
            <PriceRow label={t("customerAdvance")}>
              <Money value={money(totalAmount)} />
            </PriceRow>
          </div>
          <div className="flex items-start justify-between bg-[#FDECEC] px-4 py-3">
            <span className="pt-1 text-[16px] text-[#8A8A8E]">{t("totalPayLabel")}</span>
            <Money value={money(totalAmount)} old={PAY.totalOld} strong />
          </div>
        </div>

        {/* Autobill */}
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)]">
          <div className="flex-1 pr-3">
            <p className="text-[16px] font-bold leading-snug text-[#1C1C1E]">
              {t("autobillTitle")}
            </p>
            <p className="mt-1 text-[14px] text-[#8A8A8E]">{t("autobillDesc")}</p>
          </div>
          <Toggle on={autoBill} onClick={() => setAutoBill((v) => !v)} />
        </div>
      </main>

      {/* Fixed bottom confirm + footer nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="px-4 pb-3 pt-4">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-full py-4 text-center text-lg font-bold text-white shadow-[0px_8px_20px_0px_rgba(0,0,0,0.2)]"
            style={{ background: "linear-gradient(90deg, #ED1B2F 0%, #F9A61C 100%)" }}
          >
            {t("confirm")}
          </button>
        </div>
        <img src="/images/hdbank/footer.png" alt="" className="block w-full" />
      </div>
    </div>
  );
};

export default PaymentConfirmPage;
