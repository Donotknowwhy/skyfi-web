'use client';

import { showModalMessHDBank } from '@/app/components/modals/modalMess';
import { showModalIframeHDBank } from '@/app/components/modals/hdbank/ModalIframeHDBank';
import { showPdfViewerModal } from '@/app/components/modals/hdbank/modalPdfViewer';
import { useLoad } from '@/app/utils/load';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';
import useActivateHDBank from '../hook/useActivateHDBank';

const SignActivateVikki = () => {
  const t = useTranslations('hdbank.signActivate');
  const [isAgreed, setIsAgreed] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const sigCanvas = useRef(null);
  const { handleSubmit, setValue, } = useFormContext();
  const { onBack, onPush, getContact, saveLogVideoCall } = useActivateHDBank();
  const { open, close } = useLoad();

  const handleClear = () => {
    sigCanvas.current?.clear();
    setHasSignature(false);
    setValue('data.img4', '');
  };

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setValue('data.img4', sigCanvas.current.toDataURL());
      setHasSignature(true);
    }
  };

  const handleContinue = async () => {
    if (!isAgreed) return showModalMessHDBank({
      label: t('notification'),
      message: t('pleaseAgree'),
      type: 'error',
    });
    if (!hasSignature) return showModalMessHDBank({
      label: t('notification'),
      message: t('pleaseSign'),
      type: 'error',
    });

    try {
      open();
      const response = await saveLogVideoCall();

      console.log('saveLogVideoCall response:', response);

      // Validate response and call_id
      if (!response || !response.id) {
        console.error('Invalid response or missing call_id:', response);
        return showModalMessHDBank({
          label: t('notification'),
          message: t('cannotRetrieveCallInfo'),
          type: 'error',
        });
      }

      // Validate call_id format
      const callId = response.id;
      if (typeof callId !== 'string' || callId.trim().length === 0) {
        console.error('Invalid call_id format:', callId);
        return showModalMessHDBank({
          label: t('notification'),
          message: t('invalidCallInfo'),
          type: 'error',
        });
      }

      console.log('Video call log saved successfully, call_id:', callId);
      setValue('data.call_id', callId);
      onPush('videoCall');

    } catch (error) {
      console.error('Error saving video call log:', error);
      showModalMessHDBank({
        label: t('notification'),
        message: t('errorSavingCallLog'),
        type: 'error',
      });
    } finally {
      close();
    }




  };

  const showContactInfo = async () => {
    try {
      open();
      const contact = await getContact();
      if (contact) {
        // Remove data:application/pdf;base64, prefix if present
        const base64Data = contact.replace(/^data:application\/pdf;base64,/, '');
        showPdfViewerModal({ pdfBase64: base64Data });
      } else {
        showModalMessHDBank({
          title: t('contactInfoTitle'),
          message: t('noContactInfo'),
          type: 'info',
        });
      }
    } catch (error) {
      showModalMessHDBank({
        title: t('errorTitle'),
        message: t('cannotLoadContactInfo'),
        type: 'error',
      });
    }
    finally {
      close();
    }
  }





  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/hdbank/bg-activate.png)' }}
    >
      {/* Header */}
      <div className="flex items-center  px-4 mt-4">
        <button onClick={() => onBack()} className="w-6 h-6 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#333333" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1" />
        <div className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-4 pt-4 flex-1 overflow-auto pb-[120px]">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#333333] leading-[1.2]">
          {t('title')}
        </h2>

        {/* Terms Card */}
        <div className="flex flex-col gap-6 p-4 bg-white/80 rounded-xl border border-[rgba(84,85,86,0.12)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.03),0px_0px_1px_0px_rgba(0,0,0,0.15),0px_4px_16px_0px_rgba(144,118,170,0.08)]">
          {/* Checkbox and Terms */}
          <div className="flex flex-col gap-3">
            {/* Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center ${isAgreed ? 'bg-[#DA2128]' : 'border border-gray-300'
                  }`}
                onClick={() => setIsAgreed(!isAgreed)}
              >
                {isAgreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-[#333333]">
                {t('agreeTerms')}
              </span>
            </label>

            {/* Terms Content */}
            <ul className="flex flex-col gap-2 pl-1 text-xs text-[#333333] leading-[1.5]">
              <li className="flex gap-1">
                <span>•</span>
                <span>{t('term1')}</span>
              </li>
              <li className="flex gap-1">
                <span>•</span>
                <span>{t('term2')}</span>
              </li>
              <li className="flex gap-1">
                <span>•</span>
                <span>{t('term3')}</span>
              </li>
              <li className="flex gap-1">
                <span>•</span>
                <button
                  type="button"
                  onClick={() => showModalIframeHDBank({ url: '/personal-data-protection-policy?src=app' })}
                  className="text-[#C4107C] underline font-bold"
                >
                  {t('privacyPolicy')}
                </button>
              </li>
              <li className="flex gap-1">
                <span>•</span>
                <button
                  type="button"
                  onClick={() => showModalIframeHDBank({ url: '/refund-policy?src=app' })}
                  className="text-[#C4107C] underline font-bold"
                >
                  {t('returnPolicy')}
                </button>
              </li>
            </ul>
          </div>

          {/* Read Contract Link */}
          <p className="text-sm font-medium text-[#333333] leading-[1.5]">
            {t('readContract')} <button onClick={showContactInfo} className="text-[#C4107C] font-bold">{t('here')}</button>
          </p>
        </div>

        {/* Signature Card */}
        <div className="flex flex-col gap-4 p-4 bg-white/80 rounded-lg">
          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#FFF0F1] flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#FFF0F1" />
                <path d="M10.791 5.94727C11.7848 5.7851 13.1297 6.01803 14.0742 6.96387C15.0234 7.91461 15.5468 9.56327 14.9395 12.1855C14.1039 15.7927 12.4256 19.1072 10.9834 22.3916H12.1777C14.1036 19.0558 15.8224 15.7607 15.8574 15.6934C15.9888 15.4408 16.286 15.3239 16.5537 15.4199C16.8215 15.5163 16.9775 15.7959 16.918 16.0742C16.737 16.9187 16.6667 17.5291 16.6523 17.9561C16.6424 18.2509 16.6596 18.4554 16.6836 18.5879C16.8056 18.4774 16.9832 18.2776 17.2031 17.9443C17.5023 17.4908 17.8775 16.7978 18.3018 15.7676C18.9667 14.1525 19.9161 11.295 20.6533 6.87012C20.7018 6.5802 20.9627 6.37427 21.2568 6.39648C21.5503 6.41855 21.7789 6.66173 21.7832 6.95605C21.7867 7.1936 21.8494 11.95 21.4795 15.3623C21.5217 15.3549 21.5651 15.3497 21.6094 15.3467C22.5014 15.2864 23.2999 15.764 23.9814 16.7227C24.3305 17.2135 24.85 17.5446 25.4248 17.6631C25.4644 16.3288 26.2286 14.9422 27.0654 14.2246C27.494 13.8571 27.966 13.6445 28.3818 13.7422C28.808 13.8426 29.1206 14.2537 29.2617 14.999C29.5407 16.4732 28.5165 18.2946 26.7402 18.7451C26.8034 18.9006 26.8824 19.0455 26.9766 19.1768C27.0577 19.2899 27.1981 19.4049 27.3828 19.5107C27.5664 19.6159 27.7874 19.7093 28.0205 19.7812C28.4905 19.9263 28.9934 19.9812 29.335 19.8984C29.6403 19.8248 29.9476 20.0121 30.0215 20.3174C30.0954 20.6227 29.9078 20.93 29.6025 21.0039C29.0737 21.1318 28.3544 21.0718 27.6895 20.8691C27.0255 20.6667 26.3924 20.3149 26.0518 19.8398C25.837 19.5405 25.677 19.1988 25.5713 18.834C24.5693 18.7404 23.6466 18.2136 23.0547 17.3809C22.752 16.955 22.3777 16.6174 22.041 16.5146C21.8765 16.4646 21.7262 16.4724 21.5947 16.5459C21.4614 16.6206 21.3316 16.7712 21.2266 17.0371C21.1189 17.3097 20.822 17.4566 20.54 17.375C20.2584 17.2936 20.0842 17.0109 20.1387 16.7227C20.3419 15.6461 20.4633 14.1747 20.5381 12.6992C20.132 14.1427 19.7365 15.2554 19.4072 16.0693C19.1616 16.6763 18.7943 17.5053 18.3643 18.2275C18.1493 18.5886 17.9165 18.9252 17.6738 19.1953C17.4323 19.4642 17.1739 19.6736 16.9053 19.7695L16.9062 19.7705C16.5728 19.8897 16.2303 19.8341 15.9746 19.6104C15.7463 19.4103 15.6103 19.0993 15.5498 18.6846C14.975 19.7453 14.2582 21.0483 13.4893 22.3916H28.5898C29.4226 22.3916 30.0996 23.0686 30.0996 23.9014C30.0996 24.7341 29.4226 25.4111 28.5898 25.4111H11.7041C11.0685 26.4439 10.4441 27.4074 9.87695 28.1973C9.30292 28.9968 8.7825 29.6263 8.36719 29.9688C7.95919 30.3051 7.35131 29.9489 7.44531 29.4287C7.6944 28.0495 8.07999 26.7137 8.54102 25.4111H7.41016C6.57741 25.4111 5.90039 24.7341 5.90039 23.9014C5.9004 23.0686 6.57742 22.3916 7.41016 22.3916H9.74121C11.2233 18.9629 12.9875 15.5703 13.8311 11.9287C14.3567 9.65941 13.9283 8.4051 13.2471 7.74023C12.5607 7.07032 11.5891 6.97006 10.9736 7.07031C9.69841 7.27845 8.65902 8.34581 8.41602 9.71875C8.17415 11.0859 8.72203 12.7697 10.6562 14.1982C10.9089 14.3848 10.9626 14.7405 10.7764 14.9932C10.5898 15.2459 10.2331 15.3 9.98047 15.1133C7.64498 13.3885 6.95812 11.2447 7.30664 9.45117C7.65407 7.66336 9.03078 6.23433 10.791 5.94727ZM9.75195 25.4111C9.52212 26.0374 9.30897 26.6691 9.12109 27.3076C9.51204 26.75 9.93412 26.1057 10.3691 25.4111H9.75195ZM7.41016 23.5293C7.20485 23.5293 7.03712 23.696 7.03711 23.9014C7.03711 24.1067 7.20482 24.2744 7.41016 24.2744H8.96484C9.06208 24.0249 9.16151 23.7766 9.2627 23.5293H7.41016ZM12.3916 24.2744H28.5898C28.7952 24.2744 28.9629 24.1067 28.9629 23.9014C28.9629 23.6961 28.7952 23.5293 28.5898 23.5293H12.832C12.686 23.7787 12.5388 24.0273 12.3916 24.2744ZM10.1895 24.2744H11.0674C11.2155 24.0288 11.3644 23.7801 11.5127 23.5293H10.4941C10.3905 23.7767 10.2893 24.0253 10.1895 24.2744ZM27.9795 14.9365C27.9177 14.9827 27.8445 15.0471 27.7637 15.1279C27.6018 15.2899 27.4137 15.515 27.2354 15.7832C26.9001 16.2876 26.6067 16.9375 26.5654 17.6123C27.221 17.409 27.6981 16.919 27.957 16.3779C28.218 15.8325 28.2471 15.2609 28.0449 14.8916C28.0262 14.9031 28.0043 14.918 27.9795 14.9365Z" fill="#D93843" stroke="#D93843" stroke-width="0.2" />
              </svg>

            </div>
            <span className="text-base font-bold text-[#27272A]">
              {t('signatureTitle')}
            </span>
          </div>

          {/* Signature Canvas */}
          <div className="relative w-full h-[280px] bg-white rounded-lg border border-gray-200">
            <SignatureCanvas
              ref={sigCanvas}
              penColor='blue'
              canvasProps={{
                className: 'w-full h-full rounded-lg',
                style: { width: '100%', height: '100%' },
              }}
              onEnd={handleEnd}
            />

            {/* Clear button */}
            {hasSignature && (
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                {t('clear')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.1)] px-4 py-4 pb-8">
        <button
          onClick={handleSubmit(handleContinue)}
          disabled={!isAgreed || !hasSignature}
          className={`w-full py-3 px-4 rounded-full text-white font-semibold text-base ${!isAgreed || !hasSignature ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          style={{
            background: 'linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)',
          }}
        >
          {t('continueButton')}
        </button>
      </div>
    </div>
  );
};

export default SignActivateVikki;
