"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ConsentSheet from "./components/ConsentSheet";
import RegisterFAQ from "./components/RegisterFAQ";

// Benefit icons (HDBank red) — inline so the screen has no asset dependency.
const FreeMonthIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.8">
      <path
        d="M25.3333 18.6667V8.00004C25.3333 6.53337 24.1333 5.33337 22.6667 5.33337H4.00001C2.53334 5.33337 1.33334 6.53337 1.33334 8.00004V18.6667C1.33334 20.1334 2.53334 21.3334 4.00001 21.3334H22.6667C24.1333 21.3334 25.3333 20.1334 25.3333 18.6667ZM22.6667 18.6667H4.00001V8.00004H22.6667V18.6667ZM13.3333 9.33337C11.12 9.33337 9.33334 11.12 9.33334 13.3334C9.33334 15.5467 11.12 17.3334 13.3333 17.3334C15.5467 17.3334 17.3333 15.5467 17.3333 13.3334C17.3333 11.12 15.5467 9.33337 13.3333 9.33337ZM30.6667 9.33337V24C30.6667 25.4667 29.4667 26.6667 28 26.6667H5.33334V24H28V9.33337H30.6667Z"
        fill="#BE1128"
      />
    </g>
  </svg>
);

const SimIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.8">
      <path
        d="M24 2.66663H13.3333L5.33334 10.6666V26.6666C5.33334 28.1333 6.53334 29.3333 8.00001 29.3333H24C25.4667 29.3333 26.6667 28.1333 26.6667 26.6666V5.33329C26.6667 3.86663 25.4667 2.66663 24 2.66663ZM24 5.33329V26.6666H8.00001V11.7733L14.44 5.33329H24ZM9.33334 22.6666H12V25.3333H9.33334V22.6666ZM20 22.6666H22.6667V25.3333H20V22.6666ZM9.33334 14.6666H12V20H9.33334V14.6666ZM14.6667 20H17.3333V25.3333H14.6667V20ZM14.6667 14.6666H17.3333V17.3333H14.6667V14.6666ZM20 14.6666H22.6667V20H20V14.6666Z"
        fill="#BE1128"
      />
    </g>
  </svg>
);

const SkyPointIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.8">
      <path
        d="M29.1971 11.8533L27.7971 6.02667C27.5038 4.82667 26.4638 4 25.2505 4H6.73047C5.53047 4 4.47714 4.84 4.19714 6.02667L2.79714 11.8533C2.47714 13.2133 2.77047 14.6 3.62381 15.6933C3.73047 15.84 3.87714 15.9467 3.99714 16.08V25.3333C3.99714 26.8 5.19714 28 6.66381 28H25.3305C26.7971 28 27.9971 26.8 27.9971 25.3333V16.08C28.1171 15.96 28.2638 15.84 28.3705 15.7067C29.2238 14.6133 29.5305 13.2133 29.1971 11.8533ZM25.2105 6.65333L26.6105 12.48C26.7438 13.04 26.6238 13.6 26.2771 14.04C26.0905 14.28 25.6905 14.6667 25.0238 14.6667C24.2105 14.6667 23.5038 14.0133 23.4105 13.1467L22.6371 6.66667L25.2105 6.65333ZM17.3305 6.66667H19.9438L20.6638 12.6933C20.7305 13.2133 20.5705 13.7333 20.2238 14.12C19.9305 14.4667 19.5038 14.6667 18.9571 14.6667C18.0638 14.6667 17.3305 13.88 17.3305 12.92V6.66667ZM11.3171 12.6933L12.0505 6.66667H14.6638V12.92C14.6638 13.88 13.9305 14.6667 12.9438 14.6667C12.4905 14.6667 12.0771 14.4667 11.7571 14.12C11.4238 13.7333 11.2638 13.2133 11.3171 12.6933ZM5.38381 12.48L6.73047 6.66667H9.35714L8.58381 13.1467C8.47714 14.0133 7.78381 14.6667 6.97047 14.6667C6.31714 14.6667 5.90381 14.28 5.73047 14.04C5.37047 13.6133 5.25047 13.04 5.38381 12.48ZM6.66381 25.3333V17.2933C6.77047 17.3067 6.86381 17.3333 6.97047 17.3333C8.13047 17.3333 9.18381 16.8533 9.95714 16.0667C10.7571 16.8667 11.8238 17.3333 13.0371 17.3333C14.1971 17.3333 15.2371 16.8533 16.0105 16.0933C16.7971 16.8533 17.8638 17.3333 19.0638 17.3333C20.1838 17.3333 21.2505 16.8667 22.0505 16.0667C22.8238 16.8533 23.8771 17.3333 25.0371 17.3333C25.1438 17.3333 25.2371 17.3067 25.3438 17.2933V25.3333H6.66381Z"
        fill="#BE1128"
      />
    </g>
  </svg>
);

const Benefit = ({ icon, line1, line2 }) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    {icon}
    <div className="text-center leading-tight">
      <p className="text-[12px] font-bold text-[#333333]">{line1}</p>
      <p className="text-[12px] text-[#333333]">{line2}</p>
    </div>
  </div>
);

const RegisterSimPage = () => {
  const t = useTranslations("hdbank.registerSim");
  const router = useRouter();
  const [consentOpen, setConsentOpen] = useState(false);

  const handleAgree = () => {
    setConsentOpen(false);
    router.push("/hdbank-app/register-sim/gift");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white pb-10">
      {/* Key visual */}
      <div className="px-6 pt-8">
        <img
          src="/assets/hero-bg.png"
          alt={t("titleLine1")}
          className="mx-auto h-44 w-full max-w-xs rounded-xl object-cover"
        />
      </div>

      {/* Title + subtitle */}
      <div className="px-6 pt-6 text-center">
        <h1 className="text-2xl font-bold leading-tight text-[#333333]">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>
        <p className="mt-2 text-sm text-[#5C5C5C]">{t("subtitle")}</p>
      </div>

      {/* Benefits */}
      <div className="mt-6 flex items-start gap-2 px-6">
        <Benefit icon={<FreeMonthIcon />} line1={t("benefitFree1")} line2={t("benefitFree2")} />
        <Benefit icon={<SimIcon />} line1={t("benefitSim1")} line2={t("benefitSim2")} />
        <Benefit icon={<SkyPointIcon />} line1={t("benefitPoint1")} line2={t("benefitPoint2")} />
      </div>

      {/* CTA */}
      <div className="px-6 pt-8">
        <button
          type="button"
          onClick={() => setConsentOpen(true)}
          className="w-full rounded-2xl py-4 text-center text-lg font-semibold text-[#00000080]"
          style={{ background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }}
        >
          {t("registerNow")}
        </button>
      </div>

      {/* FAQ */}
      <div className="px-4 pt-8">
        <RegisterFAQ title={t("faqTitle")} />
      </div>

      <ConsentSheet
        open={consentOpen}
        onClose={() => setConsentOpen(false)}
        onAgree={handleAgree}
        t={t}
      />
    </div>
  );
};

export default RegisterSimPage;
