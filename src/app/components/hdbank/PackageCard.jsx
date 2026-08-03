"use client";

/**
 * PackageCard Component for Vikki App
 *
 * A modern card component designed specifically for displaying data packages
 * in the Vikki mobile app interface.
 *
 * Design Features:
 * - Discount badge showing percentage off
 * - Simple icons for data and call info
 * - Clean layout without decorative elements
 * - Gradient button for registration
 * - Minimal design optimized for mobile
 *
 * Props:
 * @param {Object} pack - Package data object from API
 * @param {boolean} isHighlighted - Whether to highlight this card (first item)
 */

import { usePackageHDBank } from "@/app/hooks/usePackageHDBank";
import { useUserState } from "@/app/stores/user";
import { useTranslations } from "next-intl";
import { toCurrency } from "../../utils/format";
import { showActivateSimModal } from "@/app/components/modals/hdbank/modalActivateSim";
import { Button } from "../ui/Button";
import clsx from "clsx";

const PackageCard = ({ pack, isHighlighted = false, className }) => {
  const { openCheckPackageModal, openPackDetailModal } = usePackageHDBank();
  const t = useTranslations("hdbank.packageCard");
  const { isLoggedIn } = useUserState();
  const handleRegister = () => {
    if (!isLoggedIn) {
      showActivateSimModal();
      return;
    }
    openCheckPackageModal(pack);
  };

  // Calculate discount percentage if there's a sale
  const hasDiscount = pack?.price > pack?.sale_price;

  const discountPercent = hasDiscount
    ? Math.round(((pack.price - pack.sale_price) / pack.price) * 100)
    : 0;

  return (
    <div
      className={clsx(
        "bg-white rounded-[24px] p-[18px] flex flex-col  relative shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {/* Top Row: Title & Icon */}
      <div className="flex justify-between items-start border-b border-[#e5e5eacb] py-3">
        <div className="flex  items-start gap-2">
          <h4 className="text-[#0E0E0F] text-[18px] font-bold leading-[24px] font-inter">
            {pack.name}
          </h4>
          {hasDiscount && (
            <div className="bg-[#DA2128] text-white text-[12px] font-medium px-1.5 py-0.5 rounded">
              <span className="text-white text-[12px] font-bold leading-[16px]">
                -{discountPercent}%
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => openPackDetailModal(pack, true)}
          className=" font-semibold text-[#DA2128] underline text-sm"
        >
          {t("detail")}
        </button>
      </div>

      {/* Info Rows */}
      <div className="flex flex-col gap-2  border-b border-[#e5e5eacb] py-3 mb-2">
        {pack.data_per_day && (
          <div className="flex items-center gap-2">
            {/* Data Icon (SVG) */}
            <img src="/images/hdbank/ic-data.svg" alt="" className="h-6 w-6" />

            <span className="text-[14px] text-[#5C5C5C]">
              {t("data")}: {pack.data_per_day}
              {pack.data_day_unit ?? "GB"}/{t("day")}
            </span>
          </div>
        )}
        {pack.data_per_month && (
          <div className="flex items-center gap-2">
            {/* Data Icon (SVG) */}
            <img src="/images/hdbank/ic-call.svg" alt="" className="h-6 w-6" />

            <span className="text-[14px] text-[#5C5C5C]">
              {t("data")}: {pack.data_per_month}
              {pack.data_month_unit ?? "GB"}/{t("month")}
            </span>
          </div>
        )}

        {pack.free_call_minute > 0 && (
          <div className="flex items-center gap-2">
            {/* Call Icon (SVG) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 11.2733V13.2733C14.6674 13.4617 14.6282 13.6481 14.5519 13.8196C14.4757 13.9911 14.3643 14.1434 14.2255 14.266C14.0867 14.3886 13.9238 14.4786 13.7482 14.5297C13.5726 14.5808 13.3885 14.5918 13.2087 14.562C11.2118 14.2285 9.30873 13.4926 7.62667 12.4067C6.07801 11.3883 4.77289 10.0832 3.75467 8.53467C2.66383 6.84393 1.9263 4.93097 1.598 2.92467C1.56835 2.74523 1.57925 2.56156 1.62995 2.38638C1.68066 2.2112 1.77 2.04869 1.89178 1.91028C2.01356 1.77187 2.16487 1.66094 2.3352 1.58522C2.50554 1.5095 2.69088 1.47082 2.878 1.47333H4.878C5.20641 1.47051 5.52468 1.58667 5.77201 1.80002C6.01935 2.01336 6.17848 2.3091 6.21933 2.63133C6.29551 3.20839 6.43648 3.77553 6.63867 4.316C6.71886 4.52989 6.73626 4.7619 6.68868 4.98318C6.64109 5.20447 6.53061 5.40535 6.37133 5.56067L5.52467 6.40733C6.47396 8.07669 7.85265 9.45537 9.522 10.4047L10.3687 9.558C10.524 9.39872 10.7249 9.28824 10.9462 9.24065C11.1674 9.19307 11.3994 9.21047 11.6133 9.29067C12.1538 9.49285 12.7209 9.63382 13.298 9.71C13.6235 9.75125 13.9219 9.91342 14.1356 10.1653C14.3494 10.4172 14.4635 10.7408 14.46 11.0713V11.2733H14.6667Z"
                stroke="#8E8E93"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[14px] text-[#5C5C5C]">
              {t("callMinutes")}:
              <span>
                {pack.free_call_minute
                  ? t("minutesInternetwork", { minutes: pack.free_call_minute })
                  : t("freeInternal")}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom Row: Price & Action */}
      <div className="flex items-center justify-between mt-auto gap-1">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-[#DA2128] text-[16px] font-bold leading-[24px]">
              {toCurrency(pack.sale_price)}
            </span>
            <span className="text-[#8E8E93] text-[12px] font-medium leading-[16px]">
              /{pack.validity_day} {t("days")}
            </span>
          </div>
          {hasDiscount && (
            <span className="text-[#8E8E93] text-[12px] font-medium leading-[16px] line-through">
              {toCurrency(pack.price)}
            </span>
          )}
        </div>

        <Button
          variant="normal"
          size="sm"
          onClick={() => handleRegister()}
          className="!px-6 !py-2.5 !text-[14px] !font-semibold !shadow-none"
        >
          {t("register")}
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;
