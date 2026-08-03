"use client";

import { toCurrency } from "@/app/utils/format";
import {
  loadFormDataFromStorage,
  STORAGE_KEYS,
} from "@/app/utils/formStorageHelper";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Fixed advance for the HDSKY gift package (refundable held amount).
const HDSKY_AMOUNT = 50000;

// Sample transaction values — placeholders until wired to the real order/
// transaction response.
const TX = {
  code: "89654565665",
  balance: "5,000,000 VND / tháng",
};

// Amount without the " VND" suffix so it can be styled separately.
const money = (n) => toCurrency(n).replace(/\s*VND$/, "");

const formatNow = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())} ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
};

// Red ring + orange check with a scatter of confetti.
const SuccessBadge = () => (
  <div className="relative mx-auto h-36 w-48">
    {[
      { c: "#F9A61C", x: "12%", y: "8%", r: 8 },
      { c: "#ED1B2F", x: "84%", y: "12%", r: -20 },
      { c: "#2E6FE0", x: "6%", y: "46%", r: 30 },
      { c: "#F9C016", x: "90%", y: "50%", r: 12 },
      { c: "#ED1B2F", x: "20%", y: "80%", r: -25 },
      { c: "#2E6FE0", x: "78%", y: "82%", r: 18 },
      { c: "#F9A61C", x: "50%", y: "2%", r: 0 },
      { c: "#F9C016", x: "34%", y: "90%", r: 40 },
    ].map((d, i) => (
      <span
        key={i}
        className="absolute h-1.5 w-2.5 rounded-sm"
        style={{ background: d.c, left: d.x, top: d.y, transform: `rotate(${d.r}deg)` }}
      />
    ))}
    <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#ED1B2F] bg-white">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#F9A61C" strokeWidth="3">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

// "App-icon" style action: red gradient rounded square + label below.
const ActionIcon = ({ glyph, label, onClick }) => (
  <button type="button" onClick={onClick} className="flex flex-col items-center gap-2">
    <span
      className="flex h-16 w-16 items-center justify-center rounded-[18px] shadow-[0px_6px_14px_0px_rgba(218,33,40,0.35)]"
      style={{ background: "linear-gradient(135deg, #ED1B2F 0%, #F9A61C 130%)" }}
    >
      {glyph}
    </span>
    <span className="text-center text-[15px] font-medium text-[#1C1C1E]">{label}</span>
  </button>
);

const DetailRow = ({ label, value, chevron, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!chevron}
    className="flex w-full items-center justify-between py-4 text-left"
  >
    <span className="text-[16px] text-[#8A8A8E]">{label}</span>
    <span className="flex items-center gap-2">
      <span className="text-[16px] font-bold text-[#1C1C1E]">{value}</span>
      {chevron && (
        <svg className="h-4 w-4 text-[#8A8A8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </span>
  </button>
);

const ResultPage = () => {
  const t = useTranslations("hdbank.registerSim.result");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPhysical = searchParams.get("simType") === "USIM";
  const [time] = useState(formatNow);

  // Draft from the checkout steps — used to derive the paid total (HDSKY 50k +
  // shipping fee for physical SIM).
  const [draft] = useState(
    () =>
      (typeof window !== "undefined"
        ? loadFormDataFromStorage(STORAGE_KEYS.REGISTER_SIM_DRAFT)
        : null) || {},
  );
  const shipFee = isPhysical ? draft.shipping_amount || 0 : 0;
  const totalAmount = HDSKY_AMOUNT + shipFee;

  return (
    <div
      className="min-h-[100dvh] flex flex-col bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url(/images/hdbank/background.png)" }}
    >
      <main className="flex-1 px-4 pb-6 pt-4">
        <div className="rounded-[24px] bg-white px-5 pb-6 pt-7 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
          <SuccessBadge />

          <h1 className="mt-3 text-center text-[22px] font-bold text-[#1C1C1E]">
            {t("success")}
          </h1>
          <p className="mt-2 text-center text-[40px] font-extrabold leading-none text-[#1C1C1E]">
            {money(totalAmount)} VND
          </p>
          <p className="mt-2 text-center text-[15px] text-[#A1A1A1]">{time}</p>

          {/* Refund note */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#EAF2FB] px-4 py-3">
            <svg className="mt-0.5 h-6 w-6 flex-shrink-0" viewBox="0 0 24 24" fill="#2E6FE0">
              <circle cx="12" cy="12" r="10" />
              <path d="M11 10h2v7h-2zM12 6.4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill="#fff" />
            </svg>
            <p className="flex-1 text-[15px] leading-relaxed text-[#1C1C1E]">
              {t.rich("note", {
                b: (chunks) => <span className="font-bold">{chunks}</span>,
                amount: `${money(HDSKY_AMOUNT)} VND`,
                balance: TX.balance,
              })}
            </p>
          </div>

          {/* Detail rows */}
          <div className="mt-2 divide-y divide-[#F1F1F1]">
            <DetailRow label={t("planLabel")} value={t("planValue")} />
            <DetailRow label={t("provider")} value={t("providerValue")} />
            <DetailRow label={t("txLabel")} value={TX.code} chevron onClick={() => {}} />
          </div>

          {/* Action */}
          <div className="mt-6 flex justify-center">
            {isPhysical ? (
              <ActionIcon
                glyph={<img src="/images/hdbank/EsimGlyph.svg" alt=""/>}
                label={t("trackSim")}
                onClick={() => router.push("/hdbank-app-v2/register-sim/tracking")}
              />
            ) : (
              <ActionIcon
                glyph={<img src="/images/hdbank/TrackGlyph.svg" alt=""/>}
                label={t("activateSim")}
                onClick={() => router.push("/hdbank-app-v2/register-sim/activate/check-info")}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer nav */}
      <img src="/images/hdbank/footer.png" alt="" className="block w-full" />
    </div>
  );
};

export default ResultPage;
