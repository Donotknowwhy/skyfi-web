"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ListEsim from "./components/ListEsim";
import ListEsimNotInstall from "./components/ListEsimNotInstall";
import ManagerEsimProvider from "./providers/ManagerEsimProvider";

// Circular Progress Component






// Not Installed eSIM Card Component
// const ESimNotInstalledCard = ({ esim, onInstall, onViewDetail, t }) => {
//   return (
//     <div className="bg-white rounded-xl p-5 flex flex-col gap-2">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h3 className="text-base font-semibold text-[#333333]">{esim.name}</h3>
//         <span className="px-3 py-1 bg-[#FFF5E9] text-[#FF8A00] text-sm font-medium rounded-full">
//           {t("status.notInstalled")}
//         </span>
//       </div>

//       {/* Info */}
//       <div className="flex flex-col">
//         <InfoItem label={t("coverage")} value={esim.coverage} />
//         <InfoItem label={t("dataPackage")} value={`${esim.totalData}GB`} />
//         <InfoItem label="ICCID" value={esim.iccid} />
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-2.5 mt-2">
//         <button
//           onClick={() => onViewDetail(esim)}
//           className="flex-1 py-2.5 px-4 border border-[#D1D1D1] rounded-full text-sm font-semibold text-[#333333] hover:bg-gray-50 transition-colors"
//         >
//           {t("viewDetail")}
//         </button>
//         <button
//           onClick={() => onInstall(esim)}
//           className="flex-1 py-2.5 px-4 rounded-full text-sm font-semibold text-white transition-colors"
//           style={{
//             background: "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)"
//           }}
//         >
//           {t("installEsim")}
//         </button>
//       </div>
//     </div>
//   );
// };

// Mock Data
// const mockActiveEsims = [
//   {
//     id: 1,
//     name: "ESIM BASIC",
//     coverage: "Thái Lan",
//     remainingDays: 5,
//     iccid: "89840480003232863650",
//     usedData: 2,
//     totalData: 8,
//   },
//   {
//     id: 2,
//     name: "ESIM BASIC",
//     coverage: "Thái Lan",
//     remainingDays: 5,
//     iccid: "89840480003232863650",
//     usedData: 2,
//     totalData: 8,
//   },
//   {
//     id: 3,
//     name: "ESIM BASIC",
//     coverage: "Thái Lan",
//     remainingDays: 5,
//     iccid: "89840480003232863650",
//     usedData: 2,
//     totalData: 8,
//   },
// ];

// const mockNotInstalledEsims = [
//   {
//     id: 1,
//     name: "ESIM PREMIUM",
//     coverage: "Nhật Bản",
//     totalData: 10,
//     iccid: "89840480003232863651",
//   },
//   {
//     id: 2,
//     name: "ESIM BASIC",
//     coverage: "Hàn Quốc",
//     totalData: 5,
//     iccid: "89840480003232863652",
//   },
// ];

export default function ManagerEsimPage() {
  const t = useTranslations("manager-esim");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active"); // "active" or "notInstalled"

  const handleGoBack = () => {
    router.back();
  };



  return (
    <ManagerEsimProvider>
      <div className="min-h-screen pb-safe">
        {/* Header */}
        <div className="sticky top-0 backdrop-blur-sm z-10">
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

            <div className="w-12 h-12" /> {/* Spacer for symmetry */}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#F1F1F1]">
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors ${activeTab === "active"
                ? "text-[#DA2128] border-b-2 border-[#DA2128]"
                : "text-[#333333]"
                }`}
              onClick={() => setActiveTab("active")}
            >
              {t("tabs.activeEsim")}
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors ${activeTab === "notInstalled"
                ? "text-[#DA2128] border-b-2 border-[#DA2128]"
                : "text-[#333333]"
                }`}
              onClick={() => setActiveTab("notInstalled")}
            >
              {t("tabs.notInstalledEsim")}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-8">
          <div className="flex flex-col gap-3">
            {activeTab === "active" ? (
              <ListEsim />
            ) : (<ListEsimNotInstall />)}
          </div>
        </div>
      </div>
    </ManagerEsimProvider>
  );
}
