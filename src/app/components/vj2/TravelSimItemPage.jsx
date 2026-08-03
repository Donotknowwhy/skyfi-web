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
import SkeletonLoader from "@/app/components/travelsim/SkeletonLoader";
import OrderSummary from "@/app/components/travelsim/OrderSummary";
import SimItem from "@/app/components/travelsim/SimItem";
import { toCurrency } from '../../utils/format';

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

export default function TravelSimItemPage({ code, validationData = null }) {
	const [simQuantity, setSimQuantity] = useState(1);
	const [buyDataForAll, setBuyDataForAll] = useState(false);
	const [simItems, setSimItems] = useState([]);
	const [individualQuantities, setIndividualQuantities] = useState({});
	const [availablePackages, setAvailablePackages] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const t = useTranslations('travelSim.travelSimItemPage');
	const tErrors = useTranslations('travelSim.errors');
	const tSuccess = useTranslations('travelSim.success');
	const tSimItem = useTranslations('travelSim.simItem');
	const tPackages = useTranslations('travelSim.packages');
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

				// Fetch available packages
				if (code) {
					try {
						const packagesData = await TravelSimService.getPackageByCode(code, { source: 'skyboss', locale });
						if (packagesData && packagesData.length > 0) {
							setAvailablePackages(packagesData);
						}
					} catch (packageError) {
						console.warn('Could not fetch packages:', packageError);
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
	}, [code, validationData, tSimItem, locale]);

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

	// Check if any SIM has additional packages available for purchase
	const hasItemsWithAdditionalPackages = () => {
		return simItems.some(item => item.hasAdditionalPackage);
	};

	// Calculate total price based on additional packages
	const calculateTotalPrice = () => {
		let totalPrice = 0;
		simItems.forEach(item => {
			const quantity = individualQuantities[item.id] || 0;
			if (item.hasAdditionalPackage && quantity > 0) {
				// For items with additional packages, each additional purchase costs 70000
				totalPrice += 70000 * quantity;
			}
		});
		return totalPrice;
	};

	const confirmOrder = () => {
		// Check if there are any items with quantities > 0
		const hasValidQuantity = simItems.some(item => {
			const quantity = individualQuantities[item.id] || 0;
			return quantity > 0;
		});

		if (simItems.length === 0) {
			showModalMess({
				label: tErrors('title'),
				message: tErrors('notPhone'),
				type: 'warning',
			});
			return;
		}

		if (!hasValidQuantity) {
			showModalMess({
				label: tErrors('title'),
				message: tErrors('notQuantity'),
				type: 'warning',
			});
			return;
		}

		showModalVerify({
            hideTitle:true,
			onContinue: createOrder
		});
	}

	const createOrder = async () => {
		try {
			load.open();

			// Prepare order items from msisdnData and quantities
			const orderItems = simItems.map((item) => {
				const quantity = individualQuantities[item.id] || 0;
				const msisdnData = item.msisdnData;

				return {
					msisdn_id: msisdnData?.msisdn_id || msisdnData?.id,
					quantity: quantity,
					sim_id: msisdnData?.sim_id || msisdnData?.id,
					package_code: item.hasAdditionalPackage ? 'VJ70' : 'SM8', // Additional purchases use VJ70
					pack_price: item.hasAdditionalPackage ? 70000 : 0 // Additional packages have cost
				};
			}).filter(item => item.quantity > 0); // Filter out items with zero quantity

			// Prepare order data
			const orderData = {
				code: code,
				items: orderItems
			};

			// Call the service to create order
			const result = await TravelSimService.createOrder(orderData);

			// Check if total price is 0 (all free items)
			const totalPrice = calculateTotalPrice();
			if (totalPrice === 0) {
				// Show success message for free items
				showModalMess({
					label: tSuccess('title'),
					message: tSuccess('simInfoSentToEmail'),
					type: 'success',
				});
				return;
			}

			// For paid items, proceed to payment
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
				message: error.message || tErrors('createOrderError'),
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
					<div className="rounded-lg shadow-sm md:p-6 flex flex-col gap-6 md:gap-9">

						<div className="flex flex-col gap-4 md:gap-6">

							{/* Package Title */}
							<div className="flex items-center gap-2">
								<div className="md:hidden w-[54px] h-[54px] bg-[#E4262B] rounded-xl flex items-center justify-center relative overflow-hidden">
									<Image src="/images/simdata/iconsim.png" alt="icon" width={54} height={54} className="object-cover w-full h-full" />
								</div>
								<h2 className="text-sm:text-2xl md:text-[28px] font-semibold text-[#333333] leading-[1.29] text-center sm:text-left">
									{t('simListTitle')}
								</h2>
							</div>

							{/* Package Description */}
							<div className="flex items-start gap-2">
								<div className="text-sm sm:text-base font-medium text-[#090909] leading-5 sm:leading-6">
									{hasItemsWithAdditionalPackages() ?
										t('descriptionWithAdditional') :
										t('descriptionWithFreePackage')
									}
								</div>
							</div>
						</div>

						{/* Products Section */}
						<div className="flex flex-col gap-2">
							{/* Products Header */}
							<div className="flex flex-col gap-2">
								{/* Headers Row - Hidden on mobile */}
								<div className="hidden md:flex items-center gap-3">
									<div className="w-full flex-1">
										<h3 className="text-base font-semibold text-[#333333] leading-6">
											{t('headers.phoneNumber')}
										</h3>
									</div>
									<div className="w-full flex-1">
										<h3 className="text-base font-semibold text-[#333333] leading-6">
											{t('headers.package')}
										</h3>
									</div>
									<div className="flex-1">
										<h3 className="text-base font-semibold text-[#333333] leading-6">
											{hasItemsWithAdditionalPackages() ? t('headers.buyMore') : t('headers.quantity')}
										</h3>
									</div>
									<div className="flex-1">
										<h3 className="text-base font-semibold text-[#333333] leading-6">
											{t('headers.price')}
										</h3>
									</div>
								</div>
							</div>
							<div className='md:hidden block'>
								<div className='font-semibold'>{t('simListMobile')}</div>
								<div className='flex items-center justify-between mb-4 font-semibold mt-4'>
									<span className='flex-1'>{t('headers.phoneNumber')}</span>
									<span className='flex-1 text-end'>{hasItemsWithAdditionalPackages() ? t('headers.buyMore') : t('headers.gift')}</span>
								</div>
							</div>

							{/* SIM Items List */}
							<div className="flex flex-col gap-2">
								{simItems.map((item) => (
									<div key={item.id} className="border-b border-gray-100 last:border-b-0">
										<div className="flex flex-row items-start md:items-center gap-3 md:gap-3 py-2">
											{/* Mobile: SIM Icon and Product Info Row */}
											<div className="flex items-center gap-3 w-full md:flex-1">
												{/* SIM Icon Container */}
												<div className="hidden md:block flex-shrink-0">
													<div className="w-[54px] h-[54px] bg-[#E4262B] rounded-xl flex items-center justify-center relative overflow-hidden">
														<Image src="/images/simdata/iconsim.png" alt="icon" width={54} height={54} className="object-cover w-full h-full" />
													</div>
												</div>

												{/* Product Info Section */}
												<div className="flex-1 md:max-w-[400px]">
													<div className="text-sm md:text-base font-semibold md:font-normal text-[#333333] leading-6">
														{item.title}
													</div>
													<div className="hidden md:block text-sm md:text-base font-normal text-[#333333] leading-6">
														{item.subtitle}
													</div>
												</div>
											</div>

											{/* Package Info Section (Desktop) */}
											<div className="hidden md:flex flex-1 items-center">
												<div className="text-sm md:text-base text-[#333333]">
													{item.hasAdditionalPackage ? (
														<span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
															{item.packageInfo?.name || tPackages('purchasedPackage')}
														</span>
													) : (
														<span className="inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">
															{tPackages('sm8Package')}
														</span>
													)}
												</div>
											</div>

											{/* Quantity and Price Section */}
											<div className="flex-1 flex items-center justify-between md:flex-1 gap-4">
												{/* Quantity Selector */}
												<SimItem
													title=""
													subtitle=""
													initialQuantity={individualQuantities[item.id] || 0}
													minQuantity={0}
													maxQuantity={item.maxQuantity}
													showFreeTag={false}
													onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
													className="!py-0 w-auto"
												/>
											</div>

											{/* Price Section (Desktop) */}
											<div className="hidden md:flex flex-1 items-center">
												{(individualQuantities[item.id] || 0) === 0 ? (
													<span className="text-sm md:text-base font-semibold text-[#333333] leading-6">
														{item.hasAdditionalPackage ? '-' : t('freeLabel')}
													</span>
												) : (
													<span className="text-sm md:text-base font-semibold text-[#333333] leading-6">
														{item.hasAdditionalPackage ?
															toCurrency(70000 * (individualQuantities[item.id] || 0)) :
															t('freeLabel')
														}
													</span>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Quantity Summary */}
						<div className="justify-start hidden md:flex">
							<h3 className="text-base md:text-lg font-semibold text-[#333333] leading-[1.33]">
								{t('totalPackages', { total: calculateTotalQuantity() })}
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
							unitPrice={hasItemsWithAdditionalPackages() ? 70000 : 0}
							totalPrice={calculateTotalPrice()}
							onGoBack={() => window.history.back()}
							onProceedToPayment={confirmOrder}
							showTotal={hasItemsWithAdditionalPackages()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
