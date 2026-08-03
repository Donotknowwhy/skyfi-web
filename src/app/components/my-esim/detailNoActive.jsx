"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useMyEsim from "../../hooks/useMyEsim";
import {toCurrency} from "@/app/utils/format";

const DetailNoActive = ( { data } ) => {
	const t = useTranslations( "esim.noInstall" );
	const { showCodeAndroid , showCodeIos, showGuideESim } = useMyEsim( data );

	// Format data amount display
	const formatDataAmount = ( amount, unit ) => {
		if ( !amount || !unit ) return "N/A";
		return `${ amount } ${ unit }`;
	};

	// Format validity display
	const formatValidity = ( days ) => {
		if ( !days ) return "N/A";
		return days === 1 ? `${ days } day` : `${ days } days`;
	};

	return (

		<div className="max-w-[688px] container mx-auto my-6 ">

			<div className="bg-white rounded-xl shadow-lg p-6 mb-6">
				<h3 className="text-lg font-semibold text-neutral-800 text-center mb-4">
					{ t( "qrInstallTitle" ) }
				</h3>

				{/* QR Code Display */ }
				<div className="flex justify-center mb-4">
					{ data?.qrcode_url ? (
						<div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
							<img
								src={ data.qrcode_url }
								alt="QR Code"
								width={ 180 }
								height={ 180 }
								className="rounded-lg"
							/>
						</div>
					) : (
						<div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
							<div className="w-12 h-12 bg-gray-300 rounded"></div>
						</div>
					) }
				</div>

				<p className="text-sm text-gray-600 text-center mb-4">
					{ t( "qrInstallDescription" ) }
				</p>

				<button
					onClick={() => showGuideESim()}
					className="w-full  text-blue-700 py-3 px-4 rounded-lg font-medium 	transition-colors">
					{ t( "installGuideButton" ) }
				</button>
			</div>

			{/* Device Compatibility Section */ }
			<div className="mb-6">
				<h4 className="text-base font-medium mb-3 text-neutral-800">
					{ t( "deviceCompatibility" ) }
				</h4>
				<div className="flex gap-3">
					<button
						onClick={() => showCodeIos()}
						className="flex-1 flex justify-between text-neutral-800 bg-white hover:bg-gray-200 py-3 px-4 rounded-lg font-medium transition-colors">
						<span>
							{ t( "ios" ) }
						</span>
						<ChevronRightIcon className="inline-block w-5 h-5 ml-2 " />
					</button>
					<button
						onClick={() => showCodeAndroid()}
						className="flex-1 flex justify-between text-neutral-800 bg-white hover:bg-gray-200 py-3 px-4 rounded-lg font-medium transition-colors">
						<span>

							{ t( "android" ) }
						</span>
						<ChevronRightIcon className="inline-block w-5 h-5 ml-2 " />
					</button>

				</div>
			</div>

			{/* eSIM Information Section */ }
			<div className="space-y-3 bg-white p-4 rounded-lg shadow-lg">
				{/* Coverage */ }
				<div className="flex justify-between items-center py-3 px-4  rounded-lg">
					<span className="text-gray-600 font-medium">{ t( "coverage" ) }</span>
					<span className="font-medium text-neutral-800">{ data?.region_name || "N/A" }</span>
				</div>

				{/* Provider */ }
				<div className="flex justify-between items-center py-3 px-4  rounded-lg">
					<span className="text-gray-600 font-medium">{ t( "provider" ) }</span>
					<span className="font-medium text-neutral-800">{ data?.provider_name || "N/A" }</span>
				</div>

				{/* Activation Policy */ }
				<div className="flex justify-between items-center py-3 px-4  rounded-lg">
					<span className="text-gray-600 font-medium">{ t( "activationPolicy" ) }</span>
					<span className="font-medium text-sm text-neutral-800">{ t( "activateOnInstall" ) }</span>
				</div>

				{/* Data Capacity */ }
				<div className="flex justify-between items-center py-3 px-4  rounded-lg">
					<span className="text-gray-600 font-medium">{ t( "dataCapacity" ) }</span>
					<span className="font-medium text-neutral-800">
						{ formatDataAmount( data?.data_amount, data?.data_unit ) }
					</span>
				</div>

				{/* Validity */ }
				<div className="flex justify-between items-center py-3 px-4  rounded-lg">
					<span className="text-gray-600 font-medium">{ t( "validity" ) }</span>
					<span className="font-medium text-neutral-800">
						{ formatValidity( data?.validity_days ) }
					</span>
				</div>

				{/* Price */ }
				<div className="flex justify-between items-center py-3 px-4  rounded-lg">
					<span className="text-gray-600 font-medium">{ t( "price" ) }</span>
					<span className="font-medium text-neutral-800">
						{ data?.selling_price ? ` ${ toCurrency(data.selling_price) }` : "N/A" }
					</span>
				</div>

				{/* Package Type */ }
				<div className="flex justify-between items-center py-3 px-4  rounded-lg">
					<span className="text-gray-600 font-medium">{ t( "packageType" ) }</span>
					<span className="font-medium text-neutral-800">{ t( "dataOnly" ) }</span>
				</div>
			</div>
		</div>
	);
};

export default DetailNoActive;
