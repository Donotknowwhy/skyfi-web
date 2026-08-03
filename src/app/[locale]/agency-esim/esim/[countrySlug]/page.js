"use client";

import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import { showModalMess } from '@/app/components/modals/modalMess';
import PlanCard from '@/app/components/PlanCard';
import { useUserActions } from '@/app/stores/user';
import { convertSimTravel, convertSimTravelToCart, dailySuffix } from '@/app/utils/format';
import HeaderVJ from "@/app/components/HeaderVJ";
import HeaderCart from "@/app/components/HeaderCart";
import useMyEsim from "@/app/hooks/useMyEsim";

// Placeholder Icons
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ArrowRightIcon = () => <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M8.29289 6.05559C8.68342 5.66507 9.31658 5.66507 9.70711 6.05559L15.7071 12.0556C16.0976 12.4461 16.0976 13.0793 15.7071 13.4698L9.70711 19.4698C9.31658 19.8603 8.68342 19.8603 8.29289 19.4698C7.90237 19.0793 7.90237 18.4461 8.29289 18.0556L13.5858 12.7627L8.29289 7.46981C7.90237 7.07928 7.90237 6.44612 8.29289 6.05559Z" fill="#333333"/>
</svg>;

export default function CountryESimPlansPage() {
  const locale = useLocale();
  const t = useTranslations();
  const params = useParams();
  const countrySlug = params.countrySlug;
  const searchParams = useSearchParams();
  const typeParam = searchParams.get( 'type' ) || 'national';
  const viewSrc = searchParams.get( 'src' ) || 'skyfi';

  const regions = searchParams.get( 'regions' );

  const [countryDetails, setCountryDetails] = useState(null);
  const [esimPackages, setEsimPackages] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const searchInputRef = useRef(null);
  const popoverRef = useRef(null);

  const [ activeTab, setActiveTab ] = useState( typeParam );
  const router = useRouter();

  const tPage = useTranslations('countryEsimPage');
  const tCommon = useTranslations( 'common' );
  const tbaner = useTranslations('travelESimPage');

    const { showDevicesEsim } = useMyEsim();
  const {addToCart, setSims}= useUserActions()

  useEffect(() => {
    // Update activeTab when URL query parameter changes
    setActiveTab(typeParam);
    setSearchTerm(''); // Clear search when switching tabs
    setShowFilterPopover(false); // Close popover when switching tabs
  }, [typeParam]);

  useEffect(() => {
    if (!countrySlug || activeTab !== 'national') {
      // Only fetch if we have a slug and the national tab is active
      // For regional/global, data comes from the main travel-esim page or another source
      if (activeTab !== 'national') {
        setEsimPackages([]); // Clear packages if not on national tab
        setCountryDetails(null);
        setIsLoading(false);
      }
      return;
    }

    const fetchCountryAndPackages = async () => {
      setIsLoading(true);
      setError(null);
      setCountryDetails(null);
      setEsimPackages([]);

      try {
        // 1. Fetch all countries to find the ID and details
        const countriesApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/get-regions-by-type/v2/${regions}`;
        const countriesResponse = await axios.get( countriesApiUrl );

        let foundCountry = null;
        if (countriesResponse.data && countriesResponse.data.code === 200 && Array.isArray(countriesResponse.data.result)) {
          // Store all countries for search filter
          setAllCountries(countriesResponse.data.result);

          foundCountry = countriesResponse.data.result.find(
            (country) => country.code && country.code.toLowerCase() === countrySlug.toLowerCase()
          );
        } else {
          throw new Error(countriesResponse.data.message || 'Không thể tải danh sách quốc gia hoặc định dạng không hợp lệ');
        }
        console.log("Quốc gia tìm thấy:", foundCountry);

        if (!foundCountry) {
          // Use tPage for specific error messages
          throw new Error(tPage('countryNotFound', { slug: countrySlug }));
        }
        setCountryDetails(foundCountry);

        // 2. Fetch eSIM packages for the found country ID
        const packagesApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/v2/get-esim-package-by-region/${foundCountry.id}`;
        const packagesResponse = await axios.get(packagesApiUrl);

        if (packagesResponse.data && packagesResponse.data.code === 200 && Array.isArray(packagesResponse.data.result)) {
          setEsimPackages(packagesResponse.data.result);
        } else if (packagesResponse.data && packagesResponse.data.code !== 200) {
           throw new Error(packagesResponse.data.message || `Lỗi khi tải gói: Mã ${packagesResponse.data.code}`);
        } else {
          console.warn('Không tìm thấy gói hoặc cấu trúc phản hồi API gói không mong đợi:', packagesResponse.data);
          setEsimPackages([]);
        }

      } catch (err) {
        console.error("Lỗi khi tải dữ liệu eSIM quốc gia cho slug:", countrySlug, err);
        // Use tCommon for generic error messages
        setError(err.message || tCommon('errorFetchingData'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryAndPackages();
  // Depend on countrySlug and activeTab. Add tPage, tCommon if their instances change.
  }, [countrySlug, activeTab, locale, tPage, tCommon]);

  // Filter countries based on search term for popover
  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    country.code.toLowerCase() !== countrySlug.toLowerCase() // Exclude current country
  );

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
    if (allCountries.length > 0) {
      setShowFilterPopover(true);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (allCountries.length > 0) {
      setShowFilterPopover(true);
    }
  };

  const handlePopoverItemClick = (country) => {
    setShowFilterPopover(false);
    setSearchTerm('');
  };

  const renderPopoverItems = (countries) => {
    if (isLoading) {
      return <div className="text-center py-[20px] text-[#666]">{tPage('loading')}</div>;
    }

    if (!countries || countries.length === 0) {
      if (searchTerm && allCountries.length > 0) {
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
        {countries.map(country => (
          <Link
            key={country.id}
            href={`/agency-esim/esim/${country.code.toLowerCase()}?regions=${regions}&src=${viewSrc}`}
            className="block"
            onClick={() => handlePopoverItemClick(country)}
          >
            <div className="bg-white hover:bg-gray-50 transition-colors duration-200 flex flex-row items-center p-[12px] gap-[12px] border-b border-[#F1F1F1] last:border-b-0">
              {country.code && (
                <div className="w-[40px] h-[30.5px] relative flex-shrink-0">
                  <img
                    src={country.icon ?? `/assets/flags/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    className="rounded-[4px] border object-cover border-[#F1F1F1] w-full h-full"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
              <span className="font-inter font-semibold text-[16px] text-[#333] flex-1 min-w-0 line-clamp-1">
                {country.name}
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

  // countryName is now derived from countryDetails state
  const countryName = countryDetails ? countryDetails.name : countrySlug; //

  const onBuyNowClick = async ( plan, quantity, type ) => {
    console.log(type)
    if ( type == 'cart' ) {
      console.log("Thêm vào giỏ hàng:", plan, quantity);

       const result = await addToCart( convertSimTravelToCart( plan, quantity ));
          console.log('kết quả', result );
          if ( result === 'MAX_QUANTITY' ) {
            showModalMess( {
              label: 'Thông báo',
              message: `Số lượng tối đa là 50 sản phẩm, vui lòng nhập lại.`,
              type: 'error',
            } );
      }
      return;
    }
    setSims( [ convertSimTravel( plan, quantity ) ] );
    router.push( `/checkout/payment?src=${viewSrc}` );
    return;

  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {viewSrc==="vj"?<HeaderCart/>:<Header />}

       {/* Banner Section */}
      <div className="relative h-[240px] md:h-[240px] flex flex-col items-start justify-start pt-[20px]"
        style={{backgroundImage: 'url(/assets/bg-esim.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}
      >

        <div className="z-10 container   flex flex-col items-start gap-[24px]  w-full">
          <h1 className="font-semibold text-[24px] md:text-[32px] text-center text-[#333]">
            {tbaner('bannerTitle')}
          </h1>
          <div className="relative w-full max-w-[680px]">
            <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              ref={searchInputRef}
              type="search"
              placeholder={tbaner('searchPlaceholder')}
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
                {renderPopoverItems(filteredCountries)}
              </div>
            )}
          </div>
        </div>
        {/* cards 1 graphic - simplified or omitted for now */}
      </div>

      {/* Main Content Section */}
      <main className="w-full flex flex-col items-center">
        {/* Tabs - Using query parameters */}
        <div className="w-full bg-white border-b border-[#F1F1F1]">
          <div className="container  flex justify-between md:justify-start gap-[20px] md:gap-[40px]">
            {[
              { id: 'national', labelKey: 'travelESimPage.tabNational' },
              { id: 'regional', labelKey: 'travelESimPage.tabRegional' },
              { id: 'global', labelKey: 'travelESimPage.tabGlobal' },
            ].map( tab => {
              const link = tab.id === "global"
                  ? `/${locale}/esim/global?regions=GLOBAL&src=${viewSrc}`
                  : `/${locale}/travel-esim/?type=${tab.id}&src=${viewSrc}`;
              return (
                <Link
                  key={ tab.id }
                  href={link}
                  className={ `py-[16px] md:py-[20px] font-inter text-sm sm:text-[16px] md:text-[18px] border-b-2 hover:text-[#ED1B2F]
                  ${ regions == tab.id.toUpperCase()
                      ? 'border-[#ED1B2F] text-[#ED1B2F] font-semibold'
                      : 'border-transparent text-[#A1A1A1] font-medium' }
                 ${ regions == "COUNTRY" && tab.id==="national"
                      ? '!border-[#ED1B2F] !text-[#ED1B2F] font-semibold'
                      : '' }
                `}
                >
                  { t( tab.labelKey ) }
                </Link>
              );
            } )}
          </div>
        </div>
        {/* Country Title and Plan Grid */}
        <div className="w-full container md:px-[90px] py-3 md:py-3 flex flex-col gap-[20px]">
          <p className="font-inter text-[14px] md:text-[16px] text-[#333] ">
            {tbaner.rich('notice', {
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
          <div className="flex items-center gap-[8px] mb-[20px]">
            <p onClick={()=>{router.push(`/${locale}/agency-esim?type=${typeParam}&src=${viewSrc}`)}} className="text-[#333] hover:text-[#ED1B2F] cursor-pointer">
              <ChevronLeftIcon />
            </p>
            <h2 className="font-inter font-semibold text-[24px] md:text-[28px] text-[#333]">
              {/* Display country name from state, fallback if still loading */}
              {isLoading && activeTab === 'national' ? tCommon('loading') : (countryDetails ? countryDetails.name : countrySlug) }
              {activeTab !== 'national' && t(activeTab === 'regional' ? 'travelESimPage.tabRegional' : 'travelESimPage.tabGlobal')}
            </h2>
          </div>

          {isLoading && (
            <div className="text-center py-[40px] text-[18px] text-[#666]">
                {tCommon('loading')}
            </div>
          )}
          {error && (
             <div className="text-center py-[40px] text-[18px] text-red-600 bg-red-100 p-4 rounded-md">
              <p>{tCommon('errorOccurred')}: {error}</p>
            </div>
          )}

          {!isLoading && !error && activeTab === 'national' && countryDetails && (
            esimPackages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[24px]">
                {esimPackages.map(plan => {
                  let nameRegion = plan?.countries_array[0]?.title || countryName;
                  let flagUrl = plan.countries_array[0]?.image || '/assets/flags/default.png';
                  const adaptedPlan = {
                    id: plan.variant_id,
                    name: plan.name,
                    data: `${plan.data_amount} ${plan.data_unit}${dailySuffix(plan, tCommon('perDay'))}`,
                    validity: plan.validity_days,
                    price: new Intl.NumberFormat(locale, { style: 'currency', currency: plan.currency || 'USD' }).format(plan.selling_price),
                    currency: plan.currency || 'USD',
                    detailsLink: `/${ locale }/checkout?planId=${ plan.variant_id }&src=${viewSrc}`,
                    countryName: nameRegion,
                    countryFlagUrl : flagUrl,
                    provider : plan.provider,
                    countries_array:plan.countries_array
                  };
                  return <PlanCard key={plan.variant_id} plan={adaptedPlan} locale={locale} tPage={tPage} onBuyNowClick={onBuyNowClick} sim={plan} />;
                })}
              </div>
            ) : (
              <p className='text-neutral-800'>{tPage('countryNotFound')}</p>
            )
          )}
          {activeTab === 'regional' && !isLoading && (
            <div className="text-center py-[40px] text-[#666]">{t('travelESimPage.regionalComingSoon')}</div>
          )}
          {activeTab === 'global' && !isLoading && (
            <div className="text-center py-[40px] text-[#666]">{t('travelESimPage.globalComingSoon')}</div>
          )}
        </div>
      </main>
      {viewSrc==="vj"?null: <Footer />}

    </div>
  );
}
