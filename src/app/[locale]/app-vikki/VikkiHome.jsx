"use client";
import * as Sentry from "@sentry/nextjs";
import Banner from "@/app/components/vikki/home/Banner";
import Footer from "@/app/components/vikki/home/Footer";
import Header from "@/app/components/vikki/home/Header";
import HotPackages from "@/app/components/vikki/home/HotPackages";
import QuickActions from "@/app/components/vikki/home/QuickActions";
import SimStatusCard from "@/app/components/vikki/home/SimStatusCard";
import SessionExpired from "@/app/components/vikki/SessionExpired";
import authService from "@/app/services/auth";
import { useUserActions, useUserState } from "@/app/stores/user";
import { useLoad } from "@/app/utils/load";
import { getLocal } from "@/app/utils/saveLocal";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { showModalMessVikki } from "@/app/components/modals/modalMess";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const VikkiHome = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { open, close } = useLoad();
  const [error, setError] = useState(null);
  const genRef = useRef(0);
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
  const t = useTranslations("vikki");

  useEffect(() => {
    const gen = ++genRef.current;
    handleLoginWithSession(gen);
  }, [searchParams]);

  useEffect(() => {
    const billId = searchParams.get("billId");

    let timer = setTimeout(() => {
      if (billId) {
        showModalMessVikki({
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

  const handleLoginWithSession = async (gen = ++genRef.current) => {
    const stale = () => genRef.current !== gen;

    open();
    const sessionIdFromUrl = searchParams.get("sessionId");
    const currentSessionId = sessionIdFromUrl || sessionId;

    Sentry.setTag("app", "vikki");
    Sentry.setTag("runtime", "webview");

    if (!currentSessionId) {
      console.log("No sessionId found, logging out user");
      logoutVikki();
      close();
      return;
    }

    if (sessionIdFromUrl) {
      setSessionIdState(sessionIdFromUrl);
    }

    Sentry.addBreadcrumb({
      category: "auth",
      message: "Attempting login with session",
      level: "info",
      data: { sessionSource: sessionIdFromUrl ? "url" : "store" },
    });

    let lastError = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      if (stale()) return;

      const response = await authService.loginWithSession(currentSessionId);

      if (stale()) return;

      if (response.success) {
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
          // Merge so a slower get-subscriber-info response (balance) isn't wiped.
          setUser((prev) => ({ ...prev, ...response.data }));
          setPhoneDktts(listPhone);

          Sentry.setUser({
            id: response.data.user_id,
            username: listPhone[0] || response.data.phone,
          });
        }
        close();
        return;
      }

      lastError = new Error(response.message || "Failed to login with session");

      const isNetworkError = !response.message || response.message === "Network Error";
      if (!isNetworkError) break;

      if (attempt < MAX_RETRIES - 1) {
        Sentry.addBreadcrumb({
          category: "auth",
          message: `Login retry ${attempt + 1}/${MAX_RETRIES - 1}`,
          level: "warning",
          data: { attempt, sessionId: currentSessionId, error: response.message },
        });
        await new Promise((resolve) =>
          setTimeout(resolve, (attempt + 1) * RETRY_DELAY_MS),
        );
      }
    }

    if (stale()) return;

    console.error("Login with session error:", lastError);
    Sentry.withScope((scope) => {
      scope.setTag("error_type", "session_login_failure");
      scope.setContext("session", {
        sessionId: currentSessionId,
        sessionSource: sessionIdFromUrl ? "url" : "store",
      });
      Sentry.captureException(lastError);
    });
    setError(lastError?.message);
    close();
  };

  if (error) {
    return (
      <SessionExpired
        error={error}
        onRetry={() => {
          setError(null);
          handleLoginWithSession(); // auto-increments gen, huỷ call cũ nếu còn pending
        }}
      />
    );
  }

  return (
    <div
      className="bg-cover bg-center flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(/figma-images/background.png)`,
      }}
    >
      {/* Top Bar */}
      <Header
        onActivateOther={() => router.push("/app-vikki/activate")}
        onTopup={() => router.push("/app-vikki/topup")}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow p-4 gap-4 overflow-y-auto pb-20">
        {/* Card */}
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

export default VikkiHome;
