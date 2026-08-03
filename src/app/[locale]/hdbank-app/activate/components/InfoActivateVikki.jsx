"use client";

import dkttService from "@/app/services/dkttService";
import HDBankService from "@/app/services/hdbankService";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useActivateHDBank from "../hook/useActivateHDBank";
import { base64ToHex } from "@/app/utils/encoding";

const InfoActivateVikki = () => {
  const t = useTranslations("hdbank.infoActivate");
  const { setValue, watch, handleSubmit, getValues } = useFormContext();
  const { onBack, onPush } = useActivateHDBank();
  const [loading, setLoading] = useState(false);

  const sessionId = watch("sessionId");
  const userInfo = watch("data") || {};

  // Helper function to format date from yyyy-mm-dd to dd/mm/yyyy
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return "";

    try {
      // Handle format yyyy-mm-dd (e.g., '1994-05-19' -> '19/05/1994')
      if (
        typeof dateString === "string" &&
        /^\d{4}-\d{2}-\d{2}/.test(dateString)
      ) {
        // Get date part only (in case there's time: yyyy-mm-ddTHH:MM:SS)
        const datePart = dateString.split("T")[0];
        const [year, month, day] = datePart.split("-");
        return `${day}/${month}/${year}`;
      }

      // Fallback: try parsing as Date object for other formats
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

      return dateString; // Return original if can't parse
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Fetch eKYC session data and SIM info when sessionId is available
  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) return;

      try {
        setLoading(true);

        // Fetch both eKYC session and SIM info in parallel
        const [ekycData, simInfo] = await Promise.all([
          dkttService.getEkycSession(sessionId),
          dkttService.getSimInfo(sessionId),
        ]);

        // let base64Images = { img_front: '', img_back: '', img_portrait: '' };
        // // Convert S3 image URLs to base64 if eKYC data is available
        // if (ekycData) {
        //   try {
        //     const convertResult = await HDBankService.convertS3ToBase64({
        //       img_front: ekycData.img_front,
        //       img_back: ekycData.img_back,
        //       img_portrait: ekycData.img_portrait
        //     });
        //     base64Images = convertResult || base64Images;
        //   } catch (conversionError) {
        //     console.error('Failed to convert images to base64:', conversionError);
        //     // Continue with empty base64 strings if conversion fails
        //   }
        // }

        // Merge all data into one update
        const currentData = getValues("data") || {};
        setValue("data", {
          ...currentData,
          // eKYC data
          ...(ekycData && {
            fullName: ekycData.customer_name || "",
            gender: ekycData.customer_gender || "",
            idNumber: ekycData.id_number || "",
            birthDay: formatDateToDDMMYYYY(ekycData.birthday) || "",
            issueDate: formatDateToDDMMYYYY(ekycData.issue_date) || "",
            expiryDate: formatDateToDDMMYYYY(ekycData.exp_date) || "",
            issuePlace: ekycData.issue_by || "",
            homeTown: ekycData.address || "",
            address: ekycData.address || "",
            sob: base64ToHex(ekycData?.chip_raw?.sod || ""),
            img1: ekycData.img_front,
            img2: ekycData.img_back,
            img3: ekycData.img_portrait,
            // Missing fields added
            card_type: "CCCD",
            international: "VNM",
            face_matching: "88",
            expired_at: ekycData.expired_at || ekycData.exp_date || "",
          }),
          // SIM info data
          ...(simInfo && {
            seri: simInfo.seri || "",
            phone: simInfo.phone || "",
            imsi: simInfo.imsi || "",
          }),
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  const handleContinue = () => {
    onPush("signActivate");
  };

  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/hdbank/bg-activate.png)" }}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl">
            <div className="w-10 h-10 border-4 border-[#DA2128] border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-600">Đang tải thông tin...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center  px-4 mt-4">
        <button
          onClick={() => onBack()}
          className="w-6 h-6 flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#333333"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex-1" />
        <div className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-4 pt-4 flex-1 overflow-auto pb-[120px]">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#333333] leading-[1.2]">
          {t("title")}
        </h2>

        {/* Info Card */}
        <div className="flex flex-col gap-2 p-4 bg-white/80 rounded-xl border border-[rgba(84,85,86,0.12)]">
          {/* Full Name */}
          <InfoRow label={t("fullName")} name="data.fullName" />

          {/* Gender */}
          <InfoRow label={t("gender")} name="data.gender" />

          {/* ID Number */}
          <InfoRow label={t("idNumber")} name="data.idNumber" />

          {/* Date of Birth */}
          <InfoRow label={t("dateOfBirth")} name="data.birthDay" />

          {/* Issue Date & Expiry Date */}
          <div className="flex gap-3 py-1">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-sm text-[#A1A1A1] leading-6">
                {t("issueDate")}
              </span>
              <span className="text-base font-medium text-[#333333] leading-6">
                {userInfo.issueDate}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-sm text-[#A1A1A1] leading-6">
                {t("expiryDate")}
              </span>
              <span className="text-base font-medium text-[#333333] leading-6">
                {userInfo.expiryDate}
              </span>
            </div>
          </div>

          {/* Issue Place */}
          <InfoRow label={t("issuePlace")} name="data.issuePlace" />

          {/* Permanent Address */}
          <InfoRow label={t("permanentAddress")} name="data.homeTown" />
        </div>

        {/* Current Address Card */}
        <div className="flex flex-col gap-1 p-4 bg-white rounded-lg border border-[#DDDDDD]">
          <span className="text-xs font-medium text-[#333333] leading-[1.5]">
            {t("currentAddress")}
          </span>
          <span className="text-base font-medium text-[#333333] leading-6">
            {userInfo.address}
          </span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.1)] px-4 py-4 pb-8">
        <button
          onClick={handleSubmit(handleContinue)}
          className="w-full py-3 px-4 rounded-full text-white font-semibold text-base"
          style={{
            background:
              "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)",
          }}
        >
          {t("continueButton")}
        </button>
      </div>
    </div>
  );
};

// Reusable Info Row Component
const InfoRow = ({ label, value, isInput = false, name, placeholder }) => {
  const { control, getValues } = useFormContext();

  if (isInput && name) {
    return (
      <div className="flex flex-col gap-1 py-1">
        <span className="text-sm text-[#A1A1A1] leading-6">{label}</span>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder={placeholder || label}
                className={`w-full text-base font-medium text-[#333333] leading-6 bg-white border rounded-lg px-3 py-2 outline-none focus:border-[#DA2128] transition-colors ${
                  error ? "border-red-500" : "border-[#DDDDDD]"
                }`}
              />
              {error && (
                <span className="text-xs text-red-500 mt-1">
                  {error.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 py-1">
      <span className="text-sm text-[#A1A1A1] leading-6">{label}</span>
      <span className="text-base font-medium text-[#333333] leading-6">
        {value ? value : getValues(name)}
      </span>
    </div>
  );
};

export default InfoActivateVikki;
