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
    <div className="min-h-[100dvh] flex flex-col bg-[#F3F3F3]">
      <main className="flex-1 pb-28 pt-4">
        <p className="mt-1 text-center text-base font-semibold text-[#333333]">Kết quả</p>
        <img
          src="/images/hdbank/succesIcon.png"
          alt="HDBank"
          className="mx-auto"
        />

        <h1 className="text-center text-xl font-bold tracking-wide ">
          {t("title")}
        </h1>
        {/* Notes */}
        <div className={'bg-white px-5 pt-2 mt-2'}>
        <h2 className="mt-5 text-[18px] font-bold text-[#1C1C1E]">{t("noteTitle")}</h2>
        <p className="mt-2 text-base leading-relaxed text-[#1C1C1E]">
          {t.rich("note1", {
            b: (chunks) => <span className="font-bold ">{chunks}</span>,
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
          <div className={'w-[54px]'}>
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.1366 22.1977C26.1366 21.6152 26.6088 21.143 27.1913 21.143C27.7738 21.143 28.246 21.6152 28.246 22.1977V28.2311C28.2637 28.2248 28.2813 28.2182 28.2991 28.2122L32.4898 26.8154V20.2486C32.4898 18.3298 30.9288 16.7689 29.0101 16.7689H16.885C14.9662 16.7689 13.4053 18.3299 13.4053 20.2486V36.6176C13.4053 38.1687 14.4256 39.4856 15.8303 39.9334V41.1645C15.8303 41.7469 16.3025 42.2191 16.885 42.2191C17.4674 42.2191 17.9397 41.7469 17.9397 41.1645V40.0972H27.1712C26.5014 38.5587 26.1358 36.8693 26.1358 35.1134L26.1366 22.1977ZM19.7584 34.7988C19.7584 35.3812 19.2862 35.8535 18.7037 35.8535C18.1213 35.8535 17.6491 35.3812 17.6491 34.7988V22.1977C17.6491 21.6152 18.1213 21.143 18.7037 21.143C19.2862 21.143 19.7584 21.6152 19.7584 22.1977V34.7988ZM24.0022 34.7988C24.0022 35.3812 23.53 35.8535 22.9475 35.8535C22.3651 35.8535 21.8928 35.3812 21.8928 34.7988V22.1977C21.8928 21.6152 22.3651 21.143 22.9475 21.143C23.53 21.143 24.0022 21.6152 24.0022 22.1977V34.7988ZM20.8326 11.1094H25.0625V14.6595H27.1719V11.1024C27.1718 9.94317 26.2287 9 25.0694 9H20.8256C19.6663 9 18.7232 9.94317 18.7232 11.1024V14.6595H20.8326V11.1094Z" fill="#DA2128"/>
              <path d="M41.209 29.6683L34.8432 27.5464C34.6267 27.4743 34.3927 27.4743 34.1762 27.5464L27.8106 29.6683C27.6006 29.7383 27.4179 29.8726 27.2885 30.0522C27.159 30.2317 27.0894 30.4475 27.0894 30.6689V34.5683C27.0874 36.7441 27.771 38.8652 29.0433 40.6303C30.3155 42.3954 32.1115 43.7147 34.1763 44.4008C34.3928 44.473 34.6268 44.473 34.8433 44.4008C36.908 43.7147 38.7041 42.3953 39.9763 40.6303C41.2485 38.8652 41.9321 36.7441 41.9301 34.5683V30.6689C41.9301 30.4475 41.8605 30.2317 41.7311 30.0522C41.6016 29.8726 41.419 29.7383 41.209 29.6683ZM37.5231 35.7169L33.7165 38.0325C33.5516 38.133 33.3622 38.1862 33.1691 38.1862C33.0037 38.1863 32.8407 38.1476 32.6931 38.0731C32.5455 37.9986 32.4175 37.8905 32.3195 37.7573L31.1955 36.2331C30.8498 35.7643 30.9497 35.104 31.4184 34.7583C31.8872 34.4126 32.5476 34.5123 32.8932 34.9813L33.4446 35.7289L36.4269 33.9148C36.9245 33.6121 37.5732 33.7701 37.8761 34.2678C38.1788 34.7654 38.0208 35.4142 37.5231 35.7169Z" fill="#FAA61A"/>
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-[#1C1C1E]">{t("travelBanner")}</p>
            <p className="text-xs text-[#6C737F]">{t("travelBannerDes")}</p>
            <button
              type="button"
              onClick={() => router.push("/hdbank-app-v2/travel-esim")}
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
        </div>
      </main>

      {/* Fixed bottom action */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white px-4 pb-8 pt-4">
        <button
          type="button"
          onClick={() => router.push("/hdbank-app-v2")}
          className="w-full rounded-full py-4 text-center text-lg font-bold text-white"
          style={{ background: "linear-gradient(90deg, #ED1B2F 0%, #F9A61C 100%)" }}
        >
          {t("home")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
