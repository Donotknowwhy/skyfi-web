"use client";

import PackageCard from "@/app/components/hdbank/PackageCard";
import { usePackageHDBank } from "@/app/hooks/usePackageHDBank";
import subscriberService from "@/app/services/subscriber";
import { useUserState } from "@/app/stores/user";
import { getLocal } from "@/app/utils/saveLocal";
import { useRouter } from "@/i18n/navigation";
import {
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Circular Data Indicator Component
const DataCircleIndicator = ({ usedData = 2, totalData = 8, t }) => {
  const percentage = (usedData / totalData) * 100;
  const circumference = 2 * Math.PI * 80; // radius = 70
  const strokeDashoffset = (percentage / 100) * circumference;
  const dataRemainGB = (totalData - usedData).toFixed(1);

  return (
    <div className="relative w-[180px] h-[180px] mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r="80"
          fill="none"
          stroke="rgba(50, 52, 56, 0.16)"
          strokeWidth="18"
        />
        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r="80"
          fill="none"
          stroke="#DA2128"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-[rgba(50,52,56,0.61)]">
          {t("remainingPerDay")}
        </span>
        <span className="text-xl font-bold text-[rgba(50,52,56,0.61)]">
          <span className="text-[#DA2128]">{dataRemainGB}GB</span>/{totalData}GB
        </span>
      </div>
    </div>
  );
};

// Usage Card Component (for Call and SMS)
const UsageCard = ({
  icon,
  title,
  subtitle,
  totalAmount,
  unit,
  usedAmount,
  totalUsage,
  daysUsed,
  totalDays,
}) => {
  const progressPercent = (usedAmount / totalUsage) * 100;

  return (
    <div className="flex-1 bg-white/80 border border-[#F1F1F1] rounded-2xl p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <div className="w-11 h-11 bg-[#F5F5F5] rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-[#333333]">{title}</span>
          <span className="text-xs text-[#333333]">{subtitle}</span>
        </div>
      </div>

      {/* Usage Info */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-[#333333]">
          {totalAmount} {unit}
        </span>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="relative h-2 bg-[rgba(50,52,56,0.16)] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#DA2128] rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#333333]">
              {usedAmount}/{totalUsage}
            </span>
            <span className="text-xs text-[#333333]">
              {daysUsed}/{totalDays} ngày
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimInfoPage = () => {
  const t = useTranslations("hdbank.simInfo");
  const router = useRouter();
  const { cartId, isLoggedIn } = useUserState();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [availablePackages, setAvailablePackages] = useState([]);

  const codePacke = getLocal("code_package");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn || !cartId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch current package and available packages in parallel
        const [currentPkgRes, availablePkgsRes] = await Promise.all([
          subscriberService.getCurrentPackage(cartId),
          subscriberService.getPackagesByMsisdn(cartId),
        ]);

        if (currentPkgRes.success && currentPkgRes.data) {
          const mainPackages = currentPkgRes.data.filter(
            (pkg) => pkg.is_main == 1,
          );
          const currentPackage = mainPackages.find(
            (pkg) => pkg.code == codePacke,
          );
          if (!currentPackage) {
            setCurrentPackage(mainPackages[0]);
          } else {
            setCurrentPackage(currentPackage);
          }
        }

        if (availablePkgsRes.success && availablePkgsRes.data) {
          setAvailablePackages(availablePkgsRes.data);
        }
      } catch (error) {
        console.error("Error fetching sim info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cartId, isLoggedIn, codePacke]);

  // Calculate remaining days from toDate
  const calculateRemainingDays = () => {
    if (!currentPackage?.toDate) return { remaining: 0, total: 30 };

    const parseDate = (dateStr) => {
      // Format: "26/04/2025 22:18:00" or "26/05/2025 22:18:00"
      const [datePart] = dateStr.split(" ");
      const [day, month, year] = datePart.split("/");
      return new Date(year, month - 1, day);
    };

    const fromDate = currentPackage.fromDate
      ? parseDate(currentPackage.fromDate)
      : new Date();
    const toDate = parseDate(currentPackage.toDate);
    const now = new Date();

    const totalDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.max(
      0,
      Math.ceil((toDate - now) / (1000 * 60 * 60 * 24)),
    );

    return { remaining: remainingDays, total: totalDays };
  };

  const { remaining: remainingDays, total: totalDays } =
    calculateRemainingDays();

  // Convert MB to GB
  const remainData = parseFloat(currentPackage?.remainData || 0);
  const totalData = parseFloat(currentPackage?.totalData || 1);
  const dataUsedGB = ((totalData - remainData) / 1024).toFixed(1);
  const dataTotalGB = (totalData / 1024).toFixed(1);

  // Mock data for call and SMS (not available in API yet)
  const remainVoice = parseFloat(currentPackage?.remainVoice || 0);
  const totalVoice = parseFloat(currentPackage?.totalVoice || 1);
  const remainSms = parseFloat(currentPackage?.remainSms || 0);
  const totalSms = parseFloat(currentPackage?.totalSms || 1);
  const callMinutes = {
    total: totalVoice,
    used: totalVoice - remainVoice,
    daysUsed: totalVoice - (totalVoice - remainVoice),
    totalDays: totalDays,
  };

  const sms = {
    total: totalSms,
    used: totalSms - remainSms,
    daysUsed: totalSms - (totalSms - remainSms),
    totalDays: totalDays,
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.1,
    variableWidth: true,
    slidesToScroll: 1,
    arrows: false,
    className: "slider variable-width",
  };

  // Loading state

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF9F5] via-[#FFF3EA] to-white">
        <div className="w-8 h-8 border-3 border-[#DA2128] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#FFF9F5] via-[#FFF3EA] to-white">
      {/* Header */}
      <div className="flex items-center gap-5 p-4 ">
        <button onClick={() => router.back()} className="p-0">
          <ChevronLeftIcon className="w-6 h-6 text-[#0D2240]" strokeWidth={2} />
        </button>
        <div className="flex-1 text-center">
          <span className="text-base font-bold text-[#0D2240]">
            {t("remainingTitle", {
              remaining: remainingDays,
              total: totalDays,
            })}
          </span>
        </div>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Data Circle */}
      <div className="py-6">
        <DataCircleIndicator
          usedData={parseFloat(dataUsedGB)}
          totalData={parseFloat(dataTotalGB)}
          t={t}
        />
      </div>

      {/* Usage Cards */}
      <div className="flex gap-3 px-4">
        {callMinutes.total > 0 ? (
          <UsageCard
            icon={
              <PhoneIcon className="w-6 h-6 text-[#333333]" strokeWidth={1.5} />
            }
            title={t("call")}
            subtitle={t("monthly")}
            totalAmount={`${callMinutes.total}`}
            unit={t("minutesPerMonth")}
            usedAmount={callMinutes.used}
            totalUsage={callMinutes.total}
            daysUsed={callMinutes.daysUsed}
            totalDays={callMinutes.totalDays}
          />
        ) : null}

        {sms.total > 0 ? (
          <UsageCard
            icon={
              <ChatBubbleLeftIcon
                className="w-6 h-6 text-[#333333]"
                strokeWidth={1.5}
              />
            }
            title={t("sms")}
            subtitle={t("monthly")}
            totalAmount={`${sms.total}`}
            unit={t("smsPerMonth")}
            usedAmount={sms.used}
            totalUsage={sms.total}
            daysUsed={sms.daysUsed}
            totalDays={sms.totalDays}
          />
        ) : null}
      </div>

      {/* Hot Packages Section */}
      <div className="flex flex-col gap-2 px-4 mt-6 pb-24">
        {/* Section Header */}
        <div className="flex items-center justify-between py-2">
          <span className="text-lg font-semibold text-[#333333]">
            {t("hotPackages")}
          </span>
          <button
            className="text-sm font-semibold text-[#DA2128]"
            onClick={() => router.push("/hdbank-app/package")}
          >
            {t("explore")}
          </button>
        </div>

        {/* Package Cards */}

        <Slider {...settings} className="packSliderPackage">
          {availablePackages.map((pkg, index) => (
            <PackageCard
              key={pkg.id || index}
              pack={pkg}
              className="mr-2 h-full min-w-[320px]"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SimInfoPage;
