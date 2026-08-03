"use client";

import MyESimService from "@/app/services/myEsimService";
import { useLoad } from "@/app/utils/load";
import {
  ChevronLeftIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Circular Progress Component for Detail Page
const DetailCircularProgress = ({ usedData, totalData, unit = "MB", t }) => {
  const percentage = totalData > 0 ? (usedData / totalData) * 100 : 0;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[180px] h-[180px] flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        <defs>
          <linearGradient
            id="detailBgGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="17%" stopColor="rgba(250, 233, 228, 1)" />
            <stop offset="53%" stopColor="rgba(238, 246, 254, 1)" />
            <stop offset="100%" stopColor="rgba(245, 255, 249, 1)" />
          </linearGradient>
          <linearGradient
            id="detailProgressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#DA2128" />
            <stop offset="4%" stopColor="#DA2128" />
            <stop offset="47%" stopColor="#DA2128" />
            <stop offset="78%" stopColor="#DA2128" />
            <stop offset="98%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#FFB907" />
          </linearGradient>
        </defs>
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="url(#detailBgGradient)"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="url(#detailProgressGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-semibold text-[#5C5C5C]">
          {t("remaining")}
        </span>
        <span
          className=" font-bold text-[#DA2128]"
          style={{ fontFamily: "KoHo" }}
        >
          {usedData}
          {unit}/{totalData}
          {unit}
        </span>
      </div>
    </div>
  );
};

// Info Row Component
const InfoRow = ({ label, value, hasInfo = false }) => (
  <div className="flex items-center justify-between py-2 border-b border-[#F1F1F1] last:border-b-0">
    <span className="text-sm text-[#333333]">{label}</span>
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium text-[#333333] text-right">
        {value}
      </span>
      {hasInfo && <InformationCircleIcon className="w-4 h-4 text-[#8A8A8A]" />}
    </div>
  </div>
);

export default function EsimDetailPage() {
  const t = useTranslations("esim-detail");
  const router = useRouter();
  const searchParams = useSearchParams();
  const iccid = searchParams.get("id");
  const { open, close } = useLoad();

  const [esimData, setEsimData] = useState(null);

  const calculateRemainingDays = (expiryDate) => {
    if (!expiryDate) return 0;
    const timeDiff = new Date(expiryDate) - new Date();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  useEffect(() => {
    if (!iccid) return;
    const fetchDetail = async () => {
      try {
        open();
        const data = await MyESimService.travelEsimDetail(iccid);
        setEsimData(data);
      } catch (error) {
        console.error("Error fetching eSIM detail:", error);
      } finally {
        close();
      }
    };
    fetchDetail();
  }, [iccid]);

  const handleGoBack = () => {
    router.back();
  };

  if (!esimData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8A8A8A] text-sm">{t("loading")}</p>
      </div>
    );
  }

  const remainingDays = calculateRemainingDays(esimData.data?.expired_at);
  const usedData = esimData.data?.remaining ?? 0;
  const totalData = esimData.data?.total ?? 0;

  return (
    <div className="min-h-screen pb-safe">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleGoBack}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6 text-[#333333]" />
          </button>
          <h1 className="text-base font-semibold text-[#333333] text-center flex-1">
            {t("pageTitle")}
          </h1>
          <div className="w-12 h-12" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 pb-8">
        {/* eSIM Info Card */}
        <div className="bg-white rounded-t-[20px] px-4 pt-6 pb-4">
          {/* Circular Progress */}
          <div className="flex justify-center mb-4">
            <DetailCircularProgress
              usedData={usedData}
              totalData={totalData}
              unit="MB"
              t={t}
            />
          </div>

          {/* Info List */}
          <div className="flex flex-col">
            <InfoRow label={t("coverage")} value={esimData.region_name} />
            <InfoRow
              label={t("provider")}
              value={esimData.provider_name}
              hasInfo
            />
            <InfoRow
              label={t("dataCapacity")}
              value={`${esimData.data_amount} ${esimData.data_unit}`}
            />
            <InfoRow
              label={t("validity")}
              value={`${esimData.validity_days} ${t("days")}`}
            />
            <InfoRow label="ICCID" value={esimData.iccid} />
          </div>
        </div>

        {/* Current Package Section */}
        <div className="px-4">
          <h2 className="text-lg font-semibold text-[#333333] py-2">
            {t("yourPackage")}
          </h2>

          <div className="bg-white rounded-xl border border-[#DDDDDD] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#333333]">
                {esimData.region_name}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  esimData.status === "ACTIVE"
                    ? "bg-[#E6F7EC] text-[#00B141]"
                    : esimData.status === "NOT_ACTIVE"
                      ? "bg-[#FFF5E9] text-[#FF8A00]"
                      : "bg-[#F1F1F1] text-[#8A8A8A]"
                }`}
              >
                {esimData.status === "ACTIVE"
                  ? t("status.active")
                  : esimData.status === "NOT_ACTIVE"
                    ? t("status.notInstalled")
                    : t("status.expired")}
              </span>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col flex-1 py-2">
                <span className="text-xs text-[#8A8A8A]">
                  {t("remainingTime")}
                </span>
                <span className="text-sm font-medium text-[#333333]">
                  {remainingDays} {t("days")}
                </span>
              </div>
              <div className="w-px bg-[#F1F1F1]" />
              <div className="flex flex-col flex-1 py-2">
                <span className="text-xs text-[#8A8A8A]">
                  {t("dataCapacity")}
                </span>
                <span className="text-sm font-medium text-[#333333]">
                  {esimData.data_amount} {esimData.data_unit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
