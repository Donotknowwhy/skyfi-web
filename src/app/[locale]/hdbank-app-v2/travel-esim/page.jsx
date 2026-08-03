"use client";
import SessionExpired from '@/app/components/hdbank-v2/SessionExpired';
import useMyEsim from '@/app/hooks/useMyEsim';
import authService from '@/app/services/auth';
import { useUserActions, useUserState } from '@/app/stores/user';
import { useLoad } from '@/app/utils/load';
import { getLocal, saveLocal } from '@/app/utils/saveLocal';
import { useRouter } from '@/i18n/navigation';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Icons
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#0C0C0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="#0C0C0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function HDBankTravelESimPage() {
  const t = useTranslations('hdbank.travelEsim');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open, close } = useLoad();
  const [error, setError] = useState(null);
  const {
    setToken,
    logoutVikki,
    setUserVikki,
    setSessionIdState,
    setUser,
    setPhoneDktts,
    convertPhoneFormat,
  } = useUserActions();
  const { sessionId } = useUserState();


  const viewSrc = 'vikki'; // Default to vikki for this page
  const storedRegions= getLocal('regions')
  const [activeTab, setActiveTab] = useState(storedRegions||'national'); // 'national' | 'regional' | 'global'
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [regions, setRegions] = useState('');


  const { showDevicesEsimHDBank } = useMyEsim();

  useEffect(() => {
    handleLoginWithSession();
  }, [searchParams]);

  const handleLoginWithSession = async () => {
    open();
    const sessionIdFromUrl = searchParams.get('sessionId');
    const currentSessionId = sessionIdFromUrl || sessionId;

    if (!currentSessionId) {
      console.log('No sessionId found, logging out user');
      logoutVikki();
      close();
      return;
    }

    // Lưu sessionId từ URL vào context nếu có
    if (sessionIdFromUrl) {
      setSessionIdState(sessionIdFromUrl);
    }

    try {
      const response = await authService.loginWithSession(currentSessionId);

      if (response.success) {
        // Save token to localStorage
        if (response.data?.token) {
          let listPhone = [response.data.phone, ...response.data.phone_dktts];
          listPhone = listPhone
            .filter((e) => e.startsWith('070') || e.startsWith('8470'))
            .map((e) => convertPhoneFormat(e));
          setToken(
            response.data.token,
            listPhone[0] ? listPhone[0] : response.data.phone,
          );
          setUserVikki(response.data.user_id || '');
          setUser(response.data);
          setPhoneDktts(listPhone);
        }
      } else {
        throw new Error(response.message || 'Failed to login with session');
      }
    } catch (err) {
      console.error('Login with session error:', err);
      setError(err.message);
    } finally {
      close();
    }
  };

  useEffect(() => {
    let apiType = '';
    switch (activeTab) {
      case 'national':
        apiType = 'COUNTRY';
        break;
      case 'regional':
        apiType = 'REGIONAL';
        break;
      case 'global':
        apiType = 'GLOBAL';
        break;
      default:
        setFetchedData([]);
        return;
    }
    setRegions(apiType);

    const fetchDataForTab = async () => {
      setIsLoadingData(true);
      try {
        // Using the same API endpoint as the original file
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/get-regions-by-type/v2/${apiType}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.code === 200) {
          setFetchedData(response.data.result);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setFetchedData([]);
        }
      } catch (error) {
        console.error(`Failed to fetch data for ${apiType}:`, error);
        setFetchedData([]);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchDataForTab();
  }, [activeTab]);

  // Filter data based on search term
  const filteredData = fetchedData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleTabChange = (tabId) => {
    if(tabId === 'global') {
      router.push(`/hdbank-app-v2/travel-esim/global?regions=GLOBAL&src=${viewSrc}`);
      return;
    };
    saveLocal('regions', tabId);
    setActiveTab(tabId);
    setSearchTerm(''); // Clear search on tab change
    // Optional: update URL without reload
    // router.push(`/vikki-app/travel-esim?type=${tabId}`, { scroll: false });
  };

  if (error) {
    return (
      <SessionExpired
        error={error}
        onRetry={() => {
          setError(null);
          handleLoginWithSession();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] font-inter text-[#0C0C0E]">
      {/* Header - Vikki Style */}
      <div className="bg-white sticky top-0 z-50">
        <div className="h-11 flex items-center justify-between px-4 relative border-b border-[#F1F1F1]">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <BackIcon />
          </button>
          <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[16px] font-semibold">
            {t('title')}
          </h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </div>

      <div className="flex-1 flex flex-col pb-6">
        {/* Search Bar */}
        <div className="bg-white px-4 py-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#F5F5F5] rounded-lg py-2.5 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-red-100 focus:bg-white transition-colors"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white px-4 pb-0 rounded-b-[20px] mb-4 shadow-sm">
          <div className="flex border-b border-[#E6E7EB]">
            {[
              { id: 'national', label: t('national') },
              { id: 'regional', label: t('regional') },
              { id: 'global', label: t('global') },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 py-3 text-[13px] font-medium border-b-[2px] transition-colors relative
                  ${activeTab === tab.id
                    ? 'border-[#DA2128] text-[#DA2128]'
                    : 'border-transparent text-[#898C93] hover:text-[#DA2128]'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notice */}
          <div className="py-3 flex items-start gap-2">
             <div className=" shrink-0 w-2 h-2 bg-[#0000ff] rounded-full mt-2"/>

             <p className="text-[13px] text-[#0C0C0E] leading-5">
               {t('note')} {' '}
               <button
                 onClick={showDevicesEsimHDBank}
                 className="text-[#DA2128] font-medium hover:underline focus:outline-none"
               >
                 {t('viewDevices')}
               </button>
             </p>
          </div>
        </div>

        {/* Content List */}
        <div className="px-4">
          {isLoadingData ? (
            <div className="text-center py-10 text-gray-500 text-sm">{t('loading')}</div>
          ) : filteredData.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F1F1F1]">
                <h2 className="text-[16px] font-semibold text-[#DA2128]">
                  {activeTab === 'national' ? t('countries') : activeTab === 'regional' ? t('regions') : t('globalPackages')}
                </h2>
              </div>
              <div className="flex flex-col">
                {filteredData.map((item, index) => (
                  <Link
                    key={item.id || index}
                    href={`/hdbank-app-v2/travel-esim/${item.code?.toLowerCase()}?regions=${regions}&src=${viewSrc}`}
                    className="flex items-center justify-between p-4 border-b border-[#F1F1F1] last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-[30px] relative shadow-sm rounded-[4px] overflow-hidden border border-[#F1F1F1]">
                            <img
                                src={item.icon || `/assets/flags/${item.code?.toLowerCase()}.png`}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </div>
                        <span className="text-[16px] text-[#0C0C0E] font-normal">{item.name}</span>
                    </div>
                    <ChevronRightIcon />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 text-sm">
               {searchTerm ? t('noResult') : t('noData')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
