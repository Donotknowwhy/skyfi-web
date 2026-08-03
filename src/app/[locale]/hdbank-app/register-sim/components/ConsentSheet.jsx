"use client";

import { useEffect, useState } from "react";

// Custom square checkbox matching the HDBank design (red when checked)
const CheckBox = ({ checked, onChange, size = "md" }) => {
  const dimension = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`${dimension} flex-shrink-0 rounded-[10px] flex items-center justify-center transition-colors ${
        checked
          ? "bg-[#DA2128]"
          : "bg-white border-[1.5px] border-[#D9D9D9]"
      }`}
    >
      {checked && (
        <svg
          className="w-1/2 h-1/2 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
};

const ConsentSheet = ({ open, onClose, onAgree, t }) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeShare, setAgreeShare] = useState(false);
  const [agreeEkyc, setAgreeEkyc] = useState(false);
  const [agreeTransfer, setAgreeTransfer] = useState(false);

  // Reset every time the sheet is opened
  useEffect(() => {
    if (open) {
      setAgreeTerms(false);
      setAgreeShare(false);
      setAgreeEkyc(false);
      setAgreeTransfer(false);
    }
  }, [open]);

  const allChecked = agreeTerms && agreeShare && agreeEkyc && agreeTransfer;

  // Toggling the parent "share" consent flips the two purpose sub-options too
  const toggleShare = () => {
    const next = !agreeShare;
    setAgreeShare(next);
    setAgreeEkyc(next);
    setAgreeTransfer(next);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="relative w-full max-h-[92dvh] flex flex-col rounded-t-3xl bg-white animate-[slideUp_.25s_ease-out]">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <span className="h-1 w-12 rounded-full bg-[#D9D9D9]" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4">
          <p className="text-sm text-[#0E0E0F] leading-snug">
            {t("consentProvidedBy")}{" "}
            <span className="font-bold">{t("consentProvidedByBold")}</span>
          </p>

          {/* Terms consent */}
          <div className="mt-5 flex items-start gap-3">
            <CheckBox checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} size={'sm'}/>
            <p className="flex-1 text-sm leading-relaxed text-[#0E0E0F]">
              {t("consentTermsPrefix")}{" "}
              <span className="font-bold text-[#DA2128]">HDBank</span>{" "}
              {t("and")}{" "}
              <span className="font-bold text-[#DA2128]">SkyFi</span>.
            </p>
          </div>

          {/* Data share consent (parent) */}
          <div className="mt-5 flex items-start gap-3">
            <CheckBox checked={agreeShare} onChange={toggleShare} size={'sm'}/>
            <p className="flex-1 text-sm leading-relaxed text-[#0E0E0F]">
              {t("consentShare")}{" "}
              <span className="font-bold text-[#DA2128]">(*)</span>{" "}
              {t("consentSharePurpose")}
            </p>
          </div>

          {/* Purpose sub-options */}
          <div className="mt-4 pl-12 space-y-4">
            <div className="flex items-start gap-3">
              <CheckBox
                size="sm"
                checked={agreeEkyc}
                onChange={() => setAgreeEkyc(!agreeEkyc)}
              />
              <p className="flex-1 text-sm leading-relaxed text-[#0E0E0F]">
                {t("consentEkyc")}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckBox
                size="sm"
                checked={agreeTransfer}
                onChange={() => setAgreeTransfer(!agreeTransfer)}
              />
              <p className="flex-1 text-sm leading-relaxed text-[#0E0E0F]">
                {t("consentTransfer")}
              </p>
            </div>
          </div>

          {/* Sensitive data note */}
          <p className="mt-5 text-sm italic leading-relaxed text-[#0E0E0F]">
            <span className="font-bold text-[#DA2128]">(*)</span> {t("consentNote")}
          </p>

          {/* Support info box */}
          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-[#FFF3CD] px-4 py-3">
            <svg
              className="w-5 h-5 flex-shrink-0 text-[#DA2128] mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="M12 11v5M12 7.5h.01" />
            </svg>
            <p className="flex-1 text-sm leading-relaxed text-[#0E0E0F]">
              {t("supportPrefix")}{" "}
              <span className="font-bold">SkyFi</span>
              {t("supportMiddle")}{" "}
              <span className="font-bold">19006605</span> {t("supportSuffix")}
            </p>
          </div>
        </div>

        {/* Footer action */}
        <div className="border-t border-[#F1F1F1] px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button
            type="button"
            disabled={!allChecked}
            onClick={onAgree}
            className={`w-full rounded-2xl py-4 text-center text-lg font-semibold transition-colors ${
              allChecked
                ? "text-[#00000080]"
                : "bg-[#EDEDED] text-[#9CA3AF] cursor-not-allowed"
            }`}
            style={
              allChecked
                ? {
                    background:
                      "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)",
                  }
                : undefined
            }
          >
            {t("agree")}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ConsentSheet;
