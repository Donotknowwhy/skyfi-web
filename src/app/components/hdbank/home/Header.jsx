import subscriberService from "@/app/services/subscriber";
import { useUserActions, useUserState } from "@/app/stores/user";
import { getTotalQuantity } from "@/app/utils/cartService";
import { useRouter } from "@/i18n/navigation";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ShoppingCartIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// Phone Number Dropdown Component
const PhoneDropdown = ({
  phoneNumbers = [],
  selectedPhone,
  onActivateOther,
  onPhoneSwitch,
  t,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const otherPhones = phoneNumbers.filter((p) => p !== selectedPhone);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Phone with dropdown trigger */}
      {selectedPhone ? (
        <button
          className="flex items-center gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-semibold text-white">
            {selectedPhone}
          </span>
          <ChevronDownIcon
            className={`w-5 h-5 text-white transition-transform ${isOpen ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>
      ) : null}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] py-3 px-4 min-w-[200px] z-50">
          {/* Other Phone Numbers */}
          {otherPhones.length > 0 && (
            <div className="flex flex-col gap-2 mb-3">
              {otherPhones.map((phone, index) => (
                <button
                  key={index}
                  className="flex items-center gap-2 py-2 text-left hover:bg-gray-50 rounded-lg px-2 -mx-2"
                  onClick={() => {
                    onPhoneSwitch?.(phone);
                    setIsOpen(false);
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                  <span className="text-sm text-[#333333]">{phone}</span>
                </button>
              ))}
            </div>
          )}

          {/* Activate Another SIM */}
          {otherPhones.length < 2 && (
            <button
              className="w-full text-left py-2 text-sm font-medium text-[#DA2128] hover:bg-gray-50 rounded-lg px-2 -mx-2 mb-2"
              onClick={() => {
                onActivateOther?.();
                setIsOpen(false);
              }}
            >
              {t("activateOtherSim")}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Skeleton for logged in header
const LoggedInHeaderSkeleton = ({ totalQuantity, router }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-1 py-4">
        {/* Top Row: Greeting and Cart */}
        <div className="flex flex-row items-center justify-between px-4">
          {/* Greeting Skeleton */}
          <div className="flex-1 flex flex-row items-center gap-1">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Cart Button with badge */}
          <button
            className="relative"
            onClick={() => router.push("/hdbank-app/cart")}
          >
            <ShoppingCartIcon
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 text-sm font-medium text-white bg-[#DA2128] rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>

        {/* Phone Number Skeleton */}
        <div className="flex flex-row items-center px-4 gap-1">
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const sendMessage = () => {
  const message = {
    action: "back_to_app",
  };
  console.log("message to app ", message);
  try {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  } catch (error) {
    console.log("error send message to app ", error);
  }
};

// Logged in header component
const LoggedInHeader = ({
  userName,
  phoneNumbers = [],
  selectedPhone,
  onActivateOther,
  onTopup,
  onPhoneSwitch,
  totalQuantity,
  router,
}) => {
  const t = useTranslations("hdbank.home.header");

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greetingMorning");
    if (hour < 18) return t("greetingAfternoon");
    return t("greetingEvening");
  };

  return (
    <div className="w-full flex flex-col  ">
      <div className="flex flex-col gap-1 py-4">
        {/* Top Row: Greeting and Cart */}
        <div className="flex flex-row items-center justify-between px-4">
          {/* Left Spacer back button */}
          <button
            className="w-6 h-6 rounded animate-pulse mr-4"
            onClick={() => sendMessage()}
          >
            <ChevronLeftIcon
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
          </button>

          {/* Greeting with sun icon */}
          <div className="flex-1 flex flex-row items-center  gap-1">
            <SunIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
            <p className="text-xs font-semibold text-white">
              {getGreeting()}, {userName}
            </p>
          </div>

          {/* Cart Button with badge */}
          <button
            className="relative"
            onClick={() => router.push("/hdbank-app/cart")}
          >
            <ShoppingCartIcon
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 text-sm font-medium text-white bg-[#DA2128] rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>

        {/* Phone Number Row with Dropdown */}
        <div className="flex flex-row items-center px-4">
          <PhoneDropdown
            phoneNumbers={phoneNumbers}
            selectedPhone={selectedPhone}
            onActivateOther={onActivateOther}
            onTopup={onTopup}
            onPhoneSwitch={onPhoneSwitch}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

// Default header component (not logged in)
const DefaultHeader = ({ totalQuantity, router, t }) => {
  return (
    <div className="w-full flex flex-col">
      {/* Action Bar */}
      <div className="flex flex-row items-center justify-between px-4 py-2 pb-3">
        <button
          className="w-6 h-6 rounded animate-pulse mr-4"
          onClick={() => sendMessage()}
        >
          <ChevronLeftIcon
            className="w-6 h-6 text-white"
            strokeWidth={1.5}
          />
        </button>

        {/* Greeting */}
        <div className="flex-1 flex flex-row items-center  gap-2">
          <SunIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
          <p className="text-[13px] font-semibold text-white">
            {t("greeting")}
          </p>
        </div>

        {/* Cart Button */}
        <div className=" flex justify-end">
          <button
            className="p-1 -mr-1 relative"
            onClick={() => router.push("/hdbank-app/cart")}
          >
            <ShoppingCartIcon
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 block text-[10px] w-4 h-4 text-white rounded-full bg-red-500 ring-2 ring-white">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = ({ onActivateOther, onTopup }) => {
  const t = useTranslations("hdbank.home.header");
  const router = useRouter();
  const { cartItems, isLoggedIn, cartId, user, phoneDktts } = useUserState();
  const { setUser, switchPhone, convertPhoneFormat } = useUserActions();
  const totalQuantity = getTotalQuantity(cartItems);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch subscriber info when logged in
  useEffect(() => {
    const fetchSubscriberInfo = async () => {
      if (!isLoggedIn || !cartId) return;

      setIsLoading(true);
      if (!cartId.startsWith("070")) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await subscriberService.getSubscriberInfo(cartId);
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching subscriber info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriberInfo();
  }, [isLoggedIn, cartId]);

  // Build phone numbers list from user.phone and phoneDktts
  const getAllPhones = () => {
    const phones = [];

    // Always add original phone from user.phone (from login response)
    if (user?.phone) {
      phones.push(user.phone);
    }

    // Add phone_dktts (converted to 0xxx format)
    if (phoneDktts && Array.isArray(phoneDktts)) {
      const convertedPhones = phoneDktts.map((phone) =>
        convertPhoneFormat(phone),
      );
      phones.push(...convertedPhones);
    }

    // Remove duplicates
    return [...new Set(phones)].filter((phone) => phone.startsWith("070"));
  };

  // Show skeleton while loading subscriber info
  if (isLoggedIn && (!user || isLoading)) {
    return (
      <LoggedInHeaderSkeleton totalQuantity={totalQuantity} router={router} />
    );
  }

  if (isLoggedIn && user) {
    const phoneNumbers = getAllPhones();
    const userName = user.full_name || "";
    const currentSelectedPhone =
      cartId && phoneNumbers.includes(cartId) ? cartId : phoneNumbers[0];

    return (
      <LoggedInHeader
        userName={userName}
        phoneNumbers={phoneNumbers}
        selectedPhone={currentSelectedPhone}
        onActivateOther={onActivateOther}
        onTopup={onTopup}
        onPhoneSwitch={switchPhone}
        totalQuantity={totalQuantity}
        router={router}
      />
    );
  }

  return <DefaultHeader totalQuantity={totalQuantity} router={router} t={t} />;
};

export default Header;
