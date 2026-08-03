import { useTranslations } from "next-intl";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Link } from "../../../i18n/navigation";
import { LoginType } from "../../[locale]/login/page";
import authService from "../../services/auth";
import { useLoad } from "../../utils/load";
import { showModalMess } from "../modals/modalMess";
import {useRouter} from "next/navigation";
import {trackLogin} from "@/app/utils/trackingHelper";



const Login = () => {
	const { setValue, register, handleSubmit, formState:{ errors } } = useFormContext();
	const load = useLoad();
	const t = useTranslations('loginPage');
	const router = useRouter();

	const onSubmit = async ( data ) => {
		try {
			load.open();
			const res = await authService.checkEmail( data.email );
			trackLogin({
				login_method: 'email',
				is_first_time: false,
				login_status: res.success,
				error_message: res.message
			}).catch(err => console.error('Track login error:', err));
			if ( !res.success ) {
				showModalMess( {
					label: t('title'),
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

		} finally {
			load.close();
		}
	};


	return (
		<div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
			{/*<div className="mb-6">*/}
			{/*	<Link href="/">*/}
			{/*		<Image*/}
			{/*			src="/assets/logo.svg"*/}
			{/*			alt="SkyFi Logo"*/}
			{/*			width={ 120 }*/}
			{/*			height={ 40 }*/}
			{/*			priority*/}
			{/*		/>*/}
			{/*	</Link>*/}
			{/*</div>*/}

			{/* Title section */ }
			<div className="w-full flex flex-col items-start mb-8">
				<h1 className="text-3xl font-semibold text-[#333333]">{t('title')}</h1>
				<p className="text-base font-medium text-[#5C5C5C] mt-3">
					{t('subtitle')}
				</p>
			</div>

			{/* Tab selection */ }
			{/*<div className="w-full max-w-[340px] flex mb-6">*/}
				{/*<button*/}
				{/*	className={ `w-1/2 py-3 px-4 text-center font-semibold text-base text-[#ED1B2F] border-b-2 border-[#ED1B2F]` }*/}

				{/*>*/}
				{/*	{t('emailTab')}*/}
				{/*</button>*/}
				{/*<button*/}
				{/*	className={ `w-1/2 py-3 px-4 text-center font-semibold text-base text-[#A1A1A1]` }*/}
				{/*>*/}
				{/*	{t('qrCodeTab')}*/}
				{/*</button>*/}
			{/*</div>*/}

			{/* Main form content */ }
			<div className="w-full">
				<form onSubmit={ handleSubmit( onSubmit ) } className="space-y-6">
					<div className="w-full">
						<div className="border border-[#DDDDDD] rounded-xl px-4 py-2">
							<div className="flex flex-col">
								<div className="flex">
									<label htmlFor="email" className="text-xs text-[#333333]">{t('emailLabel')}</label>
									<span className="text-xs font-bold text-[#E60A32] ml-0.5">{t('emailRequired')}</span>
								</div>
								<input
									id="email"
									{ ...register( 'email', {
										required: true,
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: t('invalidEmail'),
										},
									 } ) }
									required
									className="w-full text-base outline-none text-[#A1A1A1] mt-1"
									placeholder={t('emailPlaceholder')}
								/>
							</div>
						</div>
						{errors.email && (
							<p className="text-sm text-red-500 mt-1">
								{errors.email.message}
							</p>
						)}
						<button
							type="submit"

							className="w-full bg-[#E69818] text-white py-3 px-6 rounded-lg hover:bg-[#d48c16] transition-colors font-semibold mt-3"
						>
							{t('continueButton')}
						</button>
						<p className="text-base text-center text-[#333333] mt-3">
							{t('emailNote')} <span className={"text-[#E69818] cursor-pointer"} onClick={()=>{router.push("/sim-data")}}>{t('buyEsim')}</span> <span>{t('now')}</span>
						</p>
					</div>


				</form>
			</div>
		</div>
	);
};

export default Login;
