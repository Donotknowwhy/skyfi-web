"use client";

import { showModalChangeSimHDBank } from "@/app/components/hdbank/modals/showModalChangeSimHDBank";
import SessionExpired from "@/app/components/hdbank/SessionExpired";
import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import useMyEsim from "@/app/hooks/useMyEsim";
import authService from "@/app/services/auth";
import HDBankService from "@/app/services/hdbankService";
import { useUserActions, useUserState } from "@/app/stores/user";
import { formatPhoneNumber } from "@/app/utils/format";
import {
  saveFormDataToStorage,
  STORAGE_KEYS,
} from "@/app/utils/formStorageHelper";
import { useLoad } from "@/app/utils/load";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GiftCard from "../components/GiftCard";
import GiftCountdown from "../components/GiftCountdown";
import RegisterNavBar from "../components/RegisterNavBar";
import {
  showGiftNotePopup,
  showRecoveryNotePopup,
} from "../components/registerSimPopups";

const GiftSimPage = () => {
  const t = useTranslations("hdbank.registerSim.gift");
  const tRoot = useTranslations("hdbank.registerSim");
  const load = useLoad();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExistingCustomer = searchParams.get("isExistingCustomer") === "true";
  const { showDevicesEsimHDBank } = useMyEsim();
  const {
    setToken,
    logoutVikki,
    setUserVikki,
    setSessionIdState,
    setUser,
    setPhoneDktts,
    convertPhoneFormat,
  } = useUserActions();
  const { sessionId } = useUserState();

  const [error, setError] = useState(null);
  const [selectedSim, setSelectedSim] = useState(null);
  const [simType, setSimType] = useState("ESIM");

  useEffect(() => {
    handleLoginWithSession();
  }, [searchParams]);

  const handleLoginWithSession = async () => {
    load.open();
    const sessionIdFromUrl = searchParams.get("sessionId");
    const currentSessionId = sessionIdFromUrl || sessionId;

    if (!currentSessionId) {
      console.log("No sessionId found, logging out user");
      logoutVikki();
      load.close();
      return;
    }

    // Lưu sessionId từ URL vào context nếu có
    if (sessionIdFromUrl) {
      setSessionIdState(sessionIdFromUrl);
    }

    try {
      const response = await authService.loginWithSession(currentSessionId);

      if (response.success) {
        // Save token to localStorage
        if (response.data?.token) {
          let listPhone = [response.data.phone, ...response.data.phone_dktts];
          listPhone = listPhone
            .filter((e) => e.startsWith("070") || e.startsWith("8470"))
            .map((e) => convertPhoneFormat(e));
          setToken(
            response.data.token,
            listPhone[0] ? listPhone[0] : response.data.phone,
          );
          setUserVikki(response.data.user_id || "");
          setUser({
            ...response.data,
            gift_expire: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          });
          setPhoneDktts(listPhone);
        }
      } else {
        throw new Error(response.message || "Failed to login with session");
      }

      await getSimRandom();
    } catch (err) {
      console.error("Login with session error:", err);
      setError(err.message);
    } finally {
      load.close();
    }
  };

  const getSimRandom = async () => {
    try {
      load.open();
      const res = await HDBankService.getSimRandom();
      setSelectedSim(res);
    } catch (error) {
      console.error("Error fetching random sim data:", error);
      showModalMessHDBank({
        label: t("notify"),
        message: t("loadSimError"),
        type: "error",
      });
    } finally {
      load.close();
    }
  };

  const goToInfo = () => {
    // Persist the chosen number + sim type so later steps (info, payment) can
    // build the order without re-fetching.
    saveFormDataToStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT, {
      selectedSim,
      simType,
    });
    router.push(
      `/hdbank-app/register-sim/info?simType=${simType}&isExistingCustomer=${isExistingCustomer}`
    );
  };

  // Confirm chains both notices: gift note → recovery note → navigate.
  const handleConfirm = () => {
    showGiftNotePopup(tRoot, () => showRecoveryNotePopup(tRoot, goToInfo));
  };

  // Back button posts a close message to the host app instead of navigating back.
  const handleBack = () => {
    const currentSessionId = searchParams.get("sessionId") || sessionId;
    if (typeof window !== "undefined") {
      window.parent.postMessage(
        {
          action: "close",
          session_id: currentSessionId,
          screen_from: "gift",
          timestamp: new Date().toISOString(),
        },
        "*",
      );
    }
  };

  if (error) {
    return (
      <SessionExpired
        error={error}
        onRetry={() => {
          setError(null);
          handleLoginWithSession();
        }}
      />
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F2F2F7]">
      <div className="sticky top-0 z-50">
        <RegisterNavBar title="Đăng ký nhận SIM" onBack={handleBack} />
        <GiftCountdown isExistingCustomer={isExistingCustomer} />
      </div>

      <main className="flex-1 p-4 space-y-4 pb-32">
        {/* Number + sim type card */}
        <div className="rounded-[16px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url(/images/hdbank/network-bg.png)" }}
              >
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32 10.0715V29.9277H26.8775V10.0715H32ZM20.5853 14.8519V29.9277H25.7078V14.8519H20.5853ZM14.2922 19.6332V29.9286H19.4147V19.6332H14.2922ZM8 24.4135V29.9277H13.1225V24.4135H8Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[#5C5C5C]">{t("numberForYou")}</p>
                <p className="text-[20px] font-bold text-[#1C1C1E]">
                  {formatPhoneNumber(selectedSim?.msisdn ?? "")}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                showModalChangeSimHDBank({ onChange: setSelectedSim })
              }
              className="rounded-full border border-[#E5E5E5] px-4 py-2 text-sm font-semibold text-[#0E0E0F]"
            >
              {t("selectOther")}
            </button>
          </div>

          {/* Sim type radios */}
          <div className="flex items-center gap-6">
            <label
              className="flex cursor-pointer items-center gap-2"
              onClick={() => setSimType("ESIM")}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${simType === "ESIM" ? "border-[#DA2128]" : "border-[#A1A1A1]"}`}
              >
                {simType === "ESIM" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#DA2128]" />
                )}
              </div>
              <span className="text-sm font-medium text-[#333333]">
                {t("esim")}
              </span>
            </label>
            <label
              className="flex cursor-pointer items-center gap-2"
              onClick={() => setSimType("USIM")}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${simType === "USIM" ? "border-[#DA2128]" : "border-[#A1A1A1]"}`}
              >
                {simType === "USIM" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#DA2128]" />
                )}
              </div>
              <span className="text-sm font-medium text-[#333333]">
                {t("physicalSim")}
              </span>
            </label>
          </div>

          {simType === "ESIM" && (
            <p className="mt-3 text-xs leading-5 text-[#5C5C5C]">
              {t("esimNote")}
              <button
                onClick={showDevicesEsimHDBank}
                className="font-medium text-[#DA2128] hover:underline"
              >
                {t("deviceList")}
              </button>
            </p>
          )}

          {simType === "USIM" && (
            <p className="mt-3 text-xs font-medium leading-5 text-[#DA2128]">
              {t("physicalNote")}
            </p>
          )}
        </div>

        {/* Gift card */}
        <GiftCard />

        {/* Discount note */}
        <div className="flex items-start gap-3 rounded-[16px] bg-[#EDEDED] px-4 py-3">
          <img src="/images/hdbank/ic-discount.svg" alt="" className="h-9 w-9 flex-shrink-0" />
          <p className="flex-1 text-sm leading-5 text-[#333333]">
            {t("discountNote")}
          </p>
        </div>

        {/* Other services */}
        <div>
          <h3 className="mb-2 text-base font-semibold text-[#333333]">
            {t("otherServices")}
          </h3>
          <button
            type="button"
            onClick={() => router.push("/hdbank-app/travel-esim")}
            className="flex w-full items-center gap-3 rounded-full bg-white px-5 py-4 text-left shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]"
          >
            <span className="text-[20px] text-[#0E0E0F]">+</span>
            <span className="text-base font-medium text-[#0E0E0F]">
              {t("travelEsim")}
            </span>
          </button>
        </div>

        {/* Condition note */}
        <div className="flex items-start gap-2 rounded-[16px] bg-[#FFF8E6] px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DA2128]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="M12 11v5M12 7.5h.01" />
          </svg>
          <p className="flex-1 text-sm leading-5 text-[#333333]">
            {t("conditionNote")}
            <button
              onClick={() => showRecoveryNotePopup(tRoot)}
              className="font-medium text-[#DA2128] underline"
            >
              {t("learnMore")}
            </button>
          </p>
        </div>
      </main>

      {/* Fixed bottom action */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white px-4 pb-8 pt-4 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full rounded-2xl py-4 text-center text-lg font-semibold text-[#5A3B00]"
          style={{ background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }}
        >
          {t("confirmContinue")}
        </button>
      </div>
    </div>
  );
};

export default GiftSimPage;
