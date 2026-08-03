"use client";
import React from 'react';
import {useTranslations} from 'next-intl';

const SimPopup = ({ validationResult, onClose, onBuyData }) => {
    const t = useTranslations('simPopup');

    if (!validationResult) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="p-6 pb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Bạn đã sở hữu SIM du lịch Việt Nam
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Vui lòng kiểm tra email của bạn để cài đặt SIM và sử dụng
                    </p>
                </div>

                {/* SIM List */}
                <div className={`px-2 md:px-6 pb-4 ${validationResult.length > 4 ? 'h-64 overflow-y-scroll' : ''}`}>
                    {validationResult.map((sim, index) => {
                        return (
                            <div key={sim.id} className="flex items-center mb-4 last:mb-0 bg-[#F0F0F0] py-2 px-4 rounded-2xl">
                                {/* Signal Icon */}
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-[#ED1B2F] rounded-full flex items-center justify-center mr-4 p-2">
                                    <div className="text-white text-xs font-bold">
                                        <img src="/assets/icons/sim-card-travel.svg" alt="" className={"text-white"}/>
                                    </div>
                                </div>

                                {/* SIM Info */}
                                <div className="flex-1 ">
                                    <div className="flex items-center justify-between">
                                            <span className="text-sm md:text-md text-gray-800 font-medium f">
                                              {sim.msisdn.replace('84', '0')}
                                            </span>
                                        <div className="flex gap-4 text-xs">
                                            {sim.package_additional&&(
                                                <div className="text-center">
                                                    <div className="font-bold text-gray-800">{sim.package_additional?.name}</div>
                                                    <div className="text-gray-600">
                                                        {sim.package_additional?.data<1?`${sim.package_additional?.data*1000} MB`:`${sim.package_additional?.data} GB`}<span className="text-gray-400">/{sim.package_additional?.validity} ngày</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="text-center">
                                                <div className="font-bold text-gray-800">{sim.package_info?.name}</div>
                                                <div className="text-gray-600">
                                                    {sim.package_info?.data<1?`${sim.package_info?.data*1000} MB`:`${sim.package_info?.data} GB`}<span className="text-gray-400">/{sim.package_info?.validity} ngày</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Support Info */}
                <div className="px-6 py-4 bg-gray-50 text-center text-sm text-gray-600">
                    <div className="font-bold text-gray-800 mb-2">
                        Mọi thắc mắc vui lòng liên hệ CSKH
                    </div>
                    <div className="mb-1">
                        Email: <span className="text-blue-600">customercare@skyfi.vn</span>
                    </div>
                    <div className="mb-1">
                        Hotline: <span className="font-bold">1900 6605</span>
                    </div>
                    <div>
                        Zalo OA: <a href="https://zalo.me/4027302975952039719" className="text-blue-600">
                        https://zalo.me/4027302975952039719
                    </a>
                    </div>
                </div>

                {/* Buy Data Button */}
                <div className="p-6 pt-4">
                    <button
                        onClick={onBuyData}
                        className="w-full bg-[#E69818] hover:bg-[#CC8717] text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Mua data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimPopup;
