"use client";

import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link'; // For back button
import {useParams, useSearchParams} from 'next/navigation'; // Corrected: useRouter from next/navigation
import { useEffect, useState } from 'react';
import { dailySuffix } from '@/app/utils/format';
import Footer from '../../../components/Footer'; // Adjusted path
import Header from '../../../components/Header'; // Adjusted path

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 19L8 12L15 5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export default function CountryEsimPage() {
  const params = useParams();
  const { countrySlug } = params;
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations('countryEsimPage'); // Assuming a new translation namespace
  const tCommon = useTranslations('common'); // For common terms like "Loading", "Error"
  const viewSrc = searchParams.get( 'src' ) || 'skyfi';
  const [countryDetails, setCountryDetails] = useState(null);
  const [esimPackages, setEsimPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countrySlug) return;

    const fetchCountryAndPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Fetch all countries to find the ID
        const countriesApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/get-regions-by-type/v2/COUNTRY`;
        const countriesResponse = await axios.get(countriesApiUrl);

        let foundCountry = null;
        if (countriesResponse.data && countriesResponse.data.code === 200 && Array.isArray(countriesResponse.data.result)) {
          foundCountry = countriesResponse.data.result.find(
            (country) => country.code && country.code.toLowerCase() === countrySlug.toLowerCase()
          );
        } else {
          throw new Error(countriesResponse.data.message || 'Failed to fetch country list or invalid format');
        }
        console.log('foundCountry',foundCountry);

        if (!foundCountry) {
          throw new Error(t('countryNotFound', { slug: countrySlug }));
        }
        setCountryDetails(foundCountry);

        // 2. Fetch eSIM packages for the found country ID
        const packagesApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/v2/get-esim-package-by-region/${foundCountry.id}`;
        const packagesResponse = await axios.get(packagesApiUrl);

        if (packagesResponse.data && packagesResponse.data.code === 200 && Array.isArray(packagesResponse.data.result)) {
          setEsimPackages(packagesResponse.data.result);
        } else if (packagesResponse.data && packagesResponse.data.code !== 200) {
           throw new Error(packagesResponse.data.message || `Error fetching packages: ${packagesResponse.data.code}`);
        }
        else {
          console.warn('No packages found or unexpected package API response structure:', packagesResponse.data);
          setEsimPackages([]); // Set to empty if no packages or error
        }

      } catch (err) {
        console.error("Error fetching country eSIM data:", err);
        setError(err.message || tCommon('errorFetchingData'));
        setCountryDetails(null); // Clear country details on error
        setEsimPackages([]); // Clear packages on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryAndPackages();
  }, [countrySlug, locale, t, tCommon]); // Added t and tCommon as dependencies

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      <main className="w-full flex flex-col items-center py-[20px] md:py-[40px]">
        <div className="w-full max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
          <div className="mb-[20px]">
            <Link href={`/${locale}/travel-esim?src=${viewSrc}`} className="flex items-center text-sm text-[#333] hover:text-[#ED1B2F] font-medium">
              <ArrowLeftIcon />
              <span className="ml-2">{t('backToEsimList')}</span>
            </Link>
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
            <>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center">
                {countryDetails.code && (
                  <div className="w-[60px] h-[42px] relative flex-shrink-0 mr-4">
                    <Image
                      src={`/assets/flags/${countryDetails.code.toLowerCase()}.png`}
                      alt={countryDetails.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[4px] border border-[#F1F1F1]"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
                <h1 className="font-inter font-semibold text-[28px] md:text-[32px] text-[#333]">
                  {countryDetails.name} {t('esimPackagesTitle')}
                </h1>
              </div>

              {esimPackages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px]">
                  {esimPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] hover:shadow-lg transition-shadow duration-300 ease-in-out p-6 flex flex-col justify-between"
                    >
                      <div>
                        <h2 className="font-inter font-semibold text-[20px] text-[#333] mb-2">
                          {pkg.name}
                        </h2>
                        <p className="text-[24px] font-bold text-[#ED1B2F] mb-1">
                          {new Intl.NumberFormat(locale, { style: 'currency', currency: pkg.currency || 'USD' }).format(pkg.selling_price)}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                           {pkg.currency || 'USD'}
                        </p>

                        <div className="border-t border-gray-200 my-4"></div>

                        <div className="space-y-2 text-[15px] text-[#4F4F4F]">
                          <div className="flex justify-between">
                            <span>{t('dataAllowance')}:</span>
                            <span className="font-medium">{pkg.data_amount} {pkg.data_unit}{dailySuffix(pkg, tCommon('perDay'))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('validity')}:</span>
                            <span className="font-medium">{pkg.validity_days} {t('days')}</span>
                          </div>
                           {pkg.region_name && ( // Display region name if available
                            <div className="flex justify-between">
                              <span>{t('region')}:</span>
                              <span className="font-medium">{pkg.region_name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="mt-6 w-full bg-primary hover:bg-[#E0910A] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                        {t('buyNowButton')}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-[40px] text-[18px] text-[#666] bg-gray-100 p-4 rounded-md">
                  {t('noPackagesFound', { countryName: countryDetails.name })}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
