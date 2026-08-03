"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StepItem = ({ number, text }) => (
  <div className="flex gap-3 mb-4">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D2008C] flex items-center justify-center text-white text-xs font-bold mt-0.5">
      {number}
    </div>
    <p className="text-sm text-[#333333] leading-relaxed">
      {text}
    </p>
  </div>
);

export default function GuideEsimPage() {
  const t = useTranslations("manager-esim");
  const router = useRouter();
  const [deviceTab, setDeviceTab] = useState("ios"); // "ios" or "android"
  const [methodTab, setMethodTab] = useState("qr"); // "qr" or "manual"

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen pb-safe bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleGoBack}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ChevronLeftIcon className="w-6 h-6 text-[#333333]" />
          </button>
          <h1 className="text-base font-semibold text-[#333333] text-center flex-1">
            {t("guideTitle")}
          </h1>
          <div className="w-10 h-10" />
        </div>

        {/* Device Tabs */}
        <div className="flex border-b border-[#F1F1F1] px-4">
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              deviceTab === "ios"
                ? "text-[#2C4EFF] border-b-2 border-[#2C4EFF]"
                : "text-[#8A8A8A]"
            }`}
            onClick={() => setDeviceTab("ios")}
          >
            {t("deviceIos")}
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              deviceTab === "android"
                ? "text-[#2C4EFF] border-b-2 border-[#2C4EFF]"
                : "text-[#8A8A8A]"
            }`}
            onClick={() => setDeviceTab("android")}
          >
            {t("deviceAndroid")}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full max-w-full">
        <div className="px-4 py-5 w-full">
          {/* Method Selection */}
          <h2 className="text-base font-bold text-[#333333] mb-3">
            {t("chooseMethod")}
          </h2>
          <div className="flex gap-3 mb-6">
            <button
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold border transition-colors ${
                methodTab === "qr"
                  ? "bg-white text-[#2C4EFF] border-[#2C4EFF]"
                  : "bg-white text-[#8A8A8A] border-[#D1D1D1]"
              }`}
              onClick={() => setMethodTab("qr")}
            >
              {t("viaQr")}
            </button>
            <button
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold border transition-colors ${
                methodTab === "manual"
                  ? "bg-white text-[#2C4EFF] border-[#2C4EFF]"
                  : "bg-white text-[#8A8A8A] border-[#D1D1D1]"
              }`}
              onClick={() => setMethodTab("manual")}
            >
              {t("manual")}
            </button>
          </div>

        {/* Guide Content */}
          {deviceTab === "ios" && methodTab === "qr" && (
            <div className="animate-in fade-in duration-300 pr-1">
              <h3 className="text-base font-bold text-[#333333] mb-4">
                {t("step1Title")}
              </h3>
              <StepItem
                number="1"
                text={t("iosQrStep1")}
              />
              <StepItem
                number="2"
                text={t("iosQrStep2")}
              />
              <StepItem
                number="3"
                text={t("iosQrStep3")}
              />
              <StepItem
                number="4"
                text={t("iosQrStep4")}
              />
              <StepItem
                number="5"
                text={t("iosQrStep5")}
              />
              <StepItem
                number="6"
                text={t("iosQrStep6")}
              />

              <h3 className="text-base font-bold text-[#333333] mb-4 mt-6">
                {t("step2Title")}
              </h3>
              <StepItem
                number="1"
                text={t("iosNetworkStep1")}
              />
              <StepItem
                number="2"
                text={t("iosNetworkStep2")}
              />
              <StepItem
                number="3"
                text={t("iosNetworkStep3")}
              />
            </div>
          )}

          {/* Placeholders for other tabs for now */}
          {!(deviceTab === "ios" && methodTab === "qr") && (
            <div className="py-10 text-center text-[#8A8A8A] text-sm animate-in fade-in duration-300">
              {t("guideUpdating")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
