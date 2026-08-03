"use client";

import {
  showModalMess,
  showModalMessVikki,
} from "@/app/components/modals/modalMess";
import { getTotalQuantity } from "@/app/utils/cartService";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { useUserActions, useUserState } from "../../../stores/user";
import { toCurrency } from "../../../utils/format";

// Delete Icon Component
const DeleteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.33325 5.83333H16.6666"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33325 9.16667V14.1667"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6667 9.16667V14.1667"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.16675 5.83333L5.00008 15.8333C5.00008 16.2754 5.17568 16.6993 5.48824 17.0118C5.80079 17.3244 6.22472 17.5 6.66675 17.5H13.3334C13.7754 17.5 14.1994 17.3244 14.5119 17.0118C14.8245 16.6993 15.0001 16.2754 15.0001 15.8333L15.8334 5.83333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 5.83333V3.33333C7.5 2.89131 7.67559 2.46738 7.98816 2.15482C8.30072 1.84226 8.72464 1.66667 9.16667 1.66667H10.8333C11.2754 1.66667 11.6993 1.84226 12.0118 2.15482C12.3244 2.46738 12.5 2.89131 12.5 3.33333V5.83333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Minus Circle Icon
export const MinusCircleIcon = ({ disabled }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {disabled ? (
      <>
        <circle cx="16" cy="16" r="15.5" stroke="#E0E0E0" strokeWidth="1" />
        <path
          d="M10 16H22"
          stroke="#E0E0E0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ) : (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 1.33334C7.89981 1.33334 1.33331 7.89984 1.33331 16C1.33331 24.1001 7.89981 30.6667 16 30.6667C24.1001 30.6667 30.6666 24.1001 30.6666 16C30.6666 7.89984 24.1001 1.33334 16 1.33334ZM10.6666 14.6667C9.93027 14.6667 9.33331 15.2636 9.33331 16C9.33331 16.7364 9.93027 17.3333 10.6666 17.3333H21.3333C22.0697 17.3333 22.6666 16.7364 22.6666 16C22.6666 15.2636 22.0697 14.6667 21.3333 14.6667H10.6666Z"
        fill="#0000FF"
      />
    )}
  </svg>
);

// Plus Circle Icon
export const PlusCircleIcon = ({ disabled }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {disabled ? (
      <>
        <circle cx="16" cy="16" r="15.5" stroke="#E0E0E0" strokeWidth="1" />
        <path
          d="M16 10V22M10 16H22"
          stroke="#E0E0E0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ) : (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 1.33334C7.89981 1.33334 1.33331 7.89984 1.33331 16C1.33331 24.1001 7.89981 30.6667 16 30.6667C24.1001 30.6667 30.6666 24.1001 30.6666 16C30.6666 7.89984 24.1001 1.33334 16 1.33334ZM16 9.33334C16.7364 9.33334 17.3333 9.9303 17.3333 10.6667V14.6667H21.3333C22.0697 14.6667 22.6666 15.2636 22.6666 16C22.6666 16.7364 22.0697 17.3333 21.3333 17.3333H17.3333V21.3333C17.3333 22.0697 16.7364 22.6667 16 22.6667C15.2636 22.6667 14.6666 22.0697 14.6666 21.3333V17.3333H10.6666C9.93027 17.3333 9.33331 16.7364 9.33331 16C9.33331 15.2636 9.93027 14.6667 10.6666 14.6667H14.6666V10.6667C14.6666 9.9303 15.2636 9.33334 16 9.33334Z"
        fill="#0000FF"
      />
    )}
  </svg>
);

// Arrow Left Icon
const ArrowLeftIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function VikkiCartPage() {
  const t = useTranslations("vikki.cart");
  const router = useRouter();
  const { cartItems } = useUserState();
  const { removeItem, pusQuantity, minusQuantity, updateQuantity, setSims } =
    useUserActions();
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (Number(item.total_price) || 0);
  }, 0);

  const totalQuantity = getTotalQuantity(cartItems);

  useEffect(() => {
    window.addEventListener("scroll", () => setSticky(headerRef.current));
    return () =>
      window.removeEventListener("scroll", () => setSticky(headerRef.current));
  }, []);

  const handleBack = () => {
    router.back();
  };

  const proceedToCheckout = () => {
    setSims(cartItems);
    router.push("/app-vikki/checkout/payment");
  };

  function setSticky(element) {
    const rect = element.getBoundingClientRect();
    console.log(rect.top, rect.bottom, window.innerHeight);
    if (rect.top <= 0) {
      element.style.position = "sticky";
      element.style.top = "0";
      element.style.zIndex = "10";
      element.style.backgroundColor = "#fff";
      element.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    } else {
      element.style.position = "relative";
      element.style.top = "auto";
      element.style.zIndex = "0";
      element.style.backgroundColor = "transparent";
      element.style.boxShadow = "none";
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(/figma-images/background.png)`,
      }}
    >
      {/* Header with Back Button */}
      <div className="flex items-center px-4 py-3 flex-shrink-0">
        <button onClick={handleBack} className="p-3 -ml-3">
          <ArrowLeftIcon />
        </button>
      </div>

      {/* Title Section */}
      <div
        className={`px-4 pb-4 flex-shrink-0 transition-all duration-200`}
        ref={headerRef}
      >
        <h1 className="font-be-vietnam-pro font-semibold text-[28px] leading-[36px] text-[#333333]">
          {t("title")}
        </h1>
        <p className="font-be-vietnam-pro text-[14px] leading-[20px] text-[#5C5C5C] mt-1">
          {t("itemCount", { count: totalQuantity })} | {toCurrency(totalPrice)}
        </p>
      </div>

      {/* Main Content - Scrollable */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 pb-4"
      >
        {cartItems.length > 0 ? (
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Cart Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-[#F1F1F1]">
              <p className="flex-1 font-be-vietnam-pro font-semibold text-[14px] text-[#333333]">
                {t("productHeader")}
              </p>
              <p className="flex-1 font-be-vietnam-pro font-semibold text-[14px] text-[#333333] text-right">
                {t("priceHeader")}
              </p>
            </div>

            {/* Cart Items */}
            <div className="px-4">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  removeItem={removeItem}
                  pusQuantity={pusQuantity}
                  minusQuantity={minusQuantity}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="px-4 pt-4 pb-4">
              <h3 className="font-be-vietnam-pro font-semibold text-[18px] text-[#333333] mb-2">
                {t("orderSummary")}
              </h3>

              {/* Products Total */}
              <div className="flex justify-between py-2 border-b border-[#F1F1F1]">
                <span className="font-be-vietnam-pro text-[14px] text-[#333333]">
                  {t("itemCount", { count: totalQuantity })}
                </span>
                <span className="font-be-vietnam-pro font-medium text-[14px] text-[#333333]">
                  {toCurrency(totalPrice)}
                </span>
              </div>

              {/* Tax & Service Fee */}
              <div className="flex justify-between py-2 border-b border-[#F1F1F1]">
                <span className="font-be-vietnam-pro text-[14px] text-[#333333]">
                  {t("taxAndFee")}
                </span>
                <span className="font-be-vietnam-pro font-medium text-[14px] text-[#333333]">
                  {t("included")}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between py-3">
                <span className="font-be-vietnam-pro font-medium text-[14px] text-[#333333]">
                  {t("total")}
                </span>
                <span className="font-be-vietnam-pro font-semibold text-[18px] text-[#333333]">
                  {toCurrency(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-10 py-8">
            {/* Empty Cart Illustration */}
            <div className="w-[100px] h-[100px] relative">
              <Image
                src="/figma-images/empty-cart.svg"
                alt="Empty Cart"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center gap-3">
              <h3 className="font-be-vietnam-pro font-semibold text-[16px] leading-[24px] text-center text-[#333333]">
                {t("emptyTitle")}
              </h3>
              <p className="font-be-vietnam-pro text-[14px] leading-[20px] text-center text-[#5C5C5C] w-[271px]">
                {t("emptyDescription")}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => router.push("/app-vikki/sim-data")}
              className="w-[343px] py-3 px-4 rounded-full text-white font-be-vietnam-pro font-semibold text-[16px]"
              style={{
                background:
                  "linear-gradient(39deg, #2C4EFF 0%, #0000FF 4%, #6100FF 47%, #DA0191 78%, #FF8A00 98%, #FFB907 100%)",
              }}
            >
              {t("buySim")}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      {cartItems.length > 0 && (
        <div className="bg-white px-4 pt-3 pb-8 rounded-t-2xl fixed bottom-0 left-0 right-0">
          <button
            onClick={proceedToCheckout}
            className="w-full py-3 px-4 rounded-full text-white font-be-vietnam-pro font-semibold text-[16px]"
            style={{
              background:
                "linear-gradient(90deg, #0000FF 0%, #8B00FF 50%, #FF6B00 100%)",
            }}
          >
            {t("checkout")}
          </button>
        </div>
      )}
    </div>
  );
}

// Cart Item Component
const CartItemRow = ({
  item,
  removeItem,
  pusQuantity,
  minusQuantity,
  updateQuantity,
}) => {
  const t = useTranslations("vikki.cart");
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  const onChange = (e) => {
    let newValue = e.target.value;
    const RE_DIGIT = /^\d+$/;
    const isTargetValueDigit = RE_DIGIT.test(newValue);
    if (!isTargetValueDigit && newValue !== "") {
      return;
    }
    if (Number(newValue) >= 50) {
      setQuantity(50);
      return;
    }
    setQuantity(newValue);
  };

  const inputOnBlur = () => {
    const newQuantity = Number(quantity);

    if (newQuantity > 50) {
      showModalMessVikki({
        label: t("notification"),
        message: t("maxQuantity"),
        type: "error",
      });
      setQuantity(50);
      updateQuantity(item.id, 50);
    } else if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    } else {
      showModalMessVikki({
        label: t("notification"),
        message: t("minQuantity"),
        type: "error",
      });
      setQuantity(1);
      updateQuantity(item.id, 1);
    }
  };

  useEffect(() => {
    if (quantity !== item.quantity) {
      setQuantity(item.quantity || 1);
    }
  }, [item.id, item.quantity]);

  const handleMinus = () => {
    if (item.quantity <= 1) {
      showModalMessVikki({
        label: t("notification"),
        message: t("minQuantity"),
        type: "error",
      });
      return;
    }
    minusQuantity(item.id);
  };

  const handlePlus = () => {
    if (item.quantity >= 50) {
      showModalMessVikki({
        label: t("notification"),
        message: t("maxQuantity"),
        type: "error",
      });
      return;
    }
    pusQuantity(item.id);
  };

  return (
    <div className="flex gap-3 items-start py-2 border-b border-[#F1F1F1] last:border-0">
      {/* Product Icon */}
      <div className="w-10 h-10 rounded-full flex-shrink-0 border border-[#F1F1F1] overflow-hidden relative">
        {item.icon && !imageError ? (
          <Image
            src={item.icon}
            alt={item.product_name}
            ref={imgRef}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : item.icon && imageError ? (
          <Image
            src={"/globe.svg"}
            alt={item.product_name}
            fill
            className="object-cover w-4 h-4"
          />
        ) : (
          <div className="w-full h-full bg-[#ED1B2F] flex items-center justify-center">
            <span className="text-white text-xs font-bold">SF</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 ">
        <p className="font-be-vietnam-pro font-semibold text-[14px] leading-[20px] text-[#333333]">
          {item.product_name}
        </p>
        <p className="font-be-vietnam-pro text-[14px] leading-[20px] text-[#5C5C5C]">
          {item.sim_type !== "ESIM_TRAVEL" ? (
            <span>
              {item.sim_type == "USIM" ? t("physicalSim") : t("esim")}
            </span>
          ) : (
            <span>{item.pack_code}</span>
          )}
        </p>
        <p className="font-be-vietnam-pro text-[14px] leading-[20px] text-[#5C5C5C]">
          {item.pack_name}
        </p>

        {/* Quantity Controls for Travel eSIM */}
        {item.sim_type === "ESIM_TRAVEL" && (
          <div className="flex items-center gap-2 mt-2">
            <button onClick={handleMinus} disabled={item.quantity <= 1}>
              <MinusCircleIcon disabled={item.quantity <= 1} />
            </button>
            <input
              className="font-inter text-[16px] font-semibold text-[#333333] w-[40px] text-center border-0 outline-none"
              value={quantity}
              onBlur={inputOnBlur}
              onChange={onChange}
              maxLength={2}
            />
            <button onClick={handlePlus} disabled={item.quantity >= 50}>
              <PlusCircleIcon disabled={item.quantity >= 50} />
            </button>
          </div>
        )}
      </div>

      {/* Price & Delete */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex flex-col items-end">
          <span className="font-be-vietnam-pro font-medium text-[16px] text-[#333333]">
            {toCurrency(item.total_price)}
          </span>
          {item.originalPrice && item.originalPrice > item.total_price && (
            <span className="font-be-vietnam-pro text-[14px] text-[#8A8A8A] line-through">
              {toCurrency(item.originalPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="w-8 h-8 flex items-center justify-center bg-[#D2008C] rounded-md hover:bg-[#A0006B] transition-colors"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
