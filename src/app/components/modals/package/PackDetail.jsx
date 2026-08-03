"use client";

import { useTranslations } from "next-intl";
import Image from 'next/image';
import { toCurrency } from "../../../utils/format";
import { useModal } from "../../../utils/modal";
import Button from "../../form/button";

const PackDetail = ( props ) => {
	const t = useTranslations( 'packDetail' );

	const { close } = useModal();
	const { packageData, isBuy } = props;

	const { done } = useModal();

	const handleBuy = ( data ) => {
		console.log( 'Buying Package:', data );
		done( data );
	};





	// Mock data based on the Figma design - replace with actual package data


	return (
		<div className="bg-white rounded-xl w-full max-w-3xl mx-auto">
			{/* Header with close button */ }
			<div className="flex justify-end items-center px-5 pt-5 pb-0">
				<button
					onClick={ close }
					className="w-6 h-6 flex items-center justify-center"
				>
					<Image
						src="/assets/x-close.svg"
						alt="Close"
						width={ 14 }
						height={ 14 }
						className="text-gray-600"
					/>
				</button>
			</div>

			{/* Content */ }
			<div className="md:px-10 md:pb-10 md:pt-4 p-4">
				{/* Title */ }
				<div className="mb-5">
					<h2 className="text-2xl font-semibold text-gray-800 ">
						{ t( 'title' ) }
					</h2>
				</div>

				{/* Package Name */ }
				<div className="mb-5">
					<p className="text-base text-gray-600 mb-1">{ t( 'packageLabel' ) }</p>
					<h3 className="text-xl font-bold text-gray-900">{ packageData.name } - { packageData.validity_day } { t( 'validity' ) }</h3>
				</div>

				{/* Benefits List */ }
				<div className="flex gap-2 mb-6">
					{/* Data Benefit */ }
					<div className="flex-1 flex flex-col items-center gap-3 ">
						<div className="relative w-10 h-10">
							<div className="w-10 h-10 bg-red-600 rounded-sm flex items-center justify-center">
								<Image
									src="/assets/home/iconData.png"
									alt="Message"
									width={ 40 }
									height={ 40 }
									className="text-white"
								/>
							</div>
						</div>
						<div className="text-center flex-1">
							<p className="text-sm text-gray-600">{ t( 'free' ) }</p>
							<p className="text-base font-bold text-gray-900">
								{ packageData.data_per_day }{ t( 'dataPerDay' ) }
							</p>
						</div>
					</div>

					{/* SMS Benefit */ }
					<div className="flex-1 flex flex-col items-center gap-3">
						<div className="relative w-10 h-10">
							<div className="w-10 h-10 bg-red-600 rounded-sm flex items-center justify-center">
								<Image
									src="/images/simdata/iconMess.png"
									alt="Message"
									width={ 40 }
									height={ 40 }
									className="text-white"
								/>
							</div>
						</div>
						<div className="text-center flex-1">
							<p className="text-sm text-gray-600">{ t( 'free' ) }</p>
							<p className="text-base font-bold text-gray-900">
								{ packageData.free_sms } { t( 'sms' ) }
							</p>
						</div>
					</div>

					{/* Minutes Benefit */ }
					<div className="flex-1 flex flex-col items-center gap-3 ">
						<div className="relative w-10 h-10">
							<div className="w-10 h-10 bg-red-600 rounded-sm flex items-center justify-center">
								<Image
									src="/images/simdata/iconPhone.png"
									alt="Call"
									width={ 40 }
									height={ 40 }
									className="text-white"
								/>
							</div>
						</div>
						<div className="text-center flex-1">
							<p className="text-sm text-gray-600">{ t( 'free' ) }</p>
							<p className="text-base font-bold text-gray-900">
								{ packageData.free_call_minute } { t( 'minutes' ) }
							</p>
						</div>
					</div>
				</div>

				{/* Description Section */ }
				<div className="mb-6 bg-gray-300 rounded-xl overflow-hidden">
					<div dangerouslySetInnerHTML={ { __html: packageData.brief } } className="" />
				</div>

				{/* Bottom Price Section */ }
				<div className="flex  gap-3 flex-col md:flex-row items-center justify-between">
					<div className="w-fit">
						<div className="flex items-baseline gap-1">
							<span className="text-2xl font-medium text-red-600">
								{ toCurrency( packageData.sale_price ) }
							</span>
							<span className=" font-medium text-gray-500">
								/ { packageData.validity_day } { t( 'validity' ) }
							</span>
						</div>
						{packageData.price > packageData.sale_price && <div className="">
							<span className="font-medium text-gray-500 line-through">
								{ toCurrency( packageData.price ) }
							</span>
						</div>}
					</div>
					{ isBuy && <Button
						className="md:mt-0"
						onClick={ () => handleBuy( packageData ) }
						label={ t( 'register' ) }

					/>

					}
				</div>
			</div>
		</div>
	);
};

export default PackDetail;
