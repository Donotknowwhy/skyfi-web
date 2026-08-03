'use client';


import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import authService from '../../services/auth';
import { useUserActions } from '../../stores/user';
import { useLoad } from '../../utils/load';
import { OTPInput } from '../form/inputSreachNumber';
import { showModalMess } from '../modals/modalMess';
import Tooltip from '../ui/Tooltip';
import {trackLogin} from "@/app/utils/trackingHelper";

const PasswordTooltipContent = ({t}) => (
	<div className="text-[#333333]">
		<h4 className="font-semibold text-[15px] mb-2">{t('tooltip.title')}</h4>
		<ul className="space-y-2">
			{t('tooltip.requirements').split(',').map((requirement, index) => (
				<li key={index} className="flex items-start gap-2 text-[13px] leading-5">
					<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E69818] mt-1.5"></span>
					<span>{requirement}</span>
				</li>
			))}
		</ul>
	</div>
);
export default function ResetPasswordPage( { token } ) {
	const t = useTranslations( 'password' );
	const router = useRouter();
	const [ passwordVisible, setPasswordVisible ] = useState( false );
	const load = useLoad();
	const {	setToken}= useUserActions()


	const { control, handleSubmit } = useFormContext();
	const [ passwordValue, confirmPasswordValue ] = useWatch( {
		control,
		name: [ 'password', 'confirmPassword' ]
	} );

	const togglePasswordVisibility = () => {
		setPasswordVisible( !passwordVisible );
	};

	// Validation functions
	const hasConsecutiveNumbers = (password) => {
		if (!password || password.length < 3) return false;

		for (let i = 0; i <= password.length - 3; i++) {
			const num1 = parseInt(password[i]);
			const num2 = parseInt(password[i + 1]);
			const num3 = parseInt(password[i + 2]);

			if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)) {
				if ((num2 === num1 + 1 && num3 === num2 + 1) ||
					(num2 === num1 - 1 && num3 === num2 - 1)) {
					return true;
				}
			}
		}
		return false;
	};

	const hasRepeatedDigits = (password) => {
		if (!password || password.length < 3) return false;

		for (let i = 0; i <= password.length - 3; i++) {
			if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
				return true;
			}
		}
		return false;
	};

	// Get validation errors
	const getPasswordErrors = () => {
		const errors = [];

		if (passwordValue !== confirmPasswordValue && (confirmPasswordValue.length > 0)) {
			errors.push(t('passwordMismatch'));
		}

		if (passwordValue && hasConsecutiveNumbers(passwordValue)) {
			errors.push(t('consecutiveNumbers'));
		}

		if (passwordValue && hasRepeatedDigits(passwordValue)) {
			errors.push(t('repeatedDigits'));
		}

		return errors;
	};

	const passwordErrors = getPasswordErrors();
	const hasErrors = passwordErrors.length > 0;


	const onSubmit = async ( data ) => {
		try {
			if ( !data.password || !data.confirmPassword || hasErrors ) {
				return;
			}
			load.open();
			const res = await authService.createPassword( {
				email: data.email,
				active_code: data.verificationCode,
				password: data.password,
				confirm_password: data.confirmPassword
			} );
			trackLogin({
				login_method: 'email reset password',
				is_first_time: false,
				login_status: res.success,
				error_message: res.message
			}).catch(err => console.error('Track login error:', err));
			if ( !res.success ) {
				if ( !res.success ) {
					return showModalMess( {
						label: t( 'titleMadal', ),
						message: res.message,
						type: 'error',
						icon: '/assets/auth/qr-code.png',
						labelConfirm: t( 'tryAgainButton' ),
					} );
				}
			}

			setToken( res.data.token, res.data.email );
			router.push( '/' );
		} finally {
			load.close();
		}
	};

	return (
		<div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-10 flex flex-col items-center">
			<div className="mb-6">
				<Link href="/">
					<Image
						src="/assets/logo.svg"
						alt="SkyFi Logo"
						width={ 120 }
						height={ 40 }
						priority
					/>
				</Link>
			</div>

			{/* Title section */ }
			<div className="w-full flex flex-col items-center space-y-3 mb-8">
				<h1 className="text-[28px] font-semibold text-[#333333] text-center">
					{ t( 'title' ) }
				</h1>
				<p className="text-base font-medium text-[#5C5C5C] text-center max-w-md">
					{ t( 'description' ) }
				</p>
			</div>

			<form onSubmit={ handleSubmit( onSubmit ) } className="w-full space-y-5">
				<div className="space-y-3">
					<div className='flex gap-2'>
						<Tooltip
							content={<PasswordTooltipContent t={t} />}
							position="bottom"

						>
							<button type="button">
								<ExclamationCircleIcon className="w-5 h-5 text-neutral-800" />
							</button>
						</Tooltip>
						<label htmlFor="password" className="block text-sm font-semibold text-[#333333]">
							{ t( 'newPassword' ) }
						</label>
					</div>
					<div className="relative flex justify-between gap-4">
						<Controller name='password' control={ control } render={ ( { field: { onChange, value } } ) => (
							<OTPInput valueLength={ 6 } onChange={ ( value ) => onChange( value ) }
								value={ value }
								type={ passwordVisible ? "text" : "password" }
								inputStyle={ `max-w-[60px] h-[60px] border ${hasErrors && passwordValue ? 'border-red-500' : 'border-[#DDDDDD]'} text-black rounded-lg text-center text-xl focus:outline-none  ` }
								containerStyle={ 'truncate bg-transparent gap-4 outline-none justify-between flex-1' } /> ) } />
						<button
							type="button"
							className="  text-gray-400 hover:text-gray-600"
							onClick={ togglePasswordVisibility }
						>
							{ passwordVisible ? (
								<EyeIcon className="w-5 h-5 text-gray-600" />
							) : (
								<EyeSlashIcon className="w-5 h-5 text-gray-400" />
							) }
						</button>
					</div>
				</div>

				<div className="space-y-3">
					<div className='flex gap-2'>
						<Tooltip
							content={<PasswordTooltipContent t={t} />}
							position="bottom"

						>
							<button type="button">
								<ExclamationCircleIcon className="w-5 h-5 text-neutral-800" />
							</button>
						</Tooltip>
						<label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#333333]">
							{ t( 'confirmPassword' ) }
						</label>
					</div>

					<div className="relative flex justify-between gap-4">
						<Controller name='confirmPassword' control={ control } render={ ( { field: { onChange, value } } ) => (
							<OTPInput valueLength={ 6 } onChange={ ( value ) => onChange( value ) }
								value={ value }
								type={ passwordVisible ? "text" : "password" }
								inputStyle={ `max-w-[60px] h-[60px] border ${ hasErrors ? 'border-red-500' : 'border-[#DDDDDD]' } text-black rounded-lg text-center text-xl focus:outline-none ` }
								containerStyle={ 'truncate bg-transparent gap-4 outline-none justify-between flex-1' } /> ) } />
						<button
							type="button"
							className="  text-gray-400 hover:text-gray-600"
							onClick={ togglePasswordVisibility }
						>
							{ passwordVisible ? (
								<EyeIcon className="w-5 h-5 text-gray-600" />
							) : (
								<EyeSlashIcon className="w-5 h-5 text-gray-400" />
							) }
						</button>
					</div>
					{ hasErrors && (
						<div className="space-y-1">
							{passwordErrors.map((error, index) => (
								<p key={index} className="text-red-500 text-sm">{error}</p>
							))}
						</div>
					) }
				</div>

				<button
					type="submit"
					disabled={hasErrors || !passwordValue || !confirmPasswordValue}
					className={ `w-full ${hasErrors || !passwordValue || !confirmPasswordValue ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E69818] hover:bg-[#d48c16]'} text-white py-4 px-6 rounded-lg transition-colors font-semibold text-lg mt-4` }
				>{ t( 'confirm' ) }
				</button>
			</form>
		</div>
	);
}
