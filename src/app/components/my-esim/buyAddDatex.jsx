import { toCurrency } from '@/app/utils/format';
import { useLoad } from '@/app/utils/load';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MyESimService from '../../services/myEsimService';
import {getLocal, saveLocal} from '../../utils/saveLocal';
import { showModalMess } from '../modals/modalMess';

const BuyAddData = ( { iccid, sim } ) => {
	const t = useTranslations( 'defaultEsim' );
	const [ dataPackages, setDataPackages ] = useState( [] );
	const loader = useLoad();
	const router = useRouter();


	const getListTopup = async () => {
		try {
			const listData = await MyESimService.getListTopupESim( iccid );
			if ( listData && listData.length > 0 ) {
				return listData;
			}
		} catch ( error ) {
			return [];
		}
	};

	useEffect( () => {
		const fetchData = async () => {
			try {
				loader.open();
				const topupData = await getListTopup();
				if ( topupData.length > 0 ) {
					setDataPackages( topupData );
				}
			} catch ( error ) {
				console.error( 'Error fetching topup data:', error );
			} finally {
				loader.close();
			}
		};

		fetchData();
	}, [ iccid ] );


	const convertDataToCheckout = ( data,orderNumber ) => {
		return {
			iccid: iccid,
			email:localStorage.getItem('cartId')?.replaceAll('"', '') || '',
			name:'',
			product_id: data.product_id,
			orderNumber: orderNumber || '',
			products: [
				{
					id: 1,
					name: data.name,
					quantity: 1,
					price: data.selling_price,
					image: '/assets/home/iconData.png'
				}
			],
			subtotal: data.selling_price,
			taxAndFees: 'Đã bao gồm',
			total: 	data.selling_price,
			totalProducts: 1
		};
	};

	const addData = async (data ) => {


		try {

			loader.open();
			const orderNumberLink = await MyESimService.addTopupPackage( data.product_id, iccid );
			if ( orderNumberLink ) {
				saveLocal('orderData', convertDataToCheckout( data, orderNumberLink ) );
				const link = await MyESimService.getLinkPayment( orderNumberLink );
				if ( link ) {
					router.push( link );
					return;
				}
				// router.push( '/checkout/payment/esim' );
				return;
			}
			showModalMess( {
				label: 'Thông báo',
				message: 'Có lỗi xảy ra trong quá trình thêm gói dữ liệu',
				type: 'error',
			} );
		} catch ( error ) {
			showModalMess( {
				label: 'Thông báo',
				message: 'Có lỗi xảy ra trong quá trình thêm gói dữ liệu',
				type: 'error',
			} );
		} finally {
			loader.close();
		}
	};




	// 	{
	//     "id": "zivjo-7-days-1gb-topup",
	//     "type": "topup",
	//     "price": 5,
	//     "amount": 1024,
	//     "day": 7,
	//     "is_unlimited": false,
	//     "title": "1 GB - 7 Days",
	//     "data": "1 GB",
	//     "short_info": null,
	//     "voice": null,
	//     "text": null,
	//     "net_price": 4,
	//     "name": "1 GB - 7 Days",
	//     "selling_price": 672750,
	//     "currency": "VND",
	//     "product_id": 1276
	// }


	if ( dataPackages.length <= 0 ) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-500">{ t( 'additionalData.noPackages' ) }</p>
			</div>
		);
	}

	return (
		<div>
			{/* Buy Additional Data */ }
			<div>
				<h2 className="text-2xl font-semibold mb-6 font-koho text-neutral-900">{ t( 'additionalData.title' ) }</h2>

				<div className="grid grid-cols-1 md:grid-cols-2  gap-6">
					{ dataPackages.map( ( pkg ) => (
						<div key={ pkg.id } className="bg-white rounded-ss-lg rounded-se-lg shadow-sm overflow-hidden">
							<div className=" p-4 relative overflow-hidden">
								<Image fill className="absolute inset-0 object-cover" src={ '/images/my-esim/bg-item.png' } />


								<h3 className="text-lg font-semibold relative z-10 font-koho text-neutral-900">
									{ t( 'additionalData.package.name', { number: pkg.title } ) }
								</h3>
							</div>

							<div className="p-4 space-y-3">
								<div className="flex justify-between py-2 border-b border-gray-100">
									<span className="text-sm font-koho text-neutral-900 ">{ t( 'esimInfo.dataCapacity' ) }</span>
									<span className="font-semibold font-koho text-neutral-900">{ t( 'additionalData.package.capacity', { capacity: pkg.data } ) }</span>
								</div>

								<div className="flex justify-between py-2 border-b border-gray-100">
									<span className="text-sm  font-koho text-neutral-900">{ t( 'esimInfo.validity' ) }</span>
									<span className="font-semibold font-koho text-neutral-900">{ t( 'additionalData.package.validity', { days: pkg.day } ) }</span>
								</div>

								<div className="flex justify-between py-2">
									<span className="text-sm  font-koho text-neutral-900">{ t( 'esimInfo.price' ) }</span>
									<span className="font-semibold font-koho text-neutral-900">{ t( 'additionalData.package.price', { price: toCurrency( pkg.selling_price, '' ) } ) }</span>
								</div>
							</div>

							<div className="p-4 border-t border-gray-100">
								<button onClick={ () => addData( pkg ) } className="w-full py-3 px-6 bg-amber-500 font-koho  hover:bg-amber-600 text-white font-semibold rounded-lg transition">
									{ t( 'additionalData.package.buyNow' ) }
								</button>
							</div>
						</div>
					) ) }
				</div>
			</div>


		</div>
	);
};

export default BuyAddData;
