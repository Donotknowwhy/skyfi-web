import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import moment from 'moment';
import { useShipFee } from '../../hooks/useShipFee';
import { toCurrency } from '../../utils/format';
import CheckoutService from '../../services/checkoutService';
import { showModalMess } from '../modals/modalMess';
import {getTotalQuantity} from "@/app/utils/cartService";


const SummaryCheckout = () => {
	const t = useTranslations( 'checkout' );
	const { control, setValue, getValues } = useFormContext();

	const [ sims, cityId, districtId, wardId, deliveryAddress, contactPhone, email, customerName,hasPhysicalSim ] = useWatch( {
		name: [ 'items', 'city_id', 'district_id', 'ward_id', 'delivery_address', 'contact_phone', 'email', 'customer_name',"hasPhysicalSim" ],
		control
	} );

	// State cho mã giảm giá
	const [couponCode, setCouponCode] = useState('');
	const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
	const [couponData, setCouponData] = useState(null);
	const [couponError, setCouponError] = useState('');
	const [showCouponSuccess, setShowCouponSuccess] = useState(false);

	// State cho mã giới thiệu
	const [referralCode, setReferralCode] = useState('');

	// State để theo dõi phí ship trước đó
	const [previousShippingFee, setPreviousShippingFee] = useState(null);

	const totalSim = sims?.reduce( ( total, item ) => {
		total += item.total_price   ;
		return total;
	}, 0);
	const totalQuantity = getTotalQuantity(sims);



	const paramGHN = () => {
		if ( cityId && districtId && wardId ) {
			return {
				city_id: cityId,
				district_id: districtId,
				ward_id: wardId,
				delivery_address: deliveryAddress,
				hasPhysicalSim:hasPhysicalSim
			};
		}

		return {};
	};

	const paramGH = useDebounce( paramGHN, 1000 );
	const feeShipping = useShipFee( paramGH );

	// Tính toán tổng tiền
	const discountAmount = couponData?.discount_amount || 0;
	const totalPrice = totalSim + ( feeShipping?.shipping_fee ?? 0 ) - discountAmount;

	// Cập nhật form values
	useEffect(() => {
		setValue( 'total_amount', totalPrice );
		setValue( 'shipping_amount', feeShipping?.shipping_fee ?? 0 );
		setValue( 'discount_amount', discountAmount );
		setValue( 'coupon_code', couponCode );
		setValue( 'referral_code', referralCode );
	}, [totalPrice, feeShipping?.shipping_fee, discountAmount, couponCode, referralCode, setValue]);

	// Effect để tự động áp dụng lại voucher khi phí ship thay đổi
	useEffect(() => {
		const currentShippingFee = feeShipping?.shipping_fee ?? 0;

		// Chỉ thực hiện khi đã có voucher được áp dụng và phí ship thay đổi
		if (previousShippingFee !== null &&
			previousShippingFee !== currentShippingFee &&
			couponData &&
			couponCode.trim()) {

			// Tự động áp dụng lại voucher với phí ship mới
			revalidateCoupon();
		}

		// Cập nhật phí ship trước đó
		setPreviousShippingFee(currentShippingFee);
	}, [feeShipping?.shipping_fee, couponData, previousShippingFee, couponCode]);

	// Hàm validate mã giảm giá
	const validateCoupon = async () => {
		if (!couponCode.trim()) {
			setCouponError(t('discountSection.validationError'));
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
				source: "WEB"
			};

			const result = await CheckoutService.validateCoupon(params);

			if (result.is_valid) {
				setCouponData(result);
				setShowCouponSuccess(true);
				showModalMess({
					label: t('discountSection.successTitle'),
					type: 'success',
					message: `${t('discountSection.applySuccess')} ${toCurrency(result.discount_amount)}`,
					onClose: () => {}
				});
			} else {
				setCouponError(result.message || 'Mã giảm giá không hợp lệ');
			}
		} catch (error) {
			setCouponError(error.message || 'Có lỗi xảy ra khi kiểm tra mã giảm giá');
		} finally {
			setIsValidatingCoupon(false);
		}
	};

	// Hàm xóa mã giảm giá
	const removeCoupon = () => {
		setCouponCode('');
		setCouponData(null);
		setCouponError('');
		setShowCouponSuccess(false);
	};

	// Hàm tự động áp dụng lại voucher khi phí ship thay đổi
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
				source: "WEB"
			};

			const result = await CheckoutService.validateCoupon(params);

			if (result.is_valid) {
				setCouponData(result);
				setShowCouponSuccess(true);
				showModalMess({
					label: 'Thông báo',
					type: 'success',
					message: `Mã giảm giá đã được áp dụng lại với phí vận chuyển mới. Tiết kiệm: ${toCurrency(result.discount_amount)}`,
					onClose: () => {}
				});
			} else {
				// Nếu mã không hợp lệ với phí ship mới thì xóa mã
				removeCoupon();
				showModalMess({
					label: 'Thông báo',
					type: 'warning',
					message: 'Mã giảm giá không còn hợp lệ với địa chỉ giao hàng mới. Vui lòng chọn mã khác.',
					onClose: () => {}
				});
			}
		} catch (error) {
			// Nếu có lỗi thì xóa mã
			removeCoupon();
			showModalMess({
				label: 'Lỗi',
				type: 'error',
				message: 'Có lỗi khi kiểm tra mã giảm giá. Mã đã được xóa, vui lòng thử lại.',
				onClose: () => {}
			});
		} finally {
			setIsValidatingCoupon(false);
		}
	};



	return (
		<>
			<h2 className="font-inter font-semibold text-[18px] leading-[1.44em] text-[#333] mb-[8px]">{ t( 'orderSummary.title' ) }</h2>

			{/* Order Summary */ }
			<div className="mb-[8px]">
				<div className="flex justify-between py-[8px]">
					<span className="font-inter text-[16px] text-[#333]">{ totalQuantity ?? 0 } { t( 'orderSummary.products' ) }</span>
					<span className="font-inter font-medium text-[16px] text-[#333] text-right">{ toCurrency( totalSim ) }</span>
				</div>
				<div className="flex justify-between py-[8px]">
					<span className="font-inter text-[16px] text-[#333]"> { t( 'orderSummary.feeShipping' ) }</span>
					<span className="font-inter font-medium text-[16px] text-[#333] text-right">{ toCurrency( feeShipping?.shipping_fee ?? 0 ) }</span>
				</div>
				{couponData && (
					<div className="flex justify-between py-[8px]">
						<span className="font-inter text-[16px] text-[#333]">{t('discountSection.discount')}</span>
						<span className="font-inter font-medium text-[16px] text-[#E60A32] text-right">-{ toCurrency( discountAmount ) }</span>
					</div>
				)}
				<div className="flex justify-between py-[8px] border-b border-[#DDDDDD]">
					<span className="font-inter text-[16px] text-[#333]">{ t( 'orderSummary.taxAndService' ) }</span>
					<span className="font-inter font-medium text-[16px] text-[#333] text-right">{ t( 'orderSummary.included' ) }</span>
				</div>
				<div className="flex justify-between items-center py-[12px]">
					<span className="font-inter font-semibold text-[18px] text-[#333]">{ t( 'orderSummary.total' ) }</span>
					<span className="font-inter font-semibold text-[20px] text-[#333] text-right">{ toCurrency( totalPrice ) }</span>
				</div>
			</div>

			{/* Discount Code Section */ }
			<div className="mb-[24px]">
				{!showCouponSuccess ? (
					<>
						<div className="relative mb-2">
							<div className="absolute left-4 top-1/2 transform -translate-y-1/2">
								<img src="/assets/icons/ticket.png" alt=""/>
							</div>
							<input
								type="text"
								value={couponCode}
								onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
								placeholder={t('discountSection.inputPlaceholder')}
								className="font-inter text-[16px] text-[#333] p-[12px_16px_12px_44px] border border-[#DDDDDD] rounded-[12px] focus:outline-none focus:border-primary w-full"
								disabled={isValidatingCoupon}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										validateCoupon();
									}
								}}
							/>
						</div>

						{couponError && (
							<p className="text-[#E60A32] text-sm mb-2">{couponError}</p>
						)}

						<button
							onClick={validateCoupon}
							disabled={isValidatingCoupon || !couponCode.trim()}
							className="w-full py-2 px-4 bg-[#E69818] text-white font-medium text-sm rounded-lg hover:bg-[#D18500] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
						>
							{isValidatingCoupon ? t('discountSection.processing') : t('discountSection.applyButton')}
						</button>
					</>
				) : (
					<div className="bg-green-50 border border-green-200 rounded-lg p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
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
									<p className="font-semibold text-green-800 text-sm mb-1">
										{t('discountSection.description')}
										{/*{t('discountSection.applied')}*/}
									</p>
									<p className="text-green-700 text-xs mb-1">
										{couponCode} - {t('discountSection.discount')} {toCurrency(discountAmount)}
									</p>
									<p className="text-green-600 text-xs font-medium">
										{/*{t('discountSection.description')}*/}
									</p>
								</div>
							</div>
							<button
								onClick={removeCoupon}
								className="text-green-600 hover:text-green-800 p-1"
								title={t('discountSection.remove')}
							>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
									 xmlns="http://www.w3.org/2000/svg">
									<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</button>
						</div>
					</div>
				)}

				{/* Reference Code Input - Always visible */}
				{/*<div className="relative mt-4">*/}
				{/*	<div className="absolute left-4 top-1/2 transform -translate-y-1/2">*/}
				{/*		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
				{/*			<path d="M8.33333 3.33333H5C4.07952 3.33333 3.33333 4.07952 3.33333 5V15C3.33333 15.9205 4.07952 16.6667 5 16.6667H15C15.9205 16.6667 16.6667 15.9205 16.6667 15V11.6667M14.1667 2.5C14.6269 2.03976 15.2732 1.77698 15.9476 1.77698C16.622 1.77698 17.2683 2.03976 17.7286 2.5C18.1888 2.96024 18.4516 3.60654 18.4516 4.28095C18.4516 4.95537 18.1888 5.60167 17.7286 6.0619L10 13.7905L6.66667 14.7619L7.63809 11.4286L15.3667 3.7" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>*/}
				{/*		</svg>*/}
				{/*	</div>*/}
				{/*	<input*/}
				{/*		type="text"*/}
				{/*		value={referralCode}*/}
				{/*		onChange={(e) => setReferralCode(e.target.value.toUpperCase())}*/}
				{/*		placeholder={t('discountSection.referralPlaceholder') || 'Nhập mã giới thiệu (nếu có)'}*/}
				{/*		className="font-inter text-[16px] text-[#333] p-[12px_16px_12px_44px] border border-[#DDDDDD] rounded-[12px] focus:outline-none focus:border-primary w-full"*/}
				{/*	/>*/}
				{/*</div>*/}
			</div>
		</>
	);
};

export default SummaryCheckout;

function useDebounce( value , delay = 500 ) {
	const [ debouncedValue, setDebouncedValue ] = useState ( value );

	useEffect( () => {
		const handler = setTimeout( () => {
			setDebouncedValue( value );
		}, delay );

		return () => {
			clearTimeout( handler );
		};
	}, [ delay, value ] );

	return debouncedValue;
}
