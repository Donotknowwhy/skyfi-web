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
import InfoSim from './InfoSim';
import OrderSummary from './OrderSummary';
import SkeletonLoader from './SkeletonLoader';
import TravelSimPackage from './TravelSimPackage';

const checkPhoneOrCode = (code) => {
	if (code && /^\d+$/.test(code)) {
		// Check for Vietnamese phone numbers starting with 84 (country code)
		if (code.startsWith('84') && code.length >= 11 && code.length <= 12) {
			return 'phone';
		}
		// Check for Vietnamese phone numbers starting with 0
		if (code.startsWith('0') && code.length === 10) {
			return 'phone';
		}
		// Check for 10-digit numbers (legacy check)
		if (code.length === 10) {
			return 'phone';
		}
	}

	if (code && code.length > 0) {
		return 'code';
	}

	return null;
}


export default function TravelSimPackagePage({ code, phone }) {
	const [selectedPackage, setSelectedPackage] = useState('');
	const [selectedSims, setSelectedSims] = useState([]);
	const [packageOptions, setPackageOptions] = useState([]);
	const [simNumbers, setSimNumbers] = useState([]);
	const [msisdnData, setMsisdnData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [ error, setError ] = useState( null );
	const [isActive, setIsActive] = useState('FAILED');
	const t = useTranslations('travelSim');
	const tErrors = useTranslations('travelSim.errors');
	const locale = useLocale();
	const router = useRouter();
	const load = useLoad();


	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const [packagesData, msisdnResponse] = await Promise.all([
					TravelSimService.getPackageByCode(code, { source: 'freemium', locale }),
					phone ? TravelSimService.getMsisdnByPhone(phone) : TravelSimService.getMsisdnByCode(code, { source: 'freemium', locale })
				]);

				if (packagesData && packagesData.length > 0) {
					const transformedPackages = packagesData.map(pkg => ({
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
					setSelectedPackage(transformedPackages[0].packageCode); // Preserve selected package if it exists

				}


				if (msisdnResponse) {
					setMsisdnData(msisdnResponse.data);
					const phoneNumbers = msisdnResponse.data.map( item => item.msisdn );
					setIsActive(msisdnResponse.data[0].status);
					setSimNumbers(phoneNumbers);
					setSelectedSims(phoneNumbers);
				}

			} catch (err) {
				console.error('Error fetching travel sim data:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [code]);

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
		const isHasValidQuantity = calculateTotalPrice() === 0;
		const selectedPkg = getSelectedPackageDetails();

		if (isHasValidQuantity) {
			showModalMess({
				label: tErrors('title'),
				message: tErrors('notPhone'),
				type: 'warning',
			});
			return;
		}

		// if ( isActive === 'ACTIVE' ) {
		// 	return createOrder();
		// }

		showModalVerify({
			packageInfo: {
				name: `${selectedPkg?.packageCode}/${selectedPkg?.dataAmount} - ${selectedPkg?.validity}`,
				price: toCurrency(selectedPkg?.rawPrice),
			},
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
					msisdn_id: msisdnItem?.msisdn_id,
					quantity: 1, // Each SIM gets 1 package
					sim_id: msisdnItem?.sim_id,
					package_code: selectedPackage ? selectedPackage : msisdnItem?.package_code,
					pack_price: selectedPackage ? selectedPkg.rawPrice : 0
				};
			});

			// Prepare order data`
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
		<div className="min-h-screen md:min-h-full	 bg-gray-50 py-4 md:py-8">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-6xl">
					{/* SIM Selection */}
					<div className="mb-6 md:mb-8">
						<InfoSim
							type={simNumbers.length > 1 ? 'multiple' : 'single'}
							simNumbers={simNumbers}
							selectedSims={selectedSims}
							onSimSelect={handleSimSelect}
							onSelectAll={handleSelectAll}
						/>
					</div>

					{/* Package Selection Grid */}
					<div className="mb-6 overflow-hidden ">
						<div className='relative'>

						<div className="flex gap-4  md:justify-center overflow-scroll scrollbar-hide ">
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
					{/* <p className='text-red-600  mb-6 md:mb-8 italic'>{t('notePackage')}</p> */}
					<OrderSummary
						packageCode={selectedPackage ? selectedPackage : ''}
						quantity={selectedSims.length}
						unitPrice={getSelectedPackageDetails()?.rawPrice || 0}
						totalPrice={calculateTotalPrice()}
						onGoBack={() => console.log('Go back')}
						onProceedToPayment={comfirmOrder}
					/>
				</div>
			</div>
		</div>
	);
}
