"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Sample transaction values — placeholders until wired to the real order/
// transaction response.
const TX = {
  phone: "0707 123 456",
  amount: "50,000 VND",
  balance: "5,000,000 VND/tháng",
  code: "0707123456HDSKY",
  customer: "NGUYEN XUAN THONG",
  account: "068704070161483",
  simPlan: "150,000 VND",
  provider: "SkyFi",
  afterBalance: "21,050,000 VND",
};

const formatNow = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())} - ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const ShareIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 16.12C17.24 16.12 16.56 16.42 16.04 16.89L8.91 12.74C8.96 12.51 9 12.28 9 12.04C9 11.8 8.96 11.57 8.91 11.34L15.96 7.23001C16.5 7.73001 17.21 8.04001 18 8.04001C19.66 8.04001 21 6.70001 21 5.04001C21 3.38001 19.66 2.04001 18 2.04001C16.34 2.04001 15 3.38001 15 5.04001C15 5.28001 15.04 5.51001 15.09 5.74001L8.04 9.85001C7.5 9.35001 6.79 9.04001 6 9.04001C4.34 9.04001 3 10.38 3 12.04C3 13.7 4.34 15.04 6 15.04C6.79 15.04 7.5 14.73 8.04 14.23L15.16 18.39C15.11 18.6 15.08 18.82 15.08 19.04C15.08 20.65 16.39 21.96 18 21.96C19.61 21.96 20.92 20.65 20.92 19.04C20.92 17.43 19.61 16.12 18 16.12ZM18 4.04001C18.55 4.04001 19 4.49001 19 5.04001C19 5.59001 18.55 6.04001 18 6.04001C17.45 6.04001 17 5.59001 17 5.04001C17 4.49001 17.45 4.04001 18 4.04001ZM6 13.04C5.45 13.04 5 12.59 5 12.04C5 11.49 5.45 11.04 6 11.04C6.55 11.04 7 11.49 7 12.04C7 12.59 6.55 13.04 6 13.04ZM18 20.06C17.45 20.06 17 19.61 17 19.06C17 18.51 17.45 18.06 18 18.06C18.55 18.06 19 18.51 19 19.06C19 19.61 18.55 20.06 18 20.06Z" fill="black" fill-opacity="0.5"/>
    </svg>
);
const SimIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="1.8">
    <path d="M7 3h7l4 4v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1Z" strokeLinejoin="round" />
    <rect x="9" y="12" width="6" height="6" rx="1" />
  </svg>
);
const AutoPayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1.505H9V3.505H15V1.505ZM11 14.505H13V8.505H11V14.505ZM19.03 7.885L20.45 6.465C20.02 5.955 19.55 5.475 19.04 5.055L17.62 6.47501C16.07 5.23501 14.12 4.495 12 4.495C7.03 4.495 3 8.525 3 13.495C3 18.465 7.02 22.495 12 22.495C16.98 22.495 21 18.465 21 13.495C21 11.385 20.26 9.43501 19.03 7.885ZM12 20.505C8.13 20.505 5 17.375 5 13.505C5 9.635 8.13 6.505 12 6.505C15.87 6.505 19 9.635 19 13.505C19 17.375 15.87 20.505 12 20.505Z" fill="black" fill-opacity="0.5"/>
    </svg>
);
const TrackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4C13.93 4 17 5.4 17 9.15C17 11.31 15.28 13.82 12 16.47C8.72 13.82 7 11.3 7 9.15C7 5.4 10.07 4 12 4ZM12 2C8.73 2 5 4.46 5 9.15C5 12.27 7.33 15.56 12 19C16.67 15.56 19 12.27 19 9.15C19 4.46 15.27 2 12 2Z" fill="black" fill-opacity="0.5"/>
      <path d="M12 7C10.9 7 10 7.9 10 9C10 10.1 10.9 11 12 11C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9C14 8.46957 13.7893 7.96086 13.4142 7.58579C13.0391 7.21071 12.5304 7 12 7ZM5 20H19V22H5V20Z" fill="black" fill-opacity="0.5"/>
    </svg>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-1 flex-col items-center gap-2">
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E5E5]">
      {icon}
    </span>
    <span className="text-center text-sm leading-tight text-[#1C1C1E]">{label}</span>
  </button>
);

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm text-[#5C5C5C]">{label}</span>
    <span className="text-sm font-semibold text-[#1C1C1E]">{value}</span>
  </div>
);

const ResultPage = () => {
  const t = useTranslations("hdbank.registerSim.result");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPhysical = searchParams.get("simType") === "USIM";
  const [showDetails, setShowDetails] = useState(false);
  const [time] = useState(formatNow);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <main className="flex-1 px-5 pb-10 pt-8">
        <img
          src="/images/hdbank/hdbank-logo.svg"
          alt="HDBank"
          className="mx-auto h-12"
        />

        {/* Success check */}
        <div className="mt-6 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#EAF6EC]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#DCEFE0]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2E9E45]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <h1 className="mt-5 text-center text-xl font-bold tracking-wide text-[#2E9E45]">
          {t("success")}
        </h1>
        <p className="mt-1 text-center text-base text-[#A1A1A1]">{time}</p>

        <p className="mt-4 text-center text-[40px] font-extrabold leading-none text-[#1C1C1E]">
          {TX.amount}
        </p>
        <p className="mt-3 text-center text-base leading-relaxed text-[#5C5C5C]">
          {t.rich("forNumber", {
            b: (chunks) => <span className="font-bold text-[#1C1C1E]">{chunks}</span>,
            phone: TX.phone,
            plan: "HDSKY",
          })}
        </p>

        {/* Note */}
        <div className="mt-5 flex items-start gap-2 rounded-[16px] bg-[#FFF8E6] px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DA2128]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="M12 11v5M12 7.5h.01" />
          </svg>
          <p className="flex-1 text-sm leading-5 text-[#5C5C5C]">
            {t.rich("note", {
              b: (chunks) => <span className="font-bold text-[#1C1C1E]">{chunks}</span>,
              amount: TX.amount,
              balance: TX.balance,
            })}
          </p>
        </div>

        {/* Details toggle */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowDetails((s) => !s)}
            className="flex items-center gap-2 rounded-full bg-[#FBE9EA] px-6 py-2.5 text-base font-medium text-[#DA2128]"
          >
            {t("details")}
            <svg
              className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 divide-y divide-[#F1F1F1] rounded-[16px] border border-[#F1F1F1] px-4">
            <DetailRow label={t("txCode")} value={TX.code} />
            <DetailRow label={t("customer")} value={TX.customer} />
            <DetailRow label={t("account")} value={TX.account} />
            <DetailRow label={t("simPlan")} value={TX.simPlan} />
            <DetailRow label={t("provider")} value={TX.provider} />
            <DetailRow label={t("afterBalance")} value={TX.afterBalance} />
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex items-start justify-center gap-4">
          <ActionButton icon={<ShareIcon />} label={t("share")} onClick={() => {}} />
          {isPhysical ? (
            <ActionButton
              icon={<TrackIcon />}
              label={t("trackSim")}
              onClick={() => router.push("/hdbank-app/register-sim/tracking")}
            />
          ) : (
            <ActionButton
              icon={<SimIcon />}
              label={t("activateSim")}
              onClick={() => router.push("/hdbank-app/register-sim/activate/check-info")}
            />
          )}
          <ActionButton icon={<AutoPayIcon />} label={t("autoPay")} onClick={() => {}} />
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
