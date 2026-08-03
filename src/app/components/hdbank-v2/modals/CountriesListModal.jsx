"use client";

import { useModal } from '@/app/utils/modal';
import { saveLocal } from '@/app/utils/saveLocal';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Button } from '../../ui/Button';

const CountriesListModal = ({ packageData }) => {
  const { close } = useModal();
  const router = useRouter();
  const t = useTranslations('hdbank.travelEsim.countriesModal');
  const countries = packageData?.countries_array || [];

  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query) return countries;
    return countries.filter((c) => (c.name || '').toLowerCase().includes(query.toLowerCase()) || (c.iso2 || c.code || '').toLowerCase().includes(query.toLowerCase()));
  }, [countries, query]);

  const onSelect = (country) => {
    // keep packageData stored for detail page
    saveLocal('packageData', packageData);
    close();
    router.push('/hdbank-app-v2/travel-esim/detail');
  };

  return (
    <div className="w-full bg-white rounded-t-2xl max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between py-2 ">
        <h3 className="text-lg font-semibold text-[#333333] font-inter">{t('title')}</h3>
        <button onClick={() => close()} className="p-2">
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className=" pb-4">
        <div className="relative">
          <div className="flex items-center bg-white border border-[#DDDDDD] rounded-xl px-3 py-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <circle cx="11" cy="11" r="8" stroke="#5C5C5C" strokeWidth="1.5"/>
              <path d="21 21L16.65 16.65" stroke="#5C5C5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-base text-[#333333] placeholder-[#A1A1A1] font-inter"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-[#F5F5F5]">
        <span className="text-sm font-medium text-[#8A8A8A] font-inter">{t('selectedArea')}</span>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-2">
        {filtered.map((item) => (
          <button
            key={item.id || item.code || item.iso2 || item.name}
            onClick={() => onSelect(item)}
            className="w-full  py-3 text-left border-b border-[#F1F1F1] hover:bg-gray-50 transition-colors flex items-center gap-4"
          >
            <div className="w-8 h-6 bg-gray-100 rounded-sm flex items-center justify-center overflow-hidden">
              {item.image && (<img src={item.image.includes('http') ? item.image : `https://flagcdn.com/w80/${item.code.toLowerCase()}.png`} alt="flag" className="w-full h-full object-cover" />)}
            </div>

            <div className="flex-1">
              <div className="text-base text-[#333333] font-inter">{item.name}</div>
            </div>

            <div className="text-sm text-[#0C0C0E] font-semibold">{item.iso2 || item.code || ''}</div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center">
            <span className="text-[#A1A1A1] font-inter">{t('noResults')}</span>
          </div>
        )}
      </div>

      <div className="py-4 bg-white border-t border-[#F1F1F1] flex items-center justify-between">
        <div className="text-sm text-[#6B7280]">{t('total')}: {countries.length} {t('countries')}</div>
        <Button onClick={() => close()} className="bg-[#2C6EFF] text-white  flex-1 max-w-28">{t('close')}</Button>
      </div>
    </div>
  );
};

export const showCountriesModal = (packageData) => {
  const { modal } = require('@/app/utils/modal');
  modal.open({
    render: <CountriesListModal packageData={packageData} />,
    boxClassName: 'max-w-md',
    typeModal: typeof window !== 'undefined' && window.innerWidth < 640 ? 'sheet' : 'default'
  });
};

export default CountriesListModal;
