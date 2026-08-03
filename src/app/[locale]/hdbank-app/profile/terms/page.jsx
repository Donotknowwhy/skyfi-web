'use client';

import Footer from '@/app/components/hdbank/home/Footer';
import { useRouter } from '@/i18n/navigation';
import { ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

// Menu Item Component
const MenuItem = ({ icon, title, onClick, trailing, showBorder = true }) => {
  return (
    <button
      className="w-full flex items-center gap-3 py-4 text-left"
      onClick={onClick}
    >
      <div className="w-6 h-6 flex items-center justify-center text-[#333333]">
        {icon}
      </div>
      <div className={`flex-1 flex items-center justify-between ${showBorder ? 'border-b border-[#F1F1F1]' : ''} pb-4 -mb-4`}>
        <span className="text-base text-[#333333]">{title}</span>
        {trailing || <ChevronRightIcon className="w-5 h-5 text-[#8A8A8A]" />}
      </div>
    </button>
  );
};

const TermsPage = () => {
  const t = useTranslations('hdbank.profile.terms');
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#FFF9F5] via-[#FFF3EA] to-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button onClick={() => router.back()} className="p-0">
          <ChevronLeftIcon className="w-6 h-6 text-[#0D2240]" strokeWidth={2} />
        </button>
        <h1 className="flex-1 text-xl font-semibold text-[#333333]">{t('title')}</h1>
      </div>

      {/* Menu Items */}
      <div className="flex-1 bg-white rounded-t-[20px] px-4 mt-2">
        {/* Personal Data Protection Policy */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t('personalDataProtectionPolicy')}
          onClick={() => router.push('/personal-data-protection-policy?src=vikki')}
        />

        {/* Terms of Service */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t('termsOfService')}
          onClick={() => router.push('/refund-policy?src=vikki')}
        />

        {/* Payment Policy */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t('paymentPolicy')}
          onClick={() => router.push('/payment-policy?src=vikki')}
        />

        {/* General Terms */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t('generalTerms')}
          onClick={() => router.push('/terms-and-conditions?src=vikki')}
        />

        {/* Privacy Policy and Cookies */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t('privacyPolicyAndCookies')}
          onClick={() => router.push('/cookies-policy?src=vikki')}
        />

        {/* Service Quality Management */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t('sampleContacts')}
          onClick={() => router.push('/hdbank-app/profile/sample-contact')}
        />

        {/* Refund Policy */}
        <MenuItem
          icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
          title={t('serviceQualityManagements')}
          onClick={() => router.push('/hdbank-app/profile/service-quality-management')}
        />
      </div>

      {/* Bottom Navigation */}
      <Footer activeTab="profile" />
    </div>
  );
};

export default TermsPage;