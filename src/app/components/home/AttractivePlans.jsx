"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import homeService from '../../services/homeService';
import { toCurrency } from '../../utils/format';

export default function AttractivePlans() {
  const locale = useLocale();
  const t = useTranslations('home.plans');
  const [packageHome, setPackageHome] = useState([]);

  const getPackageHome = async () => {
    try {
      const res = await homeService.getPackageHome();
      console.log('data', res);

      if (res && res.data && res.data.length > 0) {
        setPackageHome(res.data);
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message || 'Failed to fetch package data' };
    }
  };

  useEffect(() => {
    getPackageHome();
  }, []);

  const getCycle = (cycle) => {
    switch (cycle) {
      case 'M':
        return t('pricePerMonth');
      case 'D':
        return t('pricePerDay');
      default:
        return t('pricePerMonth');
    }
  };

  // Mock data to match Figma design structure
  const mockPlans = [
    {
      name: "DATA NAME",
      dataPerDay: "2GB",
      features: [
        "Data tốc độ cao: 2GB/ngày",
        "Hết data tốc độ cao dừng truy cập",
        "Gói cước tự động gia hạn"
      ],
      price: 69000,
      salePrice: 69000,
      cycle: "M",
      hasDiscount: false
    },
    {
      name: "DATA NAME",
      dataPerDay: "10GB",
      features: [
        "Data tốc độ cao: 2GB/ngày",
        "Hết data tốc độ cao dừng truy cập",
        "Gói cước tự động gia hạn"
      ],
      price: 100000,
      salePrice: 50000,
      cycle: "M",
      hasDiscount: true,
      discountPercent: 30
    },
    {
      name: "DATA NAME",
      dataPerDay: "2GB",
      features: [
        "Data tốc độ cao: 2GB/ngày",
        "Hết data tốc độ cao dừng truy cập",
        "Gói cước tự động gia hạn"
      ],
      price: 69000,
      salePrice: 69000,
      cycle: "M",
      hasDiscount: false
    },
    {
      name: "DATA NAME",
      dataPerDay: "2GB",
      features: [
        "Data tốc độ cao: 2GB/ngày",
        "Hết data tốc độ cao dừng truy cập",
        "Gói cước tự động gia hạn"
      ],
      price: 69000,
      salePrice: 69000,
      cycle: "M",
      hasDiscount: false
    }
  ];

  // Use API data if available, otherwise use mock data
  const plansData = packageHome.length > 0 ? packageHome : mockPlans;  return (
    <section className="w-full flex justify-center py-10 md:py-20">
      <div className="container">
        {/* Title */}
        <h2 className="font-inter font-bold text-2xl sm:text-3xl flex-1  md:text-4xl xl:text-[36px] leading-[1.3] text-[#FAA61A]   text-center xl:text-left">
          {t('title')}
        </h2>

        {/* Plans Grid */}
        <div className="flex flex-wrap gap-4 sm:gap-6  xl:w-auto">
          {plansData.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-[12px] flex-1 basis-[300px] max-w-[350px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] flex flex-col items-center h-auto min-h-[280px] xl:h-[296px] w-full  mx-auto "
            >
              {/* Discount Badge */}
              {item.hasDiscount && (
                <div className="absolute -top-[18px] right-[12px] w-[40px] h-[40px] flex items-center justify-center z-10">
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/icons/attractive-plans/sale-badge-bg.svg"
                      alt="sale badge"
                      width={40}
                      height={40}
                      className="absolute inset-0"
                    />
                    <Image
                      src="/assets/icons/attractive-plans/sale-badge-icon.svg"
                      alt="sale icon"
                      width={33}
                      height={33}
                      className="absolute top-[3.33px] left-[3.33px]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-koho font-bold text-[8px] sm:text-[10px] leading-[1.2] text-white">
                      {item.discountPercent}%
                    </span>
                  </div>
                </div>
              )}

              {/* Top Content */}
              <div className="flex flex-col gap-2 sm:gap-[10px] px-2 sm:px-3 pt-2 sm:pt-3 pb-0 flex-1 w-full">
                <div className="bg-[#F5F5F5] rounded-[8px] flex flex-col items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-3">
                  {/* Package Name */}
                  <div className="flex flex-row items-center gap-2 border-b border-[#DDD] pb-2 w-full">
                    {/* Signal Icon - 4 rectangles */}
                    <div className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0">
                      <div className="relative w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]">
                        <div className="absolute w-[4px] h-[4px] sm:w-[5.33px] sm:h-[5.33px] bg-[#ED1B2F] left-0 top-[4px] sm:top-[5.33px]"></div>
                        <div className="absolute w-[4px] h-[4px] sm:w-[5.33px] sm:h-[5.33px] bg-[#ED1B2F] left-[4px] sm:left-[5.33px] top-[8px] sm:top-[10.67px]"></div>
                        <div className="absolute w-[4px] h-[4px] sm:w-[5.33px] sm:h-[5.33px] bg-[#ED1B2F] left-[4px] sm:left-[5.33px] top-0"></div>
                        <div className="absolute w-[4px] h-[4px] sm:w-[5.33px] sm:h-[5.33px] bg-[#ED1B2F] left-[8px] sm:left-[10.67px] top-[4px] sm:top-[5.33px]"></div>
                      </div>
                    </div>
                    <span className="font-inter font-semibold text-sm sm:text-[16px] leading-[1.5] text-[#333333] truncate">
                      {item.name || "DATA NAME"}
                    </span>
                  </div>

                  {/* Data Amount */}
                  <div className="font-inter font-semibold text-lg sm:text-xl md:text-[24px] leading-[1.33] text-[#333333] w-full text-left">
                    {item.dataPerDay || item.data_per_day}GB/ngày
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-0 w-full">
                    {(item.features || item.description || []).map((feature, i) => (
                      <div key={i} className="flex flex-row items-start gap-1 sm:gap-2 mb-1">
                        <Image
                          src="/assets/icons/attractive-plans/check-icon.svg"
                          alt="check"
                          width={14}
                          height={14}
                          className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5"
                        />
                        <span className="font-inter text-xs sm:text-sm md:text-[16px] leading-[1.4] sm:leading-[1.5] text-[#333333] break-words">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 sm:py-4 w-full mt-auto">
                {/* Price */}
                <div className="flex flex-col flex-1 text-center sm:text-left">
                  {item.hasDiscount && item.price > item.salePrice ? (
                    <>
                      <div className="flex flex-row items-center justify-center sm:justify-start gap-1">
                        <span className="font-inter font-medium text-sm sm:text-[16px] text-[#ED1B2F]">
                          {toCurrency(item.salePrice)}
                        </span>
                        <span className="font-inter text-xs sm:text-[14px] text-[#8A8A8A]">
                          {getCycle(item.cycle)}
                        </span>
                      </div>
                      <span className="font-inter font-medium text-xs sm:text-[14px] text-[#8A8A8A] line-through">
                        {toCurrency(item.price)}
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-row items-center justify-center sm:justify-start gap-1">
                      <span className="font-inter font-medium text-sm sm:text-[16px] text-[#333333]">
                        {toCurrency(item.salePrice || item.price)}
                      </span>
                      <span className="font-inter text-xs sm:text-[14px] text-[#8A8A8A]">
                        {getCycle(item.cycle)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Register Button */}
                <button className="bg-[#FAA61A] rounded-[8px] px-3 sm:px-4 py-2 font-inter font-semibold text-xs sm:text-[14px] leading-[1.43] text-white hover:bg-[#E69818] transition-colors w-full sm:w-auto min-w-[80px]">
                  {t('register')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
