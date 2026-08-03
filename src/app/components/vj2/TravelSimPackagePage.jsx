"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useRouter } from '../../../i18n/navigation';
import CheckoutService from '../../services/checkoutService';
import TravelSimService from '../../services/travelsim';
import { toCurrency } from '../../utils/format';
import { useLoad } from '../../utils/load';
import { showModalMess } from '../modals/modalMess';
import { showModalVerify } from '../modals/travelSim';
import SkeletonLoader from "@/app/components/travelsim/SkeletonLoader";
import InfoSim from "@/app/components/travelsim/InfoSim";
import TravelSimPackage from "@/app/components/travelsim/TravelSimPackage";
import OrderSummary from "@/app/components/travelsim/OrderSummary";
import InfoSimV2 from "@/app/components/travelsim/InfoSimV2";
import OrderSummaryV2 from "@/app/components/travelsim/OrderSummaryV2";
import useMyEsim from "@/app/hooks/useMyEsim";

export default function TravelSimPackagePage({ code,email, validationData = null, hasFreeSim = false }) {
	const [selectedPackage, setSelectedPackage] = useState('');
	const [selectedSims, setSelectedSims] = useState([]);
	const [packageOptions, setPackageOptions] = useState([]);
	const [simNumbers, setSimNumbers] = useState([]);
	const [msisdnData, setMsisdnData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isActive, setIsActive] = useState('FAILED');
	const t = useTranslations('travelSim');
	const tErrors = useTranslations('travelSim.errors');
	const locale = useLocale();
	const router = useRouter();
	const load = useLoad();
	const {showDevicesEsim} = useMyEsim();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				if (validationData && validationData.length > 0) {
					// Use validation data if available (VJ2 flow)
					// Filter SIMs that don't have additional_package
					const filteredData = validationData.filter(item => item.additional_package == null);

					setMsisdnData(filteredData);
					const phoneNumbers = filteredData.map(item => item.msisdn);
					setSimNumbers(phoneNumbers);
					setSelectedSims(phoneNumbers); // Select all available SIMs by default

					if (filteredData.length > 0) {
						setIsActive('ACTIVE'); // Assume active for VJ2 flow
					}
				}

				// Fetch packages
				if (code) {
					try {
						const packagesData = await TravelSimService.getPackageByCodeV2(code, { source: 'freemium', locale });

						if (packagesData && packagesData.length > 0) {
							let transformedPackages = packagesData.map(pkg => ({
								packageCode: pkg.code,
                                packageName: pkg.name,
								dataAmount: `${pkg.data_per_day} GB`,
								validity: `${pkg.validity} ${locale === 'vi' ? 'ngày' : 'days'}`,
								price: `${pkg.price.toLocaleString()} VND`,
								description: Array.isArray(pkg.description) ? pkg.description[0] : pkg.description,
								en_description: Array.isArray(pkg.en_description) ? pkg.en_description[0] : pkg.en_description,
								rawPrice: pkg.price,
								status: pkg.status
							}));

							setPackageOptions(transformedPackages);
							setSelectedPackage(transformedPackages[0].packageCode);
						}
					} catch (packageError) {
						console.warn('Could not fetch packages:', packageError);
					}
				}

				// Fallback to original API if no validation data
				// if (!validationData && code) {
				// 	try {
				// 		const msisdnResponse = await TravelSimService.getMsisdnByCode(code, { source: 'freemium', locale });
                //
				// 		if (msisdnResponse) {
				// 			setMsisdnData(msisdnResponse.data);
				// 			const phoneNumbers = msisdnResponse.data.map(item => item.msisdn);
				// 			setIsActive(msisdnResponse.data[0].status);
				// 			setSimNumbers(phoneNumbers);
				// 			setSelectedSims(phoneNumbers);
				// 		}
				// 	} catch (msisdnError) {
				// 		console.warn('Could not fetch MSISDN data:', msisdnError);
				// 	}
				// }

			} catch (err) {
				console.error('Error fetching travel sim data:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [code, validationData, hasFreeSim, locale]);

	const handlePackageSelect = (packageCode) => {
		setSelectedPackage(packageCode);
	};

	const handleSimSelect = (simNumber) => {
		setSelectedSims(prev =>
			prev.includes(simNumber)
				? prev.filter(sim => sim !== simNumber)
				: [...prev, simNumber]
		);
	};

	const handleSelectAll = () => {
		setSelectedSims(prev =>
			prev.length === simNumbers.length ? [] : [...simNumbers]
		);
	};

	// Get selected package details
	const getSelectedPackageDetails = () => {
		return packageOptions.find(pkg => pkg.packageCode === selectedPackage);
	};

	// Calculate total price
	const calculateTotalPrice = () => {
		const selectedPkg = getSelectedPackageDetails();
		if (selectedPkg && selectedSims.length > 0) {
			return selectedPkg.rawPrice * selectedSims.length;
		}
		return 0;
	};

	const comfirmOrder = () => {
		const selectedPkg = getSelectedPackageDetails();

		// Check if it's the free package
		if (selectedPkg && selectedPkg.isFree) {
			// For free package, just send the SIM
			return createOrder();
		}

		const isHasValidQuantity = calculateTotalPrice() === 0 || selectedSims.length === 0;

		if (isHasValidQuantity) {
			showModalMess({
				label: tErrors('title'),
				message: tErrors('notPhone'),
				type: 'warning',
			});
			return;
		}

		showModalVerify({
			packageInfo: {
				name: `${selectedPkg?.packageName}/${selectedPkg?.dataAmount} - ${selectedPkg?.validity}`,
				price: selectedPkg?.isFree ? 'Miễn phí' : toCurrency(selectedPkg?.rawPrice),
			},
            hideTitle:true,
			onContinue: createOrder
		})
	}

	// Create order function
	const createOrder = async () => {
		try {
			load.open();
			setError(null);

			// Validate selections
			if (selectedSims.length === 0) {
				throw new Error('Vui lòng chọn ít nhất một SIM');
			}

			const selectedPkg = getSelectedPackageDetails();

			// Prepare order items from selected SIMs and package
			const orderItems = selectedSims.map((simNumber) => {
				const msisdnItem = msisdnData.find(item => item.msisdn === simNumber);

				return {
					msisdn_id: msisdnItem?.msisdn_id || msisdnItem?.id,
					quantity: 1, // Each SIM gets 1 package
					sim_id: msisdnItem?.sim_id || msisdnItem?.id,
					package_code: selectedPackage ? selectedPackage : (msisdnItem?.package_code || 'SM8'),
					pack_price: selectedPackage ? selectedPkg.rawPrice : 0
				};
			});

			// Prepare order data
			const orderData = {
				code: code,
				items: orderItems
			};

			// For free packages, might not need payment flow
			if (selectedPkg && selectedPkg.isFree) {
				// Handle free SIM sending logic here
				const result = await TravelSimService.createOrderV1(orderData,{ locale});

				// Show success message instead of payment
				showModalMess({
					label: 'Thành công',
					message: 'SIM miễn phí đã được gửi đến email của bạn',
					type: 'success',
				});
				return;
			}

			// Call the service to create order
			const result = await TravelSimService.createOrderV1(orderData,{ locale});
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

			throw error;
		} finally {
			load.close();
		}
	};

	if (loading) {
		return <SkeletonLoader />;
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 py-4 md:py-8">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-6xl ">
						<div className="flex items-center justify-center h-64 ">
							<div className="text-center border bg-white rounded-lg shadow-lg p-6 gap-2 max-w-2xl w-full flex flex-col items-center">
								<img
									src="/assets/modals/sim-not-active-image.png"
									alt="SIM Active"
									className="w-[87px] h-[87px] object-contain"
								/>
								<div className="text-lg text-red-600 mb-2 font-semibold">{t('errors.title')}</div>
								<div className="text-sm text-gray-600">{error}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen md:min-h-full bg-gray-50 py-4 md:py-8">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="mb-6 md:mb-8 text-sm md:text-xl bg-[#FDCD084D] p-2 flex items-center gap-2 rounded-lg ">
					<img src="/images/travelsim/infoIcon.png" alt="" className={"w-[20px] h-[20px]"}/>
					<div>
						<p className="text-[#3C3C3C] font-koho">
							{t('esimWarning')} <span className={"text-blue-500 underline cursor-pointer font-koho"} onClick={()=>showDevicesEsim()}> {t('here')}</span>
						</p>
					</div>
				</div>
				<div className="mx-auto max-w-6xl">

					{/* SIM Selection */}
					<div className="mb-6 md:mb-8">
						<InfoSimV2
							type={simNumbers.length > 1 ? 'multiple' : 'single'}
							simNumbers={simNumbers}
							selectedSims={selectedSims}
							onSimSelect={handleSimSelect}
							onSelectAll={handleSelectAll}
						/>
					</div>

					{/* Package Selection Grid */}
					<div className="mb-6 overflow-hidden">
						<div className='relative'>
							<div className="flex gap-4 md:justify-center overflow-scroll scrollbar-hide">
								{packageOptions.map((pkg) => (
									<TravelSimPackage
										key={pkg.packageCode}
                                        packageName={pkg.packageName}
										dataAmount={pkg.dataAmount}
										validity={pkg.validity}
										price={pkg.price}
										description={pkg.description}
										isSelected={selectedPackage === pkg.packageCode}
										onSelect={() => handlePackageSelect(pkg.packageCode)}
										className="!w-[280px] flex-shrink-0"
									/>
								))}
							</div>
						</div>
					</div>

					<OrderSummaryV2
                        packageName={getSelectedPackageDetails()?.packageName||0}
						quantity={selectedSims.length}
                        dataAmount={getSelectedPackageDetails()?.dataAmount||0}
						unitPrice={getSelectedPackageDetails()?.rawPrice || 0}
						totalPrice={calculateTotalPrice()}
						onGoBack={() => window.history.back()}
						onProceedToPayment={comfirmOrder}
					/>
                    <p className={"mt-2 font-koho font-bold text-xl"}>{t("info.freeDataNotice")}</p>
				</div>
			</div>
		</div>
	);
}
