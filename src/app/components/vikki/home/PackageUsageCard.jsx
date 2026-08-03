"use client";
import { saveLocal } from "@/app/utils/saveLocal";
import { useRouter } from "next/navigation";

const PackageUsageCard = ({
  packageData,
  t,
  checkEnvironment,
  showAutoBillToggle,
  isAutoBillActive,
  setShowRenewModal,
  setShowCancelModal,
}) => {
  const router = useRouter();
  const packageName = packageData?.packageName || "--";
  const remainData = parseFloat(packageData?.remainData || 0);
  const totalData = parseFloat(packageData?.totalData || 1);

  const calculateRemainingDays = () => {
    if (!packageData?.toDate) return "0";
    const toDate = new Date(
      packageData.toDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"),
    );
    const now = new Date();
    const diffTime = toDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays.toString() : "0";
  };

  const remainingDays = calculateRemainingDays();
  const dataRemainGB = (remainData / 1024).toFixed(1);
  const dataTotalGB = (totalData / 1024).toFixed(1);
  const remainingPercentage =
    totalData > 0
      ? Math.max(0, Math.min(100, (remainData / totalData) * 100))
      : 0;
  const circumference = 2 * Math.PI * 55;
  const strokeDashoffset = ((100 - remainingPercentage) / 100) * circumference;

  const goPageInfoPack = (code) => {
    saveLocal("code_package", code);
    router.push("/app-vikki/sim-info");
  };

  return (
    <div className="bg-white rounded-xl shadow-[0px_3px_8px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.05)] py-4 flex flex-col gap-3 mx-0.5 my-1">
      <div
        className="flex items-center justify-between px-4"
        onClick={() => goPageInfoPack(packageData?.code)}
      >
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex flex-col py-2">
            <span className="text-xs text-[#8A8A8A]">{t("mainPackage")}</span>
            <span className="text-sm font-medium text-[#333333]">
              {packageName}
            </span>
          </div>
          <div className="flex flex-col py-2">
            <span className="text-xs text-[#8A8A8A]">{t("remainingTime")}</span>
            <span className="text-sm font-medium text-[#333333]">
              {remainingDays} {t("days")}
            </span>
          </div>
        </div>

        <div className="relative w-[140px] h-[140px]">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="rgba(50, 52, 56, 0.16)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="#0000FF"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-[#5C5C5C]">
              {t("remaining")}
            </span>
            <span className="text-sm font-bold text-[#0000FF]">
              {dataRemainGB}GB/{dataTotalGB}GB
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 pt-3 border-t border-[#F4F4F4]">
        <button
          className="flex items-center gap-2 text-sm font-semibold text-[#0000FF]"
          onClick={() => router.push("/app-vikki/package")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.6667 6.66667C13.6667 6.66667 12.3334 4.66667 10.4734 3.59333C8.61337 2.52 6.22004 2.40667 4.14671 3.40667C2.07337 4.40667 0.666706 6.52 0.666706 8.88667C0.666706 12.2 3.45337 14.6667 7.00004 14.6667"
              stroke="#0000FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.6667 7.33333H13.6667C14.0349 7.33333 14.3334 7.03486 14.3334 6.66667V3.66667"
              stroke="#0000FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12.6667C9 12.6667 10.6667 12.6667 11.3333 14C11.3333 14 13.3333 10.6667 15.3333 10"
              stroke="#0000FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t("changePackage")}
        </button>
        {showAutoBillToggle && (
          <>
            <div className="w-px h-3 bg-[#D8D8D8]" />
            <button
              className="flex items-center gap-2"
              onClick={() =>
                isAutoBillActive
                  ? setShowCancelModal(true)
                  : setShowRenewModal(true)
              }
            >
              <span className="text-[12px] font-semibold text-[#333333]">
                {t("renewWithVikki")}
              </span>
              <div
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  isAutoBillActive ? "bg-[#0000FF]" : "bg-[#D8D8D8]"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                    isAutoBillActive ? "translate-x-[18px]" : "translate-x-0.5"
                  }`}
                />
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageUsageCard;
