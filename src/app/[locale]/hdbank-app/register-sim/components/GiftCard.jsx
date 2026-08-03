"use client";

import { useTranslations } from "next-intl";
import { toCurrency } from "@/app/utils/format";

// Fixed advance for the HDSKY gift package.
const HDSKY_AMOUNT = 50000;

// "QUÀ TẶNG HDB" gift summary card — shared by the gift screen and the
// contact-info screen. When `physical` is true (physical SIM flow) it also
// shows the shipping fee and the amount to pay (HDSKY 50k + shipping fee).
const GiftCard = ({ physical = false, shippingFee = 0 }) => {
  const t = useTranslations("hdbank.registerSim.gift");

  return (
    <div className="overflow-hidden rounded-[16px] bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      {/* Red header */}
      <div className="flex items-center justify-between bg-[#DA2128] px-4 py-3">
        <span className="text-base font-semibold tracking-wide text-white">
          {t("giftCardTitle")}
        </span>
        <img src="/images/hdbank/ic-gift.svg" alt="" className="h-6 w-6" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-base text-[#333333]">{t("giftSimLabel")}</span>
          <span className="text-base text-[#A8A8A8]">{t("giftSimValue")}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base text-[#333333]">{t("giftPackageLabel")}</span>
          <span className="text-base text-[#A8A8A8]">{t("giftPackageValue")}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/hdbank/ic-data.svg" alt="" className="h-6 w-6" />
            <span className="text-sm text-[#333333]">{t("giftData")}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/hdbank/ic-call.svg" alt="" className="h-6 w-6" />
            <span className="text-sm text-[#333333]">{t("giftCall")}</span>
          </div>
        </div>

        <div className="my-4 h-[1px] w-full bg-[#F2F2F7]" />

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-[#333333]">{t("totalLabel")}</span>
          <span className="text-base font-bold text-[#DA2128]">{t("totalValue")}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base text-[#5C5C5C]">{t("advanceLabel")}</span>
          <span className="text-base text-[#5C5C5C]">{t("advanceValue")}</span>
        </div>

        {physical && (
          <>
            <div className="my-4 h-[1px] w-full bg-[#F2F2F7]" />
            <div className="flex items-center justify-between">
              <span className="text-base text-[#5C5C5C]">{t("shipLabel")}</span>
              <span className="text-base text-[#5C5C5C]">{toCurrency(shippingFee)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-base font-bold text-[#333333]">{t("payLabel")}</span>
              <span className="text-[18px] font-bold text-[#DA2128]">
                {toCurrency(HDSKY_AMOUNT + shippingFee)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GiftCard;
