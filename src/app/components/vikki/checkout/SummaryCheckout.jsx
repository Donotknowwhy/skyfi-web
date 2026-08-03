import { showModalMessVikki } from '@/app/components/modals/modalMess';
import { useShipFeeVikki } from '@/app/hooks/useShipFeeVikki';
import CheckoutService from '@/app/services/checkoutService';
import { getTotalQuantity } from "@/app/utils/cartService";
import { toCurrency } from '@/app/utils/format';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

// Custom debounce hook (copied from original file to keep it self-contained or could be imported if in utils)
function useDebounce(value, delay = 500) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [delay, value]);

	return debouncedValue;
}

const SummaryCheckout = () => {
	const t = useTranslations('vikki.checkout.summary');

	const { control, setValue } = useFormContext();

	const [sims, cityId, districtId, wardId, deliveryAddress, contactPhone, email, customerName, hasPhysicalSim] = useWatch({
		name: ['items', 'city_id', 'district_id', 'ward_id', 'delivery_address', 'contact_phone', 'email', 'customer_name', "hasPhysicalSim"],
		control
	});

	const [couponCode, setCouponCode] = useState('');
	const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
	const [couponData, setCouponData] = useState(null);
	const [couponError, setCouponError] = useState('');
	const [showCouponSuccess, setShowCouponSuccess] = useState(false);
	const [previousShippingFee, setPreviousShippingFee] = useState(null);

	const totalSim = sims?.reduce((total, item) => {
		total += (Number(item.total_price) || 0);
		return total;
	}, 0);
	const totalQuantity = getTotalQuantity(sims);

	const paramGHN = () => {
		if (cityId && districtId && wardId) {
			return {
				city_id: cityId,
				district_id: districtId,
				ward_id: wardId,
				delivery_address: deliveryAddress,
				hasPhysicalSim: hasPhysicalSim
			};
		}
		return {};
	};

	const paramGH = useDebounce(paramGHN, 1000);
	const feeShipping = useShipFeeVikki(paramGH);

	const discountAmount = couponData?.discount_amount || 0;
	const totalPrice = totalSim + (feeShipping?.shipping_fee ?? 0) - discountAmount;

	useEffect(() => {
		setValue('total_amount', totalPrice);
		setValue('shipping_amount', feeShipping?.shipping_fee ?? 0);
		setValue('discount_amount', discountAmount);
		setValue('coupon_code', couponCode);
	}, [totalPrice, feeShipping?.shipping_fee, discountAmount, couponCode, setValue]);

	useEffect(() => {
		const currentShippingFee = feeShipping?.shipping_fee ?? 0;
		if (previousShippingFee !== null &&
			previousShippingFee !== currentShippingFee &&
			couponData &&
			couponCode.trim()) {
			revalidateCoupon();
		}
		setPreviousShippingFee(currentShippingFee);
	}, [feeShipping?.shipping_fee, couponData, previousShippingFee, couponCode]);

	const validateCoupon = async () => {
		if (!couponCode.trim()) {
			setCouponError(t('validationError'));
			return;
		}

		setIsValidatingCoupon(true);
		setCouponError('');
		setCouponData(null);
		setShowCouponSuccess(false);

		try {
			const params = {
				coupon_code: couponCode.trim(),
				items: sims,
				contact_phone: contactPhone,
				email: email,
				customer_name: customerName,
				shipping_amount: feeShipping?.shipping_fee ?? 0,
				source: "VIKKI"
			};

			const result = await CheckoutService.validateCoupon(params);

			if (result.is_valid) {
				setCouponData(result);
				setShowCouponSuccess(true);
				showModalMessVikki({
					label: t('successTitle'),
					type: 'success',
					message: `${t('applySuccess')} ${toCurrency(result.discount_amount)}`,
					onClose: () => { }
				});
			} else {
				setCouponError(result.message || t('invalidCoupon'));
			}
		} catch (error) {
			setCouponError(error.message || t('couponError'));
		} finally {
			setIsValidatingCoupon(false);
		}
	};

	const removeCoupon = () => {
		setCouponCode('');
		setCouponData(null);
		setCouponError('');
		setShowCouponSuccess(false);
	};

	const revalidateCoupon = async () => {
		if (!couponCode.trim()) return;

		setIsValidatingCoupon(true);
		setCouponError('');

		try {
			const params = {
				coupon_code: couponCode.trim(),
				items: sims,
				contact_phone: contactPhone,
				email: email,
				customer_name: customerName,
				shipping_amount: feeShipping?.shipping_fee ?? 0,
				source:"VIKKI"
			};

			const result = await CheckoutService.validateCoupon(params);

			if (result.is_valid) {
				setCouponData(result);
				setShowCouponSuccess(true);
				showModalMessVikki({
					label: t('notification'),
					type: 'success',
					message: `${t('reappliedSuccess')} ${toCurrency(result.discount_amount)}`,
					onClose: () => { }
				});
			} else {
				removeCoupon();
				showModalMessVikki({
					label: t('notification'),
					type: 'warning',
					message: t('invalidWithNewAddress'),
					onClose: () => { }
				});
			}
		} catch (error) {
			removeCoupon();
			showModalMessVikki({
				label: t('error'),
				type: 'error',
				message: t('revalidationError'),
				onClose: () => { }
			});
		} finally {
			setIsValidatingCoupon(false);
		}
	};

	return (
		<div className="mb-4"> {/* Container style if needed, using inherited styles mostly */}
			<div className="mb-[8px]">
				{!showCouponSuccess ? (
					<>
						<div className="relative mb-2 flex items-center">
							<div className="absolute left-4 top-1/2 transform -translate-y-1/2">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10 8V7M10 12.5V11.5M10 17V16M5.2 4H18.8C19.9201 4 20.4802 4 20.908 4.21799C21.2843 4.40973 21.5903 4.71569 21.782 5.09202C22 5.51984 22 6.0799 22 7.2V8.5C20.067 8.5 18.5 10.067 18.5 12C18.5 13.933 20.067 15.5 22 15.5V16.8C22 17.9201 22 18.4802 21.782 18.908C21.5903 19.2843 21.2843 19.5903 20.908 19.782C20.4802 20 19.9201 20 18.8 20H5.2C4.0799 20 3.51984 20 3.09202 19.782C2.71569 19.5903 2.40973 19.2843 2.21799 18.908C2 18.4802 2 17.9201 2 16.8V15.5C3.933 15.5 5.5 13.933 5.5 12C5.5 10.067 3.933 8.5 2 8.5V7.2C2 6.0799 2 5.51984 2.21799 5.09202C2.40973 4.71569 2.71569 4.40973 3.09202 4.21799C3.51984 4 4.0799 4 5.2 4Z" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								</svg>

							</div>
							<input
								type="text"
								value={couponCode}
								onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
								placeholder={t('inputPlaceholder')}
								className="font-inter text-[16px] text-[#1C1C1E] p-[12px_16px_12px_50px] border border-[#E5E5E5] rounded-[12px] focus:outline-none focus:border-[#0057FF] w-full bg-white"
								disabled={isValidatingCoupon}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										validateCoupon();
									}
								}}
							/>
						</div>

						<button
							onClick={validateCoupon}
							disabled={isValidatingCoupon || !couponCode.trim()}
							className="w-full py-3 px-4 bg-[linear-gradient(88.19deg,#2C4EFF_-4.19%,#0000FF_12.9%,#6100FF_48.11%,#DA0191_74.13%,#FF8A00_89.99%,#FFB907_99.38%)] text-white font-inter font-semibold text-[14px] rounded-[12px] disabled:bg-[#E5E5E5] disabled:text-[#9E9E9E] disabled:bg-none disabled:cursor-not-allowed transition-colors"
						>
							{isValidatingCoupon ? t('validating') : t('applyCoupon')}
						</button>

						{couponError && (
							<p className="text-[#FF3B30] text-sm mt-2">{couponError}</p>
						)}


					</>
				) : (
					<div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-[12px] p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0">
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M2.5 6L5 8.5L9.5 3.5"
											stroke="white"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>

								<div className="flex-1">
									<p className="font-semibold text-[#15803D] text-sm mb-1">
										{t('description')}
									</p>
									<p className="text-[#166534] text-xs mb-1">
										{couponCode} - {t('discount')} {toCurrency(discountAmount)}
									</p>
								</div>
							</div>
							<button
								onClick={removeCoupon}
								className="text-[#166534] hover:text-[#14532D] p-1"
								title={t('remove')}
							>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
			<div className='flex items-center gap-2 my-4'>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path opacity="0.12" d="M19.1213 7.12139L14.8787 2.87875C14.6222 2.62223 14.324 2.41696 14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305C19.5831 7.67611 19.3778 7.37792 19.1213 7.12139Z" fill="#333333" />
					<path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17H8M16 13H8M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>

				<h2 className="font-inter flex-1 font-bold text-[18px] leading-[24px] text-[#1C1C1E] ">{t('title')}</h2>
			</div>

			{/* Order Summary Details */}
			<div className="mb-[16px] space-y-2">
				<div className="flex justify-between">
					<span className="font-inter text-[14px] text-[#5C5C5C]"> {t('products')}</span>
					<span className="font-inter font-medium text-[14px] text-[#1C1C1E] text-right">{toCurrency(totalSim)}</span>
				</div>
				{couponData && (
					<div className="flex justify-between">
						<span className="font-inter text-[14px] text-[#5C5C5C]">{t('discount')}</span>
						<span className="font-inter font-medium text-[14px] text-[#FF3B30] text-right">-{toCurrency(discountAmount)}</span>
					</div>
				)}
				<div className="flex justify-between">
					<span className="font-inter text-[14px] text-[#5C5C5C]"> {t('feeShipping')}</span>
					<span className="font-inter font-medium text-[14px] text-[#1C1C1E] text-right">{toCurrency(feeShipping?.shipping_fee ?? 0)}</span>
				</div>

				<div className="flex justify-between ">
					<span className="font-inter text-[14px] text-[#5C5C5C]">{t('taxAndService')}</span>
					<span className="font-inter font-medium text-[14px] text-[#1C1C1E] text-right">{t('included')}</span>
				</div>
				<div className="flex justify-between pb-[12px] border-b border-[#E5E5E5]">
					<span className="font-inter text-[14px] text-[#5C5C5C]">{t('quantity')}</span>
					<span className="font-inter font-medium text-[14px] text-[#1C1C1E] text-right">{totalQuantity ?? 0}</span>
				</div>
				<div className="flex justify-between items-center pt-[4px]">
					<span className="font-inter  text-[14px] text-[#5C5C5C]">{t('total')}</span>
					<span className="font-inter font-bold text-[18px] text-[#333333] text-right">{toCurrency(totalPrice)} <br />
						<span className='text-[12px] font-normal text-[#5C5C5C]'>
							{t('vatIncluded')}
						</span></span>
				</div>
			</div>

			{/* Discount Code Section */}

		</div>
	);
};

export default SummaryCheckout;