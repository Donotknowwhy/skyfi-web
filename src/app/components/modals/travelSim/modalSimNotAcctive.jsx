"use client";

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { modal, useModal } from '@/app/utils/modal';


export default function ModalSimNotActive({
    simData = [],
    className = ""
}) {
    const t = useTranslations('travelSim.modalSimNotActive');
    const { close } = useModal();

    // Default SIM data if none provided
    const defaultSimData = [
        {
            id: '1',
            phoneNumber: '0707 123 456',
            packageInfo: 'Gói SF90T/5 GB - 10 ngày'
        },
        {
            id: '2',
            phoneNumber: '0707 123 456',
            packageInfo: 'Gói SF90T/5 GB - 10 ngày'
        },
        {
            id: '3',
            phoneNumber: '0707 123 456',
            packageInfo: 'Gói SF90T/5 GB - 10 ngày'
        }
    ];

    const displaySimData = simData.length > 0 ? simData : defaultSimData;

    return (
        <div className={clsx("text-center", className)}>
            {/* Header Image */}
            <div className="flex justify-center mb-3">
                <img
                    src="/assets/modals/sim-not-active-image.png"
                    alt="SIM Active"
                    className="w-[87px] h-[87px] object-contain"
                />
            </div>

            {/* Title */}
            <div className="text-center mb-3">
                <h2 className="text-[22px] font-semibold text-[#333333] leading-[1.2]">
                    {t('title')}
                </h2>
            </div>

            {/* Description */}
            <div className="text-center mb-3">
                <p className="text-base font-normal text-[#5C5C5C] leading-6">
                    {t('description')}
                </p>
            </div>

            {/* SIM List */}
            <div className="space-y-3 mb-3">
                {displaySimData.map((sim, index) => (
                    <div
                        key={sim.id || index}
                        className="flex items-center gap-3 w-full"
                    >
                        {/* SIM Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center border border-[#F1F1F1]">
                                <img
                                    src="/assets/icons/sim-card-icon.svg"
                                    alt="SIM Card"
                                    className="w-[19px] h-[16px] brightness-0 invert"
                                />
                            </div>
                        </div>

                        {/* SIM Info */}
                        <div className="flex-1 flex justify-between items-center">
                            <div className="text-sm font-semibold text-[#333333] leading-[1.43]">
                                {sim.phoneNumber}
                            </div>
                            <div className="text-sm font-normal text-[#5C5C5C] leading-[1.43] text-right">
                                {sim.packageInfo}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contact Information */}
            <div className="text-center mb-5">
                <p className="text-base font-normal text-[#5C5C5C] leading-6 whitespace-pre-line">
                    {t('contactInfo')}
                </p>
            </div>

            {/* Close Button */}
            <button
                onClick={close}
                className="w-full bg-[#E69818] hover:bg-[#D88A0F] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base leading-6"
            >
                {t('closeButton')}
            </button>
        </div>
    );
}

export const showModalSimNotActive = ({
    simData = [],
    onClose
}) => {
    modal.open({
        render: (
            <ModalSimNotActive
                simData={simData}
            />
        ),
        onClose: onClose,
        closeButton: false,
        boxClassName: 'max-w-[580px]',
    });
};
