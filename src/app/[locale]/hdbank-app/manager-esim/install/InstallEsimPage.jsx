"use client";

import { ChevronLeftIcon, ArrowDownTrayIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import MyESimService from '@/app/services/myEsimService';
import { useLoad } from '@/app/utils/load';

// Info Row Component
const InfoRow = ({ label, value, hasInfo = false }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#F1F1F1] last:border-b-0">
    <span className="text-sm text-[#5C5C5C]">{label}</span>
    <div className="flex items-center gap-1 text-right max-w-[60%]">
      <span className="text-sm font-medium text-[#333333]">{value}</span>
      {hasInfo && (
        <InformationCircleIcon className="w-4 h-4 text-[#8A8A8A] flex-shrink-0" />
      )}
    </div>
  </div>
);

export default function InstallEsimPage() {
  const t = useTranslations("manager-esim");
  const router = useRouter();
  const searchParams = useSearchParams();
  const esimId = searchParams.get("id");
  const { open, close } = useLoad();
  
  const [esimData, setEsimData] = useState(null);

  useEffect(() => {
    if (esimId) {
      fetchEsimData();
    }
  }, [esimId]);

  const fetchEsimData = async () => {
    try {
      open();
      const res = await MyESimService.getListESim();
      // find in all lists
      const allEsims = [
          ...(res.esimNotActive?.list || []), 
          ...(res.esimActive?.list || []), 
          ...(res.esimExpired?.list || [])
      ];
      const found = allEsims.find(e => e.iccid === esimId);
      setEsimData(found);
    } catch (error) {
      console.log("Error fetching eSIM:", error);
    } finally {
      close();
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const downloadQR = () => {
    if (!esimData?.qrcode_url) return;
    const link = document.createElement("a");
    link.href = esimData.qrcode_url;
    link.download = `QR_eSIM_${esimId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!esimData) return <div className="min-h-screen pb-safe" />;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "linear-gradient(180deg, #F8F3FF 0%, #FAFAFA 25%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleGoBack}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ChevronLeftIcon className="w-6 h-6 text-[#333333]" />
          </button>
          <h1 className="text-base font-semibold text-[#333333] text-center flex-1">
            {t("installTitle")}
          </h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-4 mt-2">
        {/* QR Code Card */}
        <div className="bg-white rounded-[20px] p-6 flex flex-col items-center shadow-sm">
          <div className="bg-white p-2 mb-4">
            <QRCodeSVG value={esimData.qrcode || "https://hdbank.com.vn"} size={220} />
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-[#333333]">{t("qrInstallTitle")}</span>
            <button onClick={downloadQR} className="text-[#DA2128] p-1">
              <ArrowDownTrayIcon className="w-6 h-6 stroke-2" />
            </button>
          </div>

          <p className="text-sm text-[#5C5C5C] text-center mb-6">
            {t("qrInstallDescription")}
          </p>

          <button 
            onClick={() => router.push("/hdbank-app/manager-esim/guide")}
            className="text-sm font-semibold text-[#DA2128] underline decoration-[#DA2128] underline-offset-4"
          >
            {t("installGuideButton")}
          </button>
        </div>

        {/* eSIM Info Card */}
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#333333] mb-2 uppercase">
            ESIM {esimData.region_name?.toUpperCase() || "BASIC"}
          </h2>
          
          <div className="flex flex-col">
            <InfoRow label={t("coverage")} value={esimData.region_name} />
            <InfoRow label={t("provider")} value={esimData.provider_name} hasInfo />
            <InfoRow 
              label={t("activationPolicy")} 
              value={
                <span className="text-right">
                  {t.rich("activationPolicyDescHtml", {
                    br: () => <br />
                  })}
                </span>
              } 
            />
            <InfoRow label={t("dataLimit")} value={`${esimData.data_amount} ${esimData.data_unit}`} />
            <InfoRow label={t("validity")} value={t("daysValidity", { days: esimData.validity_days })} />
            <InfoRow label={t("price")} value={`${(esimData.price || 0).toLocaleString()} VND`} />
            <InfoRow label={t("packageType")} value={t("dataOnly")} hasInfo />
            <InfoRow label={t("ekyc")} value={t("notRequired")} />
          </div>
        </div>
      </div>
    </div>
  );
}
