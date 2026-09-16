"use client";
import axios from 'axios'; // Import axios
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Link } from '../../../i18n/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useMyEsim from '../../hooks/useMyEsim';
import HeaderCart from "@/app/components/HeaderCart";
import {trackProductListView, trackPageView, trackSearch} from "@/app/utils/trackingHelper";


const SearchIcon = () => <img src="/assets/search-icon.svg" alt="" className="h-6 w-6" />;
const ArrowRight = () => <span aria-hidden="true" className="text-[22px] leading-none">→</span>;
const getCountryFlagUrl = (country) => {
  const isoCode = String(country.iso_code || country.code || '').trim().toLowerCase();
  return isoCode ? `https://flagcdn.com/w160/${isoCode}.png` : null;
};

const ReasonIcon = ({ index }) => {
  const iconProps = { width: 42, height: 42, viewBox: '0 0 42 42', fill: 'none', 'aria-hidden': true };
  const circle = <rect x="0.5" y="0.5" width="41" height="41" rx="20.5" stroke="#D0D0D0" />;

  if (index === 0) {
    return <svg {...iconProps}>{circle}<path d="M24.2413 8.80469L12.25 23.625H19.25L17.5268 33.0985C17.5235 33.1171 17.5244 33.1362 17.5293 33.1544C17.5341 33.1726 17.543 33.1896 17.5551 33.204C17.5673 33.2185 17.5824 33.2301 17.5996 33.238C17.6167 33.246 17.6353 33.25 17.6542 33.25C17.6743 33.25 17.6941 33.2453 17.712 33.2363C17.73 33.2272 17.7456 33.2141 17.7576 33.198L29.75 18.375H22.75L24.4814 8.90039C24.4837 8.88152 24.482 8.86236 24.4764 8.8442C24.4707 8.82604 24.4613 8.80929 24.4487 8.79506C24.436 8.78083 24.4205 8.76946 24.4032 8.76169C24.3858 8.75392 24.367 8.74994 24.348 8.75C24.3271 8.75008 24.3066 8.75508 24.2881 8.76458C24.2696 8.77408 24.2535 8.78783 24.2413 8.80469Z" fill="#FAA61A" /></svg>;
  }
  if (index === 1) {
    return <svg {...iconProps}>{circle}<path fillRule="evenodd" clipRule="evenodd" d="M21 12.0001C21.11 12.0001 21.364 12.0651 21.735 12.4661C22.097 12.8561 22.479 13.4741 22.826 14.3121C23.049 14.8491 23.249 15.4571 23.419 16.1241C21.8107 15.9569 20.1893 15.9569 18.581 16.1241C18.751 15.4571 18.951 14.8491 19.174 14.3121C19.521 13.4741 19.903 12.8561 20.264 12.4651C20.636 12.0651 20.889 12.0001 21 12.0001ZM18.185 18.1851C19.1181 18.0604 20.0586 17.9986 21 18.0001C21.985 18.0001 22.93 18.0661 23.815 18.1851C23.934 19.0701 24 20.0151 24 21.0001C24 21.9851 23.934 22.9301 23.815 23.8151C22.8819 23.9397 21.9414 24.0016 21 24.0001C20.015 24.0001 19.07 23.9341 18.185 23.8151C18.0603 22.8819 17.9985 21.9415 18 21.0001C18 20.0151 18.066 19.0701 18.185 18.1851ZM16.125 23.4191C15.9578 21.8107 15.9578 20.1894 16.125 18.5811C15.457 18.7511 14.848 18.9511 14.312 19.1741C13.474 19.5211 12.856 19.9031 12.465 20.2641C12.065 20.6361 12 20.8891 12 21.0001C12 21.1111 12.065 21.3641 12.465 21.7351C12.856 22.0971 13.474 22.4791 14.312 22.8261C14.9011 23.0665 15.5077 23.2647 16.125 23.4191ZM18.581 25.8761C20.1893 26.0432 21.8107 26.0432 23.419 25.8761C23.249 26.5431 23.049 27.1521 22.826 27.6881C22.479 28.5261 22.097 29.1441 21.736 29.5351C21.364 29.9351 21.111 30.0001 21 30.0001C20.889 30.0001 20.636 29.9351 20.265 29.5351C19.903 29.1441 19.521 28.5261 19.174 27.6881C18.9336 27.0989 18.7354 26.4934 18.581 25.8761ZM25.875 23.4191C26.0422 21.8107 26.0422 20.1894 25.875 18.5811C26.4926 18.7354 27.0985 18.9336 27.688 19.1741C28.526 19.5211 29.144 19.9031 29.535 20.2641C29.935 20.6361 30 20.8891 30 21.0001C30 21.1111 29.935 21.3641 29.535 21.7351C29.144 22.0971 28.526 22.4791 27.688 22.8261C27.151 23.0491 26.542 23.2491 25.875 23.4191ZM25.547 16.4531C25.347 15.459 25.0548 14.4858 24.674 13.5461C24.307 12.6621 23.866 11.8811 23.355 11.2791C25.1401 11.7136 26.7714 12.6305 28.0705 13.9296C29.3696 15.2287 30.2865 16.86 30.721 18.6451C30.119 18.1351 29.338 17.6931 28.454 17.3261C27.5143 16.9453 26.541 16.653 25.547 16.4531ZM25.547 25.5471C25.347 26.5411 25.0548 27.5143 24.674 28.4541C24.307 29.3381 23.866 30.1191 23.355 30.7211C25.1401 30.2866 26.7714 29.3696 28.0705 28.0705C29.3696 26.7714 30.2865 25.1401 30.721 23.3551C30.119 23.8651 29.338 24.3071 28.454 24.6741C27.603 25.0271 26.622 25.3241 25.547 25.5471ZM18.645 30.7211C18.135 30.1191 17.693 29.3381 17.326 28.4541C16.9452 27.5143 16.6529 26.5411 16.453 25.5471C15.4589 25.3471 14.4857 25.0548 13.546 24.6741C12.662 24.3071 11.88 23.8661 11.279 23.3551C11.7135 25.1401 12.6304 26.7714 13.9295 28.0705C15.2286 29.3696 16.8599 30.2866 18.645 30.7211ZM16.453 16.4531C16.676 15.3781 16.973 14.3971 17.326 13.5461C17.693 12.6621 18.134 11.8811 18.645 11.2791C16.8599 11.7136 15.2286 12.6305 13.9295 13.9296C12.6304 15.2287 11.7135 16.86 11.279 18.6451C11.88 18.1351 12.662 17.6931 13.546 17.3261C14.4857 16.9453 15.4589 16.653 16.453 16.4531Z" fill="#FAA61A" /></svg>;
  }
  if (index === 2) {
    return <svg {...iconProps}>{circle}<path fillRule="evenodd" clipRule="evenodd" d="M21 12C19.4087 12 17.8826 12.6321 16.7574 13.7574C15.6321 14.8826 15 16.4087 15 18V26H10V18H13C13 15.8783 13.8429 13.8434 15.3431 12.3431C16.8434 10.8429 18.8783 10 21 10C23.1217 10 25.1566 10.8429 26.6569 12.3431C28.1571 13.8434 29 15.8783 29 18H32V26H29C29 27.3261 28.4732 28.5979 27.5355 29.5355C26.5979 30.4732 25.3261 31 24 31V32H18V28H24V29C24.7956 29 25.5587 28.6839 26.1213 28.1213C26.6839 27.5587 27 26.7956 27 26V18C27 16.4087 26.3679 14.8826 25.2426 13.7574C24.1174 12.6321 22.5913 12 21 12Z" fill="#FAA61A" /></svg>;
  }
  return <svg {...iconProps}>{circle}<path d="M12 13.628L21.0045 11L30 13.628V19.017C29.9996 21.7788 29.1304 24.4704 27.5154 26.7108C25.9004 28.9512 23.6216 30.6267 21.0015 31.5C18.3805 30.627 16.1006 28.9514 14.4851 26.7105C12.8695 24.4696 12 21.7771 12 19.0145V13.628Z" fill="#FAA61A" /><path d="M16.5 20.5L20 24L26 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
};

const pageCopy = {
  vi: {
    eyebrow: 'Kết nối muôn nơi, mua SIM giá hời',
    heroTitle: 'eSIM QUỐC TẾ -',
    heroHighlight: 'TIẾT KIỆM 80%',
    popularTitle: 'Dữ liệu nhanh nhất,',
    popularHighlight: 'Giá tốt nhất',
    popularText: 'Kết nối ngay lập tức ở hơn 200 điểm đến',
    showAll: 'Xem thêm',
    showLess: 'Thu gọn danh sách',
    howTitle: 'eSIM SkyFi hoạt động như thế nào?',
    whyTitle: 'Vì sao chọn SkyFi',
    appTitle: 'Tải ứng dụng SkyFi',
    appText: 'Quản lý eSIM, theo dõi dung lượng và kết nối mọi hành trình chỉ với vài thao tác.',
    steps: [
      ['Chọn điểm đến & thời gian sử dụng', 'Chọn quốc gia bạn đến và số ngày cần dùng eSIM. Đừng quên kiểm tra thiết bị của bạn có hỗ trợ eSIM không trước khi mua.'],
      ['Nhận eSIM ngay lập tức', 'Mã QR hoặc mã cài đặt thủ công sẽ được gửi vào email của bạn. Cài đặt nhanh chóng, chỉ cần quét mã là xong.'],
      ['Kích hoạt & tận hưởng chuyến đi', 'Cài đặt eSIM trước chuyến đi và kích hoạt dữ liệu khi bạn đến nơi để luôn giữ kết nối suôn sẻ.'],
    ],
    reasons: [
      {
        title: 'Nhanh – Tiện lợi – Chi phí hợp lý',
        points: [
          'Du lịch quốc tế bắt đầu chỉ từ 25.000 VND, tiết kiệm tới 80% so với Roaming truyền thống.',
          'Dễ dàng chọn SIM phù hợp cho nhiều thiết bị.',
          'eSIM: Nhận mã QR qua email, quét và cài đặt trong vòng 02 phút để bắt đầu sử dụng ngay lập tức.',
          'SIM vật lý: Giao hàng nhanh toàn quốc, tương thích với tất cả các thiết bị.',
        ],
      },
      {
        title: 'Kết nối toàn cầu, ổn định mọi nơi',
        points: [
          'Dữ liệu nhanh nhất.',
          'Hạ tầng mạng hàng đầu thế giới đảm bảo kết nối ổn định mọi lúc, mọi nơi.',
          'Gói cước linh hoạt và đa dạng đáp ứng mọi nhu cầu du lịch của bạn.',
        ],
      },
      {
        title: 'Hỗ trợ khách hàng 24/7',
        points: [
          'Đội ngũ Chăm sóc Khách hàng của chúng tôi luôn sẵn sàng 24/7 trong suốt hành trình của bạn.',
          'Hỗ trợ qua nhiều kênh như Hotline, Zalo OA và WhatsApp.',
        ],
      },
      {
        title: 'Chính sách ưu tiên khách hàng',
        points: [
          'Hoàn tiền 100% nếu sản phẩm bị lỗi.',
          'Cam kết mang lại sự an tâm tuyệt đối và trải nghiệm dịch vụ minh bạch, tin cậy.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'STAY CONNECTED ANYWHERE',
    heroTitle: 'INTERNATIONAL eSIM',
    heroHighlight: 'SAVE UP TO 80%',
    popularTitle: 'Fastest data,',
    popularHighlight: 'Best price',
    popularText: 'Choose where you are travelling to and explore suitable eSIM plans.',
    showAll: 'View more',
    showLess: 'Show fewer destinations',
    howTitle: 'How does SkyFi eSIM work?',
    whyTitle: 'Why choose SkyFi',
    appTitle: 'Download the SkyFi app',
    appText: 'Manage eSIMs, track data, and stay connected throughout every journey.',
    steps: [
      ['Choose a destination', 'Find your destination and select a suitable data plan.'],
      ['Receive your eSIM', 'Your eSIM QR code is sent straight to your email after payment.'],
      ['Connect instantly', 'Scan the QR code, turn on mobile data, and begin your trip.'],
    ],
    reasons: [
      { title: 'Fast, convenient, and fairly priced', points: ['Buy and activate eSIM plans in minutes.'] },
      { title: 'Global, reliable connectivity', points: ['Stay connected across destinations worldwide.'] },
      { title: '24/7 customer support', points: ['Our support team is ready to help throughout your journey.'] },
      { title: 'Customer-first policy', points: ['Transparent service and reliable support.'] },
    ],
  },
};

export default function TravelESimPage() {
  const locale = useLocale();
  const t = useTranslations('travelESimPage');
  const tPage = useTranslations('countryEsimPage');
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'national'; // Default to 'national' if no query param
  const viewSrc = searchParams.get( 'src' ) || 'skyfi';
  const [activeTab, setActiveTab] = useState(typeParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [ isLoadingData, setIsLoadingData ] = useState( false );
  const [ regions, searchRegions ] = useState( '' );
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [countryPrices, setCountryPrices] = useState({});
  const [isShowingAllDestinations, setIsShowingAllDestinations] = useState(false);
  const searchInputRef = useRef(null);
  const popoverRef = useRef(null);
  const { showDevicesEsim } = useMyEsim();
  const copy = pageCopy[locale];
  const showFigmaMarketing = viewSrc !== 'vj' && Boolean(copy);

  useEffect(() => {
    // Update activeTab when URL query parameter changes and clear search
    setActiveTab(typeParam);
    setSearchTerm(''); // Clear search when switching tabs
    setShowFilterPopover(false); // Close popover when switching tabs
    setIsShowingAllDestinations(false);
  }, [typeParam]);

  useEffect(() => {
    const apiTypeByTab = { national: 'COUNTRY', regional: 'REGION', global: 'GLOBAL' };
    const apiType = apiTypeByTab[activeTab];
    if (!apiType) {
      setFetchedData([]);
      return;
    }
    searchRegions( apiType );
    const fetchDataForTab = async () => {
      setIsLoadingData(true);
      try {
        // All destination tabs use Public v2 through the BFF so the JWT never
        // reaches the browser. The BFF forwards the required channel=BSS.
        const apiUrl = `/api/bss/regions?type=${apiType}&channel=BSS`;
        const response = await axios.get(apiUrl);
        const publicV2Regions = Array.isArray(response.data?.data)
          ? response.data.data
          : response.data?.data?.items;
        const regionItems = publicV2Regions;

        if (response.data?.success && Array.isArray(regionItems)) {
          setFetchedData(regionItems);
          trackProductListView({
            item_list_name: `Travel eSIM - ${apiType}`,
            item_count: regionItems.length,
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

  useEffect(() => {
    if (!showFigmaMarketing || activeTab !== 'national' || fetchedData.length === 0) {
      setCountryPrices({});
      return;
    }

    let isCurrent = true;
    const featuredCountries = fetchedData.slice(0, 12);

    const fetchFeaturedPrices = async () => {
      const pricesFromPublicV2 = featuredCountries
        .map((country) => {
          const price = Number(country.min_price);
          if (!Number.isFinite(price)) return null;

          return [country.id, `${price.toLocaleString('vi-VN')}đ`];
        })
        .filter(Boolean);

      // `min_price` is returned with Public v2 regions. Prefer it so the
      // country list remains entirely on the new API contract.
      if (pricesFromPublicV2.length === featuredCountries.length) {
        if (isCurrent) setCountryPrices(Object.fromEntries(pricesFromPublicV2));
        return;
      }

      const prices = await Promise.all(featuredCountries.map(async (country) => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/v2/get-esim-package-by-region/${country.id}`,
          );
          const packages = response.data?.code === 200 && Array.isArray(response.data.result)
            ? response.data.result
            : [];
          const lowestPackage = packages.reduce((lowest, item) => {
            const price = Number(item.selling_price);
            return Number.isFinite(price) && (!lowest || price < Number(lowest.selling_price))
              ? item
              : lowest;
          }, null);

          if (!lowestPackage) return [country.id, null];

          const price = Number(lowestPackage.selling_price);
          const currency = String(lowestPackage.currency || 'VND').toUpperCase();
          const label = currency === 'VND'
            ? `${price.toLocaleString('vi-VN')}đ`
            : new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
          return [country.id, label];
        } catch {
          return [country.id, null];
        }
      }));

      if (isCurrent) {
        setCountryPrices(Object.fromEntries(prices.filter(([, price]) => price)));
      }
    };

    fetchFeaturedPrices();
    return () => {
      isCurrent = false;
    };
  }, [activeTab, fetchedData, locale, showFigmaMarketing]);

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
            href={`/esim/${(item.code || item.id).toString().toLowerCase()}?type=${activeTab}&regions=${type}&src=${viewSrc}`}
            className="block"
            onClick={() => handlePopoverItemClick(item)}
          >
            <div className="bg-white hover:bg-gray-50 transition-colors duration-200 flex flex-row items-center p-[12px] gap-[12px] border-b border-[#F1F1F1] last:border-b-0">
              {type === 'COUNTRY' && item.code && (
                <div className="w-[40px] h-[30.5px] relative flex-shrink-0">
                  <img
                    src={getCountryFlagUrl(item) || `/assets/flags/${item.code.toLowerCase()}.png`}
                    alt={ item.name }
                    className="rounded-[4px] border object-cover border-[#F1F1F1] w-full h-full"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
              <span className="font-inter font-semibold text-[16px] text-[#333] flex-1 min-w-0 line-clamp-1">
                {item.name}
              </span>
              <span className="text-[#A1A1A1]" aria-hidden="true"><ArrowRight /></span>
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

    if (showFigmaMarketing && type === 'COUNTRY') {
      return (
        <div className="grid grid-cols-1 justify-items-center gap-4 min-[620px]:grid-cols-2 lg:grid-cols-3 xl:justify-items-start min-[1920px]:grid-cols-4">
          {items.map(item => (
            <Link
              key={item.id}
              href={`/esim/${(item.code || item.id).toString().toLowerCase()}?type=${activeTab}&regions=${type}&src=${viewSrc}`}
              className="group flex w-[286px]"
            >
              <article className="h-[102px] w-[286px] overflow-hidden bg-white rounded-[22px] border border-[#d6d6d6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[#ed1b2f]/30 group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.09)] flex items-stretch">
                {item.code && (
                  <div className="w-[32%] shrink-0 overflow-hidden bg-[#f7f7f7]">
                    <img
                      src={getCountryFlagUrl(item) || `/assets/flags/${item.code.toLowerCase()}.png`}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div className="min-w-0 flex flex-1 flex-col justify-center px-5 py-3">
                  <h3 className="font-inter font-bold text-[16px] leading-tight text-[#333] line-clamp-1 md:text-[18px]">{item.name}</h3>
                  {countryPrices[item.id] && (
                    <p className="mt-1 font-inter text-[16px] font-semibold leading-tight text-[#333] md:text-[18px]">
                      Từ: <span className="text-[#ed1b2f]">{countryPrices[item.id]}</span>
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {items.map(item => (
          <Link key={item.id} href={`/esim/${(item.code || item.id).toString().toLowerCase()}?type=${activeTab}&regions=${type}&src=${viewSrc}`} className="group flex min-w-0">
            <div className="w-full bg-white rounded-xl border border-[#f0f0f0] shadow-[0_4px_14px_rgba(0,0,0,0.06)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-all duration-200 flex flex-row items-center p-3 gap-3">
              {type === 'COUNTRY' && item.code && (
                <div className="w-[40px] h-[30.5px] relative flex-shrink-0">
                  <img
                    src={getCountryFlagUrl(item) || `/assets/flags/${item.code.toLowerCase()}.png`}
                    alt={ item.name }
                    layout="fill"
                    className="rounded-[4px] border object-cover border-[#F1F1F1] w-full h-full"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
              <span className="font-inter font-semibold text-[15px] md:text-[16px] text-[#333] flex-1 min-w-0 line-clamp-1">
                {item.name}
              </span>
              <span className="text-[#a1a1a1] group-hover:text-[#ed1b2f] transition-colors" aria-hidden="true"><ArrowRight /></span>
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
    currentDataType = 'REGION';
  } else if (activeTab === 'global') {
    currentTitleKey = 'globalTitle'; // Assuming 'globalTitle' key
    currentDataType = 'GLOBAL';
  }

  const tabs = [
    { id: 'national', label: locale === 'vi' && showFigmaMarketing ? 'Danh sách quốc gia' : t('tabNational') },
    { id: 'regional', label: locale === 'vi' && showFigmaMarketing ? 'Khu vực' : t('tabRegional') },
    { id: 'global', label: locale === 'vi' && showFigmaMarketing ? 'Toàn cầu' : t('tabGlobal') },
  ];

  const tabHref = (tabId) => `/travel-esim?type=${tabId}&src=${viewSrc}`;

  const testimonials = [
    { name: 'Trâm Anh Lê', initials: 'TA', quote: 'Mình đã tin tưởng sử dụng eSIM của Gohub trong đợt đi Úc vừa qua. Tốc độ truy cập Internet cứ phải gọi là rất ổn định luôn. Các bạn nhân viên bên này cũng dễ thương lắm, tư vấn cực kỳ nhiệt tình luôn. 10 điểm luôn á' },
    { name: 'Lê Thanh', initials: 'LT', quote: 'Mình đã tin tưởng sử dụng eSIM của Gohub trong đợt đi Úc vừa qua. Tốc độ truy cập Internet cứ phải gọi là rất ổn định luôn. Các bạn nhân viên bên này cũng dễ thương lắm, tư vấn cực kỳ nhiệt tình luôn. 10 điểm luôn á' },
    { name: 'Nguyễn Thị Mai', initials: 'NM', quote: 'Mình đã tin tưởng sử dụng eSIM của Gohub trong đợt đi Úc vừa qua. Tốc độ truy cập Internet cứ phải gọi là rất ổn định luôn. Các bạn nhân viên bên này cũng dễ thương lắm, tư vấn cực kỳ nhiệt tình luôn. 10 điểm luôn á' },
    { name: 'William', initials: 'W', quote: 'Mình đã tin tưởng sử dụng eSIM của Gohub trong đợt đi Úc vừa qua. Tốc độ truy cập Internet cứ phải gọi là rất ổn định luôn. Các bạn nhân viên bên này cũng dễ thương lắm, tư vấn cực kỳ nhiệt tình luôn. 10 điểm luôn á' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
            <section className="relative z-20 min-h-[330px] md:min-h-[370px] flex items-center overflow-visible bg-[#311f35]"
                 style={{backgroundImage: 'linear-gradient(90deg, rgba(12, 17, 39, .55), rgba(237, 27, 47, .08)), url(/assets/travel-esim-banner.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="relative z-10 container w-full py-12 md:py-16">
                    <div className="max-w-[740px] mx-auto text-center flex flex-col items-center">
                      {showFigmaMarketing ? <>
                      <p className="mb-4 rounded-[40px] border-2 border-[#FFFFFF3D] px-5 py-2 font-inter text-[20px] font-medium leading-tight text-white">{copy.eyebrow}</p>
                      <h1 className="font-inter text-[36px] font-bold uppercase leading-[1.05] tracking-tight text-white">
                        {copy.heroTitle} <span className="text-white">{copy.heroHighlight}</span>
                      </h1>
                      </> : <h1 className="font-inter font-bold text-white text-[30px] sm:text-[40px] md:text-[52px] leading-[1.1]">{t('bannerTitle')}</h1>}
                      <div className="relative w-full max-w-[680px] mt-7 text-left">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <img src="/assets/search-icon.svg" alt="" className="h-5 w-5" />
                        </div>
                        <input
                            ref={searchInputRef}
                            type="search"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            onFocus={handleSearchInputFocus}
                            className="w-full bg-white border border-white/40 rounded-xl text-[16px] outline-none placeholder:text-[#8a8a8a] py-4 md:py-5 pr-12 pl-14 shadow-[0_12px_32px_rgba(0,0,0,.22)] focus:ring-2 focus:ring-[#ffd44d] focus:border-transparent"
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
                </div>
            </section>

        )}

      {/* Main Content Section */}
      <main className="relative z-0 flex flex-col">
        {/* Tabs */}
        {!showFigmaMarketing && <div className="w-full bg-white border-b border-[#F1F1F1] shadow-sm">
          <div className="px-4 xl:container flex justify-center md:justify-start gap-5 md:gap-10">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                href={tabHref(tab.id)}
                className={`py-[16px] md:py-[20px] font-inter text-sm sm:text-[16px] md:text-[18px] border-b-2 hover:text-[#ED1B2F]
                  ${activeTab === tab.id
                    ? 'border-[#ED1B2F] text-[#ED1B2F] font-semibold'
                    : 'border-transparent text-[#A1A1A1] font-medium'}
                `}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>}

        {/* Notice and Country Grid */}
        <section className="bg-[#f7f7f7] py-10 md:py-16">
        <div className="px-4 xl:container">
          <div className="max-w-[760px] mb-8 md:mb-10">
            <h2 className="font-inter font-bold text-[36px] leading-tight text-[#333]">
              {showFigmaMarketing ? <>{copy.popularTitle} <span className="text-[#ED1B2F]">{copy.popularHighlight}</span></> : t('bannerTitle')}
            </h2>
            {showFigmaMarketing && <p className="mt-3 text-[16px] text-[#666]">{copy.popularText}</p>}
            {showFigmaMarketing && (
              <nav aria-label="Loại eSIM" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#ddd] p-[6px]">
                {tabs.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <Link
                      key={tab.id}
                      href={tabHref(tab.id)}
                      className={`h-10 rounded-[14px] px-4 py-[10px] font-inter text-sm font-semibold leading-5 transition-colors ${
                        isActive
                          ? 'bg-[#faa61a] text-white shadow-[inset_-3px_2px_3.2px_rgba(0,0,0,0.25)]'
                          : 'bg-white text-[#d0d0d0] hover:text-[#666]'
                      }`}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
          {!showFigmaMarketing && <p className="font-inter text-[13px] md:text-[14px] text-[#555] mb-5">
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
          </p>}

          {currentTitleKey && (
            <>
              {!showFigmaMarketing && <h3 className="font-inter font-semibold text-[19px] md:text-[22px] text-[#333] mb-4">
                {t(currentTitleKey)}
              </h3>}
              {renderGridItems(
                showFigmaMarketing && !isShowingAllDestinations ? fetchedData.slice(0, 12) : fetchedData,
                currentDataType,
              )}
              {showFigmaMarketing && !isLoadingData && fetchedData.length > 12 && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsShowingAllDestinations((current) => !current)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-inter text-[16px] font-bold leading-none text-[#333] transition-opacity hover:opacity-70"
                    aria-expanded={isShowingAllDestinations}
                  >
                    {isShowingAllDestinations ? copy.showLess : copy.showAll}
                    <span
                      aria-hidden="true"
                      className={`h-0 w-0 border-x-[6px] border-x-transparent ${isShowingAllDestinations ? 'border-b-[7px] border-b-[#333]' : 'border-t-[7px] border-t-[#333]'}`}
                    />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        </section>

        {showFigmaMarketing && <>
        <section className="bg-white py-12 md:py-20">
          <div className="container">
            <h2 className="font-inter text-left text-[36px] font-bold leading-tight text-[#333]">
              {locale === 'vi' ? <>eSIM SkyFi <span className="text-[#ED1B2F]">hoạt động như thế nào?</span></> : copy.howTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 mt-9 md:mt-12">
              {copy.steps.map(([title, description], index) => (
                <article key={title} className="rounded-2xl border border-[#ededed] p-6 md:p-7 shadow-[0_5px_18px_rgba(0,0,0,.05)]">
                  <img
                    src={`/assets/images/active_img_${index + 1}.png`}
                    alt={title}
                    className="w-full rounded-xl object-cover"
                  />
                  <h3 className="mt-5 text-[#333] font-semibold text-xl">{title}</h3>
                  <p className="mt-2 text-[#666] text-[15px] leading-6">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f7] py-12 md:py-20">
          <div className="container">
            <h2 className="font-inter text-left text-[36px] font-bold leading-tight text-[#333]">
              {locale === 'vi' ? <>Vì sao chọn <span className="text-[#ED1B2F]">SkyFi</span></> : copy.whyTitle}
            </h2>
            <div className="mt-9 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-8">
              {copy.reasons.map((reason, index) => (
                <article key={reason.title} className="min-h-[280px] rounded-[36px] border border-white bg-white p-7 shadow-[0_4px_16px_rgba(0,0,0,.04)] md:p-9">
                  <div className="flex items-center gap-5">
                    <ReasonIcon index={index} />
                    <h3 className="text-[#333] font-inter text-[22px] font-bold leading-tight md:text-[28px]">{reason.title}</h3>
                  </div>
                  <ul className="mt-5 list-disc space-y-1 pl-5 text-[16px] leading-6 text-[#555] md:text-[18px] md:leading-7">
                    {reason.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white py-10 md:py-16">
          <div className="mx-auto w-full max-w-[1240px]">
            <img
              src="/assets/images/people_bg.png"
              alt="Khách hàng SkyFi kết nối trong mọi hành trình"
              className="h-auto w-full"
            />
          </div>
          <div className="container mt-12 md:mt-16">
            <div className="text-center">
              <h2 className="font-inter text-[32px] font-bold leading-tight text-[#111] md:text-[48px]">
                1000++ khách hàng toàn cầu<br />
                <span className="text-[#ED1B2F]">đã tin dùng SkyFI từ 2024</span>
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name}>
                  <div className="relative rounded-[40px] bg-[#fff1ed] px-7 py-10 text-[16px] leading-[1.25] text-[#222] after:absolute after:bottom-[-10px] after:left-12 after:h-5 after:w-5 after:rotate-45 after:bg-[#fff1ed]">
                    {testimonial.quote}
                  </div>
                  <div className="relative mt-7 flex items-center gap-4 px-7">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffd8cf] font-inter text-lg font-bold text-[#ED1B2F]">
                      {testimonial.initials}
                    </span>
                    <div className="leading-tight text-[#111]">
                      <p className="font-inter text-[16px] font-bold">{testimonial.name}</p>
                      <p className="mt-1 text-[16px]">Khách hàng SkyFi</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-20">
          <div className="container">
            <img
              src="/assets/images/download_bg.png"
              alt="Tải ứng dụng SkyFi"
              className="h-auto w-full"
            />
          </div>
        </section>
        </>}
      </main>
      {viewSrc==="vj"?null:<Footer />}
    </div>
  );
}
