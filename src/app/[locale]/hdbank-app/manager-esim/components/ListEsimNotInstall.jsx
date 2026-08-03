'use client';

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useManagerEsim } from "../providers/ManagerEsimProvider";
import InfoItem from "./InfoItem";

const ListEsimNotInstall = () => {
  const { listEsims } = useManagerEsim();
  const t = useTranslations("manager-esim");
  const router = useRouter();
  const notInstalledEsim = listEsims.notInstalledEsim;

  const handleViewDetail = (esim) => {
    router.push(`/hdbank-app/manager-esim/detail?id=${esim.iccid}`);
  };

  const handleInstall = (esim) => {
    router.push(`/hdbank-app/manager-esim/install?id=${esim.iccid}`);
  };

  if (!notInstalledEsim || notInstalledEsim.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-[#8A8A8A] text-sm">{t("noActiveEsim")}</p>
      </div>
    )
  }
  return (
    notInstalledEsim.map((esim) => (
      <ESimNotInstalledCard
        key={esim.iccid}
        esim={esim}
        onViewDetail={handleViewDetail}
        onInstall={handleInstall}
        t={t}
      />
    ))
  )
}

export default ListEsimNotInstall;

const ESimNotInstalledCard = ({ esim, onInstall, onViewDetail, t }) => {

  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#333333]">{esim.region_name}</h3>
        <span className="px-3 py-1 bg-[#FFF5E9] text-[#FF8A00] text-sm font-medium rounded-full">
          {t("status.notInstalled")}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <InfoItem label={t("coverage")} value={esim.region_name} />
        <InfoItem label={t("dataPackage")} value={`${esim.data_amount} ${esim.data_unit}`} />
        <InfoItem label="ICCID" value={esim.iccid} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 mt-2">
        <button
          onClick={() => onViewDetail(esim)}
          className="flex-1 py-2.5 px-4 border border-[#D1D1D1] rounded-full text-sm font-semibold text-[#333333] hover:bg-gray-50 transition-colors"
        >
          {t("viewDetail")}
        </button>
        <button
          onClick={() => onInstall(esim)}
          className="flex-1 py-2.5 px-4 rounded-full text-sm font-semibold text-white transition-colors"
          style={{
            background: "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)"
          }}
        >
          {t("installEsim")}
        </button>
      </div>
    </div>
  );
};