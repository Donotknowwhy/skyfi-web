"use client";

import { useUserActions, useUserState } from "@/app/stores/user";
import { getTotalQuantity } from "@/app/utils/cartService";
import { toCurrency } from "@/app/utils/format";
import { modal, useModal } from "@/app/utils/modal";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.66663 4.66667H13.3333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66663 7.33333V11.3333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33325 7.33333V11.3333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33325 4.66667L3.99992 12.6667C3.99992 13.0203 4.1404 13.3594 4.39044 13.6095C4.64049 13.8595 4.97963 14 5.33325 14H10.6666C11.0202 14 11.3593 13.8595 11.6094 13.6095C11.8594 13.3594 12 13.0203 12 12.6667L12.6666 4.66667"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 4.66667V2.66667C6 2.31304 6.14048 1.97391 6.39052 1.72386C6.64057 1.47381 6.97971 1.33333 7.33333 1.33333H8.66667C9.02029 1.33333 9.35943 1.47381 9.60948 1.72386C9.85952 1.97391 10 2.31304 10 2.66667V4.66667"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ModalCart = () => {
  const { close } = useModal();
  const router = useRouter();
  const t = useTranslations("vikki.cart");
  const { cartItems } = useUserState();

  const totalQuantity = getTotalQuantity(cartItems);
  const { removeItem, setSims } = useUserActions();

  const handleCheckout = () => {
    setSims(cartItems);
    router.push("/app-vikki/checkout/payment");
    close();
  };
  const handleViewCart = () => {
    router.push("/app-vikki/cart");
    close();
  };

  const total = cartItems.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0);
  console.log("total", total);

  return (
    <div className="w-full flex flex-col h-full bg-white rounded-t-[10px] sm:rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center pt-3 pb-2 flex-shrink-0 bg-white z-10 relative">
        <div className="h-1 w-10 bg-[#E6E7EB] rounded-full mb-3" />
        <h3 className="text-[16px] font-semibold text-[#0C0C0E] font-be-vietnam-pro">
          {t("title")}
        </h3>
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label={t("close")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#0C0C0E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* List */}
      <div className="px-5 py-2 overflow-y-auto flex-1 min-h-0">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center py-4 border-b border-gray-100 last:border-0 "
          >
            {/* Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 mr-3 relative">
              <Image
                src={item.icon || "/assets/flags/default.png"}
                alt={item.product_name || "eSIM Icon"}
                fill
                className="object-cover"
                onError={(e) => { }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 mr-2">
              <p className="text-[13px] font-semibold text-[#0C0C0E] leading-5 font-be-vietnam-pro uppercase">
                {item.product_name}
              </p>
              <p className=" text-[14px]  text-[#5C5C5C]">
                {item.sim_type !== "ESIM_TRAVEL" && (
                  <span>
                    {item.sim_type == "USIM" ? t("physicalSim") : t("esim")}
                  </span>
                )}
              </p>
              <div className="font-inter text-[14px] text-[#5C5C5C]">
                {item.sim_type == "ESIM_TRAVEL" ? item.pack_code : ""}
              </div>
              <div className="font-inter text-[14px] text-[#5C5C5C]">
                {item.sim_type == "ESIM_TRAVEL"
                  ? t("quantity") + ": " + item.quantity
                  : item.pack_name
                    ? t("package") + ": " + item.pack_name
                    : ""}
              </div>
            </div>

            {/* Price & Delete */}
            <div className="flex flex-col items-end gap-1">
              <div className="text-right flex items-baseline gap-1">
                <span className="text-[14px] font-semibold text-[#0C0C0E] font-be-vietnam-pro">
                  {toCurrency(item.total_price)}
                </span>
              </div>
              {/* {item.originalPrice && item.originalPrice > item.sale_price && (
                     <span className="text-[10px] text-[#0C0C0E]/60 line-through font-be-vietnam-pro">
                        {new Intl.NumberFormat('vi-VN').format(item.originalPrice)} VND
                     </span>
                  )} */}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="ml-3 w-[30px] h-[30px] flex items-center justify-center bg-[#D2008C] rounded-md hover:bg-[#A0006B] transition-colors flex-shrink-0"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-50 bg-white flex-shrink-0 pb-8 sm:pb-3 z-10">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-[12px] font-medium text-[#0C0C0E] font-be-vietnam-pro">
            {t("total")}
          </span>
          <div className="flex items-baseline gap-1 text-[#D2008C]">
            <span className="text-[20px] font-semibold font-be-vietnam-pro tracking-[-0.6px]">
              {toCurrency(total)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleViewCart}
            className="w-full py-3 rounded-full bg-gray-100 text-[#0C0C0E] font-semibold text-[16px] hover:bg-gray-200 transition-colors font-vikki"
          >
            {t("viewCart")} ({totalQuantity})
          </button>
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full py-3 rounded-full text-white font-semibold text-[16px] relative overflow-hidden font-vikki !disabled:opacity-50 !disabled:cursor-not-allowed flex items-center justify-center"
            style={{
              background:
                cartItems.length !== 0
                  ? "linear-gradient(90deg, #0000FF 0%, #8B00FF 50%, #FF6B00 100%)"
                  : "#e5e7eb",
            }}
          >
            {t("checkout")}
          </button>
        </div>

        <div className="h-[10px] w-full flex justify-center items-end mt-2">
          <div className="w-[134px] h-[5px] bg-black rounded-full opacity-0 sm:opacity-100"></div>
        </div>
      </div>
    </div>
  );
};

export const showModalCart = () => {
  modal.open({
    render: <ModalCart />,
    closeButton: false,
    boxClassName:
      "w-full max-w-[480px] sm:max-w-md bg-white !p-0 !rounded-t-[10px] sm:!rounded-2xl overflow-hidden flex flex-col max-h-[90vh]",
    typeModal: "sheet",
    classContainer: "!p-0",
  });
};

export default ModalCart;
