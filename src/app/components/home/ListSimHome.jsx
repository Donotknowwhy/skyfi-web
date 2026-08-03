'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from '../../../i18n/navigation';
import SimDataService from '../../services/simDataService';
import { useUserActions } from '../../stores/user';
import { formatPhoneNumber, toCurrency } from '../../utils/format';

const SimCard = ({ sim, onSelect }) => {
  const t = useTranslations('home.listSim');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  const salePrice = sim.sale_price;
  const basePrice = sim.base_price; // Default base price if not provided

  return (
    <div
      className={`bg-white border border-[#F1F1F1] flex-1 basis-[200px] max-w-full rounded-xl p-4 h-[92px] flex flex-col justify-center gap-1 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] cursor-pointer transition-all duration-200 hover:shadow-lg relative`}
      onClick={() => onSelect(sim)}
    >
      {/* Phone Number */}
      <div className="font-semibold text-xl leading-[1.4] text-[#333333] border-b border-[#F1F1F1] pb-2 mb-2">
        {formatPhoneNumber(sim.phoneNumber || sim.msisdn)}
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-1">
        {basePrice > salePrice ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#8A8A8A] line-through">
              {toCurrency(basePrice)}
            </span>
            <span className="text-base font-medium text-[#ED1B2F]">
              {toCurrency(salePrice)}
            </span>
          </div>
        ) : (
          <span className="text-base font-medium text-[#333333]">
            {toCurrency(salePrice )}
          </span>
        )}
      </div>

      {/* Chevron Right Icon */}
      <div className="absolute top-[10px] right-4 w-6 h-6 flex items-center justify-center">
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-[#333333]"
          strokeWidth="1.5"
        >
          <path d="M1 1L5 6L1 11" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

const ListSimHome = () => {
  const t = useTranslations('home.listSim');
  const [sims, setSims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ error, setError ] = useState( null );

  const { setSimHome } = useUserActions();

  const router = useRouter();




  useEffect(() => {
    const fetchSims = async () => {
      try {
        setLoading(true);
        setError(null);


        const searchParams = {
          limit: 6, // Get 6 SIMs for display
          // Add other search parameters as needed
        };

        const data = await SimDataService.searchSim(searchParams);


        const simList = Array.isArray(data) ? data : (data.sims || data.results || []);

        // Add mock price data if not provided by API
        const simsWithPrices = simList.slice(0, 6);

        console.log('simsWithPrices', simsWithPrices);

        setSims(simsWithPrices);
      } catch (err) {
        console.error('Error fetching SIMs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSims();
  }, []);

  const handleSimSelect = (sim) => {
    setSimHome(sim); // Set the selected SIM in the user store
    router.push(`/sim-data?mssisdn=${sim.msisdn}`); // Navigate to the SIM detail page
  };

  const handleExploreSims = () => {
    router.push('/sim-data'); // Navigate to the SIMs page
  };

  if (loading) {
    return (
      <section className="w-full bg-background   py-16 md:py-20 lg:py-[120px] px-4 md:px-8 lg:px-[164px]">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAA61A] mx-auto mb-4"></div>
            <p className="text-[#333333]">{t('loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background  py-16 md:py-20 lg:py-[80px] px-4 md:px-8 lg:px-[164px]">
      <div className="container">
        <div className="flex flex-col xl:flex-row justify-center items-center gap-8 xl:gap-[67px]">
          {/* Background Image */}
          <div className="w-full  relative flex-1   ">
            <Image
              src="/assets/home/imagePackHome.png"
              alt="SIM Background"
              width={671}
              height={564}
              className="object-cover rounded-lg aspect-[671/564] w-full h-full"
            />
          </div>

          {/* Content Section */}
          <div className="w-full  flex flex-col items-center gap-10 lg:gap-[60px] flex-1">
            {/* Title */}
            <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-5xl xl:text-[68px] !leading-[1.1]  text-[#333333] mb-4">
              {t('title').split('\n').map((line, index) => (
                <span key={index} className={clsx(index === 0 ? 'text-neutral-700' : 'text-secondary')}>
                  {line}
                </span>
              ))}
            </h2>

            {/* SIM Grid */}
            <div className="w-full flex flex-wrap  items-center justify-center gap-6 lg:gap-6">
              {/* Left Column */}

                {sims.map((sim, index) => (
                  <SimCard
                    key={sim.id || index}
                    sim={sim}
                    onSelect={handleSimSelect}
                  />
                ))}

            </div>

            {/* Explore Button */}
            <button
              onClick={handleExploreSims}
              className="bg-[#FAA61A] text-white font-semibold text-base leading-[1.5] rounded-lg px-6 py-4 flex items-center justify-center gap-2 hover:bg-[#E8951A] transition-colors duration-200 w-full lg:w-auto min-w-[200px]"
            >
              <span>{t('exploreSims')}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-white"
                strokeWidth="1.5"
              >
                <path d="M1 11L11 1M11 1H1M11 1V11" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Error Message */}
            {error && (
              <div className="text-center text-red-500 text-sm">
                <p>{t('error')}: {error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListSimHome;
