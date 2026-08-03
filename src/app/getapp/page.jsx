"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GetApp() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [device, setDevice] = useState('');
    const [redirecting, setRedirecting] = useState(false);
    const [countdown, setCountdown] = useState(1);

    const APP_CONFIGS = {
        ios: {
            url: 'https://apps.apple.com/us/app/skyfi/id6747164804',
            name: 'App Store',
            icon: '🍎'
        },
        android: {
            url: 'https://play.google.com/store/apps/details?id=vn.galaxytelecom.skyfi',
            name: 'Google Play',
            icon: '🤖'
        }
    };

    // Detect device function
    const detectDevice = () => {
        if (typeof window === 'undefined') return 'unknown';

        const ua = navigator.userAgent;

        if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
        if (/Android/.test(ua)) return 'android';
        if (/Windows Phone/.test(ua)) return 'windows';

        return 'desktop';
    };

    // Auto redirect logic
    useEffect(() => {
        const detectedDevice = detectDevice();
        setDevice(detectedDevice);

        // Chỉ auto redirect trên mobile
        if (detectedDevice === 'ios' || detectedDevice === 'android') {
            setRedirecting(false);

            // Countdown timer
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        window.location.href = APP_CONFIGS[detectedDevice].url;
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, []);

    // Manual redirect
    const handleDownload = (platform) => {
        if (APP_CONFIGS[platform]) {
            window.location.href = APP_CONFIGS[platform].url;
        }
    };

    // Cancel auto redirect
    const cancelRedirect = () => {
        setRedirecting(false);
        setCountdown(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Auto Redirect Overlay */}
            {redirecting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl">{APP_CONFIGS[device]?.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Đang chuyển hướng đến {APP_CONFIGS[device]?.name}
                            </h3>
                            <p className="text-gray-600">
                                Bạn sẽ được chuyển hướng trong {countdown} giây
                            </p>
                        </div>

                        <div className="mb-6">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={cancelRedirect}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={() => window.location.href = APP_CONFIGS[device]?.url}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                Đi ngay
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-40 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    <p className="font-medium">Đang chuyển hướng...</p>
                </div>
            )}

            <main className="container mx-auto px-4 py-8 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="mb-6">
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                                Tải ứng dụng
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> SkyFi</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                                Quản lý eSIM, theo dõi data và thưởng thức trải nghiệm kết nối toàn cầu
                                ngay trên điện thoại của bạn.
                            </p>
                        </div>

                        {/*/!* Device Detection Info *!/*/}
                        {/*{device && device !== 'unknown' && device !== 'desktop' && (*/}
                        {/*    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">*/}
                        {/*        <p className="text-blue-800 text-sm">*/}
                        {/*            <span className="font-medium">Thiết bị được phát hiện:</span> {*/}
                        {/*                device === 'ios' ? 'iOS (iPhone/iPad)' :*/}
                        {/*                device === 'android' ? 'Android' :*/}
                        {/*                device === 'windows' ? 'Windows Phone' : 'Không xác định'*/}
                        {/*            }*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium">Quản lý eSIM dễ dàng</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium">Theo dõi data realtime</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.414 14.586 7H12z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium">Tốc độ cao toàn cầu</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium">Bảo mật tuyệt đối</span>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                            <button
                                onClick={() => {
                                    handleDownload('ios');
                                }}
                                className="group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <div className="w-52 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/assets/images/appStore.png"
                                        alt="Tải từ App Store"
                                        width={200}
                                        height={60}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        priority
                                    />
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    handleDownload('android');
                                }}
                                className="group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <div className="w-52 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/assets/images/googlePlay.png"
                                        alt="Tải từ Google Play"
                                        width={200}
                                        height={60}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        priority
                                    />
                                </div>
                            </button>
                        </div>

                        {/* QR Code Section */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <div className="text-center sm:text-left">
                                <p className="text-gray-600 font-medium mb-2">Quét mã QR để tải nhanh</p>
                                <p className="text-sm text-gray-500">Mở camera và quét mã để truy cập cửa hàng</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-lg">
                                <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <Image
                                        src="/assets/home/qr.png"
                                        alt="Mã QR tải ứng dụng SkyFi"
                                        width={120}
                                        height={120}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative max-w-md w-full">
                            <div className="relative z-10">
                                <Image
                                    src="/assets/images/appPhone.png"
                                    alt="Giao diện ứng dụng SkyFi"
                                    width={500}
                                    height={600}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
