"use client";

import { ItemSimCheckout } from "@/app/components/hdbank/checkout/ListProduct";
import { useUserActions, useUserState } from "@/app/stores/user";
import { getTotalQuantity } from "@/app/utils/cartService";
import { toCurrency } from "@/app/utils/format";
import { modal, useModal } from "@/app/utils/modal";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const HDBankCartModal = () => {
  const { close } = useModal();
  const router = useRouter();
  const t = useTranslations("hdbank.cart");
  const { cartItems } = useUserState();
  const { setSims } = useUserActions();

  const totalQuantity = getTotalQuantity(cartItems);
  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.total_price) || 0),
    0,
  );
  const isEmpty = cartItems.length === 0;

  const handleCheckout = () => {
    if (isEmpty) return;
    setSims(cartItems);
    router.push("/hdbank-app/checkout/payment");
    close();
  };

  const handleViewCart = () => {
    router.push("/hdbank-app/cart");
    close();
  };

  const handleContinueShopping = () => {
    router.push("/hdbank-app/sim-data");
    close();
  };

  return (
    <div className="w-full flex flex-col h-full bg-white rounded-t-[16px] sm:rounded-2xl overflow-hidden">
      <div className="flex flex-col items-center pt-3 pb-2 flex-shrink-0 bg-white z-10 relative border-b border-[#F5F5F5]">
        <div className="h-1 w-10 bg-[#E6E7EB] rounded-full mb-3" />
        <h3 className="text-[16px] font-semibold text-[#1C1C1E] font-be-vietnam-pro">
          {t("title")}
        </h3>
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
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

      <div className="px-5 py-2 overflow-y-auto flex-1 min-h-0">
        {isEmpty ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <h3 className="font-be-vietnam-pro font-semibold text-[16px] leading-[24px] text-[#333333]">
              {t("emptyTitle")}
            </h3>
            <p className="font-be-vietnam-pro text-[14px] leading-[20px] text-[#5C5C5C] max-w-[271px]">
              {t("emptyDescription")}
            </p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item.id ?? index}
              className="py-3 border-b border-[#F1F1F1] last:border-b-0"
            >
              <ItemSimCheckout item={item} isDelete={true} t={t} />
            </div>
          ))
        )}
      </div>

      <div className="px-5 py-3 border-t border-[#F1F1F1] bg-white flex-shrink-0 pb-8 sm:pb-3 z-10">
        {!isEmpty && (
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-[14px] font-medium text-[#333333] font-be-vietnam-pro">
              {t("total")}
            </span>
            <span className="text-[20px] font-semibold text-[#DA2128] font-be-vietnam-pro tracking-[-0.4px]">
              {toCurrency(total)}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {isEmpty ? (
            <button
              onClick={handleContinueShopping}
              className="w-full py-3 rounded-full text-white font-semibold text-[16px] font-be-vietnam-pro"
              style={{
                background:
                  "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)",
              }}
            >
              {t("buySim")}
            </button>
          ) : (
            <>
              <button
                onClick={handleViewCart}
                className="w-full py-3 rounded-full bg-white text-[#1C1C1E] border border-[#E5E5E5] font-semibold text-[16px] font-be-vietnam-pro"
              >
                {t("viewCart")} ({totalQuantity})
              </button>
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-full text-white font-semibold text-[16px] font-be-vietnam-pro"
                style={{
                  background:
                    "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)",
                }}
              >
                {t("checkout")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const showModalCartHDBank = () => {
  modal.open({
    render: <HDBankCartModal />,
    closeButton: false,
    boxClassName:
      "w-full max-w-[480px] sm:max-w-md bg-white !p-0 !rounded-t-[16px] sm:!rounded-2xl overflow-hidden flex flex-col max-h-[90vh]",
    typeModal: "sheet",
    classContainer: "!p-0",
  });
};

export default HDBankCartModal;
