"use client";

import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import BssPackageSelector from '../../../components/BssPackageSelector';
import HeaderVJ from "@/app/components/HeaderVJ";
import HeaderCart from "@/app/components/HeaderCart";
import useMyEsim from "@/app/hooks/useMyEsim";
import { trackPageView, trackBeginCheckout, trackSearch } from "@/app/utils/trackingHelper";

// Placeholder Icons
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ArrowRightIcon = () => <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M8.29289 6.05559C8.68342 5.66507 9.31658 5.66507 9.70711 6.05559L15.7071 12.0556C16.0976 12.4461 16.0976 13.0793 15.7071 13.4698L9.70711 19.4698C9.31658 19.8603 8.68342 19.8603 8.29289 19.4698C7.90237 19.0793 7.90237 18.4461 8.29289 18.0556L13.5858 12.7627L8.29289 7.46981C7.90237 7.07928 7.90237 6.44612 8.29289 6.05559Z" fill="#333333"/>
</svg>;
const getCountryFlagUrl = (country) => {
  const isoCode = String(country.iso_code || country.code || '').trim().toLowerCase();
  return isoCode ? `https://flagcdn.com/w160/${isoCode}.png` : null;
};

const adaptPublicV2Package = (pkg, country) => ({
  ...pkg,
  // Keep the current card and tracking interfaces working while Public v2
  // names the purchasable identifier `package_id`.
  variant_id: pkg.package_id,
  product_id: pkg.package_id,
  provider: pkg.provider_name,
  type: pkg.package_type,
  countries_array: [{
    name: country.name,
    title: country.name,
    country_code: country.iso_code || country.code,
    image: getCountryFlagUrl(country),
  }],
});

const getRegionTypeForTab = (tab) => ({ national: 'COUNTRY', regional: 'REGION', global: 'GLOBAL' }[tab]);

const fetchAllBssPackagePages = async (packageQuery) => {
  const firstResponse = await axios.get(`/api/bss/packages?${packageQuery.toString()}`);
  if (!firstResponse.data?.success || !Array.isArray(firstResponse.data.data?.items)) {
    throw new Error(firstResponse.data?.message || 'Không thể tải danh sách gói eSIM.');
  }

  const firstPage = firstResponse.data.data;
  const totalPages = Number(firstPage.total_pages || 1);
  const remainingPages = totalPages > 1
    ? await Promise.all(Array.from({ length: totalPages - 1 }, (_, index) => {
      const pageQuery = new URLSearchParams(packageQuery);
      pageQuery.set('page', String(index + 2));
      return axios.get(`/api/bss/packages?${pageQuery.toString()}`);
    }))
    : [];

  return [
    ...firstPage.items,
    ...remainingPages.flatMap((response) => response.data?.success && Array.isArray(response.data.data?.items)
      ? response.data.data.items
      : []),
  ];
};

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
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [validityDaysOptions, setValidityDaysOptions] = useState([]);
  const searchInputRef = useRef(null);
  const popoverRef = useRef(null);

  const [ activeTab, setActiveTab ] = useState( typeParam );
  const router = useRouter();

  const tPage = useTranslations('countryEsimPage');
  const tCommon = useTranslations( 'common' );
  const tbaner = useTranslations('travelESimPage');

    const { showDevicesEsim } = useMyEsim();

  const filterPackagesBySelection = useCallback(async (dataKey, validityDays) => {
    if (!countryDetails) return [];

    const packageQuery = new URLSearchParams({
      limit: '50',
      page: '1',
      package_type: 'NEW_ESIM',
      min_validity_days: String(validityDays),
      max_validity_days: String(validityDays),
    });
    packageQuery.set('region_id', String(countryDetails.id));

    const numericData = String(dataKey).match(/^(\d+(?:\.\d+)?)-(GB|MB)$/i);
    if (numericData) {
      const [, amount, unit] = numericData;
      packageQuery.set('min_data', amount);
      packageQuery.set('max_data', amount);
      packageQuery.set('data_unit', unit.toUpperCase());
    }

    const packageItems = await fetchAllBssPackagePages(packageQuery);
    return packageItems.map((pkg) => adaptPublicV2Package(pkg, countryDetails));
  }, [countryDetails]);

  useEffect(() => {
    trackPageView({ page_title: `eSIM ${countrySlug} - Chọn gói cước` });
  }, [countrySlug]);

  useEffect(() => {
    // Update activeTab when URL query parameter changes
    setActiveTab(typeParam);
    setSearchTerm(''); // Clear search when switching tabs
    setShowFilterPopover(false); // Close popover when switching tabs
  }, [typeParam]);

  useEffect(() => {
    const regionType = getRegionTypeForTab(activeTab);
    if (!countrySlug || !regionType) {
      return;
    }

    const fetchCountryAndPackages = async () => {
      setIsLoading(true);
      setError(null);
      setCountryDetails(null);

      try {
        // 1. Fetch the selected country, region, or global destination through
        // the BFF so the Public v2 JWT remains server-only.
        const countriesResponse = await axios.get(`/api/bss/regions?type=${regionType}&channel=BSS`);

        let foundCountry = null;
        if (countriesResponse.data?.success && Array.isArray(countriesResponse.data.data)) {
          // Store all countries for search filter
          setAllCountries(countriesResponse.data.data);

          foundCountry = countriesResponse.data.data.find((country) =>
            String(country.code || country.id).toLowerCase() === countrySlug.toLowerCase(),
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

        const [dataOptionsResult, validityDaysResult] = await Promise.allSettled([
          axios.get(`/api/bss/packages/data-options?region_id=${foundCountry.id}`),
          axios.get(`/api/bss/packages/validity-days?region_id=${foundCountry.id}`),
        ]);
        const nextDataOptions =
          dataOptionsResult.status === 'fulfilled' && Array.isArray(dataOptionsResult.value.data?.data)
            ? dataOptionsResult.value.data.data
            : [];
        const nextValidityDaysOptions =
          validityDaysResult.status === 'fulfilled' && Array.isArray(validityDaysResult.value.data?.data)
            ? validityDaysResult.value.data.data
            : [];
        setDataOptions(nextDataOptions);
        setValidityDaysOptions(nextValidityDaysOptions);

      } catch (err) {
        console.error("Lỗi khi tải dữ liệu eSIM quốc gia cho slug:", countrySlug, err);
        // Use tCommon for generic error messages
        setError(err.response?.data?.message || err.message || tCommon('errorFetchingData'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryAndPackages();
  }, [countrySlug, activeTab, locale, tPage, tCommon]);

  // Filter countries based on search term for popover
  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    String(country.code || country.id).toLowerCase() !== countrySlug.toLowerCase() // Exclude current country
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
    const value = e.target.value;
    setSearchTerm(value);
    if (allCountries.length > 0) {
      setShowFilterPopover(true);
      if (value.length >= 2) {
        const results = allCountries.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
        trackSearch(value, results.length, { search_type: 'autocomplete', search_category: 'country' });
      }
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
          href={`/esim/${String(country.code || country.id).toLowerCase()}?type=${activeTab}&regions=${getRegionTypeForTab(activeTab)}&src=${viewSrc}`}
            className="block"
            onClick={() => handlePopoverItemClick(country)}
          >
            <div className="bg-white hover:bg-gray-50 transition-colors duration-200 flex flex-row items-center p-[12px] gap-[12px] border-b border-[#F1F1F1] last:border-b-0">
              {country.code && (
                <div className="w-[40px] h-[30.5px] relative flex-shrink-0">
                  <img
                    src={getCountryFlagUrl(country) || `/assets/flags/${country.code.toLowerCase()}.png`}
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

  const onBuyNowClick = (plan, quantity) => {
    trackBeginCheckout({
      cart_total: plan.selling_price * quantity,
      currency: plan.currency || 'USD',
      items: [{ product_id: plan.variant_id, product_name: plan.name, quantity, price: plan.selling_price }],
    });
    window.sessionStorage.setItem('bssCheckoutItem', JSON.stringify({
      package_id: plan.package_id,
      quantity,
      name: plan.name,
      validity_days: plan.validity_days,
      currency: plan.currency,
    }));
    router.push(`/${locale}/checkout/bss?packageId=${plan.package_id}&src=${viewSrc}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {viewSrc==="vj"?<HeaderCart/>:<Header />}

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

        ):(
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

        )}

      {/* Main Content Section */}
      <main className="w-full flex flex-col items-center">
        {/* Tabs - Using query parameters */}
        <div className="w-full bg-white border-b border-[#F1F1F1]">
          <div className="px-4 xl:container  flex justify-between md:justify-start gap-[20px] md:gap-[40px]">
            {[
              { id: 'national', labelKey: 'travelESimPage.tabNational' },
              { id: 'regional', labelKey: 'travelESimPage.tabRegional' },
              { id: 'global', labelKey: 'travelESimPage.tabGlobal' },
            ].map( tab => {
              const link = `/${locale}/travel-esim/?type=${tab.id}&src=${viewSrc}`;
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
        <div className="w-full px-4 xl:container xl:px-[90px] py-3 md:py-3 flex flex-col gap-[20px]">
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
              {regions!=='GLOBAL'&&
                  <p onClick={()=>{router.push(`/${locale}/travel-esim?type=${typeParam}&src=${viewSrc}`)}} className="text-[#333] hover:text-[#ED1B2F] cursor-pointer">
                      <ChevronLeftIcon />
                  </p>}
            <h2 className="font-inter font-semibold text-[24px] md:text-[28px] text-[#333]">
              {/* Display country name from state, fallback if still loading */}
              {isLoading ? tCommon('loading') : (countryDetails?.name || countrySlug)}
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

          {!isLoading && !error && countryDetails && (
            <BssPackageSelector
              country={countryDetails}
              dataOptions={dataOptions}
              validityDaysOptions={validityDaysOptions}
              locale={locale}
              onBuyNow={onBuyNowClick}
              onFilterPackages={filterPackagesBySelection}
            />
          )}
        </div>
      </main>
      {viewSrc==="vj"?null: <Footer />}

    </div>
  );
}
