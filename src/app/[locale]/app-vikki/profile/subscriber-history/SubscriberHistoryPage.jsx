"use client";
import { useRouter } from "@/i18n/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import SubscriberHistoryProvider, {
  useSubscriberHistory,
} from "./provider/subscriberHistoryProvider";

// Tab component
const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-sm font-medium transition-all ${
        isActive
          ? "text-[#D2008C] border-b-2 border-[#D2008C]"
          : "text-neutral-900 border-b-2 border-transparent"
      }`}
    >
      {label}
    </button>
  );
};

// Transaction Icon Component
const TransactionIcon = ({ type }) => {
  // Different icons based on transaction type
  if (type === "scratch_card") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path d="M3 10H21" stroke="#333333" strokeWidth="1.5" />
          <path
            d="M7 14H10"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Default - Momo/wallet icon
  return (
    <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#333333"
          strokeWidth="1.5"
        />
        <path
          d="M12 8V12L15 15"
          stroke="#333333"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// Transaction Item Component
const TransactionItem = ({ title, datetime, amount, type, status }) => {
  const formattedAmount =
    amount > 0
      ? `+${amount.toLocaleString("vi-VN")}`
      : amount.toLocaleString("vi-VN");

  return (
    <div className="flex items-center gap-3 py-3">
      <TransactionIcon type={type} />
      <div className="flex-1">
        <p
          className={clsx(
            "text-sm font-medium text-[#333333]",
            status ? "text-[#333333]" : "text-red-600",
          )}
        >
          {title}
        </p>
        <p className="text-xs text-[#8A8A8A]">{datetime}</p>
      </div>
      <span
        className={clsx(
          "text-sm font-medium",
          amount > 0 ? "text-[#22C55E]" : "text-[#333333]",
          status ? "" : "text-red-600",
        )}
      >
        {formattedAmount} VND
      </span>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ t }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src="/images/my-esim/empty-esim.png"
          alt="No history"
          fill
          className="object-contain opacity-50"
        />
        {/* Fallback if image doesn't exist, though we should ideally ensure it does or use an SVG */}
        <div
          className="absolute inset-0 flex items-center justify-center text-neutral-300"
          style={{ zIndex: -1 }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 3h-15C3.67 3 3 3.67 3 4.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zm-15 1.5h15v15h-15v-15zm4.5 5.25c.41 0 .75.34.75.75v5.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-5.25c0-.41.34-.75.75-.75zm6 0c.41 0 .75.34.75.75v5.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-5.25c0-.41.34-.75.75-.75zm-3-2.25c.41 0 .75.34.75.75v7.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V6.5c0-.41.34-.75.75-.75z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <p className="text-sm text-[#8A8A8A] font-medium">{t("empty")}</p>
    </div>
  );
};

// Date Group Component
const DateGroup = ({ activeTab, t }) => {
  const { historyTopupData, historyPackageData } = useSubscriberHistory();
  const data = activeTab === "topup" ? historyTopupData : historyPackageData;

  if (!data || data.length === 0) {
    return <EmptyState t={t} />;
  }

  return data.map(({ date, transactions }) => (
    <div className="mb-4">
      <p className="text-xs text-[#8A8A8A] mb-2">{date}</p>
      <div className="divide-y divide-[#F1F1F1]">
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            title={t(transaction.title, { provider: transaction.type })}
            datetime={transaction.datetime}
            amount={transaction.amount}
            type={transaction.type}
            status={transaction.status}
          />
        ))}
      </div>
    </div>
  ));
};

const SubscriberHistoryPage = () => {
  const t = useTranslations("vikki.subscriberHistory");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("topup");

  const tabs = [
    { id: "topup", label: t("tabs.topup") },
    { id: "services", label: t("tabs.services") },
    // { id: 'calls', label: t('tabs.calls') },
  ];

  return (
    <SubscriberHistoryProvider>
      <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#E8E5FA] via-[#F3E8F4] to-white">
        {/* Header / Top Bar */}
        <div className="sticky top-0 z-10 ">
          {/* Navigation Bar */}
          <div className="relative flex items-center justify-center h-12">
            <button
              onClick={() => router.back()}
              className="absolute left-1 p-3"
            >
              <ChevronLeftIcon
                className="w-6 h-6 text-[#333333]"
                strokeWidth={2}
              />
            </button>
            <h1 className="text-base font-semibold text-[#333333] leading-6">
              {t("title")}
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#F1F1F1]">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 pt-4 overflow-y-auto">
          <DateGroup activeTab={activeTab} t={t} />
        </div>
      </div>
    </SubscriberHistoryProvider>
  );
};

export default SubscriberHistoryPage;
