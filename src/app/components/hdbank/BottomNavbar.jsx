'use client';
import { HomeIcon, ClockIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, ClockIcon as ClockIconSolid, ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Link from 'next/link';

export default function BottomNavbar() {
    const [activeTab, setActiveTab] = useState('home');

    const tabs = [
        { id: 'home', label: 'Trang chủ', icon: HomeIcon, activeIcon: HomeIconSolid, href: '/_vikki' },
        { id: 'history', label: 'Lịch sử', icon: ClockIcon, activeIcon: ClockIconSolid, href: '#' },
        { id: 'support', label: 'Hỗ trợ', icon: ChatBubbleLeftRightIcon, activeIcon: ChatBubbleLeftRightIconSolid, href: '#' },
        { id: 'profile', label: 'Tài khoản', icon: UserIcon, activeIcon: UserIconSolid, href: '#' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
            <div className="flex justify-around items-center h-16 max-w-[500px] mx-auto">
                {tabs.map((tab) => {
                    const Icon = activeTab === tab.id ? tab.activeIcon : tab.icon;
                    return (
                        <Link
                            key={tab.id}
                            href={tab.href}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex flex-col items-center justify-center w-full h-full space-y-1"
                        >
                            <Icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-pink-600' : 'text-gray-500'}`} />
                            <span className={`text-[10px] ${activeTab === tab.id ? 'text-pink-600 font-medium' : 'text-gray-500'}`}>
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
