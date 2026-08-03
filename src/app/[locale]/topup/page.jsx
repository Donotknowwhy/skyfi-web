"use client";
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from '../../../i18n/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { showModalMess } from '../../components/modals/modalMess';
import CheckoutService from '../../services/checkoutService';
import TopupService from '../../services/topup';
import { toCurrency } from '../../utils/format';
import { useLoad } from '../../utils/load';

// Icon components
const XCloseIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18 6L6 18M6 6L18 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const ChevronLeftIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15 18L9 12L15 6" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const CheckIcon = () => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const VietnamFlag = () => (
	<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="21" height="21" rx="8" fill="#E4262B" />
		<path d="M10.5 6L11.618 9.382L15 8.382L12.382 10.5L15 12.618L11.618 11.618L10.5 15L9.382 11.618L6 12.618L8.618 10.5L6 8.382L9.382 9.382L10.5 6Z" fill="white" />
	</svg>
);

export default function TopUpPage() {
	const t = useTranslations( 'topup' );

	const [ isModalOpen, setIsModalOpen ] = useState( true );
	const [ networks, setNetworks ] = useState( [] );
	const [ topupValues, setTopupValues ] = useState( [] );
	const locale = useLocale();
	const router = useRouter();
	const load = useLoad();

	const { register, handleSubmit, control, setValue, formState } = useForm( {
		mode: 'onChange',
	} );



	const getListNetwork = async () => {
		try {
			const networks = await TopupService.getTopupNetwork();
			if ( networks && networks.length > 0 ) {
				setNetworks( networks );
			}
		} catch ( error ) {
			console.error( 'Error fetching networks:', error );
		}
	};

	useEffect( () => {
		getListNetwork();
	}, [] );

	const getListTopupValue = async ( networkId ) => {
		try {
			load.open();
			const topupValues = await TopupService.getTopupValue( networkId );
			if ( topupValues && topupValues.length > 0 ) {
				setTopupValues( topupValues );
				setValue( 'product_id', topupValues[ 0 ].id );
				setValue( 'total_amount', topupValues[ 0 ].value );
			}
		} catch ( error ) {
			console.error( 'Error fetching topup values:', error );
		} finally {
			load.close();
		}
	};
	useEffect( () => {
		if ( networks.length > 0 ) {
			// getListTopupValue( networks[ 0 ].id );
			getListTopupValue( 1 );
		}
	}, [ networks ] );

	const handleAmountSelect = ( value ) => {
		setSelectedAmount( value );
	};

	const handleTopUp = async ( data ) => {
		try {
			load.open();
			const response = await TopupService.createOrderTopup( data );
			if ( response.success ) {


				const paymentParams = {
					orderNumber: response.data.order_number,
					orderDescription: 'Order description ' + response.data.order_number,
					paymentMethod: 'GALAXYPAY',
					locale: locale,
					sourceType: ""
				};
				const paymentLink = await CheckoutService.getlinkPayment( paymentParams );
				if ( !paymentLink.redirectUrl ) {
					throw new Error( 'Payment link not found' );
				}
				router.push( paymentLink.redirectUrl );
			} else {
				showModalMess( {
					label: t( 'titleMessage' ),
					type: 'error',
					message: response.message,
					onClose: () => {

					}
				} );
			}

		} catch ( error ) {
			console.error( 'Error creating topup order:', error );
			showModalMess( {
				label: t( 'titleMessage' ),
				type: 'error',
				message: error.message,
				onClose: () => {

				}
			} );

		} finally {
			load.close();
		}
	};





	return (
		<div className="bg-white min-h-screen flex flex-col">
			<Header />

			{/* Overlay */ }
			<div className="  container  flex items-center justify-center p-8">
				{/* Modal */ }
				<div className="bg-white rounded-xl md:max-w-[486px] md:shadow-md md:border p-4 border-neutral-200 w-full  overflow-y-auto">

					{/* Modal Content */ }
					<div className="md:px-10 pb-10">
						{/* Title */ }
						<div className="flex items-center gap-1 mb-5">

							<h1 className="text-[28px] font-semibold text-[#333333] font-inter leading-[1.29]">
								{ t( 'title' ) }
							</h1>
						</div>

						{/* SIM Card Section */ }
						<div className="bg-white border border-gray-100 rounded-xl p-4 mb-5 shadow-sm">
							<div className="flex items-center gap-2">
								{/* Vietnam Flag */ }
								<div className="w-[41px] h-[41px] bg-[#E4262B] rounded-lg flex items-center justify-center ">
									<img src="https://bss-api.skyfi.network/api/bss/tool/image/icon_skyfi.png" alt="Vietnam Flag" className='w-full h-full object-cover' />
								</div>

								<div className="flex-1 border-b border-[#F1F1F1] pb-1 ">
									<div className="text-sm text-[#5C5C5C] font-koho">
										{ t( 'phoneNumber' ) }
									</div>

									<input type="text" { ...register( 'contact_phone', {
										required: {
											value: true,
											message: t( 'requiredPhoneNumber' )
										},
										pattern: {
											value: /^(070)(\d{7})$/,
											message: t( 'invalidPhoneNumber' )
										},

									} ) } placeholder={ t( 'placeholderPhoneNumber' ) }
										maxLength={ 10 }
										className='text-lg peer font-bold w-full text-[#333333] font-koho leading-[1.44] focus-visible:outline-none' />

									{ formState.errors.contact_phone && (
										<div className="text-red-500 text-xs mt-1">
											{ formState.errors.contact_phone.message }
										</div>
									) }
								</div>
							</div>
						</div>

						{/* Amount Selection */ }
						<Controller
							name="product_id"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<div className="flex flex-wrap gap-2 mb-5">
									{ topupValues && topupValues.map( ( option ) => (
										<button
											key={ option.value }
											onClick={ () => {
												onChange( option.id );
												setValue( 'total_amount', option.value );
											} }
											className={ `relative flex-1 basis-[150px] px-4 py-3 rounded-lg border font-medium text-base font-inter leading-6 transition-all
                    ${ value === option.id
													? 'bg-[#FEF7E9] border-[#F4B321] text-[#333333]'
													: 'bg-white border-[#DDDDDD] text-[#333333] hover:border-[#F4B321]'
												}
                  `}
										>
											{ toCurrency( option.value ) }
											{ value === option.id && (
												<div className="absolute -top-0.5 -right-1 w-6 h-[25px] flex items-center justify-center">
													<div className="w-7 h-7 bg-[#F4B321] rounded-full flex items-center justify-center -ml-1">
														<CheckIcon />
													</div>
												</div>
											) }
										</button>
									) ) }
								</div> ) } />


						{/* Top Up Button */ }
						<button
							onClick={ handleSubmit( handleTopUp ) }
							className="w-full bg-[#FAA61A] text-white py-3 px-6 rounded-lg font-semibold text-base font-inter leading-6 hover:bg-[#e8951a] transition-colors"
						>
							{ t( 'topupNowButton' ) }
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
