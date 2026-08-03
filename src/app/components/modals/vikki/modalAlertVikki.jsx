'use client';

import { modal, useModal } from '@/app/utils/modal';

/**
 * ModalAlertVikki – Alert modal theo đúng Vikki design language.
 *
 * Hoàn toàn độc lập, không ảnh hưởng đến showModalMess / showModalMessVikki cũ.
 *
 * @param {string}   type        - 'error' | 'success' | 'warning' | 'info'
 * @param {string}   title       - Tiêu đề thông báo
 * @param {string}   message     - Nội dung thông báo
 * @param {string}   labelConfirm - Label nút xác nhận (mặc định: 'OK')
 * @param {string}   labelDismiss - Label nút huỷ (tuỳ chọn)
 * @param {Function} onConfirm   - Callback khi bấm xác nhận
 * @param {Function} onDismiss   - Callback khi bấm huỷ
 */
const ModalAlertVikkiContent = ({
    type = 'info',
    title = 'Thông báo',
    message,
    labelConfirm = 'OK',
    labelDismiss,
    onConfirm,
    onDismiss,
}) => {
    const { close, done } = useModal();

    const handleConfirm = () => {
        onConfirm?.();
        done();
    };

    const handleDismiss = () => {
        onDismiss?.();
        close();
    };

    const iconConfig = {
        error: {
            bg: 'rgba(218,1,145,0.08)',
            ringColor: 'rgba(218,1,145,0.15)',
            svgColor: '#DA0191',
            icon: (
                // Exclamation triangle
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        stroke="#DA0191"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <line x1="12" y1="9" x2="12" y2="13" stroke="#DA0191" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="17" x2="12.01" y2="17" stroke="#DA0191" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            ),
        },
        success: {
            bg: 'rgba(52,199,89,0.08)',
            ringColor: 'rgba(52,199,89,0.15)',
            svgColor: '#34C759',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17l-5-5" stroke="#34C759" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        warning: {
            bg: 'rgba(255,138,0,0.08)',
            ringColor: 'rgba(255,138,0,0.15)',
            svgColor: '#FF8A00',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#FF8A00" strokeWidth="2" />
                    <line x1="12" y1="8" x2="12" y2="12" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            ),
        },
        info: {
            bg: 'rgba(0,87,255,0.08)',
            ringColor: 'rgba(0,87,255,0.15)',
            svgColor: '#0057FF',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#0057FF" strokeWidth="2" />
                    <line x1="12" y1="16" x2="12" y2="12" stroke="#0057FF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="8" x2="12.01" y2="8" stroke="#0057FF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            ),
        },
    };

    const cfg = iconConfig[type] || iconConfig.info;

    return (
        <div className="w-full flex flex-col font-koho">
            {/* Content area */}
            <div className="flex flex-col items-center text-center px-6 pt-6 pb-4 gap-4">
                {/* Icon */}
                <div
                    className="flex items-center justify-center w-16 h-16 rounded-full"
                    style={{
                        background: cfg.bg,
                        boxShadow: `0 0 0 8px ${cfg.ringColor}`,
                    }}
                >
                    {cfg.icon}
                </div>

                {/* Title */}
                <h3
                    className="text-[18px] font-bold text-[#0E0E0F] leading-tight"
                    style={{ letterSpacing: '-0.5px' }}
                >
                    {title}
                </h3>

                {/* Message */}
                {message && (
                    <p
                        className="text-[14px] text-[rgba(50,52,56,0.7)] leading-[1.5]"
                        style={{ letterSpacing: '-0.3px' }}
                    >
                        {message}
                    </p>
                )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[rgba(84,85,86,0.08)] my-2" />

            {/* Buttons */}
            <div className="flex flex-col gap-3 px-6 pb-6 pt-3">
                {/* Confirm (primary) */}
                <button
                    onClick={handleConfirm}
                    className="relative overflow-hidden flex items-center justify-center w-full py-3 rounded-full shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08),inset_0px_4px_10px_0px_rgba(255,255,255,0.35),inset_0px_0px_39px_0px_rgba(255,255,255,0.25)] border border-[rgba(84,85,86,0.12)]"
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(39deg, #2C4EFF 0%, #0000FF 4%, #6100FF 47%, #DA0191 78%, #FF8A00 98%, #FFB907 100%)',
                        }}
                    />
                    <span
                        className="relative text-[15px] font-semibold text-white leading-6"
                        style={{ letterSpacing: '-0.4px' }}
                    >
                        {labelConfirm}
                    </span>
                </button>

                {/* Dismiss (secondary) – chỉ hiển thị khi có labelDismiss */}
                {labelDismiss && (
                    <button
                        onClick={handleDismiss}
                        className="flex items-center justify-center w-full py-3 bg-white border border-[rgba(84,85,86,0.12)] rounded-full shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)]"
                    >
                        <span
                            className="text-[15px] font-semibold text-[#0E0E0F] leading-6"
                            style={{ letterSpacing: '-0.4px' }}
                        >
                            {labelDismiss}
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

/**
 * showAlertVikki – Mở modal thông báo theo Vikki design.
 *
 * Sử dụng bottom-sheet style, hoàn toàn độc lập với showModalMess cũ.
 *
 * @example
 * showAlertVikki({
 *   type: 'error',
 *   title: 'Thông báo',
 *   message: 'Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa!',
 * });
 */
export const showAlertVikki = ({
    type = 'info',
    title = 'Thông báo',
    message,
    labelConfirm = 'OK',
    labelDismiss,
    onConfirm,
    onDismiss,
} = {}) => {
    modal.sheet({
        render: (
            <ModalAlertVikkiContent
                type={type}
                title={title}
                message={message}
                labelConfirm={labelConfirm}
                labelDismiss={labelDismiss}
                onConfirm={onConfirm}
                onDismiss={onDismiss}
            />
        ),
        boxClassName: 'max-w-md',
        classContainer: '!p-0',
    });
};

export default ModalAlertVikkiContent;
