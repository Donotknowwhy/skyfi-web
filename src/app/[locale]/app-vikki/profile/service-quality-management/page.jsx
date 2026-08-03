'use client';
import { showPdfViewerModal } from '@/app/components/modals/vikki/modalPdfViewer';
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

const ServiceQualityManagementPage = () => {
    const t = useTranslations('vikki.profile.serviceQualityManagement');
    const router = useRouter();

    return (
        <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#E8E5FA] via-[#F3E8F4] to-white">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3">
                <button onClick={() => router.back()} className="p-0">
                    <ChevronLeftIcon className="w-6 h-6 text-[#0D2240]" strokeWidth={2} />
                </button>
                <h1 className="flex-1 text-xl font-semibold text-[#333333]">{t('title')}</h1>
            </div>

            {/* Menu Items */}
            <div className="flex-1 bg-white rounded-t-[20px] px-4 mt-2">
                {/* Công bố CLDV_DV điện thoại trên mạng VTDĐ */}
                <MenuItem
                    icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
                    title={t('item1')}
                    onClick={() => showPdfViewerModal({
                        pdfUrl: '/assets/document/service-quality-management/38_2025_Cong_bo_CLDV_DV_dien_thoai_tren_mang_VTDD.pdf',
                        title: t('item1')
                    })}
                />

                {/* Công bố CLDV_Truy cập internet WCDMA, LTE, LTE */}
                <MenuItem
                    icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
                    title={t('item2')}
                    onClick={() => showPdfViewerModal({
                        pdfUrl: '/assets/document/service-quality-management/39_2025_Cong_bo_CLDV_Truy_cap_internet_WCDMA_LTE_LTE_A.pdf',
                        title: t('item2')
                    })}
                />

                {/* BAN TIEP NHAN CONG BO CLDV INTERNET DI DONG 2025 */}
                <MenuItem
                    icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
                    title={t('item3')}
                    onClick={() => showPdfViewerModal({
                        pdfUrl: '/assets/document/service-quality-management/BAN_TIEP_NHAN_CONG_BO_CLDV_INTERNET_DI_DONG_2025.pdf',
                        title: t('item3')
                    })}
                />

                {/* BAN TIEP NHAN CONG BO CLDV THOA DI DONG 2025 */}
                <MenuItem
                    icon={<DocumentTextIcon className="w-6 h-6" strokeWidth={1.5} />}
                    title={t('item4')}
                    onClick={() => showPdfViewerModal({
                        pdfUrl: '/assets/document/service-quality-management/BAN_TIEP_NHAN_CONG_BO_CLDV_THOAI_DI_DONG_2025.pdf',
                        title: t('item4')
                    })}
                />
            </div>
        </div>
    );
};

export default ServiceQualityManagementPage;