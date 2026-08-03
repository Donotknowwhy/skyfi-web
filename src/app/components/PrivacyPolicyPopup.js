'use client';

import { datamockPersonalDataProtection } from "@/app/[locale]/personal-data-protection-policy/page";
import { usePathname } from "@/i18n/navigation";
import moment from 'moment';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

const PrivacyPolicyPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContentPopup, setShowContentPopup] = useState(false);
  const searchParams = useSearchParams();
  const t = useTranslations('privacyPolicyPopup');
  const router = usePathname();



  const local = useLocale();
  const src = searchParams.get('src');
  const content = datamockPersonalDataProtection[local] || datamockPersonalDataProtection.vi;

  useEffect(() => {
    if(src){
     if(src==="app"||src==="vietjet"||src==="vj"){
        handleAccept()
      }
    }

  }, [ src ] );
  useEffect( () => {
    if(router.includes("travelsim")|| router.includes("app-vikki")|| router.includes("hdbank-app")){
      handleAccept()
    }
  }, [ router ] );

  useEffect(() => {
    if(router.includes("dktt") || router.includes("business-customer-sign")|| router.includes("vj2")){
      return;
    }
    // Kiểm tra localStorage khi component mount
    const hasAccepted = localStorage.getItem('privacy-policy-accepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      // Lưu trạng thái đã đồng ý vào localStorage với timestamp
      localStorage.setItem('privacy-policy-accepted', moment().format());
      setIsVisible(false);
    } catch (error) {
      console.log('Không thể lưu vào localStorage:', error);
      setIsVisible(false);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
  };

  const openContentPopup = () => {
    setShowContentPopup(true);
  };

  const closeContentPopup = () => {
    setShowContentPopup(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      {/* Banner thông báo */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="w-full px-4 py-10 max-w-7xl mx-auto">
          <div className="flex flex-col  lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Nội dung thông báo */}
            <div className="flex-1">
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                {t('message').split(t('messageHere')).map((part, index, array) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && (
                          <button
                              onClick={openContentPopup}
                              className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
                          >
                            {t('messageHere')}
                          </button>
                      )}
                    </span>
                ))}
              </p>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-center gap-3 flex-shrink-0">
              <button
                  onClick={handleSkip}
                  className="w-36 py-2 sm:py-4 text-base text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {t('skipButton')}
              </button>
              <button
                  onClick={handleAccept}
                  className="w-36 py-2 sm:py-4 text-base text-white bg-[#E8951A] hover:bg-yellow-700 rounded-lg transition-colors duration-200 font-medium"
              >
                {t('acceptButton')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup hiển thị nội dung chính sách */}
      {showContentPopup && (
        <div className="fixed inset-0 z-[60]">
          {/* Popup content - toàn màn hình trên mobile, popup trên desktop */}
          <div className="relative bg-white h-full w-full sm:rounded-lg sm:shadow-2xl sm:max-w-4xl sm:max-h-[80vh] sm:mx-auto sm:mt-[10vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="font-bold text-lg sm:text-[20px] md:text-[24px] leading-[1.2em] flex-1 text-center pr-6">
                {content.title}
              </h2>
              <button
                onClick={closeContentPopup}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="h-[calc(100vh-140px)] sm:h-[60vh] overflow-y-auto text-justify">
               <div dangerouslySetInnerHTML={{__html: content.content}} className='p-4 sm:p-8'/>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 sm:p-6 border-t border-gray-200 bg-white">
              <button
                  onClick={handleAccept}
                  className="w-36 py-3 sm:py-4 text-base text-white bg-[#E8951A] hover:bg-yellow-700 rounded-lg transition-colors duration-200 font-medium"
              >
                {t('acceptButton')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyPopup;
