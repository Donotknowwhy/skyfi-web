"use client";

import { modal, useModal } from "@/app/utils/modal";

const AgreeButton = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-6 w-full rounded-2xl py-4 text-center text-lg font-semibold text-[#00000080]"
    style={{ background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }}
  >
    {label}
  </button>
);

// Popup 2 — "Lưu ý nhận quà HDB" (opened from the "Dịch vụ khác" / travel eSIM row)
const GiftNotePopup = ({ t, onConfirm }) => {
  const { close } = useModal();
  const handleConfirm = () => {
    close();
    onConfirm?.();
  };
  return (
    <div className="text-center">
      <img
        src="/images/hdbank/gift-note.svg"
        alt=""
        className="mx-auto mb-6 w-56"
      />

      <h2 className="text-xl font-bold text-[#0E0E0F] text-left">{t("popupGift.title")}</h2>
      <p className="mt-4 text-[14px] leading-relaxed text-[#333333] text-justify font-normal">
        {t("popupGift.messagePrefix")}
        <span className="font-medium text-[#DA2128]">
          {t("popupGift.messageHighlight")}
        </span>
      </p>

      <AgreeButton label={t("popupGift.button")} onClick={handleConfirm} />
    </div>
  );
};

// Popup 3 — recovery-condition note (opened from the "Tìm hiểu thêm" link)
const RecoveryNotePopup = ({ t, onConfirm }) => {
  const { close } = useModal();
  const handleConfirm = () => {
    close();
    onConfirm?.();
  };
  return (
    <div>
      <h2 className="text-xl font-bold leading-snug text-[#333333]">
        {t("popupRecovery.title")}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-[#333333] text-justify">
        {t("popupRecovery.message")}
      </p>
      <AgreeButton label={t("popupRecovery.button")} onClick={handleConfirm} />
    </div>
  );
};

// Popup — gift time expired (shown when the countdown reaches 0)
const ExpiredGiftPopup = ({ t, onConfirm }) => {
  const { close } = useModal();
  const handleConfirm = () => {
    close();
    onConfirm?.();
  };
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-[#0E0E0F]">{t("popupExpired.title")}</h2>
      <p className="mt-4 text-[14px] leading-relaxed text-[#333333] text-justify font-normal">
        {t("popupExpired.message")}
      </p>

      <AgreeButton label={t("popupExpired.button")} onClick={handleConfirm} />
    </div>
  );
};

export const showGiftNotePopup = (t, onConfirm) => {
  modal.open({
    render: <GiftNotePopup t={t} onConfirm={onConfirm} />,
    closeButton: false,
    boxClassName: " max-w-md",
  });
};

export const showRecoveryNotePopup = (t, onConfirm) => {
  modal.open({
    render: <RecoveryNotePopup t={t} onConfirm={onConfirm} />,
    closeButton: false,
    boxClassName: " max-w-md",
  });
};

export const showExpiredGiftPopup = (t, onConfirm) => {
  modal.open({
    render: <ExpiredGiftPopup t={t} onConfirm={onConfirm} />,
    closeButton: false,
    boxClassName: " max-w-md",
  });
};
