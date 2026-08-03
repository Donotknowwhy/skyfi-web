"use client";
import axios from 'axios'; // Import axios
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Link } from '../../../i18n/navigation';
import DeviceCompatibilityModal from '../../components/DeviceCompatibilityModal';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useMyEsim from '../../hooks/useMyEsim';
import HeaderCart from "@/app/components/HeaderCart";
import {trackProductListView, trackPageView, trackSearch} from "@/app/utils/trackingHelper";


const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ArrowRightIcon = () => <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M8.29289 6.05559C8.68342 5.66507 9.31658 5.66507 9.70711 6.05559L15.7071 12.0556C16.0976 12.4461 16.0976 13.0793 15.7071 13.4698L9.70711 19.4698C9.31658 19.8603 8.68342 19.8603 8.29289 19.4698C7.90237 19.0793 7.90237 18.4461 8.29289 18.0556L13.5858 12.7627L8.29289 7.46981C7.90237 7.07928 7.90237 6.44612 8.29289 6.05559Z" fill="#333333"/>
</svg>
;

export default function TravelESimPage() {
  const locale = useLocale();
  const t = useTranslations('travelESimPage');
  const tPage = useTranslations('countryEsimPage');
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'national'; // Default to 'national' if no query param
  const viewSrc = searchParams.get( 'src' ) || 'skyfi';
  const [activeTab, setActiveTab] = useState(typeParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [ isLoadingData, setIsLoadingData ] = useState( false );
  const [ regions, searchRegions ] = useState( '' );
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const searchInputRef = useRef(null);
  const popoverRef = useRef(null);
  const { showDevicesEsim } = useMyEsim();

  useEffect(() => {
    // Update activeTab when URL query parameter changes and clear search
    setActiveTab(typeParam);
    setSearchTerm(''); // Clear search when switching tabs
    setShowFilterPopover(false); // Close popover when switching tabs
  }, [typeParam]);

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
    searchRegions( apiType );
    const fetchDataForTab = async () => {
      setIsLoadingData(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/get-regions-by-type/v2/${apiType}`;
        const response = await axios.get(apiUrl);
        console.log(response.data);

        if (response.data && response.data.code === 200) {
          setFetchedData(response.data.result);
          trackProductListView({
            item_list_name: `Travel eSIM - ${apiType}`,
            item_count: response.data.result?.length || 0,
            filters: { tab: activeTab },
          });
        } else {
          console.error("Cấu trúc phản hồi API không mong đợi:", response.data);
          setFetchedData([]);
        }
      } catch (error) {
        console.error(`Không thể tải dữ liệu ${apiType}:`, error.response ? error.response.data : error.message);
        setFetchedData([]);
      }
      setIsLoadingData(false);
    };

    fetchDataForTab();
  }, [activeTab]);

  // Filter items based on search term for popover
  const filteredData = fetchedData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Track page view on mount
  useEffect(() => {
    trackPageView({ page_title: 'Travel eSIM - Danh sách eSIM du lịch' });
  }, []);

  // Handle click outside popover to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowFilterPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchInputFocus = () => {
    setShowFilterPopover(true);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowFilterPopover(true);
    if (value.length >= 2) {
      const results = fetchedData.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      trackSearch(value, results.length, { search_type: 'autocomplete', search_category: activeTab });
    }
  };

  const handlePopoverItemClick = (item) => {
    setShowFilterPopover(false);
    setSearchTerm('');
  };

  const renderPopoverItems = (items, type) => {
    if (isLoadingData) {
      return <div className="text-center py-[20px] text-[#666]">{tPage('loading')}</div>;
    }

    if (!items || items.length === 0) {
      if (searchTerm && fetchedData.length > 0) {
        return (
          <div className="text-center py-[20px] text-[#666]">
            <p>{tPage('noResultFor', {searchTerm})}</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setShowFilterPopover(false);
              }}
              className="mt-2 text-blue-600 hover:underline"
            >
                {tPage('clearSearch')}
            </button>
          </div>
        );
      }
      return <div className="text-center py-[20px] text-[#666]">{tPage('noCountryFound')}</div>;
    }

    return (
      <div className="max-h-[400px] overflow-y-auto">
        {items.map(item => (
          <Link
            key={item.id}
            href={`/esim/${item.code.toLowerCase()}?regions=${regions}&src=${viewSrc}`}
            className="block"
            onClick={() => handlePopoverItemClick(item)}
          >
            <div className="bg-white hover:bg-gray-50 transition-colors duration-200 flex flex-row items-center p-[12px] gap-[12px] border-b border-[#F1F1F1] last:border-b-0">
              {type === 'COUNTRY' && item.code && (
                <div className="w-[40px] h-[30.5px] relative flex-shrink-0">
                  <img
                    src={item.icon?? `/assets/flags/${item.code.toLowerCase()}.png`}
                    alt={ item.name }
                    className="rounded-[4px] border object-cover border-[#F1F1F1] w-full h-full"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
              <span className="font-inter font-semibold text-[16px] text-[#333] flex-1 min-w-0 line-clamp-1">
                {item.name}
              </span>
              <button className="text-[#A1A1A1] hover:text-[#333]">
                <ArrowRightIcon />
              </button>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const renderGridItems = (items, type) => {
    if (isLoadingData) {
      return <div className="text-center py-[40px] text-[#666]">{t('loadingMessage')}</div>; // Assuming 'loadingMessage' key
    }
    if (!items || items.length === 0) {
      return <div className="text-center py-[40px] text-[#666]">{t('noItemsFound')}</div>; // Assuming 'noItemsFound' key
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[24px]">
        {items.map(item => (
          <Link key={item.id} href={`/esim/${item.code.toLowerCase()}?regions=${regions}&src=${viewSrc}`} className="flex flex-col flex-1 basis-[300px] w-full sm:max-w-[250px] md:max-w-[250px]  lg:max-w-[260px] xl:max-w-[300px] ">
            <div className="bg-white rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-row items-center p-[12px] gap-[12px]">
              {type === 'COUNTRY' && item.code && (
                <div className="w-[40px] h-[30.5px] relative flex-shrink-0">
                  <img
                    src={item.icon?? `/assets/flags/${item.code.toLowerCase()}.png`}
                    alt={ item.name }
                    layout="fill"
                    className="rounded-[4px] border object-cover border-[#F1F1F1] w-full h-full"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
              <span className="font-inter  font-semibold text-[16px] text-[#333] flex-1 min-w-0 line-clamp-1">
                {item.name}
              </span>
              <button className="text-[#A1A1A1] hover:text-[#333]">
                <ArrowRightIcon />
              </button>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  let currentTitleKey = '';
  let currentDataType = '';
  if (activeTab === 'national') {
    currentTitleKey = 'countriesTitle';
    currentDataType = 'COUNTRY';
  } else if (activeTab === 'regional') {
    currentTitleKey = 'regionalTitle'; // Assuming 'regionalTitle' key
    currentDataType = 'REGIONAL';
  } else if (activeTab === 'global') {
    currentTitleKey = 'globalTitle'; // Assuming 'globalTitle' key
    currentDataType = 'GLOBAL';
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {viewSrc==="vj"?<HeaderCart/>: <Header />}


      {/* Banner Section */}
        {viewSrc==="vj"?(
            <div className="relative  flex flex-col items-start justify-start py-[20px]"
            >
                <div className="z-10 px-4 xl:container flex flex-col items-start  w-full">
                    <div className="relative w-full md:max-w-[680px]">
                        <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            ref={searchInputRef}
                            type="search"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            onFocus={handleSearchInputFocus}
                            className="w-full bg-white border border-[#DDDDDD] rounded-[8px] text-[16px] outline-none placeholder:text-[#A1A1A1] py-[20px] pr-[48px] pl-[52px] focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {/*{searchTerm && (*/}
                        {/*  <button*/}
                        {/*    onClick={() => {*/}
                        {/*      setSearchTerm('');*/}
                        {/*      setShowFilterPopover(false);*/}
                        {/*    }}*/}
                        {/*    className="absolute inset-y-0 right-0 pr-[20px] flex items-center text-[#A1A1A1] hover:text-[#333] transition-colors"*/}
                        {/*  >*/}
                        {/*    X*/}
                        {/*  </button>*/}
                        {/*)}*/}

                        {/* Filter Popover */}
                        {showFilterPopover && (
                            <div
                                ref={popoverRef}
                                className="absolute top-full left-0 right-0 mt-[8px] bg-white border border-[#DDDDDD] rounded-[8px] shadow-lg z-50 max-h-[400px] overflow-hidden"
                            >
                                {renderPopoverItems(filteredData, currentDataType)}
                            </div>
                        )}
                    </div>
                </div>
                {/* cards 1 graphic - simplified or omitted for now */}
            </div>

        ):(
            <div className="relative h-[240px] md:h-[240px] flex flex-col items-start justify-start pt-[20px]"
                 style={{backgroundImage: 'url(/assets/bg-esim.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}
            >

                <div className="z-10 container   flex flex-col items-start gap-[24px]  w-full">
                    <h1 className="font-semibold text-[24px] md:text-[32px] text-center text-[#333]">
                        {t('bannerTitle')}
                    </h1>
                    <div className="relative w-full max-w-[680px]">
                        <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            ref={searchInputRef}
                            type="search"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            onFocus={handleSearchInputFocus}
                            className="w-full bg-white border border-[#DDDDDD] rounded-[8px] text-[16px] outline-none placeholder:text-[#A1A1A1] py-[20px] pr-[48px] pl-[52px] focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {/*{searchTerm && (*/}
                        {/*  <button*/}
                        {/*    onClick={() => {*/}
                        {/*      setSearchTerm('');*/}
                        {/*      setShowFilterPopover(false);*/}
                        {/*    }}*/}
                        {/*    className="absolute inset-y-0 right-0 pr-[20px] flex items-center text-[#A1A1A1] hover:text-[#333] transition-colors"*/}
                        {/*  >*/}
                        {/*    X*/}
                        {/*  </button>*/}
                        {/*)}*/}

                        {/* Filter Popover */}
                        {showFilterPopover && (
                            <div
                                ref={popoverRef}
                                className="absolute top-full left-0 right-0 mt-[8px] bg-white border border-[#DDDDDD] rounded-[8px] shadow-lg z-50 max-h-[400px] overflow-hidden"
                            >
                                {renderPopoverItems(filteredData, currentDataType)}
                            </div>
                        )}
                    </div>
                </div>
                {/* cards 1 graphic - simplified or omitted for now */}
            </div>

        )}

      {/* Main Content Section */}
      <main className=" flex flex-col ">
        {/* Tabs */}
        <div className="w-full bg-white border-b border-[#F1F1F1]">
          <div className="px-4 xl:container  flex justify-between md:justify-start gap-[20px] md:gap-[40px]">
            {[
              { id: 'national', labelKey: 'tabNational' },
              { id: 'regional', labelKey: 'tabRegional' },
              { id: 'global', labelKey: 'tabGlobal' },
            ].map(tab => (
              <Link
                key={tab.id}
                href={tab.id !== 'global' ? `/travel-esim?type=${tab.id}&src=${viewSrc}` : `/esim/global?regions=GLOBAL&src=${viewSrc}`}
                className={`py-[16px] md:py-[20px] font-inter text-sm sm:text-[16px] md:text-[18px] border-b-2 hover:text-[#ED1B2F]
                  ${activeTab === tab.id
                    ? 'border-[#ED1B2F] text-[#ED1B2F] font-semibold'
                    : 'border-transparent text-[#A1A1A1] font-medium'}
                `}
              >
                {t(tab.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        {/* Notice and Country Grid */}
        <div className="px-4 xl:container mb-6">
          <p className="font-inter text-[14px] md:text-[16px] text-[#333] my-4">
            {t.rich('notice', {
              link: (chunks) => (
                <button
                  onClick={() => showDevicesEsim()}
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  {chunks}
                </button>
              )
            })}
          </p>

          {currentTitleKey && (
            <>
              <h2 className="font-inter font-semibold text-base text-[24px] md:text-[28px] text-[#333] mb-4">
                {t(currentTitleKey)}
              </h2>
              {renderGridItems(fetchedData, currentDataType)}
            </>
          )}
        </div>
      </main>
      {viewSrc==="vj"?null:<Footer />}
      <DeviceCompatibilityModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
      />
    </div>
  );
}
