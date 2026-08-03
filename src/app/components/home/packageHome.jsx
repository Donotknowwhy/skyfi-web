"use client";

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { usePackage } from '../../hooks/usePackage';
import homeService from '../../services/homeService';
import { toCurrency } from '../../utils/format';

export default function PackageHome() {
	const locale = useLocale();
	const t = useTranslations( 'home.plans' );
	const packageT = useTranslations( 'home.packageHome' );
	const [ packageHome, setPackageHome ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	  const { openCheckPackageModal, openPackDetailModal } = usePackage();

	const getPackageHome = async () => {
		try {
			setLoading( true );
			const res = await homeService.getPackageHome();
			console.log( 'package home data', res );

			if ( res && res.data && res.data.length > 0 ) {
				setPackageHome( res.data );
			}
		} catch ( error ) {
			console.error( 'Error fetching package home data:', error );
		} finally {
			setLoading( false );
		}
	};

	useEffect( () => {
		getPackageHome();
	}, [] );

	const listImage = [
		"/assets/home/model1.png",
		"/assets/home/model2.png",
		"/assets/home/model3.png",
	]
	// Mock data to match Figma design


	// Slider settings
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,

		arrows: false,
		dotsClass: "slick-dots package-home-dots !justify-center",
		customPaging: function( i ) {
			return (
				<div className="w-3 h-3 rounded-full bg-gray-400 hover:bg-red-600 transition-colors duration-300"></div>
			);
		}
	};

	if ( loading ) {
		return (
			<section className="w-full flex justify-center py-10 md:py-20">
				<div className="container">
					<div className="flex justify-center items-center h-96">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED1B2F]"></div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="w-full flex justify-center py-10 md:py-20 ">
			<div className="container lg:max-w-[1160px]">
				<div className="package-home-slider">
					<Slider { ...sliderSettings }>
						{ packageHome.map( ( packageItem, index ) => (
							<div key={ packageItem.id || index } className="p-4 flex  w-full  ">
								<div className="relative bg-white lg:h-[440px] gap-8 flex flex-col md:flex-row  rounded-[12px]   lg:items-end   ">
									<div className="   flex flex-1 flex-col order-2 md:order-1 h-full ">

										<div className="font-inter font-bold text-2xl sm:text-3xl md:text-5xl xl:text-[68px] !leading-[1.1]  text-[#333333] mb-4">
											 {packageT('hotTitle')} <span className='text-secondary'>{packageT('hotHighlight')}</span>
										</div>


										<h3 className="text-[#ED1B2F] text-3xl lg:text-5xl mt-10 font-bold uppercase ">
											{ packageItem.name  }
										</h3>
										<p className="text-black opacity-80 text-base mb-4">
											{packageT('validityDescription', { days: packageItem.validity_day })}
										</p>

										{/* Data and Price Info */ }
										<div className="flex flex-col mt-auto gap-6 mb-8">
											{/* Data Info */ }
											<div className="flex items-start gap-4">
												<div className="bg-[#ED1B2F] rounded-lg flex items-center justify-center w-16 h-16 flex-shrink-0">
													<Image src="/assets/home/iconData.png" alt={packageT('dataIcon')} width={56} height={56} className="w-14 h-14 object-contain" />
												</div>
												<div >
													<p className="text-black opacity-80 text-sm mb-1">
														 {packageT('dataLabel')}
													</p>
													<p className="text-black opacity-80 lg:text-2xl font-bold">
														{packageItem.data_per_day}{packageT('dataUnit')}
													</p>
												</div>
											</div>

											{/* Price Info */ }
											<div className="flex items-start gap-4">
												<div className="bg-[#ED1B2F] rounded-lg flex items-center justify-center  flex-shrink-0 w-16 h-16 ">
													<Image src="/assets/home/iconPrice.png" alt={packageT('priceIcon')} width={56} height={56} className="w-16 h-16 object-contain " />
												</div>
												<div>
													<p className="text-black opacity-80 text-sm mb-1">
														{packageT('priceLabel')}
													</p>
													<p className="text-black opacity-80 lg:text-2xl font-bold">
														{ toCurrency( packageItem.sale_price ) }/ { packageItem.validity_day}{packageT('dayUnit')}
													</p>
												</div>
											</div>
										</div>

										{/* Action Buttons */ }
										<div className="flex gap-4 ">
											<button
												onClick={() => openPackDetailModal(packageItem, true)}
												className="bg-white border border-primary text-primary px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
												{packageT('detailButton')}
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M7 17L17 7M17 7H7M17 7V17" stroke="#FAA61A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>
											<button onClick={() => openCheckPackageModal(packageItem)}
  												className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#E69818] transition-colors">
												{packageT('buyNowButton')}
											</button>
										</div>
									</div>
									<div className={clsx(" flex  w-full md:w-1/3 order-1 md:order-2 justify-end  min-h-[300px]  relative h-full	rounded-[40px] rounded-tr-[90px] overflow-hidden", index % 2 === 0 ? "bg-secondary" : "bg-primary")}>
										<Image src={listImage[index % listImage.length]} alt={`${packageT('packageImage')} ${packageItem.name}`} className="aspect-square absolute bottom-0 right-0  object-contain " width={ 300 } height={ 300 } />
									</div>
								</div>
							</div>
						) ) }
					</Slider>
				</div>
			</div>


		</section>
	);
}
