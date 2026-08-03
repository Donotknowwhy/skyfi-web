"use client";

import { usePackageHDBank } from "@/app/hooks/usePackageHDBank";
import { toCurrency } from "@/app/utils/format";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { modal } from "@/app/utils/modal";
import PdfViewerContent from "@/app/components/modals/hdbank/modalPdfViewer";

const PackageItem = ({ pack, isSelected, onSelect, count, total }) => {
  const { openPackDetailModal } = usePackageHDBank();
  const t = useTranslations("hdbank.packageCard");
  const hasDiscount = pack.price > pack.sale_price;
  const discountPercent = hasDiscount
    ? Math.round(((pack.price - pack.sale_price) / pack.price) * 100)
    : 0;

  const isVikki = pack.vikki_event ? true : false;

  return (
    <div
      className={`relative rounded-[16px] border cursor-pointer overflow-hidden transition-all ${isSelected ? "border-[#DA2128] bg-[#FFF5F0]" : "border-[#E5E5E5] bg-white"}`}
      onClick={() => onSelect(pack)}
    >
      <div
        className={clsx(
          "flex justify-between items-start  p-4 ",
          isVikki
            ? "border-[#DA2128] bg-[linear-gradient(90deg,#DA2128_0.2%,#DA2128_50.07%,#F9A61C_75%,#F9C016_84.97%,#FFDD00_99.93%)]"
            : "",
        )}
      >
        <div className="flex items-center gap-1">
          {isVikki && (
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6 7.5H16.11C16.2703 7.1731 16.3543 6.814 16.3557 6.45C16.3557 5.80022 16.0976 5.17705 15.6381 4.71759C15.1786 4.25812 14.5555 4 13.9057 4C12.7038 4 11.6552 4.84 10.874 5.7367C9.88 4.5894 8.8643 4 7.85 4C7.20022 4 6.57705 4.25812 6.11759 4.71759C5.65812 5.17705 5.4 5.80022 5.4 6.45C5.4021 6.814 5.4861 7.1731 5.6457 7.5H5.4C5.0287 7.5 4.6726 7.6475 4.41005 7.91005C4.1475 8.1726 4 8.5287 4 8.9V10.3C4 10.4857 4.07375 10.6637 4.20503 10.795C4.3363 10.9262 4.51435 11 4.7 11H17.3C17.4857 11 17.6637 10.9262 17.795 10.795C17.9263 10.6637 18 10.4857 18 10.3V8.9C18 8.5287 17.8525 8.1726 17.5899 7.91005C17.3274 7.6475 16.9713 7.5 16.6 7.5ZM9.6406 7.5H7.85C7.57152 7.5 7.30445 7.38938 7.10754 7.19246C6.91062 6.99555 6.8 6.72848 6.8 6.45C6.8 6.17152 6.91062 5.90445 7.10754 5.70754C7.30445 5.51062 7.57152 5.4 7.85 5.4C8.48 5.4 9.25 5.9278 10.0144 6.8854C9.8611 7.1213 9.74 7.3299 9.6406 7.5ZM13.9106 7.5H11.2912C11.9443 6.5424 12.9509 5.4 13.9085 5.4C14.187 5.4 14.454 5.51062 14.651 5.70754C14.8479 5.90445 14.9585 6.17152 14.9585 6.45C14.9585 6.72848 14.8479 6.99555 14.651 7.19246C14.454 7.38938 14.187 7.5 13.9085 7.5H13.9106ZM11.7 12.4H10.3V18H11.7V12.4ZM8.9 12.4H5.4V16.6C5.4 16.9713 5.5475 17.3274 5.81005 17.5899C6.0726 17.8525 6.4287 18 6.8 18H8.9V12.4ZM13.1 12.4V18H15.2C15.5713 18 15.9274 17.8525 16.1899 17.5899C16.4525 17.3274 16.6 16.9713 16.6 16.6V12.4H13.1Z"
                fill="white"
              />
            </svg>
          )}
          <h4
            className={clsx(
              "text-[16px] font-bold",
              isVikki ? "text-white" : "text-[#1C1C1E]",
            )}
          >
            {isVikki ? (
              <>
                {t("vikkiGift")}
                {count != null && total != null ? (
                  <span className="font-bold"> ({count}/{total})</span>
                ) : null}
              </>
            ) : (
              pack.name
            )}
          </h4>
          {/* {hasDiscount && (
            <span className="bg-[#DA2128] text-white text-[12px] font-medium px-1.5 py-0.5 rounded">
              -{discountPercent}%
            </span>
          )} */}
        </div>

        {isVikki ? (
          <button
            onClick={() => openPackDetailModal(pack, false)}
            className=" font-semibold text-[#DA2128] underline text-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 1.75C5.44365 1.75 1.75 5.44365 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25C14.5563 18.25 18.25 14.5563 18.25 10C18.25 5.44365 14.5563 1.75 10 1.75ZM10 3.25C6.27208 3.25 3.25 6.27208 3.25 10C3.25 13.7279 6.27208 16.75 10 16.75C13.7279 16.75 16.75 13.7279 16.75 10C16.75 6.27208 13.7279 3.25 10 3.25ZM9.16666 6.66667C9.16666 6.20643 9.53976 5.83333 10 5.83333C10.4602 5.83333 10.8333 6.20643 10.8333 6.66667C10.8333 7.1269 10.4602 7.5 10 7.5C9.53976 7.5 9.16666 7.1269 9.16666 6.66667ZM9.25 8.75V14.1667H10.75V8.75H9.25Z"
                fill="white"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => openPackDetailModal(pack, false)}
            className=" font-semibold text-[#DA2128] underline text-sm"
          >
            {t("detail")}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-4 px-4 border-t border-gray-100">
        {/* Data Info */}
        {pack.data_per_day && pack.data_per_day > 0 && (
          <div className="flex items-center gap-2">
            <div className="rounded flex items-center justify-center">
              <img src="/images/hdbank/ic-data.svg" alt="" className="h-6 w-6" />
            </div>
            <span className="text-[14px] text-[#5C5C5C]">
              Data: {pack.data_per_day}GB/{t("day")}
            </span>
          </div>
        )}
        {(!pack.data_per_day || pack.data_per_day <= 0) &&
          pack.data_per_month &&
          pack.data_per_month > 0 && (
            <div className="flex items-center gap-2">
              <div className=" bg-gray-100 rounded flex items-center justify-center">
                <img src="/images/hdbank/ic-data.svg" alt="" className="h-6 w-6" />
              </div>
              <span className="text-[14px] text-[#5C5C5C]">
                Data: {pack.data_per_month}GB/{t("month")}
              </span>
            </div>
          )}
        {/* Call Info */}
        {pack.free_call_minute > 0 ? (
          <div className="flex items-center gap-2">
            <img src="/images/hdbank/ic-call.svg" alt="" className="h-6 w-6" />

            <span className="text-[14px] text-[#5C5C5C]">
              {t("callMinutes")}:{" "}
              <span>
                {pack.free_call_minute
                  ? t("minutesInternetwork", { minutes: pack.free_call_minute })
                  : t("freeInternal")}
              </span>
            </span>
          </div>
        ) : null}
        {isVikki && (
          <>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6.6001V10.4834"
                  stroke="#818385"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 13.4C10.3452 13.4 10.625 13.1202 10.625 12.775C10.625 12.4298 10.3452 12.15 10 12.15C9.65482 12.15 9.375 12.4298 9.375 12.775C9.375 13.1202 9.65482 13.4 10 13.4Z"
                  fill="#818385"
                />
                <path
                  d="M10.0001 17.7083C14.2573 17.7083 17.7084 14.2572 17.7084 9.99996C17.7084 5.74276 14.2573 2.29163 10.0001 2.29163C5.74289 2.29163 2.29175 5.74276 2.29175 9.99996C2.29175 14.2572 5.74289 17.7083 10.0001 17.7083Z"
                  stroke="#818385"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-[14px] text-[#5C5C5C]">
                {t("expiry", { days: pack.validity_day })}
              </span>
            </div>
            <p className="text-[14px] text-[#5C5C5C] ">
              <b>{t("giftNoteLabel")}</b>
              {t("giftNoteContent")}
              <a
                href="/pdf/role500vikki.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  modal.open({
                    render: <PdfViewerContent pdfUrl="/pdf/role500vikki.pdf" title={t("giftNoteRules")} />,
                    closeButton: false,
                    boxClassName: "w-[100vw] h-[100vh] min-h-screen max-w-full !rounded-none !p-0 !m-0 overflow-hidden",
                    classContainer: "!p-0 !m-0"
                  });
                }}
                className="text-[#DA2128] underline cursor-pointer"
              >
                {t("giftNoteRules")}
              </a>
            </p>
          </>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-baseline justify-between gap-2 p-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] font-bold text-[#DA2128]">
              {toCurrency(pack.sale_price ?? 0)}
            </span>
            <span className="text-[12px] text-gray-400">
              / {pack.validity_day} {t("day")}
            </span>
          </div>
          {hasDiscount && (
            <span className="text-[#8E8E93] text-[12px] font-medium leading-[16px] line-through">
              {toCurrency(pack.price)}
            </span>
          )}
        </div>
        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
          {isSelected && <div className="w-3 h-3 bg-[#DA2128] rounded-full" />}
        </div>
      </div>
    </div>
  );
};

export default PackageItem;
