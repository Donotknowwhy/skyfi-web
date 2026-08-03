"use client";

import { useTranslations } from 'next-intl';
import { useModal } from '../../../utils/modal';

const ConfirmChangePackageModal = ( { data } ) => {
	const t = useTranslations( 'confirmChangePackageModal' );
	const { close, done } = useModal();


	const packageCurrent = data?.packageCurrent;

	// const package = data?.package;

	const phoneNumber = data?.msisdn || '';
	const currentPackage = packageCurrent?.packageName||packageCurrent?.currentPack || '';
	const remainingDays = packageCurrent?.toDate || '';
	return (
		<div className="relative">
			{/* Modal Content */ }
			<div className="flex flex-col items-center gap-[24px] p-[24px]">
				{/* Content Section */ }
				<div className="flex flex-col items-center gap-[12px] w-full">
					{/* Title */ }
					<h3 className="font-inter font-semibold text-[24px] leading-[1.33] text-[#333] text-center w-full">
						{ t( 'title' ) }
					</h3>

					{/* Description */ }
					<p className="font-inter text-[16px] leading-[1.5] text-[#333] text-center w-full">
						{ t( 'description', {
							phoneNumber: phoneNumber,
							currentPackage: currentPackage,
							remainingDays: remainingDays
						} ) }
					</p>
				</div>

				{/* Button Group */ }
				<div className="flex flex-row justify-stretch items-stretch gap-[12px] w-full">
					{/* Cancel Button */ }
					<div className="flex flex-col gap-[4px] flex-1">
						<button
							onClick={ close }
							className="flex justify-center items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] border border-[#FAA61A] bg-white font-inter font-semibold text-[16px] leading-[1.5] text-[#FAA61A] text-center transition-all hover:bg-[#FAA61A] hover:text-white active:bg-[#E8941A] w-full"
						>
							{ t( 'cancelButton' ) }
						</button>
					</div>

					{/* Confirm Button */ }
					<div className="flex flex-col gap-[4px] flex-1">
						<button
							onClick={ () => done( { packageCurrent, package: data.package ?? {}, phoneNumber } ) }
							className="flex justify-center items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#FAA61A] font-inter font-semibold text-[16px] leading-[1.5] text-white text-center transition-all hover:bg-[#E8941A] active:bg-[#D1840F] w-full"
						>
							{ t( 'confirmButton' ) }
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmChangePackageModal;
