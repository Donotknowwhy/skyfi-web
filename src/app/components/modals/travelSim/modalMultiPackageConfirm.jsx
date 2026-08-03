import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { modal, useModal } from '../../../utils/modal';
import { toCurrency } from '../../../utils/format';

export default function ModalMultiPackageConfirm({
    onSkip,
    onContinue,
    packagesInfo = [],
    totalPrice = 0,
    selectedSimsCount = 0,
    className = ""
}) {
    const t = useTranslations('travelSim.modalVerify');
    const tCommon = useTranslations('travelSim.common');
    const tMulti = useTranslations('travelSim.multiPackageConfirm');
    const { close } = useModal();
    const locale = useLocale();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
        close();
    };

    const handleContinue = () => {
        // Validate email
        if (!email.trim()) {
            setEmailError(locale === 'vi' ? 'Vui lòng nhập email' : 'Please enter your email');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError(locale === 'vi' ? 'Email không hợp lệ' : 'Invalid email');
            return;
        }

        if (onContinue) {
            onContinue(email);
        }
        close();
    };

    // Tính tổng số gói
    const totalPackages = packagesInfo.reduce((sum, pkg) => sum + (pkg.quantity || 0), 0);

    // Kiểm tra có gói miễn phí không
    const hasFreePackages = packagesInfo.some(pkg => pkg.isFree);
    const allFreePackages = packagesInfo.every(pkg => pkg.isFree);

    return (
        <div className={clsx("bg-white rounded-2xl md:p-6 w-full max-w-[700px]", className)}>
            {/* Header */}
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E69818] to-[#F4A335] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-[28px] font-bold text-[#333333] leading-[1.2] mb-2">
                    {tMulti('title') || 'Xác nhận đơn hàng'}
                </h2>
                <p className="text-[16px] text-[#666666] leading-[1.5]">
                    {tMulti('warningMessage') || 'Vui lòng kiểm tra thông tin đơn hàng trước khi tiếp tục'}
                </p>
            </div>

            {/* Order Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* SIM Count Card */}
                {/*<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">*/}
                {/*    <div className="flex items-center justify-between">*/}
                {/*        <div className="flex items-center gap-3">*/}
                {/*            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">*/}
                {/*                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />*/}
                {/*                </svg>*/}
                {/*            </div>*/}
                {/*            <span className="text-[14px] font-medium text-[#333333]">*/}
                {/*                {tMulti('selectedSims') || 'Số SIM đã chọn'}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <span className="text-[18px] font-bold text-blue-600">*/}
                {/*            {selectedSimsCount}*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Package Count Card */}
                {/*<div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">*/}
                {/*    <div className="flex items-center justify-between">*/}
                {/*        <div className="flex items-center gap-3">*/}
                {/*            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">*/}
                {/*                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />*/}
                {/*                </svg>*/}
                {/*            </div>*/}
                {/*            <span className="text-[14px] font-medium text-[#333333]">*/}
                {/*                {tMulti('totalPackages') || 'Tổng số gói'}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <span className="text-[18px] font-bold text-green-600">*/}
                {/*            {totalPackages}*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            {/* Email Input Section */}
            <div className="mb-6">
                <label className="block text-[16px] font-semibold text-[#333333] mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                    }}
                    placeholder="Nhập email để nhận thông tin đơn hàng"
                    className={clsx(
                        "w-full h-12 px-4 border-2 rounded-xl text-[16px] transition-all duration-200",
                        "focus:outline-none focus:ring-2",
                        emailError
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:border-[#E69818] focus:ring-[#E69818]/20"
                    )}
                />
                {emailError && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {emailError}
                    </p>
                )}
            </div>

            {/* Package Details */}
            <div className="mb-6">
                <h3 className="text-[20px] font-semibold text-[#333333] leading-[1.2] mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#E69818]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {tMulti('packageDetails') || 'Chi tiết gói cước'}
                </h3>

                <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar">
                    {packagesInfo.map((pkg, index) => (
                        <div
                            key={index}
                            className="group bg-white border-2 border-gray-100  transition-all duration-200 rounded-xl p-2 md:p-4 hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                {/* Package Icon */}
                                <div className="hidden md:block relative flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center border-2 border-white shadow-md">
                                        <Image
                                            src="/images/simdata/iconsim.png"
                                            alt="SIM icon"
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Package Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <div className="flex-1">
                                            <h4 className="text-[16px] font-semibold text-[#333333] leading-[1.3] mb-1  transition-colors">
                                                {pkg.packageName}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#666666]">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                                    </svg>
                                                    {pkg.dataAmount}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {pkg.validity}
                                                </span>
                                                <span className="bg-[#E69818] text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    x{pkg.quantity}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            {pkg.isFree ? (
                                                <div className="text-[16px] font-bold text-green-600">
                                                    {tCommon('free')}
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="text-[16px] font-bold text-[#333333]">
                                                        {toCurrency(pkg.rawPrice * pkg.quantity)}
                                                    </div>
                                                    {pkg.quantity > 1 && (
                                                        <div className="text-[12px] text-[#666666]">
                                                            {toCurrency(pkg.rawPrice)}/{tCommon('package')}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Total Section */}
            <div className="mb-6">
                <div className="rounded-2xl md:p-6 ">
                    <div className="flex sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-[18px] font-semibold mb-1">
                                {tMulti('totalAmount') || 'Tổng tiền'}
                            </h3>
                        </div>
                        <div className="text-right text-[#F4A335]">
                            <div className="text-[24px] font-bold leading-none">
                                {allFreePackages ? 'Miễn phí' : toCurrency(totalPrice)}
                            </div>
                            {!allFreePackages && selectedSimsCount > 1 && (
                                <div className="text-[14px] text-white/80 mt-1">
                                    {toCurrency(totalPrice / selectedSimsCount)}/SIM
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Cancel Button */}
                <button
                    onClick={handleSkip}
                    className="flex-1 sm:flex-none sm:w-32 h-12 py-2 px-6 border-2 border-gray-300 text-gray-600 font-semibold text-[16px] leading-[1.5] rounded-xl hover:border-gray-400 hover:text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    {tMulti('cancelButton') || t('skipButton') || 'Hủy'}
                </button>

                {/* Confirm Button */}
                <button
                    onClick={handleContinue}
                    className="flex-1 h-12 py-2.5 px-6 bg-gradient-to-r from-[#E69818] to-[#F4A335] text-white font-semibold text-[16px] leading-[1.5] rounded-xl hover:from-[#CC8717] hover:to-[#E69818] transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#E69818] focus:ring-offset-2 shadow-lg hover:shadow-xl"
                >
                    {tMulti('confirmButton') || t('continueButton') || 'Xác nhận đặt hàng'}
                </button>
            </div>
        </div>
    );
}

export const showModalMultiPackageConfirm = ({
    onSkip,
    onContinue,
    packagesInfo = [],
    totalPrice = 0,
    selectedSimsCount = 0,
    onClose
}) => {
    modal.open({
        render: (
            <ModalMultiPackageConfirm
                onSkip={onSkip}
                onContinue={onContinue}
                packagesInfo={packagesInfo}
                totalPrice={totalPrice}
                selectedSimsCount={selectedSimsCount}
            />
        ),
        onClose: onClose,
        closeButton: true,
        boxClassName: 'max-w-[750px] p-0',
        overlayClassName: 'bg-black/50 backdrop-blur-sm',
    });
};
