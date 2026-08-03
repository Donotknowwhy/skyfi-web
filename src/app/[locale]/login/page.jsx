'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from '../../../i18n/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Login from '../../components/auth/login';
import PasswordInputPage from '../../components/auth/password';
import ResetPasswordPage from '../../components/auth/resetPassword';
import VerificationPage from '../../components/auth/verificode';
import { useUserState } from '../../stores/user';

export const LoginType = {
	login: 'login',
	verification: 'verification',
	resetPassword: 'resetPassword',
	passwordInput: 'passwordInput',
};

export default function LoginPage() {

	const method = useForm( {
		defaultValues: {
			status: 'login',
			email: '',
			password: '',
			confirmPassword: '',
			verificationCode: '',
		},
		mode: 'onChange',
	} );

	const { isLoggedIn } = useUserState();
	const router = useRouter();



	const currentPage = {
		login: <Login />,
		verification: <VerificationPage />,
		resetPassword: <ResetPasswordPage />,
		passwordInput: <PasswordInputPage />,
	};

	const current = method.watch( 'status' );

	const getPageCurrent = () => {
		if ( currentPage[ current ] ) {
			return currentPage[ current ];
		}
		return currentPage.login;
	};
	if ( isLoggedIn ) {
		router.replace( `my-eSim` );
	}

	return (
		<FormProvider { ...method }>
			<div className="min-h-screen flex flex-col bg-[#F5F5F5]">
				<Header />
				<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
					{ getPageCurrent() }
				</div>
				<Footer />
			</div>
		</FormProvider>
	);
}
