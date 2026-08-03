'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PackageService from '../../../services/package';
import { useModal } from '../../../utils/modal';


// Validation schema
const schema = yup.object( {
	otp: yup
		.string()
		.required( 'OTP is required' )
		.length( 6, 'OTP must be 6 digits' )
		.matches( /^\d{6}$/, 'OTP must contain only numbers' ),
} );

const ModalOTP = ( { data } ) => {
	const t = useTranslations( 'modalOTP' );
	const [ otpValues, setOtpValues ] = useState( [ '', '', '', '', '', '' ] );
	const [ countdown, setCountdown ] = useState( 60 );
	const [ canResend, setCanResend ] = useState( false );
	const [ isSubmitting, setIsSubmitting ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const inputRefs = useRef( [] );

	const { done, close } = useModal();




	// Extract phone number and package code from data
	const phoneNumber = data?.msisdn || data?.phoneNumber;
	const packageCode = data?.package.code;

	const {
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm( {
		resolver: yupResolver( schema ),
		defaultValues: {
			otp: '',
		},
	} );

	// Initialize input refs
	useEffect( () => {
		inputRefs.current = inputRefs.current.slice( 0, 6 );
	}, [] );

	// Countdown timer
	useEffect( () => {
		if ( countdown > 0 ) {
			const timer = setTimeout( () => {
				setCountdown( countdown - 1 );
			}, 1000 );
			return () => clearTimeout( timer );
		} else if ( countdown === 0 ) {
			setCanResend( true );
		}
	}, [ countdown ] );

	// Reset state when component mounts
	useEffect( () => {
		setOtpValues( [ '', '', '', '', '', '' ] );
		setCountdown( 60 );
		setCanResend( false );
		setIsSubmitting( false );
		setErrorMessage( '' );
		setValue( 'otp', '' );
		clearErrors();
		// Focus first input
		setTimeout( () => {
			if ( inputRefs.current[ 0 ] ) {
				inputRefs.current[ 0 ].focus();
			}
		}, 100 );
	}, [ setValue, clearErrors ] );

	// Update form value when OTP changes
	useEffect( () => {
		const otpString = otpValues.join( '' );
		setValue( 'otp', otpString );
		if ( otpString.length === 6 ) {
			clearErrors( 'otp' );
			setErrorMessage( '' );
		}
	}, [ otpValues, setValue, clearErrors ] );

	const handleOtpChange = ( index, value ) => {
		// Only allow numbers
		if ( !/^\d*$/.test( value ) ) return;

		const newOtpValues = [ ...otpValues ];
		newOtpValues[ index ] = value;
		setOtpValues( newOtpValues );

		// Auto-focus next input
		if ( value && index < 5 ) {
			inputRefs.current[ index + 1 ]?.focus();
		}
	};

	const handleKeyDown = ( index, e ) => {
		if ( e.key === 'Backspace' ) {
			if ( otpValues[ index ] === '' && index > 0 ) {
				// Move to previous input if current is empty
				inputRefs.current[ index - 1 ]?.focus();
			} else {
				// Clear current input
				const newOtpValues = [ ...otpValues ];
				newOtpValues[ index ] = '';
				setOtpValues( newOtpValues );
			}
		}
	};

	const handlePaste = ( e ) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData( 'text' ).slice( 0, 6 );
		if ( /^\d+$/.test( pastedData ) ) {
			const newOtpValues = pastedData.split( '' ).concat( Array( 6 ).fill( '' ) ).slice( 0, 6 );
			setOtpValues( newOtpValues );
			// Focus last filled input or first empty input
			const lastIndex = Math.min( pastedData.length - 1, 5 );
			inputRefs.current[ lastIndex ]?.focus();
		}
	};

	const onFormSubmit = async ( formData ) => {
		setIsSubmitting( true );
		setErrorMessage( '' );

		try {
			// Register package with OTP
			const result = await PackageService.registerPackage( {
				msisdn: phoneNumber,
				packageCode: packageCode,
				otp: formData.otp
			} );

			if ( result.success ) {
				// Close modal and return result
				done( { success: true, data: result.data } );
			}
			// If registration failed, show error message
			else {
				setErrorMessage( result.message || t( 'registrationFailed' ) );
			}

			console.log( 'Package registration result:', result );

		} catch ( error ) {
			const message = error.message || t( 'invalidOtp' );
			setErrorMessage( message );
			setError( 'otp', { message } );
			// Clear OTP inputs on error
			setOtpValues( [ '', '', '', '', '', '' ] );
			inputRefs.current[ 0 ]?.focus();
		} finally {
			setIsSubmitting( false );
		}
	};

	const handleResend = async () => {
		if ( !canResend ) return;

		try {
			// Resend OTP
			await PackageService.sendOtpRegisterPackage( {
				msisdn: phoneNumber,
				packageCode: packageCode
			} );

			setCountdown( 60 );
			setCanResend( false );
			setErrorMessage( '' );
			clearErrors();
		} catch ( error ) {
			setErrorMessage( error.message || t( 'resendError' ) );
		}
	};

	const maskPhoneNumber = ( phone ) => {
		if ( !phone ) return '';
		if ( phone.length <= 4 ) return phone;
		const start = phone.slice( 0, 4 );
		const end = phone.slice( -2 );
		const masked = '*'.repeat( phone.length - 6 );
		return `${ start }${ masked }${ end }`;
	};

	if ( !phoneNumber ) return null;

	return (
		<div className="bg-white rounded-xl w-full max-w-md ">
			{/* Header with close button */ }
			<div className="flex justify-end items-center ">
				<button
					onClick={ close }
					className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
				>
					<XMarkIcon className="w-6 h-6 text-gray-600" />
				</button>
			</div>

			{/* Content */ }
			<div className=" pb-10">
				{/* Title and description */ }
				<div className="text-center mb-5">
					<h2 className="text-2xl font-semibold text-gray-800 mb-2">
						{ t( 'title' ) }
					</h2>
					<p className="text-gray-600 text-base leading-6">
						{ t( 'description', { phoneNumber: maskPhoneNumber( phoneNumber ) } ) }
					</p>
				</div>

				<form onSubmit={ handleSubmit( onFormSubmit ) }>
					{/* OTP Input */ }
					<div className="mb-4">
						<div className="flex justify-center gap-1 mb-2">
							{ otpValues.map( ( value, index ) => (
								<div key={ index } className="relative">
									<input
										ref={ ( el ) => ( inputRefs.current[ index ] = el ) }
										type="text"
										maxLength="1"
										value={ value }
										onChange={ ( e ) => handleOtpChange( index, e.target.value ) }
										onKeyDown={ ( e ) => handleKeyDown( index, e ) }
										onPaste={ index === 0 ? handlePaste : undefined }
										className={ `w-12 h-12 text-center text-2xl font-semibold text-neutral-800 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${ errors.otp || errorMessage
											? 'border-red-500 focus:ring-red-500'
											: 'border-gray-300 focus:ring-primary focus:border-primary'
											}` }
										disabled={ isSubmitting }
									/>
									{/* Cursor indicator for active input */ }
									{ value === '' && document.activeElement === inputRefs.current[ index ] && (
										<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
											<div className="w-0.5 h-6 bg-gray-500 animate-pulse" />
										</div>
									) }
								</div>
							) ) }
						</div>

						{/* Error message */ }
						{ ( errors.otp || errorMessage ) && (
							<div className="flex items-center justify-center px-4">
								<p className="text-red-500 text-sm text-center">
									{ errorMessage || errors.otp?.message }
								</p>
							</div>
						) }

						{/* Countdown and resend */ }
						<div className="flex items-center justify-center gap-1 px-4 pt-1">
							{ !canResend ? (
								<p className="text-gray-500 text-xs text-center">
									{ t( 'countdownMessage', { seconds: countdown } ) }
								</p>
							) : (
								<button
									type="button"
									onClick={ handleResend }
									className="text-gray-500  text-sm font-semibold px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
								>
									{ t( 'resendButton' ) }
								</button>
							) }
						</div>
					</div>

					{/* Submit button */ }
					<button
						type="submit"
						disabled={ isSubmitting || otpValues.join( '' ).length !== 6 }
						className={ `w-full py-3 px-6 rounded-lg font-semibold text-base transition-colors ${ isSubmitting || otpValues.join( '' ).length !== 6
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-primary text-white hover:bg-primary/60'
							}` }
					>
						{ isSubmitting ? t( 'submitting' ) : t( 'confirmButton' ) }
					</button>
				</form>
			</div>
		</div>
	);
};

export default ModalOTP;
