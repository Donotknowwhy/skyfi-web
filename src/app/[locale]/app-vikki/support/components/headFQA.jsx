'use client';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSupport } from '../provider/ProvideSuport';

const HeadFQA = () => {
    const { isShowAll, setIsShowAll } = useSupport();

    const t = useTranslations('vikki.support');

    if (!isShowAll) return null;
    return (
        <div className="sticky top-0 z-50 bg-white">
            <div className="flex items-center justify-between px-4 py-3">
                <button
                    onClick={() => setIsShowAll(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="text-lg font-semibold text-gray-900">{t('faq.title')}</h1>
                <div className="w-10"></div>
            </div>
        </div>
    );
};

export default HeadFQA;
