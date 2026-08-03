"use client";

import { useRouter } from "next/navigation";

/**
 * Top navigation bar for the register-sim flow.
 *
 * @param {string} props.title - Centered title text (pass to change per screen).
 * @param {Function} [props.onBack] - Custom back handler; defaults to router.back().
 * @param {boolean} [props.showBack=true] - Whether to render the back button.
 */
const RegisterNavBar = ({ title, onBack, showBack = true }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <header
      className="flex items-center px-4 py-3 text-[#333333]"
      style={{ background: "#F3F4F6", paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
    >
      <div className="flex w-10 items-center">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Quay lại"
            className="-ml-1 p-1"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      <h1 className="flex-1 truncate text-center text-lg font-semibold">
        {title}
      </h1>

      {/* Spacer to keep the title centered */}
      <div className="w-10" />
    </header>
  );
};

export default RegisterNavBar;
