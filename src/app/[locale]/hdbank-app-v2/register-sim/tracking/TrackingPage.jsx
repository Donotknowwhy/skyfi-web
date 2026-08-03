"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Sample delivery values — placeholders until wired to the real order response.
const TRACK = {
  address: "73/4 Phan Đình Phùng, phường 1, Đà Lạt",
  phone: "0948571639",
};

// Current progress step (1-based). Steps before it are done, the rest pending.
const CURRENT_STEP = 1;

// Numbered timeline dot — red when it is the active/current step, gray otherwise.
const StepDot = ({ index, active }) => (
  <span
    className={`relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
      active ? "bg-[#ED1B2F] text-white" : "bg-[#E3E3E3] text-[#9A9A9A]"
    }`}
  >
    {index}
  </span>
);

// One timeline row. `last` removes the connector line below the dot.
const Step = ({ index, active, last, title, desc }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <StepDot index={index} active={active} />
      {!last && <span className="my-1 w-0 flex-1 border-l-2 border-[#E3E3E3]" />}
    </div>
    <div className={last ? "pb-0" : "pb-6"}>
      <h2 className="text-[19px] font-bold text-[#1C1C1E]">{title}</h2>
      <p className="mt-1 text-[16px] leading-relaxed text-[#8A8A8E]">{desc}</p>
    </div>
  </div>
);

const TrackingPage = () => {
  const t = useTranslations("hdbank.registerSim.tracking");
  const router = useRouter();

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
    { title: t("step4Title"), desc: t("step4Desc") },
  ];

  return (
    <div
      className="min-h-[100dvh] flex flex-col bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url(/images/hdbank/background.png)" }}
    >
      <main className="flex-1 px-4 pt-4">
        {/* Promo banners */}
        <div className="grid grid-cols-2 gap-3">
          <img
            src="/images/hdbank/tracking-banner-1.png"
            alt=""
            className="aspect-[16/11] w-full rounded-2xl object-cover"
          />
          <img
            src="/images/hdbank/tracking-banner-2.png"
            alt=""
            className="aspect-[16/11] w-full rounded-2xl object-cover"
          />
        </div>

        {/* Tracking card */}
        <div className="mt-4 rounded-[24px] bg-white px-5 pb-6 pt-6 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
          <h1 className="text-[26px] font-extrabold leading-tight text-[#1C1C1E]">
            {t("deliveryTitle")}
          </h1>

          <div className="mt-3 flex items-start gap-2">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ED1B2F]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
            </svg>
            <span className="text-[16px] leading-snug text-[#1C1C1E]">{TRACK.address}</span>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            {steps.map((s, i) => (
              <Step
                key={i}
                index={i + 1}
                active={i + 1 === CURRENT_STEP}
                last={i === steps.length - 1}
                title={s.title}
                desc={s.desc}
              />
            ))}
          </div>

          {/* Delivery note */}
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#EAF2FB] px-4 py-3">
            <svg className="mt-0.5 h-6 w-6 flex-shrink-0" viewBox="0 0 24 24" fill="#2E6FE0">
              <circle cx="12" cy="12" r="10" />
              <path d="M11 10h2v7h-2zM12 6.4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill="#fff" />
            </svg>
            <p className="flex-1 text-[15px] leading-relaxed text-[#1C1C1E]">
              {t.rich("notePhone", {
                b: (chunks) => <span className="font-bold">{chunks}</span>,
                phone: TRACK.phone,
              })}
            </p>
          </div>
        </div>
      </main>

      {/* Bottom action + footer nav */}
      <div>
        <div className="px-4 pb-3 pt-3">
          <button
            type="button"
            onClick={() => router.push("/hdbank-app-v2")}
            className="w-full rounded-full py-4 text-center text-lg font-bold text-white shadow-[0px_8px_20px_0px_rgba(0,0,0,0.2)]"
            style={{ background: "linear-gradient(90deg, #ED1B2F 0%, #F9A61C 100%)" }}
          >
            {t("home")}
          </button>
        </div>
        <img src="/images/hdbank/footer.png" alt="" className="block w-full" />
      </div>
    </div>
  );
};

export default TrackingPage;
