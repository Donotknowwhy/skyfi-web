"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Sample delivery values — placeholders until wired to the real order response.
const TRACK = {
  address: "25Bis Nguyễn Thị Minh Khai, Phường Sài Gòn, Thành Phố Hồ Chí Minh",
  phone: "0948571639",
};

const CheckDot = () => (
  <span className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#DA2128]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const EmptyDot = () => (
  <span className="relative z-10 h-7 w-7 flex-shrink-0 rounded-full border-2 border-[#DA2128] bg-white" />
);

// One timeline row. `last` removes the connector line below the dot.
const Step = ({ done, last, title, children }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      {done ? <CheckDot /> : <EmptyDot />}
      {!last && (
        <span className="my-1 w-0 flex-1 border-l-2 border-dashed border-[#DA2128]" />
      )}
    </div>
    <div className={last ? "pb-0" : "pb-7"}>
      <h2 className="text-[19px] font-bold text-[#1C1C1E]">{title}</h2>
      <div className="mt-1 text-base leading-relaxed text-[#A1A1A1]">{children}</div>
    </div>
  </div>
);

const TrackingPage = () => {
  const t = useTranslations("hdbank.registerSim.tracking");
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <main className="flex-1 px-5 pb-32 pt-6">
        <h1 className="mb-6 text-[34px] font-extrabold leading-tight text-[#1C1C1E]">
          {t("title")}
        </h1>

        <div>
          <Step done title={t("step1Title")}>
            {t("step1Desc")}
          </Step>
          <Step done title={t("step2Title")}>
            {t("step2Desc")}
          </Step>
          <Step done title={t("step3Title")}>
            {t("step3Desc")}
            <br />
            {TRACK.address}
          </Step>
          <Step last title={t("step4Title")}>
            {t("step4Desc")}
          </Step>
        </div>

        {/* Delivery note */}
        <div className="mt-4 flex items-start gap-2 rounded-[16px] bg-[#FFF8E6] px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DA2128]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="M12 11v5M12 7.5h.01" />
          </svg>
          <ul className="flex-1 list-disc space-y-1 pl-4 text-sm leading-5 text-[#5C5C5C]">
            <li>
              {t.rich("noteDelivery", {
                b: (chunks) => <span className="font-bold text-[#1C1C1E]">{chunks}</span>,
              })}
            </li>
            <li>
              {t.rich("notePhone", {
                b: (chunks) => <span className="font-bold text-[#1C1C1E]">{chunks}</span>,
                phone: TRACK.phone,
              })}
            </li>
          </ul>
        </div>
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

export default TrackingPage;
