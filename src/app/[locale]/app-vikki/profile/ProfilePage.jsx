"use client";
import Footer from "@/app/components/vikki/home/Footer";
import { useUserActions, useUserState } from "@/app/stores/user";
import { useRouter } from "@/i18n/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

// Menu Item Component
const MenuItem = ({ icon, title, onClick, trailing, showBorder = true }) => {
  return (
    <button
      className="w-full flex items-center gap-3 py-4 text-left"
      onClick={onClick}
    >
      <div className="w-6 h-6 flex items-center justify-center text-[#333333]">
        {icon}
      </div>
      <div
        className={`flex-1 flex items-center justify-between ${showBorder ? "border-b border-[#F1F1F1]" : ""} pb-4 -mb-4`}
      >
        <span className="text-base text-[#333333]">{title}</span>
        {trailing || <ChevronRightIcon className="w-5 h-5 text-[#8A8A8A]" />}
      </div>
    </button>
  );
};

// Sim Card Icon SVG
const SimCardIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 2L4 7V22H20V2H9Z"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 2V7H4"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="8"
      y="11"
      width="8"
      height="7"
      rx="1"
      stroke="#333333"
      strokeWidth="1.5"
    />
  </svg>
);

// Travel eSIM Icon SVG
const TravelEsimIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12H22"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Headset Icon SVG
const HeadsetIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19ZM3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Logout Icon SVG
const LogoutIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
      stroke="#ED4337"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17L21 12L16 7"
      stroke="#ED4337"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H9"
      stroke="#ED4337"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfilePage = () => {
  const t = useTranslations("vikki.profile");
  const router = useRouter();
  const { isLoggedIn } = useUserState();
  const { logout, checkLogin, checkOverNumber } = useUserActions();

  const handleLogout = () => {
    logout();
    router.push("/app-vikki");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#E8E5FA] via-[#F3E8F4] to-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3">
        <h1 className="flex-1 text-2xl font-semibold text-[#333333]">
          {t("title")}
        </h1>
      </div>

      {/* Menu Items */}
      <div className="flex-1 bg-white rounded-t-[20px] px-4 mt-2">
        {/* Travel eSIM Management */}
        <MenuItem
          icon={<TravelEsimIcon />}
          title={t("manageTravelEsim")}
          onClick={() => router.push("/app-vikki/manager-esim")}
        />

        {/* Account Info */}
        <MenuItem
          icon={<UserIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t("accountInfo")}
          onClick={() =>
            checkLogin(() => router.push("/app-vikki/profile/detail"))
          }
        />

        {/* Subscriber History */}
        <MenuItem
          icon={<ClockIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t("subscriberHistory")}
          onClick={() =>
            checkLogin(() =>
              router.push("/app-vikki/profile/subscriber-history"),
            )
          }
        />

        {/* Activate SIM */}
        <MenuItem
          icon={<SimCardIcon />}
          title={t("activateSim")}
          onClick={() =>
            checkOverNumber(() => router.push("/app-vikki/activate"))
          }
        />

        {/* Customer Support */}
        <MenuItem
          icon={<HeadsetIcon />}
          title={t("customerSupport")}
          onClick={() => (window.location.href = "tel:19006605")}
          trailing={
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#D2008C] bg-[#D2008C]/10 px-4 py-2 rounded-full">
                1900 6605
              </span>
            </div>
          }
        />

        {/* Terms and Policy */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t("termsAndPolicy")}
          onClick={() => router.push("/app-vikki/profile/terms")}
        />
      </div>

      {/* Bottom Navigation */}
      <Footer activeTab="profile" />
    </div>
  );
};

export default ProfilePage;
