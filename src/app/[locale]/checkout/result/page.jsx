'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Link, useRouter } from '../../../../i18n/navigation';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import CheckoutService from '../../../services/checkoutService';
import { toCurrency } from '../../../utils/format';
import { useLoad } from '../../../utils/load';
import HeaderCart from "@/app/components/HeaderCart";
import {trackEvent, trackPurchase} from "@/app/utils/trackingHelper";



export default function PaymentResult() {
	const searchParams = useSearchParams();
	const orderId = searchParams.get( 'orderId' );
	const t = useTranslations( 'payment-result' );
	const [ dataOrder, setDataOrder ] = useState( {} );
	const load = useLoad();
	const roueter= useRouter();



	const getOrderDetails = async ( orderId ) => {
		try {
			load.open()
			const orderDetails = await CheckoutService.getOrder( orderId );
			if(orderDetails?.order?.order_type?.includes("vj_landing_page")) {
				roueter.push(`/vj2/result?orderId=${orderId}`);
				return;

			}
            if(orderDetails?.order?.order_type?.includes('vj')) {
				roueter.push(`/travelsim/result?orderId=${orderId}`);
				return;

			}

			setDataOrder( orderDetails.order );

			// Track 1: Purchase conversion tracking
			await trackPurchase({
				transaction_id: orderDetails.order.order_code,
				order_id: orderDetails.order.id || orderDetails.order.order_code,
				customer_id: orderDetails.order.customer_id,
				transaction_revenue: orderDetails.order.total_amount,
				product_id: orderDetails.order.pack_code || orderDetails.order.order_code,
				product_name: orderDetails.order.pack_code || 'eSIM Travel',
				product_price: orderDetails.order.total_amount || 0,
				product_quantity: orderDetails.order.total_esim_travel || 1,
				currency: 'VND',
				payment_method: orderDetails.order.payment_method || 'unknown',
				commission_rate: orderDetails.order.commission_rate || 0,
			});

			// Track 2: Purchase event tracking
			await trackEvent({
				event_name: 'purchase',
				event_category: 'ecommerce',
				// product_id: orderDetails.order.pack_code || orderDetails.order.order_code,
				product_name: orderDetails.order.pack_code || 'eSIM Travel',
				product_price: orderDetails.order.total_amount || 0,
				product_quantity: orderDetails.order.total_esim_travel || 1,
				transaction_id: orderDetails.order.order_code,
				transaction_revenue: orderDetails.order.total_amount,
				currency: 'VND',
				payment_method: orderDetails.order.payment_method || 'unknown',
				event_params: {
					order_id: orderDetails.order.id || orderDetails.order.order_code,
					customer_id: orderDetails.order.customer_id,
					order_type: orderDetails.order.order_type,
					created_from: orderDetails.order.created_from,
					customer_name: orderDetails.order.customer_name,
					contact_phone: orderDetails.order.contact_phone,
					email: orderDetails.order.email,
				}
			});

		} catch ( error ) {
			console.error( error );

		} finally {
			load.close()
		}
	};
	useEffect( () => {
		getOrderDetails( orderId );
	}, [ orderId ] );






	const getStatusText = ( status ) => {
		const statusMap = {
			'CREATED': 'Đã tạo',
			'PAID': 'Đã thanh toán',
			'COMPLETE': 'Hoàn thành',
			'CANCEL': 'Hủy',
			'SHIPPING': 'Chuyển đơn vận',
			'PROCESSING': 'Đang xử lý'
		};

		return statusMap[ status ] || status;
	};
    const renderHeader=()=>{
        if(!dataOrder?.created_from){
            return <HeaderCart/>
        }
        if(dataOrder?.created_from==="WEB_VJ"){
            return <HeaderCart/>
        }
        else return <Header />
    }
    const renderFooter=()=>{
        if(!dataOrder?.created_from){
            return null
        }
        if(dataOrder?.created_from==="WEB_VJ"){
            return null
        }
        else return <Footer />
    }


	return (
		<div className="bg-gray-100 min-h-screen ">
			{renderHeader()}

			<div className="container">
				<div className="max-w-7xl mx-auto min-h-[60vh] py-10 space-y-5 px-4">
					{!load.loading && dataOrder.status &&
					<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
						{/* Logo Section */ }
						<div className="flex items-center justify-between border-b border-gray-200 pb-4">
							<div className="flex items-center space-x-2">
								<Image
									src="/assets/logoWithVietJet.svg"
									alt="SkyFi Logo"
									width={ 120 }
									height={ 40 }
									className="h-10 w-auto"
								/>
							</div>
						</div>


						{ dataOrder.status !== 'CREATED' ?
							( <div className="text-center space-y-2">
								<div className="flex justify-center">
									<svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
											d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<h1 className="text-2xl font-bold text-green-600">{ t( 'success.title' ) }</h1>
								<p className="text-gray-700 font-semibold text-lg max-w-md mx-auto">
									{ t( 'success.message' ) }
								</p>
							</div>
							) :
							( <div className="text-center space-y-2">
								<div className="flex justify-center">
									<svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h1 className="text-2xl font-bold text-red-600">{ t( 'error.title' ) }</h1>
								<p className="text-gray-700 font-semibold text-lg max-w-md mx-auto">
									{ t( 'error.message' ) }
								</p>

							</div> ) }

						{/* Order Details */ }
						<div className="space-y-2 text-base">
							<p className="text-gray-800">{ `${ t( 'orderDetails.orderId' ) }:  ` }<span className='font-bold'>{ dataOrder?.order_code ||'' }</span></p>
							<p className="text-gray-800">{ `${ t( 'orderDetails.purchaseDate' ) }: ` }<span className='font-bold'>{ dataOrder?.created_at || '' }</span></p>
							<p className="text-gray-800">{ `${ t( 'orderDetails.esimQuantity' ) }: ` }<span className='font-bold'>{ dataOrder?.total_esim ||0}</span></p>
							<p className="text-gray-800">{ `${ t( 'orderDetails.esimQuantityTravel' ) }: ` }<span className='font-bold'>{ dataOrder?.total_esim_travel || 0 }</span></p>
							<p className="text-gray-800">{ `${ t( 'orderDetails.usimQuantity' ) }: ` }<span className='font-bold'>{ dataOrder?.total_usim || 0 }</span></p>
							{
								dataOrder?.order_type==='package' &&
								<p className="text-gray-800">{ `${ t( 'orderDetails.package' ) }: ` }<span className='font-bold'>{ dataOrder?.pack_name } - {toCurrency(dataOrder?.pack_price)}</span></p>
							}
							<p className="text-gray-800">{ `${ t( 'orderDetails.total' ) }: ` } <span className='font-bold'>{ toCurrency( dataOrder?.total_amount ) || 0 }</span></p>
						</div>

						{/* Thank You Message */ }
						<p className="text-center text-gray-700">
							{ t( 'thankYou' ) }
						</p>

						{/* Home Button */ }
						{dataOrder.created_from==="WEB_VJ"?
							<div className="pt-4">
								<Link
									href={`/travel-esim?type=national&src=vj`}
									className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg text-center hover:from-yellow-600 hover:to-yellow-500 transition-all"
								>
									{ t( 'homeButton' ) }
								</Link>
							</div> :
							<div className="pt-4">
							<Link
								href="/"
								className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg text-center hover:from-yellow-600 hover:to-yellow-500 transition-all"
							>
								{ t( 'homeButton' ) }
							</Link>
						</div>}

					</div>}
				</div>
			</div>
            {renderFooter()}

		</div>
	);
}


