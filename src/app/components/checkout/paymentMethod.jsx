import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import CheckoutService from '../../services/checkoutService';
import {useSearchParams} from "next/navigation";

const PaymentMethod = () => {
	const { control, register, formState: { errors },setValue } = useFormContext();
	const t = useTranslations( 'checkout' );
	const [ paymentMethod, setPaymentMethod ] = useState( [] );
	const searchParams = useSearchParams();
	const viewSrc = searchParams.get( 'src' ) || 'skyfi';
	const getPaymentMethod = async () => {
		try {
			const paymentMethod =viewSrc==='vj'? await CheckoutService.getPaymentMethods_SKYJOY(): await CheckoutService.getPaymentMethods();
			const temPaymentMethod= paymentMethod.map((item) => {
				if(item.paymentMethod==="GALAXYPAY"){
					return {
						...item,
						name:t("paymentMethod.galaxypay")
					}
				}
                if(item.paymentMethod==="international"){
					return {
						...item,
						name:t("paymentMethod.galaxypay")
					}
				}
                if(item.paymentMethod==="domestic"){
					return {
						...item,
						name:t("paymentMethod.domestic")
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
		<div className="bg-white rounded-[12px] p-[24px] mb-3 sm:mb-[24px]">
			<h2 className="font-inter font-semibold text-[22px] leading-[1.2em] text-[#333] mb-[16px]">{ t( 'paymentMethod.title' ) }</h2>

			<div className="flex flex-col gap-[12px]">
				{/* Payment Method List */ }
				{ payments.map( ( item, index ) => (
					<label key={ index } className={ `flex items-center gap-3 p-[12px] rounded-[8px] cursor-pointer ${ item.paymentMethod === payment_method ? 'bg-[#FFF6E8] border border-[#E69818]' : 'border border-[#DDDDDD]' }` }>
						<div className="relative w-[20px] h-[20px]">
							<input
								type="radio"
								name="paymentMethod"
								{ ...register( 'payment_method' ) }
								value={ item.paymentMethod }
								checked={ item.paymentMethod === payment_method }

								className="absolute peer opacity-0 w-full h-full cursor-pointer"
							/>
							<div className={ `w-full h-full rounded-full border flex items-center justify-center absolute top-0 left-0 pointer-events-none  peer-checked:border-primary border-neutral-800` } />

							<div className="w-[10px] h-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:bg-primary bg-transparent rounded-full" />
						</div>
						<div className="flex items-center gap-2">
							<Image src={ imagePayment[ item.paymentMethod ] } width={ 32 } height={ 32 } alt="Visa" />
						</div>
						<span className="font-inter font-semibold text-[16px] text-[#333]">{ item.name }</span>
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
