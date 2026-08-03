"use client";

import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

// Fallbacks when no info is passed from the sign screen
const RESULT = {
  phone: "0707 123 637",
  plan: "HDSKY",
  qrValue: "LPA:1$smdp.skyfi.network$0707123637HDSKY",
};

// Display phone per design: 0707 123 456
const formatPhoneDisplay = (phone) => {
  if (!phone) return "";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
};

const formatNow = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())} - ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const SuccessPage = () => {
  const t = useTranslations("hdbank.registerSim.activate.success");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [time] = useState(formatNow);

  // Activation info passed from the sign screen
  const rawPhone = searchParams.get("phone") || "";
  const plan = searchParams.get("plan") || RESULT.plan;
  const phone = rawPhone ? formatPhoneDisplay(rawPhone) : RESULT.phone;
  const qrValue = rawPhone
    ? `LPA:1$smdp.skyfi.network$${rawPhone}${plan}`
    : RESULT.qrValue;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <main className="flex-1 px-5 pb-32 pt-8">
        <img
          src="/images/hdbank/hdbank-logo.svg"
          alt="HDBank"
          className="mx-auto h-12"
        />

        {/* Success check */}
        <div className="mt-8 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#2E9E45]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="mt-8 text-center text-xl font-bold tracking-wide text-[#2E9E45]">
          {t("title")}
        </h1>
        <p className="mt-1 text-center text-base text-[#A1A1A1]">{time}</p>

        {/* Notes */}
        <h2 className="mt-5 text-[18px] font-bold text-[#1C1C1E]">{t("noteTitle")}</h2>
        <p className="mt-2 text-base leading-relaxed text-[#1C1C1E]">
          {t.rich("note1", {
            b: (chunks) => <span className="font-medium text-[#DA2128] underline">{chunks}</span>,
          })}
        </p>
        <p className="mt-3 text-base leading-relaxed text-[#1C1C1E]">
          {t.rich("note2", {
            b: (chunks) => <span className="font-semibold">{chunks}</span>,
            phone,
          })}
        </p>

        {/* Travel eSIM banner */}
        <div className="mt-5 flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#DA2128" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="7" width="14" height="13" rx="2" />
            <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 11v5M15 11v5" />
          </svg>
          <div>
            <p className="text-base font-bold text-[#1C1C1E]">{t("travelBanner")}</p>
            <button
              type="button"
              onClick={() => router.push("/hdbank-app/travel-esim")}
              className="text-base font-bold text-[#DA2128]"
            >
              {t("buyNow")}
            </button>
          </div>
        </div>

        {/* QR code */}
        <div className="mt-6 flex justify-center">
          <QRCodeSVG value={qrValue} size={200} level="M" />
        </div>

        <button
          type="button"
          className="mx-auto mt-4 flex items-center gap-2 text-base text-[#1C1C1E]"
        >
          {t("saveQR")}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
          </svg>
        </button>

        <p className="mt-3 text-center text-base text-[#1C1C1E]">
          {t.rich("subscriber", {
            b: (chunks) => <span className="font-bold">{chunks}</span>,
            phone,
            plan,
          })}
        </p>
      </main>

      {/* Fixed bottom action */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white px-4 pb-8 pt-4">
        <button
          type="button"
          onClick={() => router.push("/hdbank-app")}
          className="w-full rounded-2xl py-4 text-center text-lg font-semibold text-[#5A3B00]"
          style={{ background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }}
        >
          {t("home")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
