"use client";

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { modal, useModal } from '../../../utils/modal';

export default function ModalVerify({
    onSkip,
    onContinue,
    packageInfo,
    className = "",
    isFree=false,
    hideTitle=false
}) {
    const t = useTranslations('travelSim.modalVerify');
    const { close } = useModal();

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
        close();
    };

    const handleContinue = () => {
        if (onContinue) {
            onContinue();
        }
        close();
    };

    return (
        <div className={clsx("bg-white", className)}>


            {/* Title */}
            {!hideTitle && (
                <div className="text-center mb-3">
                    <h2 className="text-[22px] font-semibold text-[#333333] leading-[1.2]">
                        {t('title')}
                    </h2>
                </div>
            )}


            {/* Warning Message */}
            {!hideTitle && (
            <div className="text-center mb-3">
                <p className="text-[16px] text-[#5C5C5C] leading-[1.5]">
                    {isFree?t('giftMessage') :t('warningMessage')}
                </p>
            </div>
            )}

            {/* Package Info Section */}
            <div className="mb-3">
                <div className="text-center">
                    <h3 className="text-[18px] font-semibold text-[#333333] leading-[1.2] mb-3">
                        {isFree?t('giftTitle') :t('packageTitle')}
                    </h3>
                </div>

                {/* Package Details */}
                <div className="flex items-center gap-3 p-3 border border-[#F1F1F1] rounded-lg bg-[#FAFAFA]">
                    {/* Logo */}
                    <div className="w-10 h-10 rounded-full bg-[#ED1B2F] border border-[#F1F1F1] flex items-center justify-center flex-shrink-0">
                        <Image src="/images/simdata/iconsim.png" alt="icon" width={ 54 } height={ 54 } className="object-cover w-full h-full" />
                    </div>

                    {/* Package Info */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-[14px] font-semibold text-[#333333] leading-[1.43]">
                                    {packageInfo?.name || t('defaultPackageName')}
                                </div>
                            </div>
                            <div>
                                {/* <div className="text-[14px] text-[#5C5C5C] leading-[1.43] text-right">
                                    {packageInfo?.price || t('defaultPrice')}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instruction Text (Hidden by default as per Figma) */}
            <div className="text-center mb-6 opacity-0">
                <p className="text-[16px] text-[#5C5C5C] leading-[1.5]">
                    {t('instructionText')}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                {/* Skip Button */}
                <button
                    onClick={handleSkip}
                    className="flex-1 h-12 px-6 border border-[#E69818] text-[#E69818] font-semibold text-[16px] leading-[1.5] rounded-lg hover:bg-[#E69818] hover:text-white transition-colors duration-200"
                >
                    {t('skipButton')}
                </button>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="flex-[2.35] h-12 px-6 bg-[#E69818] text-white font-semibold text-[16px] leading-[1.5] rounded-lg hover:bg-[#CC8717] transition-colors duration-200"
                >
                    {isFree?t('claimButton') :t('continueButton')}
                </button>
            </div>
        </div>
    );
}

export const showModalVerify = ({
    onSkip,
    onContinue,
    packageInfo,
    onClose,
    isFree=false,
    hideTitle=false
}) => {
    modal.open({
        render: (
            <ModalVerify
                onSkip={onSkip}
                onContinue={onContinue}
                packageInfo={packageInfo}
                isFree={isFree}
                hideTitle={hideTitle}
            />
        ),
        onClose: onClose,
        closeButton: false,
        boxClassName: 'max-w-[580px]',
    });
};
