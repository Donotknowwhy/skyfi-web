'use client';
import { showPdfViewerModal } from '@/app/components/modals/hdbank/modalPdfViewer';
import { useRouter } from '@/i18n/navigation';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

// Menu Item Component
const MenuItem = ({ icon, title, onClick, trailing }) => {
  return (
    <button
      className="w-full flex items-center gap-3 py-4 text-left"
      onClick={onClick}
    >
      <div className="w-6 h-6 flex items-center justify-center text-[#333333]">
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between border-b border-[#F1F1F1] pb-4 -mb-4">
        <span className="text-base text-[#333333]">{title}</span>
        {trailing || <ChevronLeftIcon className="w-5 h-5 text-[#8A8A8A]" />}
      </div>
    </button>
  );
};

// Document Icon SVG
const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2V8H20" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 13H8" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17H8" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 9H8" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SampleContactPage = () => {
  const t = useTranslations('hdbank.profile.sampleContact');
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
        {/* Bạn xác nhận thông tin thuê bao đã đăng ký dịch vụ viên thông di động một đất */}
        <MenuItem
          icon={<DocumentIcon />}
          title={t('item1')}
          onClick={() => showPdfViewerModal({
            pdfUrl: '/assets/document/sample-contract/BAN_XAC_NHAN_THONG_TIN_THUE_BAO.pdf',
            title: t('item1')
          })}
        />

        {/* Hợp đồng cung cấp và sử dụng DV viên thông di động một đất */}
        <MenuItem
          icon={<DocumentIcon />}
          title={t('item2')}
          onClick={() => showPdfViewerModal({
            pdfUrl: '/assets/document/sample-contract/HOP_DONG_CUNG_CAP_VA_SU_DUNG_DICH_VU.pdf',
            title: t('item2')
          })}
        />

        {/* BM01-Danh sách thuê bao đã đăng ký sử dụng DV viên thông */}
        <MenuItem
          icon={<DocumentIcon />}
          title={t('item3')}
          onClick={() => showPdfViewerModal({
            pdfUrl: '/assets/document/sample-contract/BIEU_MAU_01_DANH_SACH_THUE_BAO_KH_CA_NHAN_TU_THUE_BAO_THU_4_TRO.pdf',
            title: t('item3')
          })}
        />

        {/* BM02-Danh sách thuê bao đã đăng ký sử dụng DV viên thông */}
        <MenuItem
          icon={<DocumentIcon />}
          title={t('item4')}
          onClick={() => showPdfViewerModal({
            pdfUrl: '/assets/document/sample-contract/BIEU_MAU_02_DANH_SACH_CA_NHAN_DUOC_GIAO_SU_DUNG_SO_THUE_BAO_KH.pdf',
            title: t('item4')
          })}
        />

        {/* Biến bản chuyển quyền sử dụng DV viên thông */}
        <MenuItem
          icon={<DocumentIcon />}
          title={t('item5')}
          onClick={() => showPdfViewerModal({
            pdfUrl: '/assets/document/sample-contract/BIEN_BAN_CHUYEN_QUYEN_SU_DUNG.pdf',
            title: t('item5')
          })}
        />
      </div>
    </div>
  );
};

export default SampleContactPage;
