"use client";

import { useRouter } from "next/navigation";

/**
 * Header with a back button and a segmented step-progress bar.
 *
 * @param {number} [props.totalSteps=4] - Number of segments.
 * @param {number} [props.currentStep=totalSteps] - How many segments are filled (red).
 * @param {Function} [props.onBack] - Custom back handler; defaults to router.back().
 * @param {boolean} [props.showBack=true] - Whether to render the back button.
 */
const StepProgressHeader = ({
  totalSteps = 4,
  currentStep = totalSteps,
  onBack,
  showBack = true,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <header
      className="flex items-center gap-4 bg-white px-4 py-4"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
    >
      {showBack ? (
        <button
          type="button"
          onClick={handleBack}
          aria-label="Quay lại"
          className="-ml-1 p-1 text-[#1C1C1E]"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      ) : (
        <span className="w-6" />
      )}

      <div className="flex flex-1 items-center justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full !w-10 ${i < currentStep ? "bg-[#DA2128]" : "bg-[#E5E5E5]"}`}
          />
        ))}
      </div>
    </header>
  );
};

export default StepProgressHeader;
