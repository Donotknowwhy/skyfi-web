const { useTranslations } = require("next-intl");
const { useState, useEffect } = require("react");
const { useModal } = require("../../../utils/modal");
const { useForm } = require("react-hook-form");
import Image from 'next/image';
import * as yup from 'yup';
import { Link, useRouter } from '../../../../i18n/navigation';
import { useLocale } from 'next-intl';
import PackageService from '../../../services/package';
import CheckoutService from '../../../services/checkoutService';
import {
	ORDER_BRANDS,
	applyPackageOrderSource,
	applyPaymentSourceType,
} from '../../../utils/orderSourceContext';
const { yupResolver } = require("@hookform/resolvers/yup");

const PAYMENT_MAIN = 'main_account';
const PAYMENT_BANK = 'bank';

const schema = yup.object({
	msisdn: yup
		.string()
		.required('phoneRequired')
		.matches(/^[0-9]{10}$/, 'phoneInvalid')
		.test(
			'is-070',
			'phoneNotSupported',
			(value) => {
				if (!value) return true;
				return value.startsWith('070');
			}
		)
});

const imagePayment = {
	VISA: '/images/checkout/visa.png',
	international: '/images/checkout/visa.png',
	GALAXYPAY: '/images/checkout/visa.png',
	DOMESTIC: '/images/checkout/napas.png',
	domestic: '/images/checkout/napas.png',
	QRPAY: '/images/checkout/QR.jpeg',
};

const ModalCheckPackage = (props) => {
	const t = useTranslations('modalCheckPackage');
	const locale = useLocale();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedPayment, setSelectedPayment] = useState(PAYMENT_MAIN);
	const [bankMethods, setBankMethods] = useState([]);
	const [selectedBankMethod, setSelectedBankMethod] = useState('');
	const [customerName, setCustomerName] = useState('');

	const { close, done } = useModal();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (selectedPayment === PAYMENT_BANK && bankMethods.length === 0) {
			CheckoutService.getPaymentMethods().then((methods) => {
				const filtered = (methods || []).filter((m) => m.paymentMethod !== 'COD');
				setBankMethods(filtered);
				if (filtered.length > 0) setSelectedBankMethod(filtered[0].paymentMethod);
			});
		}
	}, [selectedPayment]);

	const onSubmit = async (data) => {
		setIsLoading(true);
		setError('');

		try {
			if (selectedPayment === PAYMENT_BANK) {
				if (!selectedBankMethod) {
					setError(t('selectBankMethodError'));
					return;
				}

				const checkRes = await PackageService.checkPackageChange({
					msisdn: data.msisdn,
					packageCode: props.package.code,
				});

				if (checkRes.code == 201) {
					return done({
						packageCurrent: checkRes?.data,
						newPack: checkRes.data?.newPack,
						package: props.package,
						msisdn: data.msisdn,
						isPackage: true,
						paymentMethod: selectedBankMethod,
						customerName,
						isBank: true,
					});
				}

				if (!checkRes.success) {
					setError(checkRes.message || 'An error occurred');
					return;
				}

				const res = await CheckoutService.createOrderPackage(applyPackageOrderSource(ORDER_BRANDS.WEB, {
					msisdn: data.msisdn,
					package_code: props.package.code,
					customer_name: customerName,
					email: '',
					payment_method: selectedBankMethod,
				}));

				if (!res || !res.order_number) {
					setError(res?.message || 'Tạo đơn hàng thất bại');
					return;
				}

				const paymentLink = await CheckoutService.getlinkPayment(applyPaymentSourceType(ORDER_BRANDS.WEB, {
					orderNumber: res.order_number,
					orderDescription: 'Order description ' + res.order_number,
					paymentMethod: selectedBankMethod,
					locale,
				}));

				if (!paymentLink?.redirectUrl) {
					setError('Không lấy được liên kết thanh toán');
					return;
				}

				close();
				router.push(paymentLink.redirectUrl);
				return;
			}

			// Tài khoản chính flow
			const params = {
				msisdn: data.msisdn,
				packageCode: props.package.code,
			};

			const res = await PackageService.checkPackageRegister(params);

			if (!res.success && res.code != 200) {
				if (res.code == 201) {
					return done({ packageCurrent: res.data[0], package: props.package, msisdn: data.msisdn, isPackage: true });
				}
				setError(res.message || 'An error occurred');
				return;
			}
			if (!res.data) {
				done({ package: props.package, msisdn: data.msisdn, isPackage: false });
				return;
			}
		} finally {
			setIsLoading(false);
		}
	};


	return (
		<div className="relative">
			{/* Close button */}
			<div className="flex justify-end items-center p-[20px_20px_0px]">
				<button
					onClick={close}
					className="focus:outline-none hover:opacity-70 transition-opacity"
					type="button"
				>
					<Image src="/assets/x-close.svg" width={24} height={24} alt={t('closeButton')} />
				</button>
			</div>

			<div className="px-[40px] pb-[40px]">
				{/* Title Section */}
				<div className="flex flex-col gap-[8px] mb-[20px]">
					<h3 className="font-inter font-semibold text-[28px] leading-[1.29] text-[#333]">
						{t('title')}
					</h3>
					<p className="font-inter text-[16px] leading-[1.5] text-[#333]">
						{t('subtitle')}
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[4px]">
					{/* Phone Input */}
					<div className="flex flex-col gap-[4px] mb-[20px]">
						<div
							className={`flex flex-row items-center gap-[8px] px-[16px] py-[8px] border rounded-[12px] bg-white ${errors.msisdn ? 'border-red-500' : 'border-[#F1F1F1]'}`}
						>
							<div className="flex flex-col justify-center flex-1">
								<div className="flex items-center gap-[4px] mb-1">
									<label className="font-inter text-[12px] leading-[1.33] text-[#333]">
										{t('phoneLabel')}
									</label>
									<span className="font-inter text-[14px] leading-[1.43] text-[#ED1B2F]">*</span>
								</div>
								<input
									{...register('msisdn')}
									type="tel"
									placeholder={t('phonePlaceholder')}
									className="font-inter text-[16px] leading-[1.5] text-[#333] placeholder:text-[#A1A1A1] border-none outline-none bg-transparent w-full"
									disabled={isLoading}
								/>
							</div>
						</div>
						{errors.msisdn && (
							<p className="text-[#ED1B2F] text-sm font-inter">{t(errors.msisdn.message)}</p>
						)}
					</div>

					{/* Payment Type Selection */}
					<div className="flex flex-col gap-[8px] mb-[4px]">
						<label className="font-inter text-[14px] font-semibold text-[#333]">
							{t('paymentMethodLabel')}
						</label>
						{/* Tài khoản chính */}
						<label className={`flex items-center gap-3 p-[12px] rounded-[8px] cursor-pointer border ${selectedPayment === PAYMENT_MAIN ? 'bg-[#FFF6E8] border-[#E69818]' : 'border-[#DDDDDD]'}`}>
							<div className="relative w-[20px] h-[20px] flex-shrink-0">
								<input
									type="radio"
									name="selectedPayment"
									value={PAYMENT_MAIN}
									checked={selectedPayment === PAYMENT_MAIN}
									onChange={() => setSelectedPayment(PAYMENT_MAIN)}
									className="absolute opacity-0 w-full h-full cursor-pointer"
								/>
								<div className={`w-full h-full rounded-full border absolute top-0 left-0 pointer-events-none ${selectedPayment === PAYMENT_MAIN ? 'border-[#E69818]' : 'border-[#333]'}`} />
								{selectedPayment === PAYMENT_MAIN && (
									<div className="w-[10px] h-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E69818] rounded-full" />
								)}
							</div>
							<span className="font-inter font-semibold text-[16px] text-[#333]">{t('paymentMainAccount')}</span>
						</label>

						{/* Thanh toán ngân hàng */}
						<label className={`flex items-center gap-3 p-[12px] rounded-[8px] cursor-pointer border ${selectedPayment === PAYMENT_BANK ? 'bg-[#FFF6E8] border-[#E69818]' : 'border-[#DDDDDD]'}`}>
							<div className="relative w-[20px] h-[20px] flex-shrink-0">
								<input
									type="radio"
									name="selectedPayment"
									value={PAYMENT_BANK}
									checked={selectedPayment === PAYMENT_BANK}
									onChange={() => setSelectedPayment(PAYMENT_BANK)}
									className="absolute opacity-0 w-full h-full cursor-pointer"
								/>
								<div className={`w-full h-full rounded-full border absolute top-0 left-0 pointer-events-none ${selectedPayment === PAYMENT_BANK ? 'border-[#E69818]' : 'border-[#333]'}`} />
								{selectedPayment === PAYMENT_BANK && (
									<div className="w-[10px] h-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E69818] rounded-full" />
								)}
							</div>
							<span className="font-inter font-semibold text-[16px] text-[#333]">{t('paymentBankTransfer')}</span>
						</label>
					</div>

					{/* Bank sub-methods + customer name (when bank selected) */}
					{selectedPayment === PAYMENT_BANK && (
						<div className="flex flex-col gap-[12px] mt-[12px] mb-[4px] pl-[4px]">
							{/* Customer Name */}
							<div className="flex flex-col gap-[4px]">
								<div className={`flex flex-row items-center gap-[8px] px-[16px] py-[8px] border rounded-[12px] bg-white border-[#F1F1F1]`}>
									<div className="flex flex-col justify-center flex-1">
										<div className="flex items-center gap-[4px] mb-1">
											<label className="font-inter text-[12px] leading-[1.33] text-[#333]">
												{t('customerNameLabel')}
											</label>
											<span className="font-inter text-[14px] leading-[1.43] text-[#ED1B2F]">*</span>
										</div>
										<input
											type="text"
											value={customerName}
											onChange={(e) => setCustomerName(e.target.value)}
											placeholder={t('customerNamePlaceholder')}
											className="font-inter text-[16px] leading-[1.5] text-[#333] placeholder:text-[#A1A1A1] border-none outline-none bg-transparent w-full"
											disabled={isLoading}
										/>
									</div>
								</div>
							</div>

							{/* Bank method list */}
							{bankMethods.length > 0 && (
								<div className="flex flex-col gap-[8px]">
									<label className="font-inter text-[13px] font-medium text-[#5C5C5C]">
										{t('selectBankMethod')}
									</label>
									{bankMethods.map((method) => (
										<label
											key={method.paymentMethod}
											className={`flex items-center gap-3 p-[10px_12px] rounded-[8px] cursor-pointer border ${selectedBankMethod === method.paymentMethod ? 'bg-[#FFF6E8] border-[#E69818]' : 'border-[#DDDDDD]'}`}
										>
											<div className="relative w-[18px] h-[18px] flex-shrink-0">
												<input
													type="radio"
													name="bankMethod"
													value={method.paymentMethod}
													checked={selectedBankMethod === method.paymentMethod}
													onChange={() => setSelectedBankMethod(method.paymentMethod)}
													className="absolute opacity-0 w-full h-full cursor-pointer"
												/>
												<div className={`w-full h-full rounded-full border absolute top-0 left-0 pointer-events-none ${selectedBankMethod === method.paymentMethod ? 'border-[#E69818]' : 'border-[#A1A1A1]'}`} />
												{selectedBankMethod === method.paymentMethod && (
													<div className="w-[8px] h-[8px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E69818] rounded-full" />
												)}
											</div>
											{imagePayment[method.paymentMethod] && (
												<Image src={imagePayment[method.paymentMethod]} width={28} height={28} alt={method.name} className="object-contain" />
											)}
											<span className="font-inter font-medium text-[15px] text-[#333]">{method.name}</span>
										</label>
									))}
								</div>
							)}
						</div>
					)}

					{error && (
						<p className="text-[#ED1B2F] text-sm font-inter mt-[8px]">{error}</p>
					)}

					{/* Continue Button */}
					<button
						type="submit"
						disabled={isLoading}
						className={`flex justify-center items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] font-inter font-semibold text-[16px] leading-[1.5] text-center transition-all mt-[16px] ${isLoading
							? 'bg-[#C0C0C0] text-[#A1A1A1] cursor-not-allowed'
							: 'bg-primary text-white hover:bg-primary/60'
						}`}
					>
						{isLoading ? (
							<>
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
								<span>Loading...</span>
							</>
						) : (
							t('continueButton')
						)}
					</button>
				</form>

				{/* No SIM Message */}
				<p className="font-inter text-[16px] leading-[1.5] text-[#333] text-center mt-[20px]">
					{t('noSimMessage').split('\n').map((line, index) => {
						if (index == 1) {
							return (
								<Link key={index} className="underline text-primary hover:text-primary/80" href="/sim-data">
									{line}
								</Link>
							);
						}
						return <span key={index}>{line}</span>;
					})}
				</p>
			</div>
		</div>
	);
};

export default ModalCheckPackage;
