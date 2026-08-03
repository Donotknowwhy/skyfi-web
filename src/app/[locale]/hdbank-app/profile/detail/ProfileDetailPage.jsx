"use client";
import { useUserState } from "@/app/stores/user";
import { useRouter } from "@/i18n/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { formatDate } from "@/app/utils/format";

// Info Row Component
const InfoRow = ({ label, value, isLast = false }) => {
  return (
    <div
      className={`flex flex-col gap-1 py-2 ${!isLast ? "border-b border-[#F1F1F1]" : ""}`}
    >
      <span className="text-xs text-[#8A8A8A] font-normal leading-4">
        {label}
      </span>
      <span className="text-sm text-[#333333] font-medium leading-5">
        {value || "-"}
      </span>
    </div>
  );
};

// Info Row with Two Columns Component
const InfoRowDouble = ({ label1, value1, label2, value2 }) => {
  return (
    <div className="flex gap-4 py-2 border-b border-[#F1F1F1]">
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-xs text-[#8A8A8A] font-normal leading-4">
          {label1}
        </span>
        <span className="text-sm text-[#333333] font-medium leading-5">
          {value1 || "-"}
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-xs text-[#8A8A8A] font-normal leading-4">
          {label2}
        </span>
        <span className="text-sm text-[#333333] font-medium leading-5">
          {value2 || "-"}
        </span>
      </div>
    </div>
  );
};

const ProfileDetailPage = () => {
  const t = useTranslations("hdbank.profileDetail");
  const router = useRouter();
  const { user } = useUserState();
  console.log("user", user);

  // Mock user data - in real app, this would come from user state or API
  const profileData = {
    fullName: user?.full_name || "",
    gender: user?.gender || "",
    idNumber: user?.id_number || "",
    dateOfBirth: formatDate(user?.birthday),
    issueDate: formatDate(user?.id_issue_date),
    expiryDate: user?.active_date,
    placeOfIssue: user?.id_issue_place || "",
    permanentAddress: user?.address || "",
    email: user?.email || "",
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      {/* Header / Top Bar */}
      <div className="sticky top-0 z-10  backdrop-blur-sm">
        {/* Navigation Bar */}
        <div className="relative flex items-center justify-center h-12">
          <button onClick={() => router.back()} className="absolute left-1 p-3">
            <ChevronLeftIcon
              className="w-6 h-6 text-[#333333]"
              strokeWidth={2}
            />
          </button>
          <h1 className="text-base font-semibold text-[#333333] leading-6">
            {t("title")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        {/* Full Name */}
        <InfoRow label={t("fullName")} value={profileData.fullName} />

        {/* Gender */}
        <InfoRow label={t("gender")} value={profileData.gender} />

        {/* ID Number */}
        <InfoRow label={t("idNumber")} value={profileData.idNumber} />

        {/* Date of Birth */}
        <InfoRow label={t("dateOfBirth")} value={profileData.dateOfBirth} />

        {/* Issue Date & Expiry Date - Two columns */}
        <InfoRowDouble
          label1={t("issueDate")}
          value1={profileData.issueDate}
          label2={t("expiryDate")}
          value2={profileData.expiryDate}
        />

        {/* Place of Issue */}
        <InfoRow label={t("placeOfIssue")} value={profileData.placeOfIssue} />

        {/* Permanent Address */}
        <InfoRow
          label={t("permanentAddress")}
          value={profileData.permanentAddress}
        />

        {/* Email */}
        <InfoRow label={t("email")} value={profileData.email} isLast={true} />
      </div>
    </div>
  );
};

export default ProfileDetailPage;
