"use client";

import { modal, useModal } from "@/app/utils/modal";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Over Number Modal Content Component
const OverNumberContent = ({ count }) => {
  const { close } = useModal();
  const t = useTranslations("hdbank.modals.overNumber");

  return (
    <div className="w-full flex flex-col">
      {/* Content */}
      <div className="flex flex-col gap-3 pb-4">
        {/* Icon */}
        <div className="w-20 h-20 flex items-center justify-center">
          <Image
            src="/wating.png"
            width={80}
            height={80}
            alt="Waiting"
            className="w-full h-full"
          />
        </div>

        {/* Title & message */}
        <div className="flex flex-col gap-1 px-2">
          <h3
            className="text-2xl font-semibold text-[#0E0E0F] leading-tight"
            style={{ letterSpacing: "-1.08%" }}
          >
            {t("title")}
          </h3>
          <div
            className="text-sm text-[rgba(50,52,56,0.7)] leading-[1.43] mt-1 space-y-1"
            style={{ letterSpacing: "-1.64%" }}
          >
            <p>{t("description", { count })}</p>
            <div className="pt-2 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className=" text-[#0E0E0F]">{t("emailLabel")}</span>
                <a
                  href={t("emailUrl")}
                  className="text-[#DA2128] hover:underline"
                >
                  {t("emailValue")}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <span className=" text-[#0E0E0F]">{t("zaloLabel")}</span>
                <a
                  href={t("zaloUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DA2128] hover:underline"
                >
                  {t("zaloValue")}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <span className=" text-[#0E0E0F]">{t("hotlineLabel")}</span>
                <a
                  href={t("hotlineUrl")}
                  className="text-[#DA2128] hover:underline"
                >
                  {t("hotlineValue")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 px-4 pt-4">
        {/* Close Button */}
        <button
          onClick={close}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[rgba(84,85,86,0.12)] rounded-full shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08),inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]"
        >
          <span
            className="text-base font-semibold text-[#0E0E0F] leading-6 text-center"
            style={{ letterSpacing: "-2.69%" }}
          >
            {t("closeButton")}
          </span>
        </button>
      </div>
    </div>
  );
};

// Function to open Over Number modal
export const showOverNumber = (count) => {
  modal.sheet({
    render: <OverNumberContent count={count} />,
    boxClassName: "max-w-md",
    classContainer: "!p-0",
  });
};

export default OverNumberContent;
