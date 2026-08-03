"use client";

import { useRouter } from '@/i18n/navigation';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ESimPackageCard from '../components/ESimPackageCard';

// Icons
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#0C0C0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function HDBankCountryEsimPage() {
  const t = useTranslations('hdbank.travelEsim.detailPage');
  const tCommon = useTranslations('hdbank.travelEsim');
  const params = useParams();
  const { countrySlug } = params;
  const router = useRouter();
  const searchParams = useSearchParams();


  const [countryDetails, setCountryDetails] = useState(null);
  const [esimPackages, setEsimPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBuyPackage = (packageData, quantity) => {
    console.log('Buying package:', packageData, 'Quantity:', quantity);
    // Add your purchase logic here
    // e.g., router.push(`/vikki-app/checkout?packageId=${packageData.id}&quantity=${quantity}`);
  };

  useEffect(() => {
    if (!countrySlug) return;

    const fetchCountryAndPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
  
        const regionType = searchParams.get('regions') || 'COUNTRY'; 
        const countriesApiUrlDynamic = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/get-regions-by-type/v2/${regionType}`;

        const countriesResponse = await axios.get(countriesApiUrlDynamic);

        let foundCountry = null;
        if (countriesResponse.data && countriesResponse.data.code === 200 && Array.isArray(countriesResponse.data.result)) {
          foundCountry = countriesResponse.data.result.find(
            (item) => item.code && item.code.toLowerCase() === countrySlug.toLowerCase()
          );
        } else {
           // Fallback or specific error handling
           console.warn("Could not fetch region list properly");
        }

        if (!foundCountry) {
           // Try fetching ALL or just fail
           throw new Error(`Không tìm thấy thông tin cho mã: ${countrySlug}`);
        }
        setCountryDetails(foundCountry);

        const packagesApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/v2/get-esim-package-by-region/${foundCountry.id}`;
        const packagesResponse = await axios.get(packagesApiUrl);

        if (packagesResponse.data && packagesResponse.data.code === 200 && Array.isArray(packagesResponse.data.result)) {
          setEsimPackages(packagesResponse.data.result);
        } else {
          setEsimPackages([]);
        }

      } catch (err) {
        console.error("Error fetching country eSIM data:", err);
        setError(err.message || "Đã có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryAndPackages();
  }, [countrySlug, searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] font-inter text-[#0C0C0E]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="h-11 flex items-center justify-between px-4 relative">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <BackIcon />
          </button>
          <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[16px] font-semibold truncate max-w-[200px]">
            {isLoading ? tCommon('loading') : countryDetails?.name || 'Gói cước eSIM'}
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        {isLoading && (
            <div className="text-center py-10 text-gray-500 text-sm">{t('loading')}</div>
        )}

        {error && (
            <div className="text-center py-10 text-red-500 text-sm">{error}</div>
        )}

        {!isLoading && !error && countryDetails && (
            <>
              

                {/* Packages Grid */}
                {esimPackages.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {esimPackages.map((pkg) => (
                            <ESimPackageCard
                                key={pkg.id}
                                packageData={pkg}
                                countryName={countryDetails.name}
                                onBuy={handleBuyPackage}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 text-sm">
                        {t('noPackage', {country: countryDetails.name})}
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}
