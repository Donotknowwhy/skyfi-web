"use client";

/**
 * SessionExpired – full-page friendly error UI for the Vikki app.
 *
 * Shown when the user's session has expired or the login-with-session API
 * call returns an error (e.g. "Session đã hết hạn").
 *
 * Design follows the Vikki design language:
 *  - Background: /figma-images/background.png (cover)
 *  - Brand blue: #0000EA / #0057FF
 *  - White card with shadow, rounded-[20px]
 *  - Gradient button (same as <Button variant="normal">)
 *  - Animated lock icon with pulsing ring
 */

import { Button } from "@/app/components/ui/Button";

const SessionExpired = ({ error, onRetry }) => {
    const isSessionExpired =
        !error ||
        error.toLowerCase().includes("session") ||
        error.toLowerCase().includes("hết hạn") ||
        error.toLowerCase().includes("expired");

    const title = isSessionExpired ? "Phiên đăng nhập hết hạn" : "Có lỗi xảy ra";
    const description = isSessionExpired
        ? "Phiên làm việc của bạn đã hết hạn. Vui lòng quay lại ứng dụng Vikki và thử lại."
        : error || "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.";

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7]"
            style={{
                backgroundImage: `url(/figma-images/background.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Vikki logo strip at top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2C4EFF] via-[#6100FF] via-[#DA0191] to-[#FFB907]" />

            <div className="w-full max-w-sm mx-auto px-5 flex flex-col items-center">
                {/* Animated icon */}
                <div className="relative mb-8 flex items-center justify-center">
                    {/* Outer pulsing ring */}
                    <span
                        className="absolute inline-flex w-28 h-28 rounded-full opacity-20"
                        style={{
                            background:
                                "radial-gradient(circle, #0057FF 0%, transparent 70%)",
                            animation: "sessionPulse 2.4s ease-in-out infinite",
                        }}
                    />
                    {/* Middle ring */}
                    <span
                        className="absolute inline-flex w-20 h-20 rounded-full opacity-30"
                        style={{
                            background:
                                "radial-gradient(circle, #0057FF 0%, transparent 70%)",
                            animation: "sessionPulse 2.4s ease-in-out 0.4s infinite",
                        }}
                    />
                    {/* Icon container */}
                    <div
                        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                        style={{
                            background:
                                "linear-gradient(135deg, #EEF2FF 0%, #DBEAFE 50%, #EDE9FE 100%)",
                        }}
                    >
                        {/* Lock SVG */}
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 14V10C10 6.686 12.686 4 16 4C19.314 4 22 6.686 22 10V14"
                                stroke="#0057FF"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <rect
                                x="6"
                                y="14"
                                width="20"
                                height="14"
                                rx="4"
                                fill="#EEF4FF"
                                stroke="#0057FF"
                                strokeWidth="2.2"
                            />
                            <circle cx="16" cy="21" r="2.5" fill="#0057FF" />
                            <path
                                d="M16 21V24"
                                stroke="#0057FF"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Vikki logo mark */}
                <div className="mb-6 flex items-center gap-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 11.7073C0 5.24155 5.24155 0 11.7073 0H28.2927C34.7585 0 40 5.24155 40 11.7073V28.2927C40 34.7585 34.7585 40 28.2927 40H11.7073C5.24155 40 0 34.7585 0 28.2927V11.7073Z"
                            fill="#0000EA"
                        />
                        <mask
                            id="sessionExpMask"
                            style={{ maskType: "luminance" }}
                            maskUnits="userSpaceOnUse"
                            x="8"
                            y="10"
                            width="24"
                            height="20"
                        >
                            <path
                                d="M32 10.0715V29.9277H26.8775V10.0715H32ZM20.5853 14.8519V29.9277H25.7078V14.8519H20.5853ZM14.2922 19.6332V29.9286H19.4147V19.6332H14.2922ZM8 24.4135V29.9277H13.1225V24.4135H8Z"
                                fill="white"
                            />
                        </mask>
                        <g mask="url(#sessionExpMask)">
                            <path d="M32.9977 10.0715H6.84131V29.9277H32.9977V10.0715Z" fill="white" />
                        </g>
                    </svg>
                    <span className="text-[13px] font-semibold text-[#0000EA] tracking-wide uppercase">
                        Vikki
                    </span>
                </div>

                {/* Card */}
                <div className="w-full bg-white rounded-[20px] shadow-[0px_8px_32px_rgba(0,0,0,0.10)] px-6 py-8 flex flex-col items-center text-center">
                    {/* Title */}
                    <h1 className="text-[20px] font-bold text-[#1C1C1E] mb-3">
                        {title}
                    </h1>

                    {/* Description */}
                    <p className="text-[14px] text-[#5C5C5C] leading-[22px] mb-6">
                        {description}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-[#F2F2F7] mb-6" />

                    {/* Tips */}
                    <div className="w-full bg-[#F8F9FF] rounded-[12px] p-4 mb-8 text-left">
                        <p className="text-[12px] font-semibold text-[#0057FF] mb-2 uppercase tracking-wide">
                            Hướng dẫn
                        </p>
                        <ul className="space-y-1.5">
                            {[
                                "Mở lại ứng dụng Vikki trên điện thoại",
                                "Nhấn vào tính năng Sim SkyFi",
                                "Trang web sẽ tự động cập nhật phiên mới",
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span
                                        className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                                        style={{
                                            background:
                                                "linear-gradient(88deg, #2C4EFF -4%, #0000FF 13%, #6100FF 48%, #DA0191 74%, #FF8A00 90%, #FFB907 99%)",
                                        }}
                                    >
                                        {i + 1}
                                    </span>
                                    <span className="text-[13px] text-[#3C3C43]">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Retry button */}
                    {/* {onRetry && (
                        <Button
                            variant="normal"
                            className="w-full font-semibold text-[15px]"
                            onClick={onRetry}
                        >
                            Thử lại
                        </Button>
                    )} */}
                </div>

                {/* Footer note */}
                <p className="mt-6 text-[12px] text-[#8E8E93] text-center leading-5">
                    Cần hỗ trợ? Liên hệ{" "}
                    <span className="text-[#0057FF] font-medium">hotline 1800 599 987</span>
                </p>
            </div>

            {/* Inline animation keyframes */}
            <style>{`
        @keyframes sessionPulse {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          50% { transform: scale(1.18); opacity: 0.35; }
        }
      `}</style>
        </div>
    );
};

export default SessionExpired;
