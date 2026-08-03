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
  esimOld: "50,000 VND",
  packageOld: "100,000 VND",
  account: "068704070161483",
  balance: "43,251,000 VND",
};

// Spec line with current price + struck-through original price.
const PriceRow = ({ label, value, oldValue }) => (
  <div className="mt-4 flex items-start justify-between">
    <span className="text-sm text-[#00000080]">{label}</span>
    <div className="text-right">
      <p className="text-sm font-semibold text-[#333333]">{value}</p>
      {oldValue && (
        <p className="text-xs text-[#A1A1A1] line-through">{oldValue}</p>
      )}
    </div>
  </div>
);

const SpecRow = ({ label, value }) => (
  <div className="mt-3 flex items-center justify-between">
    <span className="text-sm text-[#A1A1A1]">{label}</span>
    <span className="text-sm font-semibold text-[#333333]">{value}</span>
  </div>
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

  const simType = draft.simType || searchParams.get("simType") || "ESIM";
  const isPhysical = simType === "USIM";

  const selectedSim = draft.selectedSim;
  const phoneDisplay = selectedSim?.msisdn
    ? formatPhoneNumber(selectedSim.msisdn)
    : "";

  // Order total = fixed HDSKY 50,000 + shipping fee (physical SIM only).
  const shipFee = isPhysical ? draft.shipping_amount || 0 : 0;
  const totalAmount = HDSKY_AMOUNT + shipFee;
  const advance = toCurrency(totalAmount);

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

      saveFormDataToStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT, {
        ...draft,
        order_number: res?.data?.order_number,
      });
      router.push(`/hdbank-app/register-sim/result?simType=${simType}`);
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
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <main className="flex-1 px-5 pb-32 pt-6">
        {/* Logo + headline amount */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#EDEDED]">
            <img src="/assets/logo.svg" alt="SkyFi" className="h-8 w-12 object-contain" />
          </div>
          <p className="mt-3 text-base text-[#333333]">{t("title")}</p>
          <p className="mt-1 text-[32px] font-bold leading-tight text-[#333333]">
            {advance}
          </p>
        </div>

        {/* Detail card */}
        <div className="mt-6 rounded-2xl border border-[#EDEDED] p-5">
          <SpecRow label={t("phoneLabel")} value={phoneDisplay} />
          <SpecRow label={t("dataLabel")} value={PAY.data} />
          <SpecRow label={t("callLabel")} value={PAY.call} />
          <SpecRow label={t("cycleLabel")} value={PAY.cycle} />

          <div className="my-4 h-[1px] w-full bg-[#EDEDED]" />

          <PriceRow
            label={isPhysical ? t("simLabel") : t("esimLabel")}
            value="0 VND"
            oldValue={PAY.esimOld}
          />
          <PriceRow
            label={t("packageLabel")}
            value="0 VND"
            oldValue={PAY.packageOld}
          />
          {isPhysical && (
            <SpecRow label={t("shipLabel")} value={toCurrency(shipFee)} />
          )}
          <SpecRow label={t("advanceLabel")} value={advance} />
        </div>
      </main>

      {/* Fixed bottom: account selector + confirm */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white px-4 pb-8 pt-4 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between rounded-2xl border border-[#EDEDED] px-4 py-2.5 text-left"
        >
          <div>
            <p className="text-[13px] text-[#A1A1A1]">{t("accountLabel")}</p>
            <p className="text-[15px] text-[#333333]">{PAY.account}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[17px] font-bold text-[#333333]">{PAY.balance}</span>
            <svg className="h-5 w-5 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full rounded-2xl py-4 text-center text-lg font-semibold text-[#5A3B00]"
          style={{ background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }}
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmPage;
