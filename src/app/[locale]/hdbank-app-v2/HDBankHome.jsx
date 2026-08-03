"use client";
import Banner from "@/app/components/hdbank-v2/home/Banner";
import Footer from "@/app/components/hdbank-v2/home/Footer";
import Header from "@/app/components/hdbank-v2/home/Header";
import HotPackages from "@/app/components/hdbank-v2/home/HotPackages";
import QuickActions from "@/app/components/hdbank-v2/home/QuickActions";
import SimStatusCard from "@/app/components/hdbank-v2/home/SimStatusCard";
import SessionExpired from "@/app/components/hdbank-v2/SessionExpired";
import authService from "@/app/services/auth";
import { useUserActions, useUserState } from "@/app/stores/user";
import { useLoad } from "@/app/utils/load";
import { getLocal } from "@/app/utils/saveLocal";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { showModalMessHDBank } from "@/app/components/modals/modalMess";

const HDBankHome = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { open, close } = useLoad();
  const [error, setError] = useState(null);
  const {
    setToken,
    logoutVikki,
    setUserVikki,
    setSessionIdState,
    setUser,
    setPhoneDktts,
    convertPhoneFormat,
    randomCartId,
  } = useUserActions();
  const { sessionId } = useUserState();
  const t = useTranslations("hdbank");

  useEffect(() => {
    handleLoginWithSession();
  }, [searchParams]);

  useEffect(() => {
    const billId = searchParams.get("billId");

    let timer = setTimeout(() => {
      if (billId) {
        showModalMessHDBank({
          type: "success",
          label: t("registerSuccess.title"),
          message: t("registerSuccess.message"),
          labelConfirm: t("registerSuccess.close"),
          onConfirm: () => {
            const newSearchParams = new URLSearchParams(
              searchParams.toString(),
            );
            newSearchParams.delete("billId");
            router.replace(`?${newSearchParams.toString()}`);
          },
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleLoginWithSession = async () => {
    open();
    const sessionIdFromUrl = searchParams.get("sessionId");
    const currentSessionId = sessionIdFromUrl || sessionId;

    if (!currentSessionId) {
      console.log("No sessionId found, logging out user");
      logoutVikki();
      close();
      return;
    }

    // Lưu sessionId từ URL vào context nếu có
    if (sessionIdFromUrl) {
      setSessionIdState(sessionIdFromUrl);
    }

    // Check if already have token in localStorage
    // const existingToken = getLocal("token");
    // if (existingToken && !sessionIdFromUrl) {
    //   close();
    //   return;
    // }

    try {
      const response = await authService.loginWithSession(currentSessionId);
      console.log("response", response.data);

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
          setUser(response.data);
          setPhoneDktts(listPhone);
        }
      } else {
        throw new Error(response.message || "Failed to login with session");
      }
    } catch (err) {
      console.error("Login with session error:", err);
      setError(err.message);
    } finally {
      close();
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with HDBank gradient - extends down for card overlap */}
      <div
        style={{
          background: 'linear-gradient(to right, #DA2128 0%, #F9A61C 65%, #FFDD00 100%)',
          paddingBottom: '56px',
        }}
      >
        <Header
          onActivateOther={() => router.push("/hdbank-app-v2/activate")}
          onTopup={() => router.push("/hdbank-app-v2/topup")}
        />
      </div>

      {/* Main Content - pulls up to overlap gradient */}
      <div className="flex flex-col items-center flex-grow px-4 gap-4 overflow-y-auto pb-20 -mt-14">
        {/* Card overlaps the gradient */}
        <SimStatusCard />

        {/* Circle Button Group */}
        <QuickActions />

        {/* Banner */}
        <Banner />

        {/* Hot Packages */}
        <HotPackages />
      </div>

      {/* Bottom Navigation */}
      <Footer />
    </div>
  );
};

export default HDBankHome;
