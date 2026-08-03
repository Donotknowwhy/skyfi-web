'use client';
import { usePathname, useRouter } from '@/i18n/navigation';
import { HomeIcon, QuestionMarkCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, QuestionMarkCircleIcon as QuestionMarkCircleIconSolid, UserCircleIcon as UserCircleIconSolid } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('hdbank.home.footer');
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname.includes('/hdbank-app/profile')) return 'profile';
    if (pathname.includes('/hdbank-app/support')) return 'support';
    return 'home';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: 'home', label: t('home'), icon: HomeIcon, activeIcon: HomeIconSolid, href: '/hdbank-app' },
    { id: 'support', label: t('support'), icon: QuestionMarkCircleIcon, activeIcon: QuestionMarkCircleIconSolid, href: '/hdbank-app/support' },
    { id: 'profile', label: t('profile'), icon: UserCircleIcon, activeIcon: UserCircleIconSolid, href: '/hdbank-app/profile' },
  ];

  const handleTabClick = (tab) => {
    router.push(tab.href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-20 border-t border-gray-200 flex justify-around items-center bg-white z-50">
      {tabs.map((tab) => {
        const Icon = activeTab === tab.id ? tab.activeIcon : tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className="flex flex-col items-center justify-center w-full h-full space-y-1"
          >
            <Icon className={`w-6 h-6 ${isActive ? 'text-[#DA2128]' : 'text-gray-500'}`} />
            <span className={`text-xs ${isActive ? 'text-[#DA2128]' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Footer;