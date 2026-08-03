"use client"

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from "next/image";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// It's good practice to create a separate component for the form later
// import ContactForm from './ContactForm'; 

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations('contactPage');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full bg-white py-[40px] md:py-[80px]">
        <div className="w-full max-w-[1100px] px-[20px] md:px-[40px] lg:px-0 flex flex-col md:flex-row gap-[40px] md:gap-[80px]">
          {/* Left Side: Contact Info */}
          <div className="w-full md:w-1/2 flex flex-col gap-[16px]">
            <h1 className="font-inter font-semibold text-[32px] md:text-[40px] leading-[1.2em] text-[#333]">
              {t('title')}
            </h1>
            <p className="font-inter text-[16px] text-[#626262]">
              {t('subtitle')}
            </p>
            <div className="flex flex-col gap-[12px] mt-[20px]">
              <div className="flex items-center gap-[8px]">
                {/* Placeholder for phone icon */}
                <span className="font-inter text-[16px] text-[#333]">{t('phone')}: {t('phoneNumber')}</span>
              </div>
              <div className="flex items-center gap-[8px]">
                {/* Placeholder for email icon */}
                <span className="font-inter text-[16px] text-[#333]">{t('email')}: {t('emailAddress')}</span>
              </div>
              <div className="flex items-start gap-[8px]"> {/* Changed to items-start for address icon alignment */}
                {/* Placeholder for address icon */}
                <span className="font-inter text-[16px] text-[#333]">{t('address')}: {t('addressDetails')}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full md:w-1/2 bg-[#F9F9F9] p-[24px] md:p-[40px] rounded-[12px]">
            <form className="flex flex-col gap-[16px]">
              <div>
                <label htmlFor="name" className="block text-[12px] font-medium text-[#333] mb-[4px]">{t('formName')}</label>
                <input type="text" id="name" name="name" placeholder={t('formNamePlaceholder')} className="w-full p-[12px] border border-[#DDDDDD] rounded-[8px] text-[16px]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-[12px] font-medium text-[#333] mb-[4px]">{t('formEmail')} <span className="text-[#E60A32]">*</span></label>
                <input type="email" id="email" name="email" placeholder={t('formEmailPlaceholder')} className="w-full p-[12px] border border-[#DDDDDD] rounded-[8px] text-[16px]" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[12px] font-medium text-[#333] mb-[4px]">{t('formPhone')}</label>
                <input type="tel" id="phone" name="phone" placeholder={t('formPhonePlaceholder')} className="w-full p-[12px] border border-[#DDDDDD] rounded-[8px] text-[16px]" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-[12px] font-medium text-[#333] mb-[4px]">{t('formSubject')} <span className="text-[#E60A32]">*</span></label>
                {/* For now, a text input. Will change to select if options are provided. */}
                <input type="text" id="subject" name="subject" placeholder={t('formSubjectPlaceholder')} className="w-full p-[12px] border border-[#DDDDDD] rounded-[8px] text-[16px]" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-[12px] font-medium text-[#333] mb-[4px]">{t('formMessage')} <span className="text-[#E60A32]">*</span></label>
                <textarea id="message" name="message" rows="4" placeholder={t('formMessagePlaceholder')} className="w-full p-[12px] border border-[#DDDDDD] rounded-[8px] text-[16px]" required></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-[#E69818] text-white font-semibold p-[12px] md:p-[16px] rounded-[8px] hover:bg-opacity-90 transition-opacity">
                  {t('formSendButton')}
                </button>
              </div>
            </form>
          </div>
          {/* <ContactForm /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
} 