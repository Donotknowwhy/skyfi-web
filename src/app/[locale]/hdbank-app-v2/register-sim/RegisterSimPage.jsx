"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ConsentSheet from "./components/ConsentSheet";
import RegisterFAQ from "./components/RegisterFAQ";

// One benefit row: badge + bold title + muted description.
const BenefitRow = ({ title, desc }) => (
  <div className="flex items-start gap-4">
    <img src="/images/hdbank/BenefitBadge.svg" alt=""/>
    <div className="pt-0.5">
      <p className="text-[17px] font-bold leading-tight text-[#1C1C1E]">{title}</p>
      <p className="mt-1 text-[15px] leading-snug text-[#5C5C5C]">{desc}</p>
    </div>
  </div>
);

const RegisterSimPage = () => {
  const t = useTranslations("hdbank.registerSim");
  const router = useRouter();
  const [consentOpen, setConsentOpen] = useState(false);

  const handleAgree = () => {
    setConsentOpen(false);
    router.push("/hdbank-app-v2/register-sim/gift");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FFF8E1]">
      {/* Red zone behind the key-visual banner */}
      <div className="bg-gradient-to-b from-[#ED1B2F] to-[#E33B45] h-28" />

      {/* White card pulled up to overlap the red zone */}
      <div className="px-4 -mt-16">
        <div className="rounded-[24px] bg-white px-5 pb-7 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]">
          {/* Key visual — pulled up so it straddles the red zone and the card */}
          <img
            src="/images/hdbank/banner.png"
            alt={t("cardTitle")}
            className="-mt-10 w-full rounded-2xl object-cover shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)]"
          />

          <h1 className="mt-5 text-center text-[22px] font-bold leading-tight text-[#ED1B2F]">
            {t("cardTitle")}
          </h1>

          <ul className="mt-4 space-y-2">
            {[t("bullet1"), t("bullet2"), t("bullet3")].map((line) => (
              <li key={line} className="flex items-start gap-2 text-[16px] text-[#333333]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#333333]" />
                <span className="leading-snug">{line}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setConsentOpen(true)}
            className="mt-6 w-full rounded-full py-4 text-center text-lg font-bold text-white"
            style={{ background: "linear-gradient(90deg, #ED1B2F 0%, #F9A61C 100%)" }}
          >
            {t("registerNow")}
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-7 space-y-6 px-6">
        <BenefitRow title={t("feat1Title")} desc={t("feat1Desc")} />
        <BenefitRow title={t("feat2Title")} desc={t("feat2Desc")} />
        <BenefitRow title={t("feat3Title")} desc={t("feat3Desc")} />
      </div>

      {/* FAQ */}
      {/*<div className="px-4 pt-8">*/}
      {/*  <RegisterFAQ title={t("faqTitle")} />*/}
      {/*</div>*/}

      {/* Footer nav */}
      <img
        src="/images/hdbank/footer.png"
        alt=""
        className="mt-auto block w-full"
      />

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
