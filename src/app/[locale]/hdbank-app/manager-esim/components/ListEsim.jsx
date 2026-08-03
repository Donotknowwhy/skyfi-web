'use client';

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useManagerEsim } from "../providers/ManagerEsimProvider";
import CircularProgress from "./CircularProgress";
import InfoItem from "./InfoItem";

const ListEsim = () => {
  const { listEsims } = useManagerEsim();
  const t = useTranslations("manager-esim");
  const router = useRouter();
  const ListEsimCard = listEsims.activeEsim;

  const handleViewDetail = (esim) => {
    router.push(`/hdbank-app/manager-esim/detail?id=${esim.iccid}`);
  };

  if (!ListEsimCard || ListEsimCard.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-[#8A8A8A] text-sm">{t("noActiveEsim")}</p>
      </div>
    )
  }
  return (
    ListEsimCard.map((esim) => (
      <ESimCard
        key={esim.iccid}
        esim={esim}
        onViewDetail={handleViewDetail}
        t={t}
      />
    ))
  )
};

export default ListEsim;

// eSIM Card Component
const ESimCard = ({ esim, onViewDetail, t }) => {
  	const calculateRemainingDays = (expiryDate) => {
		const currentDate = new Date();
		const expiry = new Date(expiryDate);
		const timeDiff = expiry - currentDate;
		const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return daysLeft > 0 ? daysLeft : 0;
	}
  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#333333]">{esim.region_name}</h3>
        <span className="px-3 py-1 bg-[#E6F7EC] text-[#00B141] text-sm font-medium rounded-full">
          {t("status.active")}
        </span>
      </div>

      {/* Info and Data */}
      <div className="flex items-center gap-6">
        {/* Info Column */}
        <div className="flex flex-col flex-1">
          <InfoItem label={t("coverage")} value={esim.region_name} />
          <InfoItem label={t("remainingTime")} value={`${esim.data?.expired_at ? calculateRemainingDays(esim.data.expired_at) : 0} ${t("days")}`} />
          <InfoItem label="ICCID" value={esim.iccid} />
        </div>

        {/* Circular Progress */}
        <CircularProgress
          usedData={esim.data?.remaining}
          totalData={esim.data?.total}
          unit="MB"
          t={t}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 mt-2">
        <button
          onClick={() => onViewDetail(esim)}
          className="flex-1 py-2.5 px-4 border border-[#D1D1D1] rounded-full text-sm font-semibold text-[#333333] hover:bg-gray-50 transition-colors"
        >
          {t("viewDetail")}
        </button>
      </div>
    </div>
  );
};
// Info Item Component

