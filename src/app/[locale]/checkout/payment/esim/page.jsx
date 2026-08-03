"use client";

import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import { showModalMess } from '../../../../components/modals/modalMess';
import MyESimService from '../../../../services/myEsimService';
import { useLoad } from '../../../../utils/load';
import { getLocal, removeLocal } from '../../../../utils/saveLocal';

export default function PaymentESimPage() {
	const router = useRouter();
	const t = useTranslations( 'checkout' );
	const tCommon = useTranslations( 'common' );

	// Form states
	const [ paymentMethod, setPaymentMethod ] = useState( 'international' );
	const [ agreedToTerms, setAgreedToTerms ] = useState( false );
	const [ discountCode, setDiscountCode ] = useState( '' );
	const loader = useLoad();

	const orderData = getLocal( 'orderData' );

	//   // Mock data for demonstration
	//   const orderData = {
	//     email: 'linhnt.galaxy@gmail.com',
	//     name: 'Linh Nguyen',
	//     products: [
	//       {
	//         id: 1,
	//         name: 'Gói dung lượng 3',
	//         quantity: 1,
	//         price: '199.000 VND',
	//         image: '/figma-section-images/esim-product-icon.png'
	//       }
	//     ],
	//     subtotal: '199.000 VND',
	//     taxAndFees: 'Đã bao gồm',
	//     total: '199.000 VND',
	//     totalProducts: 3
	//   };



	const handleBackClick = () => {
		router.back();
	};

	// useEffect( () => {
	// 	return () => {
			// removeLocal( 'orderData' );
		// }
	// }, [ orderData, router ] );

	const handleCompleteOrder = async () => {

		if ( !agreedToTerms ) {
			return;
		}
		try {
			loader.open();
			const link = await MyESimService.getLinkPayment( orderData.orderNumber );
			if ( link ) {
				router.push( link );
				return;
			}
			showModalMess( {
				label: 'Thông báo',
				message: 'Có lỗi xảy ra trong quá trình thêm gói dữ liệu',
				type: 'error',
			} );
		} catch ( error ) {
			showModalMess( {
				label: 'Thông báo',
				message: 'Có lỗi xảy ra trong quá trình thêm gói dữ liệu',
				type: 'error',
			} );
		} finally {
			loader.close();


		}

	};

	if ( !orderData ) {
		return (
			<div className="bg-[#F5F5F5] font-koho">
				<Header />
				<div className="bg-gray-100 min-h-screen py-10 px-4 md:px-0">
					<div className="max-w-4xl mx-auto">
						<div className="space-y-6">
							<h1 className="text-lg font-semibold text-[#333]">{ t( 'noSims' ) }</h1>

							<div className="flex flex-col items-center gap-5 py-20 px-40 w-full bg-[#F5F5F5]">
								<div className="relative w-[100px] h-[100px]">
									<Image
										src="/images/my-esim/empty-esim.png"
										alt="Empty eSIM"
										fill
										className="object-contain"
										priority
									/>
								</div>

								<div className="flex flex-col items-center gap-3 w-[361px]">
									<h2 className="text-lg font-semibold text-[#333333] text-center">
										{ t( 'noSimsTitle' ) }
									</h2>

									<p className="text-sm text-[#5C5C5C] text-center">
										{ t( 'noSimsDescription' ) }
									</p>

									<button
										onClick={ () => router.push( '/travel-esim' ) }
										className="w-full py-4 px-6 bg-[#E69818] text-white font-semibold text-lg rounded-lg"
									>
										{ t( 'buyButton' ) }
									</button>
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white min-h-screen flex flex-col">
			<Header />

			<main className="flex-1 bg-white">
				{/* Page Header */ }
				<div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
					<div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
						<button
							onClick={ handleBackClick }
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
						</button>
						<h1 className="font-inter font-semibold text-[20px] md:text-[24px] lg:text-[28px] leading-[1.286] text-[#333]">
							{ t( 'title' ) }
						</h1>
					</div>
				</div>

				{/* Main Content */ }
				<div className="container mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-20">
					<div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
						{/* Left Column - Form */ }
						<div className="flex-1 order-2 lg:order-1">
							{/* Contact Information Section */ }
							<div className="mb-6">
								<div className="mb-3">
									<h2 className="font-inter font-semibold text-[20px] leading-[1.4] text-[#333] mb-3">
										{ t( 'contactInfo.title' ) }
									</h2>
									<p className="font-inter text-[16px] leading-[1.5] text-[#333] mb-4">
										{ t( 'contactInfo.description' ) }
									</p>
								</div>

								<div className="space-y-4">
									{/* Email Field - Disabled */ }
									<div className="flex flex-col gap-1">
										<label className="flex font-inter text-[12px] text-[#A1A1A1]">
											{ t( 'contactInfo.email' ) } <span className="text-[#A1A1A1]">*</span>
										</label>
										<div className="relative">
											<input
												type="email"
												value={ orderData.email }
												disabled
												className="w-full font-inter text-[14px] md:text-[16px] text-[#A1A1A1] p-[8px_12px] md:p-[8px_16px] bg-[#EBEBEB] border border-transparent rounded-[12px] cursor-not-allowed"
											/>

										</div>
									</div>

									{/* Name Field - Disabled */ }
									<div className="flex flex-col gap-1">
										<label className="flex font-inter text-[12px] text-[#A1A1A1]">
											{ t( 'contactInfo.fullName' ) }
										</label>
										<div className="relative">
											<input
												type="text"
												value={ orderData.name }
												className="w-full font-inter text-[14px] md:text-[16px]  p-[8px_12px] md:p-[8px_16px]  border rounded-[12px] "
											/>

										</div>
									</div>
								</div>
							</div>

							{/* Payment Method Section */ }
							<div className="mb-6">
								<h2 className="font-inter font-semibold text-[18px] md:text-[20px] leading-[1.4] text-[#333] mb-3">
									{ t( 'paymentMethod.title' ) }
								</h2>

								<div className="space-y-2">
									{/* International Payment Card */ }
									<label className={ `flex  items-start sm:items-center gap-3 p-3 rounded-lg cursor-pointer border ${ paymentMethod === 'international'
										? 'bg-[#FFF6E8] border-[#FAA61A]'
										: 'border-[#DDDDDD]'
										}` }>
										<div className="relative w-6 h-6 flex-shrink-0">
											<input
												type="radio"
												name="paymentMethod"
												value="international"
												checked={ paymentMethod === 'international' }
												onChange={ ( e ) => setPaymentMethod( e.target.value ) }
												className="absolute opacity-0 w-full h-full cursor-pointer"
											/>
											<div className={ `w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${ paymentMethod === 'international'
												? 'border-[#FAA61A]'
												: 'border-[#A1A1A1]'
												}` }>
												{ paymentMethod === 'international' && (
													<div className="w-3 h-3 bg-[#FAA61A] rounded-full"></div>
												) }
											</div>
										</div>
										<div className="flex  sm:items-center gap-2 sm:gap-3">
											<Image
												src="/figma-section-images/payment-international-card.png"
												width={ 80 }
												height={ 23 }
												alt="International Payment Cards"
												className="w-auto h-6"
											/>
											<span className="font-inter font-medium text-[14px] md:text-[16px] text-[#333]">
												{ t( 'paymentMethod.international' ) }
											</span>
										</div>
									</label>

									{/* Domestic Payment Card */ }
									{/* <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${
                    paymentMethod === 'domestic'
                      ? 'bg-[#FFF6E8] border-[#FAA61A]'
                      : 'border-[#DDDDDD]'
                  }`}>
                    <div className="relative w-6 h-6">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="domestic"
                        checked={paymentMethod === 'domestic'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                      />
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${
                        paymentMethod === 'domestic'
                          ? 'border-[#FAA61A]'
                          : 'border-[#A1A1A1]'
                      }`}>
                        {paymentMethod === 'domestic' && (
                          <div className="w-3 h-3 bg-[#FAA61A] rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <Image
                      src="/figma-section-images/payment-domestic-card.png"
                      width={80}
                      height={26}
                      alt="Domestic Payment Cards"
                    />
                    <span className="font-inter font-medium text-[16px] text-[#333]">
                      {t('paymentMethod.domestic')}
                    </span>
                  </label> */}
								</div>
							</div>

							{/* Terms Agreement */ }
							<div className="mb-6">
								<label className="flex items-start gap-3 cursor-pointer">
									<div className="relative mt-1 flex-shrink-0">
										<input
											type="checkbox"
											checked={ agreedToTerms }
											onChange={ ( e ) => setAgreedToTerms( e.target.checked ) }
											className="absolute opacity-0 w-full h-full cursor-pointer"
										/>
										<div className={ `w-5 h-5 rounded border-[1.5px] flex items-center justify-center ${ agreedToTerms
											? 'bg-[#FAA61A] border-[#FAA61A]'
											: 'border-[#A1A1A1] bg-white'
											}` }>
											{ agreedToTerms && (
												<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M5 13l4 4L19 7" />
												</svg>
											) }
										</div>
									</div>
									<span className="font-inter text-[14px] md:text-[16px] leading-[1.5] text-[#333]">
										{ t( 'terms' ) }
									</span>
								</label>
							</div>

							{/* Complete Order Button */ }
							<button
								onClick={ handleCompleteOrder }
								disabled={ !agreedToTerms }
								className={ `w-full py-3 px-6 rounded-lg font-inter font-semibold text-[14px] md:text-[16px] transition-colors ${ agreedToTerms
									? 'bg-[#FAA61A] text-white hover:bg-[#e69618]'
									: 'bg-gray-300 text-gray-500 cursor-not-allowed'
									}` }
							>
								{ t( 'completeOrder' ) }
							</button>
						</div>

						{/* Right Column - Order Summary */ }
						<div className="w-full lg:w-[440px] space-y-6 order-1 lg:order-2">
							{/* Order Summary */ }
							<div>
								<h3 className="font-inter font-semibold text-[14px] md:text-[16px] leading-[1.5] text-[#333] mb-2">
									{ t( 'orderSummary.title' ) }
								</h3>

								<div className="space-y-2">
									{/* Products Count and Subtotal */ }
									<div className="flex justify-between items-center py-2">
										<span className="font-inter text-[12px] md:text-[14px] text-[#333]">
											{ orderData.totalProducts } { t( 'orderSummary.productsCount' ) }
										</span>
										<span className="font-inter font-medium text-[14px] md:text-[16px] text-[#333]">
											{ orderData.subtotal }
										</span>
									</div>

									{/* Tax and Fees */ }
									<div className="flex justify-between items-center py-2 border-b border-[#DDDDDD]">
										<span className="font-inter text-[12px] md:text-[14px] text-[#333]">
											{ t( 'orderSummary.taxAndFees' ) }
										</span>
										<span className="font-inter font-medium text-[14px] md:text-[16px] text-[#333]">
											{ orderData.taxAndFees }
										</span>
									</div>

									{/* Total */ }
									<div className="flex justify-between items-center py-2">
										<span className="font-inter font-semibold text-[12px] md:text-[14px] text-[#333]">
											{ t( 'orderSummary.total' ) }
										</span>
										<span className="font-inter font-semibold text-[16px] md:text-[18px] text-[#333]">
											{ orderData.total }
										</span>
									</div>
								</div>
							</div>

							{/* Discount Code */ }
							{/*<div className="relative">*/}
							{/*	<div className="absolute left-4 top-1/2 transform -translate-y-1/2">*/}
							{/*		<svg className="w-4 h-4 md:w-5 md:h-5 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
							{/*			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 1.5 } d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />*/}
							{/*		</svg>*/}
							{/*	</div>*/}
							{/*	<input*/}
							{/*		type="text"*/}
							{/*		value={ discountCode }*/}
							{/*		onChange={ ( e ) => setDiscountCode( e.target.value ) }*/}
							{/*		placeholder={ t( 'discountCode' ) }*/}
							{/*		className="w-full font-koho text-[14px] md:text-[16px] text-[#A1A1A1] pl-10 md:pl-12 pr-4 py-3 border border-[#F1F1F1] rounded-[12px] focus:outline-none focus:border-primary"*/}
							{/*	/>*/}
							{/*</div>*/}

							{/* Products */ }
							<div>
								<h3 className="font-inter font-semibold text-[14px] md:text-[16px] leading-[1.5] text-[#333] mb-2">
									{ t( 'orderSummary.products' ) }
								</h3>

								{ orderData.products.map( ( product ) => (
									<div key={ product.id } className="flex items-center gap-3 py-2">
										<div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#DDDDDD] flex items-center justify-center overflow-hidden flex-shrink-0">
											<Image
												src={ product.image }
												width={ 40 }
												height={ 40 }
												alt="Product"
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h4 className="font-inter font-semibold text-[14px] md:text-[16px] text-[#333] truncate">
												{ product.name }
											</h4>
											<p className="font-inter text-[12px] md:text-[16px] text-[#333]">
												{ t( 'orderSummary.quantity' ) }: { product.quantity }
											</p>
										</div>
										<span className="font-inter font-medium text-[12px] md:text-[16px] text-[#333] flex-shrink-0">
											{ product.price }
										</span>
									</div>
								) ) }
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
