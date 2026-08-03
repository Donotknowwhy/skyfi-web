"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useUserState } from "@/app/stores/user";
import { showExpiredGiftPopup } from "./registerSimPopups";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Limited-time gift countdown banner.
 *
 * @param {boolean} [props.isExistingCustomer=false] - Only existing customers see the countdown.
 * @param {string} [props.message] - Reminder text shown on the left.
 * @param {Function} [props.onExpire] - Called once when the countdown reaches 0.
 */
const GiftCountdown = ({
  isExistingCustomer = false,
  message = "Quà tặng có hạn, Quý khách vui lòng nhận quà trước khi hết thời gian",
  onExpire,
}) => {
  const { user } = useUserState();
  const [remaining, setRemaining] = useState(0);
  const hasExpiredRef = useRef(false);
  const t = useTranslations("hdbank.registerSim");

  useEffect(() => {
    if (!isExistingCustomer || !user?.gift_expire) return;

    const tick = () => {
      const expireTime = new Date(user.gift_expire).getTime();
      const next = Math.max(0, Math.floor((expireTime - Date.now()) / 1000));
      setRemaining(next);

      if (next === 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        showExpiredGiftPopup(t, onExpire);
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [isExistingCustomer, user, t, onExpire]);

  // Countdown is an existing-customer-only perk.
  if (!isExistingCustomer || !user?.gift_expire) return null;

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return (
    <div className="flex items-center gap-3 bg-[#FDEAEC] px-4 py-3">
      {/* Stopwatch icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4 0C14.6122 0 14.8157 0.0842855 14.9657 0.234315C15.1157 0.384344 15.2 0.587827 15.2 0.8C15.2 1.01217 15.1157 1.21566 14.9657 1.36569C14.8157 1.51571 14.6122 1.6 14.4 1.6H12.8V3.3936C14.5072 3.52461 16.1538 4.08429 17.5872 5.0208C17.6202 4.97634 17.6554 4.93361 17.6928 4.8928L19.2928 3.2928L19.4512 3.1648C19.6437 3.03974 19.8732 2.98458 20.1015 3.00854C20.3298 3.0325 20.5429 3.13414 20.7052 3.29643C20.8675 3.45873 20.9691 3.67184 20.9931 3.9001C21.017 4.12837 20.9619 4.35794 20.8368 4.5504L20.7088 4.7072L19.1456 6.2688C20.8218 7.90225 21.8878 10.0606 22.1662 12.3844C22.4446 14.7082 21.9185 17.0573 20.6756 19.0404C19.4327 21.0236 17.5479 22.5211 15.3352 23.2836C13.1225 24.0462 10.7153 24.0277 8.51452 23.2314C6.31375 22.435 4.45218 20.9087 3.23982 18.9068C2.02745 16.9048 1.53746 14.548 1.85143 12.2287C2.16539 9.90942 3.26438 7.76768 4.96537 6.16011C6.66636 4.55255 8.86671 3.57618 11.2 3.3936V1.6H9.60002C9.38784 1.6 9.18436 1.51571 9.03433 1.36569C8.8843 1.21566 8.80002 1.01217 8.80002 0.8C8.80002 0.587827 8.8843 0.384344 9.03433 0.234315C9.18436 0.0842855 9.38784 0 9.60002 0L14.4 0ZM12 4.96C10.8652 4.96021 9.74151 5.18394 8.69314 5.61842C7.64478 6.05289 6.69225 6.6896 5.88995 7.4922C4.26964 9.11311 3.35959 11.3113 3.36002 13.6032C3.36044 15.8951 4.2713 18.093 5.89222 19.7133C7.51313 21.3336 9.71132 22.2436 12.0032 22.2432C14.2951 22.2428 16.493 21.3319 18.1133 19.711C19.7336 18.0901 20.6436 15.8919 20.6432 13.6C20.6428 11.3081 19.7319 9.11025 18.111 7.48993C16.4901 5.86962 14.2919 4.95958 12 4.96ZM12 13.6L16.9792 18.5776C16.1607 19.3963 15.1528 20.0005 14.045 20.3367C12.9371 20.6728 11.7635 20.7306 10.6279 20.5049C9.49244 20.2791 8.43014 19.7768 7.53513 19.0424C6.64013 18.308 5.94005 17.3643 5.4969 16.2947C5.05375 15.2252 4.88122 14.0628 4.99459 12.9106C5.10795 11.7585 5.50371 10.6521 6.14682 9.68937C6.78992 8.72669 7.66052 7.93747 8.68149 7.39161C9.70246 6.84576 10.8423 6.56012 12 6.56V13.6Z" fill="#DA2128"/>
      </svg>


      <p className="flex-1 text-[10px] leading-4 text-[#1C1C1E]">{message}</p>

      <div className="self-stretch border-l border-[#F2B8BD]" />

      <div className="flex items-center gap-1 text-[16px] font-bold tabular-nums text-[#E1262F]">
        <span>{pad(hours)}</span>
        <span>:</span>
        <span>{pad(minutes)}</span>
        <span>:</span>
        <span>{pad(seconds)}</span>
      </div>
    </div>
  );
};

export default GiftCountdown;
