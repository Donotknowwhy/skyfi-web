"use client";
import { Button } from "@/app/components/ui/Button";
import subscriberService from "@/app/services/subscriber";
import { useUserState } from "@/app/stores/user";
import { toNumber } from "@/app/utils/format";
import { retryUntil } from "@/app/utils/retry";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Slider from "react-slick";
import PackageUsageCard from "./PackageUsageCard";
import SubPackageCard from "./SubPackageCard";

const LoggedInCard = ({ mainPackages, subPackages, isLoading }) => {
  const t = useTranslations("vikki.home.simStatusCard");
  const router = useRouter();
  const { user, userVikki, sessionId, cartId } = useUserState();
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [isRenewing, setIsRenewing] = useState(false);
  const [autoBill, setAutoBill] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [packageSelected, setPackageSelected] = useState(null);

  const checkEnvironment = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const hostname =
      typeof window !== "undefined" ? window.location.hostname : "";

    return hostname.includes(".network") || apiBaseUrl.includes(".network");
  };

  useEffect(() => {
    if (!cartId) return;
    let cancelled = false;
    // Reset so switching phone numbers doesn't show the previous SIM's state.
    setAutoBill(null);
    // Retry: the autobill record may not be ready on the first call right after
    // login-with-session. Only retry on failure/empty, not on a valid "inactive".
    retryUntil(() => subscriberService.getAutobill(cartId), {
      shouldRetry: (res) => !res?.success || !res?.data,
      shouldAbort: () => cancelled,
    }).then((res) => {
      if (cancelled) return;
      if (res?.success && res?.data) setAutoBill(res.data);
    });
    return () => {
      cancelled = true;
    };
  }, [cartId]);

  const isAutoBillActive = autoBill?.auto_bill?.status === "ACTIVE";

  // login-with-session returns `is_auto_bill`: when false this subscriber isn't
  // eligible for the auto-bill feature, so hide the toggle entirely.
  const showAutoBillToggle = user?.is_auto_bill == true;

  // console.log("AutoBill status:", autoBill?.auto_bill.status);
  // console.log("AutoBill info:", autoBill);
  // console.log("isAutoBillActive:", isAutoBillActive);

  const resolvePackageId = (pkg) => {
    if (!pkg) return "";
    return (
      pkg.package_id ||
      pkg.packageId ||
      pkg.pack_code ||
      pkg.package_code ||
      pkg.packageCode ||
      pkg.code ||
      pkg.packageName ||
      ""
    );
  };

  const handleRenewConfirm = async () => {
    if (isAutoBillActive) return;
    const packageId = resolvePackageId(packageSelected);
    if (!cartId || !userVikki || !sessionId || !packageId) {
      toast.error(t("renewError"));
      return;
    }

    setIsRenewing(true);
    try {
      const response = await subscriberService.createAutobill({
        msisdn: cartId,
        package_id: packageId,
        user_id: userVikki,
        session_id: sessionId,
      });
      if (response.success) {
        // toast.success(t("renewSuccess"));
        setAutoBill(response.data || { status: "ACTIVE" });
        setShowRenewModal(false);
        const message = {
          action: "auto_bill",
          bill_id: response.data?.bill_id,
        };
        console.info("postMessage payload:", message);
        if (
          window.ReactNativeWebView &&
          window.ReactNativeWebView.postMessage
        ) {
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        }
      } else {
        toast.error(response.message || t("renewError"));
      }
    } catch {
      toast.error(t("renewError"));
    } finally {
      setIsRenewing(false);
    }
  };

  const handleCancelConfirm = async () => {
    setIsCancelling(true);
    try {
      setAutoBill(null);
      setShowCancelModal(false);
      const message = {
        action: "cancel_autobill",
        bill_id: autoBill?.auto_bill.bill_id,
      };
      console.info("postMessage payload:", message);
      if (
        window.ReactNativeWebView &&
        window.ReactNativeWebView.postMessage
      ) {
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const settings = {
    dots: mainPackages && mainPackages.length > 1,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="bg-white rounded-2xl border border-[#F1F1F1] p-4 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="bg-white rounded-xl shadow-[0px_3px_8px_0px_rgba(0,0,0,0.1)] py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-4">
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-1.5 py-2">
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5 py-2">
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="relative w-[135px] h-[135px] flex items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="bg-white rounded-2xl border border-[#F1F1F1] p-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#8A8A8A]">{t("mainAccount")}</span>
          <span className="text-lg font-semibold text-[#333333]">
            {toNumber(Number(user?.balace || 0))} VND
          </span>
        </div>
      </div>

      {mainPackages && mainPackages.length > 0 ? (
        <Slider {...settings}>
          {mainPackages.map((pkg, index) => (
            <PackageUsageCard
              key={index}
              packageData={pkg}
              t={t}
              checkEnvironment={checkEnvironment}
              showAutoBillToggle={showAutoBillToggle}
              isAutoBillActive={isAutoBillActive}
              setShowRenewModal={(value) => {
                setPackageSelected(pkg);
                setShowRenewModal(value);
              }}
              setShowCancelModal={(value) => {
                setShowCancelModal(value);
              }}
            />
          ))}
        </Slider>
      ) : null}

      {/* Sub-packages List */}
      {subPackages && subPackages.length > 0 && (
        <div className="flex flex-col gap-3">
          {subPackages.map((pkg, index) => (
            <SubPackageCard key={index} packageData={pkg} />
          ))}
        </div>
      )}

      {/* Renew Confirmation Modal */}
      {showRenewModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowRenewModal(false)}
          />
          <div
            className="relative w-full bg-white rounded-t-3xl px-6 pt-8 pb-safe flex flex-col items-center gap-4"
            style={{
              paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))",
            }}
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#FAA61A] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#FAA61A"
                  strokeWidth="2"
                />
                <path
                  d="M12 11V17"
                  stroke="#FAA61A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="8" r="1" fill="#FAA61A" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A] text-center">
              {t("renewModalTitle")}
            </h3>
            <p className="text-sm text-[#5C5C5C] text-center">
              {t("renewModalDescription")}
            </p>
            <div className="flex flex-col gap-3 w-full mt-2">
              <button
                className="w-full py-3.5 rounded-2xl border border-[#E0E0E0] text-sm font-semibold text-[#1A1A1A]"
                onClick={() => setShowRenewModal(false)}
              >
                {t("renewModalClose")}
              </button>
              <Button
                variant="normal"
                size="md"
                className="w-full rounded-2xl disabled:opacity-60"
                onClick={handleRenewConfirm}
                disabled={isRenewing}
              >
                {isRenewing ? "..." : t("renewModalConfirm")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel AutoBill Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowCancelModal(false)}
          />
          <div
            className="relative w-full bg-white rounded-t-3xl px-6 pt-8 pb-safe flex flex-col items-center gap-4"
            style={{
              paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))",
            }}
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#ED1B2F] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#ED1B2F"
                  strokeWidth="2"
                />
                <path
                  d="M15 9L9 15"
                  stroke="#ED1B2F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M9 9L15 15"
                  stroke="#ED1B2F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A] text-center">
              {t("cancelModalTitle")}
            </h3>
            <p className="text-sm text-[#5C5C5C] text-center">
              {t("cancelModalDescription")}
            </p>
            <div className="flex flex-col gap-3 w-full mt-2">
              <button
                className="w-full py-3.5 rounded-2xl border border-[#E0E0E0] text-sm font-semibold text-[#1A1A1A]"
                onClick={() => setShowCancelModal(false)}
              >
                {t("cancelModalClose")}
              </button>
              <Button
                variant="normal"
                size="md"
                className="w-full rounded-2xl disabled:opacity-60 !bg-[#ED1B2F]"
                onClick={handleCancelConfirm}
                disabled={isCancelling}
              >
                {isCancelling ? "..." : t("cancelModalConfirm")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInCard;
