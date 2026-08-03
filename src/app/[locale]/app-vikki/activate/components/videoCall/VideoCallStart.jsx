'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import useActivateVikki from '../../hook/useActivateVikki';
import { useUserState } from '@/app/stores/user';
import { useRouter } from '@/i18n/navigation';


const VideoCallStart = () => {
    const t = useTranslations('vikki.videoCall');
    const { setValue, getValues } = useFormContext();
    const { clientStart, onBack } = useActivateVikki();
    const { sessionId } = useUserState();
    const router = useRouter();



    const handleStartCall = () => {
        const data = getValues('data') || {};
        clientStart({ telNumber: data.phone, serial: data.call_id, });
    };

    return (
        <div className="min-h-[100dvh] flex flex-col">
            {/* Header */}
            <div className="">

                <div className="flex items-center p-4 ">
                    <button
                        onClick={() => onBack()}
                        className="w-6 h-6 flex items-center justify-center"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="#333333" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-4 py-4">
                {/* Title */}
                <h1 className="text-[24px] font-semibold text-[#333333] leading-[1.2] mb-3">
                    {t('title')}
                </h1>

                {/* Card */}
                <div
                    className="bg-white/80 rounded-xl p-4 border border-[rgba(84,85,86,0.12)]"
                    style={{
                        boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.03), 0px 0px 1px 0px rgba(0, 0, 0, 0.15), 0px 4px 16px 0px rgba(144, 118, 170, 0.08)'
                    }}
                >
                    {/* Illustration */}
                    <div className="w-full h-[189px] rounded-[17px] overflow-hidden mb-6 relative">
                        <Image
                            src="/images/vikki/tong-dai-videocall.png"
                            alt="Video call illustration"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Text content */}
                    <div className="space-y-2">
                        <h2 className="text-[14px] font-semibold text-[#333333] leading-[1.5]">
                            {t('guideTitle')}
                        </h2>
                        <ul className="list-disc list-inside space-y-1 text-[12px] text-[#333333] leading-[1.5]">
                            <li>{t('point1')}</li>
                            <li>{t('point2')}</li>
                        </ul>
                        <p className="text-[12px] text-[#333333] leading-[1.5]">
                            {t('note')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div
                className="bg-white px-4 rounded-t-2xl"
                style={{
                    boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.1)'
                }}
            >
                <div className="py-4">
                    <button
                        onClick={handleStartCall}
                        className="w-full py-3 px-4 rounded-full text-white font-semibold text-[16px]"
                        style={{
                            background: 'linear-gradient(39deg, rgba(44, 78, 255, 1) 0%, rgba(0, 0, 255, 1) 4%, rgba(97, 0, 255, 1) 47%, rgba(218, 1, 145, 1) 78%, rgba(255, 138, 0, 1) 98%, rgba(255, 185, 7, 1) 100%)'
                        }}
                    >
                        {t('continueButton')}
                    </button>
                    <button
                        onClick={() => router.push(`/app-vikki?sessionId=${sessionId}`)}
                        className="w-full py-3 px-4 rounded-full text-[#333333] font-semibold text-[16px] mt-3 border border-[#E0E0E0] mb-2"
                    >
                        {t('goHome')}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default VideoCallStart;
