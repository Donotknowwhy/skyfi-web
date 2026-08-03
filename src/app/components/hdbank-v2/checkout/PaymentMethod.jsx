import CheckoutService from '@/app/services/checkoutService';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const PaymentMethod = () => {
	const { control, register, formState: { errors }, setValue } = useFormContext();
	// Hardcoded translations for Vikki app
	const t = {
		'paymentMethod.title': 'Phương thức thanh toán',
		'paymentMethod.galaxypay': 'Thanh toán bằng thẻ (ATM/Visa/Master/JCB/QR)',
		'paymentMethod.domestic': 'Thẻ ATM nội địa',
	};

	const [ paymentMethod, setPaymentMethod ] = useState( [] );
	const searchParams = useSearchParams();
	const viewSrc = searchParams.get( 'src' ) || 'skyfi';

	const getPaymentMethod = async () => {
		try {
			const paymentMethodRes = viewSrc === 'vj' ? await CheckoutService.getPaymentMethods_SKYJOY() : await CheckoutService.getPaymentMethods();
			const temPaymentMethod = paymentMethodRes.map((item) => {
				if(item.paymentMethod === "GALAXYPAY"){
					return {
						...item,
						name: t["paymentMethod.galaxypay"]
					}
				}
                if(item.paymentMethod === "international"){
					return {
						...item,
						name: t["paymentMethod.galaxypay"]
					}
				}
                if(item.paymentMethod === "domestic"){
					return {
						...item,
						name: t["paymentMethod.domestic"]
					}
				}
				return item
			})
			setPaymentMethod( temPaymentMethod );
		} catch ( error ) {
			console.error( 'Error fetching payment method:', error );
		}
	};

	let [ isFullEsim, payment_method, hasEsim ] = useWatch( { control, name: [ 'isFullEsim', 'payment_method', 'hasEsim' ] } );

	useEffect( () => {
		getPaymentMethod();
	}, [] );

	const payments = useMemo(() => {
		return isFullEsim || hasEsim ? paymentMethod.filter( ( item ) => item.paymentMethod != 'COD' ) : paymentMethod;
	}, [isFullEsim, hasEsim, paymentMethod]);

	const imagePayment = {
		VISA: '/images/checkout/visa.png',
		international: '/images/checkout/visa.png',
		GALAXYPAY: '/images/checkout/visa.png',
		DOMESTIC: '/images/checkout/napas.png',
		domestic: '/images/checkout/napas.png',
		QRPAY: '/images/checkout/QR.jpeg',
		COD: '/images/checkout/COD.jpeg',
	};

	useEffect(() => {
		if(payments && payments.length > 0 && !payment_method){
			setValue("payment_method", payments[0].paymentMethod);
		}
	}, [payments, payment_method]);

	return (
		<div className="bg-white rounded-[16px] p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] mb-3 sm:mb-[24px]">
			<h2 className="font-inter font-bold text-[18px] leading-[24px] text-[#1C1C1E] mb-[16px]">{ t['paymentMethod.title'] }</h2>

			<div className="flex flex-col gap-[12px]">
				{/* Payment Method List */ }
				{ payments.map( ( item, index ) => (
					<label key={ index } className={ `flex items-center gap-3 p-[12px] rounded-[12px] cursor-pointer transition-all ${ item.paymentMethod === payment_method ? 'bg-[#FFF5F0] border border-[#DA2128]' : 'border border-[#E5E5E5] bg-white' }` }>
						<div className="relative w-[20px] h-[20px] block">
							<input
								type="radio"
								name="paymentMethod"
								{ ...register( 'payment_method' ) }
								value={ item.paymentMethod }
								checked={ item.paymentMethod === payment_method }
								className="absolute peer opacity-0 w-full h-full cursor-pointer"
							/>
							<div className={ `w-full h-full rounded-full border flex items-center justify-center absolute top-0 left-0 pointer-events-none peer-checked:border-[#DA2128] border-[#C7C7CC] bg-white` } />
							<div className="w-[10px] h-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:bg-[#DA2128] bg-transparent rounded-full transition-colors" />
						</div>
						<div className="flex items-center gap-2">
							<Image src={ imagePayment[ item.paymentMethod ] } width={ 32 } height={ 32 } alt="Payment Icon" className="object-contain" />
						</div>
						<span className="font-inter font-medium text-[14px] text-[#1C1C1E] flex-1">{ item.name }</span>
					</label>
				) ) }
			</div>
			{/* Error Message */ }
			{ errors?.payment_method && (
				<span className="text-red-500 text-[14px] font-inter mt-[8px]">{ errors.payment_method.message }</span>
			) }
		</div>
	);
};

export default PaymentMethod;