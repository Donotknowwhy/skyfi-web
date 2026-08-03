"use client";

import { useLocale, useTranslations } from 'next-intl';


import useMyEsim from '@/app/hooks/useMyEsim';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from '../../../i18n/navigation';
import CheckoutService from '../../services/checkoutService';
import TravelSimService from '../../services/travelsim';
import { useLoad } from '../../utils/load';
import { showModalMess } from '../modals/modalMess';
import { showModalVerify } from '../modals/travelSim';
import { showModalRegions } from '../modals/travelSim/modalRegions';
import OrderSummary from './OrderSummary';
import SimItem from './SimItem';
import SkeletonLoader from './SkeletonLoader';

const convertSubtitle = (subtitle) => {
	return subtitle.split('\n').map((line, index) => (
		<span key={index} className="block">
			{line.split('#').map((part, i) => (
				<span key={i} className={i== 1 ? 'text-primary underline cursor-pointer ' : ''} onClick={showModalRegions}>
					{part}
				</span>
			))}
		</span>
	));
};

export default function TravelSimItemPage({ code ,phone }) {
	const [simQuantity, setSimQuantity] = useState(1);
	const [buyDataForAll, setBuyDataForAll] = useState(false);
	const [simItems, setSimItems] = useState([]);
	const [individualQuantities, setIndividualQuantities] = useState({});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const t = useTranslations('travelSim.travelSimItemPage');
	const tErrors = useTranslations('travelSim.errors');
	const tSimItem = useTranslations('travelSim.simItem');
	const [isReceived, setIsReceived] = useState(1);
	const [agreed, setAgreed] = useState(false);
	const [isSkyBoss, setIsSkyBoss] = useState(1);

	const { showDevicesEsim } = useMyEsim();
	const locale = useLocale();
	const router = useRouter();
	const load = useLoad();


	useEffect(() => {
		const fetchSimItems = async () => {
			try {
				setLoading(true);
				setError(null);

				if (code) {
					const msisdnData =  phone ? await TravelSimService.getMsisdnByPhone(phone) : await TravelSimService.getMsisdnByCode(code, { source: 'skyboss', locale });

					if (msisdnData) {
						const transformedItems = msisdnData.data.map((item, index) => ({
							id: item.id || index + 1,
							title: item.msisdn,
							subtitle: locale === 'vi' ? 'Gói cước VJ70' : 'Package VJ70',
							initialQuantity: 1,
							minQuantity: 0,
							maxQuantity: 1,
							showFreeTag: true,
							freeTagText: tSimItem('free'),
							msisdnData: item // Keep original data for reference
						}));
						setSimItems(transformedItems);

						const initialQuantities = {};
						transformedItems.forEach(item => {
							initialQuantities[item.id] = 1;
						});
						setIndividualQuantities(initialQuantities);
						setIsReceived(msisdnData.received_sim || 0);
						setIsSkyBoss(msisdnData.is_skyboss || 0);
					}
				}
			} catch (err) {
				console.error('Error fetching SIM items:', err);
				setError(err.message);

			} finally {
				setLoading(false);
			}
		};

		fetchSimItems();
	}, [code, tSimItem]);

	// Fallback SIM items data


	const handleQuantityChange = (itemId, newQuantity) => {
		if (buyDataForAll) {
			// When buyDataForAll is true, update all quantities to be the same
			setSimQuantity(newQuantity);
			const updatedQuantities = {};
			simItems.forEach(item => {
				updatedQuantities[item.id] = newQuantity;
			});
			setIndividualQuantities(updatedQuantities);
		} else {
			// When buyDataForAll is false, update only the specific item
			setIndividualQuantities(prev => ({
				...prev,
				[itemId]: newQuantity
			}));
		}
	};

	const handleToggleBuyDataForAll = () => {
		const newBuyDataForAll = !buyDataForAll;
		setBuyDataForAll(newBuyDataForAll);

		if (newBuyDataForAll) {
			// When enabling buyDataForAll, set all quantities to the current simQuantity
			const updatedQuantities = {};
			simItems.forEach(item => {
				updatedQuantities[item.id] = simQuantity;
			});
			setIndividualQuantities(updatedQuantities);
		}
	};

	// Calculate total quantity
	const calculateTotalQuantity = () => {
		if (buyDataForAll) {
			return simQuantity * simItems.length;
		} else {
			return Object.values(individualQuantities).reduce((sum, qty) => sum + qty, 0);
		}
	};


	const comfirmOrder = () => {
		const isHasValidQuantity = simItems.every(item => {
			const quantity = individualQuantities[item.id];
			return quantity == 0;
		});

		if (simItems.length === 0) {
			showModalMess({
				label: tErrors('title'),
				message: tErrors('notPhone'),
				type: 'warning',
			});
			return;
		}

		if (isHasValidQuantity) {
			showModalMess({
				label: tErrors('title'),
				message: tErrors('notQuantity'),
				type: 'warning',
			});
			return;
		}
		showModalVerify({
			onContinue: createOrder
		})
	}


	const createOrder = async () => {
		try {
			load.open();

			// Prepare order items from msisdnData and quantities
			const orderItems = simItems.map((item) => {
				const quantity = individualQuantities[item.id];
				const msisdnData = item.msisdnData;

				return {
					msisdn_id: msisdnData?.msisdn_id,
					quantity: quantity,
					sim_id: msisdnData?.sim_id,
					package_code: 'VJ70', // Default or from msisdnData
					pack_price: 70000 // Default price, should be from package data
				};
			}).filter(item => item.quantity > 0); // Filter out items with zero quantity

			// Prepare order data
			const orderData = {
				code: code,
				items: orderItems
			};

			// Call the service to create order
			const result = await TravelSimService.createOrder(orderData);

			const paymentParams = {
				orderNumber: result,
				orderDescription: result,
				paymentMethod: 'GALAXYPAY',
				locale: locale,
				sourceType: ""
			};
			const paymentLink = await CheckoutService.getlinkPayment(paymentParams);
			if (!paymentLink.redirectUrl) {
				throw new Error('Payment link not found');
			}
			router.push(paymentLink.redirectUrl);


		} catch (error) {
			showModalMess({
				label: tErrors('title'),
				message: error.message || 'Đã xảy ra lỗi khi tạo đơn hàng',
				type: 'error',
			});

			setError(error.message);
			throw error;
		} finally {
			load.close();
		}
	};

	if (loading) {
		return (
			<SkeletonLoader />
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 py-4 md:py-8">
				<div className="container mx-auto px-4">
					<div className="max-w-[1165px] mx-auto">
						<div className="flex items-center justify-center h-64">
							<div className="text-center">
								<div className="text-lg text-red-600 mb-2">{tErrors('title')}</div>
								<div className="text-sm text-gray-600">{error}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-4 md:py-8">
			<div className="container mx-auto px-4">
				<div className="max-w-[1165px] mx-auto">
					{/* Main Card Container */}
					<div className="rounded-lg shadow-sm  md:p-6 flex flex-col gap-6 md:gap-9">

						<div className="flex flex-col gap-4 md:gap-6">


							{/* Package Title */}
							<div className="flex items-center gap-2">
								<div className="md:hidden w-[54px] h-[54px] bg-[#E4262B] rounded-xl flex items-center justify-center relative overflow-hidden">
									<Image src="/images/simdata/iconsim.png" alt="icon" width={54} height={54} className="object-cover w-full h-full" />
								</div>
								<h2 className="text-  sm:text-2xl md:text-[28px] font-semibold text-[#333333] leading-[1.29] text-center sm:text-left">
									{t('singleSimUI.packageTitle')}
								</h2>
							</div>

							{/* Package Description */}
							<div className="flex items-start gap-2">
								<div className="hidden md:block text-sm sm:text-base md: font-medium text-[#090909] leading-5 sm:leading-6">
									{convertSubtitle(t('singleSimUI.packageDescription'))}
								</div>
								<div className="md:hidden text-sm sm:text-base md: font-medium text-[#090909] leading-5 sm:leading-6">
									{convertSubtitle(t('singleSimUI.packageDescriptionMobile'))}
								</div>
							</div>
						</div>




						{/* Products Section */}
						<div className="flex flex-col gap-2">
							{/* Products Header */}
							<div className="flex flex-col gap-2">
								{/* Headers Row - Hidden on mobile */}
								<div className="hidden md:flex items-center  gap-3">
									<div className="w-full flex-1">
										<h3 className="text-base font-semibold text-[#333333] leading-6">
											{t('productHeader')}
										</h3>
									</div>
									<div className="w-full flex-1">
										<h3 className="text-base font-semibold text-[#333333] leading-6">
											{t('dataPackageHeader')}
										</h3>
									</div>
									<div className="flex-1">
										<h3 className="text-base font-semibold text-[#333333] leading-6">
											{t('priceHeader')}
										</h3>
									</div>
								</div>

								{/* Toggle Section */}
								{/* { isReceived != 1 && <div className="bg-white p-3 rounded-lg border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
									<div className="flex items-center">
										<span className="text-sm md:text-base font-normal text-[#333333] leading-6">
											{t('buyDataForAllSims')}
										</span>
									</div>
									<div className="flex items-center">
										<button
											onClick={handleToggleBuyDataForAll}
											disabled={agreed}
											className={`
												relative w-10 h-6 rounded-full transition-colors duration-200 ease-in-out
												${buyDataForAll ? 'bg-[#FAA61A]' : 'bg-[#EBEBEB]'}
												${agreed ? 'opacity-50 cursor-not-allowed' : ''}
											`}
										>
											<div
												className={`
													absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out
													${buyDataForAll ? 'translate-x-4' : 'translate-x-0'}
												`}
											/>
										</button>
									</div>
								</div>} */}
							</div>
							<div className='md:hidden block'>
								<div className='font-semibold'>{t('listPhones')}</div>
								<div className='flex items-center justify-between mb-4 font-semibold mt-4'>
									<span className='flex-1'>{t('phoneTitle')}</span>
									<span className='flex-1 text-end '>{t('quantityLabel')}</span>

								</div>
							</div>


							{/* SIM Items List */}
							<div className="flex flex-col gap-2">
								{simItems.map((item) => (
									<div key={item.id} className="border-b border-gray-100 last:border-b-0">
										<SimItem
											title={item.title}
											subtitle={item.subtitle}
											initialQuantity={buyDataForAll ? simQuantity : (individualQuantities[item.id] || 1)}
											showFreeTag={item.showFreeTag}
											freeTagText={item.freeTagText}
											minQuantity={item.minQuantity}
											maxQuantity={item.maxQuantity}
											onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
											className="py-2"
										/>
									</div>
								))}
							</div>
						</div>

						{/* Quantity Summary */}
						<div className=" justify-start hidden md:flex">
							<h3 className="text-base md:text-lg font-semibold text-[#333333] leading-[1.33]">
								{t('quantitySummary', { quantity: calculateTotalQuantity() })}
							</h3>
						</div>

						{/* eSIM Notice */}
						<div className="hidden md:flex gap-2 justify-center">
							<div className="text-xs font-normal text-[#5C5C5C] leading-[1.5] text-center px-4">
								{t('esimNotice')}
								<br />
								<button className="underline cursor-pointer text-primary hover:text-[#333333] transition-colors" onClick={showDevicesEsim}>
									{t('deviceListLink')}
								</button>
							</div>
						</div>

						{/* Action Button */}
						<OrderSummary
							packageCode={'VJ70'}
							quantity={calculateTotalQuantity()}
							unitPrice={70_000}

							onGoBack={() => console.log('Go back')}
							onProceedToPayment={comfirmOrder}
						/>
					</div>
				</div>
			</div>
		</div>

	);
}
