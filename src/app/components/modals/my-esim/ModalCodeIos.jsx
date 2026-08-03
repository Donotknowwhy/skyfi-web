'use client';

import { ClipboardDocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useModal } from '../../../utils/modal';

const ModalCodeIos = ( { data } ) => {
	const t = useTranslations( 'my-esim.modalCodeIos' );
	const [ copiedSmdp, setCopiedSmdp ] = useState( false );
	const [ copiedActivation, setCopiedActivation ] = useState( false );
	const { close } = useModal();

	// Extract SM-DP address and activation code from qrcode
	const extractCodesFromQR = ( qrcode ) => {
		if ( !qrcode ) return { smdpAddress: '', activationCode: '' };

		// QR code format: LPA:1$sm-dp-address$activation-code
		const parts = qrcode.split( '$' );
		if ( parts.length >= 3 ) {
			return {
				smdpAddress: parts[ 1 ] || '',
				activationCode: parts[ 2 ] || ''
			};
		}

		// Fallback for demo data
		return {
			smdpAddress: 'sin.prod.ondemandconnectivity.com',
			activationCode: '2FB6416833BE87F8D9DF9DE9302155EBA7F389F39C8301FA619688A824625CE7'
		};
	};

	const { smdpAddress, activationCode } = extractCodesFromQR( data?.qrcode );

	const handleCopySmdp = async () => {
		try {
			await navigator.clipboard.writeText( smdpAddress );
			setCopiedSmdp( true );
			setTimeout( () => setCopiedSmdp( false ), 2000 );
		} catch ( err ) {
			console.error( 'Failed to copy SM-DP address: ', err );
		}
	};

	const handleCopyActivation = async () => {
		try {
			await navigator.clipboard.writeText( activationCode );
			setCopiedActivation( true );
			setTimeout( () => setCopiedActivation( false ), 2000 );
		} catch ( err ) {
			console.error( 'Failed to copy activation code: ', err );
		}
	};

	return (
		<div className="bg-white rounded-xl w-full">
			{/* Header with close button */ }
			<div className="flex justify-end items-center p-5 pb-0">
				<button
					onClick={ close }
					className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
				>
					<XMarkIcon className="w-4 h-4 text-gray-600" />
				</button>
			</div>

			{/* Content */ }
			<div className="px-10 pb-10">
				{/* Title */ }
				<div className="mb-5">
					<h2 className="text-[28px] font-semibold text-[#333333] leading-[1.29] font-inter">
						{ t( 'title' ) }
					</h2>
				</div>

				{/* Main content */ }
				<div className="space-y-5 pb-10">
					{/* SM-DP Address section */ }
					<div className="space-y-3">
						{/* Section header with copy button */ }
						<div className="flex items-center justify-between gap-3">
							<h3 className="text-base font-semibold text-[#333333] font-inter flex-1">
								{ t( 'smdpAddressTitle' ) }
							</h3>
							<button
								onClick={ handleCopySmdp }
								className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-[#FAA61A] rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-200"
							>
								<ClipboardDocumentIcon className="w-4 h-4" />
								{ copiedSmdp ? 'Copied!' : t( 'copyCodeButton' ) }
							</button>
						</div>

						{/* SM-DP Address display box */ }
						<div className="bg-[#F5F5F5] rounded-xl p-4">
							<div className="text-base font-medium text-[#333333] text-center break-all font-inter leading-6">
								{ smdpAddress }
							</div>
						</div>
					</div>

					{/* Activation Code section */ }
					<div className="space-y-3">
						{/* Section header with copy button */ }
						<div className="flex items-center justify-between gap-3">
							<h3 className="text-base font-semibold text-[#333333] font-inter flex-1">
								{ t( 'activationCodeTitle' ) }
							</h3>
							<button
								onClick={ handleCopyActivation }
								className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-[#FAA61A] rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-200"
							>
								<ClipboardDocumentIcon className="w-4 h-4" />
								{ copiedActivation ? 'Copied!' : t( 'copyCodeButton' ) }
							</button>
						</div>

						{/* Activation Code display box */ }
						<div className="bg-[#F5F5F5] rounded-xl p-4">
							<div className="text-base font-medium text-[#333333] text-center break-all font-inter leading-6">
								{ activationCode }
							</div>
						</div>

						{/* Note */ }
						<p className="text-sm text-[#8A8A8A] leading-[1.43] font-inter">
							{ t( 'note' ) }
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalCodeIos;
