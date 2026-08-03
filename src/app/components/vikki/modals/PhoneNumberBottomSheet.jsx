'use client';

import { InputSearchNumberVikki } from '@/app/components/form/inputSreachNumber';
import { useLoad } from '@/app/utils/load';
import { useModal } from '@/app/utils/modal';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import VikkiService from '../../../services/vikkiService';
import { formatPhoneNumber, toCurrency } from '../../../utils/format';

const PhoneNumberBottomSheet = () => {
	const { done, close: closeModal } = useModal();
	const [ listSim, setListSim ] = useState( [] );
	const [ selectedSim, setSelectedSim ] = useState( null );
	const [ isListSim, setIsListSim ] = useState( false );
	const { open, close } = useLoad();


	const getListSim = async ( query ) => {
		try {
			open();
			const res = await VikkiService.searchSim(
				{
					filters: {
						search: query ? '070' + ( query || '' ) : '',
					},
					page: 1,
					pageSize: 20
				}
			);
			setListSim( ( data ) => {
				if ( res.length <= 0 ) {
					return data;
				}
				return res;
			} );
			setIsListSim( res.length > 0 );
		} catch ( error ) {
			console.error( 'Error fetching sim data:', error );
		} finally {
			close();
		}
	};



	useEffect( () => {
		getListSim();
	}, [] );

	const handleSearch = ( query ) => {
		getListSim( query );
	};


	const handleSimSelect = ( id ) => {
		setSelectedSim( id );
	};

	const handleConfirm = () => {
		if ( selectedSim ) {
			const selected = listSim.find( sim => sim.msisdn_id === selectedSim );
			console.log( 'Confirming selection:', selected );

			done( selected );
		}
	};

	return (
		<div className="w-full bg-white rounded-t-2xl max-h-[90vh] flex flex-col">
			{/* Header */ }
			<div className="flex items-center justify-between  py-2 ">
				{/* Close button */ }
				<button
					onClick={ closeModal }
					className="p-3 hover:bg-gray-100 rounded-full transition-colors"
				>
					<svg width="25" height="25" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>

				{/* Title */ }
				<h3 className="text-lg font-semibold text-[#333333] font-inter text-center flex-1">
					Chọn số khác
				</h3>

				{/* Spacer */ }
				<div className="w-11"></div>
			</div>

			{/* Search Section */ }

			<InputSearchNumberVikki
				onSearch={ handleSearch }
				prefix='x' number={ 7 }
			/>

			{ !isListSim && (
				<div className="w-full text-center text-neutral-500 flex flex-col items-center mb-6">
					<Image src="/images/simdata/no_search.svg" alt="No data" width={ 50 } height={ 50 } className="w-20 h-20 mb-2" />
					<p className="text-sm">!!! Rất tiếc, số bạn đang tìm hiện không còn. Có thể bạn sẽ thích những số sau:</p>
				</div>
			) }

			{/* Phone Numbers List */ }
			<div className="flex-1 px-4 pb-4 overflow-y-auto min-h-0">
				<div className="space-y-4">
					{ listSim.map( ( phone ) => {
						const base_price = phone.base_price;
						const sale_price = phone.sale_price;
						let isSelected = selectedSim === phone.msisdn_id;

						return ( <div
							key={ phone.msisdn_id }
							onClick={ () => handleSimSelect( phone.msisdn_id ) }
							className={ `relative p-4 rounded-xl border cursor-pointer transition-all ${ isSelected
								? 'border-2 border-[#0000EA] bg-white shadow-md'
								: 'border border-[#F1F1F1] bg-white shadow-sm hover:border-gray-300'
								}` }
							style={ {
								boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)'
							} }
						>
							{/* Phone Number */ }
							<div className="text-xl font-semibold text-[#333333] font-inter mb-1">
								{ formatPhoneNumber( phone.msisdn ) }
							</div>

							{/* Divider Line */ }
							<div className="w-full h-px bg-[#F1F1F1] my-2"></div>

							{/* Price Section */ }
							<div className={clsx('flex items-center  gap-2',sale_price < base_price?'justify-between':'justify-end')} >
								{ sale_price < base_price ? (
									<>
										<span className="text-xs sm:text-xs text-[#A1A1A1] line-through mr-1">{ toCurrency( base_price ) }</span>
										<span className="text-sm sm:text-base font-medium text-[#ED1B2F]">{ toCurrency( sale_price ) }</span>
									</>
								) : (
									<span className="text-sm sm:text-base font-medium text-gray-600">{ toCurrency( sale_price ) }</span>
								) }
							</div>

							{/* Radio Button */ }
							<div className="absolute top-3 right-3">
								<div className={ `w-5 h-5 rounded-full border-2 flex items-center justify-center ${ isSelected
									? 'border-[#0000EA]'
									: 'border-[#A1A1A1]'
									}` }>
									{ isSelected && (
										<div className="w-3 h-3 rounded-full bg-[#0000EA]"></div>
									) }
								</div>
							</div>
						</div>
						);
					}
					) }
				</div>
			</div>

			{/* Confirm Button */ }
			<div className="p-4 bg-white border-t border-[#F1F1F1]">
				<button
					onClick={ handleConfirm } disabled={ !selectedSim }
					className="w-full btnvikki text-white font-semibold text-base rounded-lg font-inter disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Xác nhận
				</button>

				{/* Home Indicator */ }
				<div className="flex justify-center mt-3">
					<div className="w-35 h-1.5 bg-black rounded-full"></div>
				</div>
			</div>
		</div>
	);
};

export default PhoneNumberBottomSheet;