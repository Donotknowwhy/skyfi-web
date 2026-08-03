'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { LoginType } from '../../[locale]/login/page';
import authService from '../../services/auth';
import { useUserActions } from '../../stores/user';
import { useLoad } from '../../utils/load';
import { OTPInput } from '../form/inputSreachNumber';
import { showModalMess } from '../modals/modalMess';
import {trackLogin} from "@/app/utils/trackingHelper";

export default function PasswordInputPage() {
	const t = useTranslations( 'password' );
	const router = useRouter();
	const [ passwordVisible, setPasswordVisible ] = useState( false );
	const {setToken}= useUserActions()

	const inputRefs = useRef( [] );

	const { control, setValue ,handleSubmit, getValues } = useFormContext();
	const load = useLoad();

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setPasswordVisible( !passwordVisible );
	};

	// Handle form submission
	const onSubmit = async ( data ) => {
		try {
			if ( !data.email || !data.password ) {
				return;
			}
			load.open();
			const res = await authService.login( data.email, data.password );

			trackLogin({
				login_method: 'email password',
				is_first_time: false,
				login_status: res.success,
				error_message: res.message
			}).catch(err => console.error('Track login error:', err));

			if ( !res.success ) {
				return showModalMess( {
					label: t( 'titleMadal', ),
					message: res.message,
					type: 'error',
					icon: '/assets/auth/qr-code.png',
					labelConfirm: t( 'tryAgainButton' ),
				} );
			}

			setToken( res.data.token, res.data.email );
			router.push( '/' );
		} catch ( error ) {

			 showModalMess( {
					label: t( 'titleMadal', ),
					message: error.message,
					type: 'error',
					icon: '/assets/auth/qr-code.png',
					labelConfirm: t( 'tryAgainButton' ),
				} );


		}
		finally {
			load.close();
		}
	};

	// Handle forgot password
	const handleForgotPassword = async () => {
		try {
			load.open();
			const res = await authService.checkEmail( getValues('email'), true );
		if ( !res.success ) {
				showModalMess( {
					label: 'Thông báo',
					message: res.message,
					type: 'error',
				} );
			}

			if ( res.data.check ) {
				setValue( 'status', LoginType.passwordInput );
			}
			else {
				setValue( 'status', LoginType.verification );
				setValue( 'listActive', res.data.listActive );

			}
		}finally {
			load.close();
		}
	};

	return (
		<div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
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
			<div className="w-full flex flex-col items-center mb-6">
				<h1 className="text-3xl font-semibold text-[#333333] text-center">
					{ t( 'title' ) }
				</h1>
				<p className="text-base font-medium text-[#5C5C5C] mt-2 text-center">
					{ t( 'description' ) }
				</p>
			</div>

			<form onSubmit={ handleSubmit(onSubmit) } className="w-full space-y-6">
				<div className="w-full">
					<div className="space-y-3">
						<label htmlFor="password" className="block text-sm font-semibold text-[#333333]">
							{ t( 'passwordLabel' ) }
						</label>
						<div className="relative flex justify-between gap-4">
							<Controller name='password' control={ control } render={ ( { field: { onChange, value } } ) => (
								<OTPInput valueLength={ 6 } onChange={ ( value ) => onChange( value ) }
									value={ value }
									type={ passwordVisible ? "text" : "password" }
									inputStyle={ `max-w-[60px] h-[60px] border  text-black rounded-lg text-center text-xl focus:outline-none focus:ring-2 ` }
									containerStyle={ 'truncate bg-transparent gap-4 outline-none justify-between flex-1' } /> ) } />
							<button
								type="button"
								className="  text-gray-400 hover:text-gray-600"
								onClick={ togglePasswordVisibility }
							>
								{ passwordVisible ? (
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								) }
							</button>
						</div>
					</div>
				</div>

				<button
					type="button"
					onClick={ handleForgotPassword }
					className="text-[#2F74FF] font-semibold text-base hover:underline mx-auto block"
				>
					{ t( 'forgotPassword' ) }
				</button>

				<button
					type="submit"
					className={ `w-full bg-[#E69818] text-white py-4 px-6 rounded-lg transition-colors font-semibold text-lg hover:bg-[#d48c16]` }
				>
					{ t( 'loginButton' ) }
				</button>
			</form>
		</div>
	);
}
