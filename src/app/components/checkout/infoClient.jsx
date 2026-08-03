import { useFormContext, useWatch } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import InputField from '../form/inputField';

const InfoClient = () => {
	const t = useTranslations( 'checkout' );
	const { control } = useFormContext();
let [ isFullEsim ] = useWatch( { control, name: [ 'isFullEsim' ] } );

	return (
		<div className="bg-white rounded-[12px] p-[24px] mb-[24px]">
			<h2 className="font-inter font-semibold text-[22px] leading-[1.2em] text-[#333] mb-[12px]">{ t( 'contactInfo.title' ) }</h2>
			<p className="font-inter text-[16px] text-[#333] mb-[16px]">
				{ t( 'contactInfo.description' ) }
			</p>

			<div className="flex flex-col gap-[16px]">
				{/* Email */ }
				<InputField
					label={ t( 'contactInfo.email' ) }
					type="email"
					name="email"
					placeholder={ t( 'contactInfo.emailPlaceholder' ) }
					required
					control={ control }
				/>

				{/* Phone Number */ }
				{ !isFullEsim && <InputField
					label={ t( 'contactInfo.phone' ) }
					type="tel"
					name="contact_phone"
					placeholder={ t( 'contactInfo.phonePlaceholder' ) }
					required
					control={ control } />
				}
				{/* Full Name */ }
				<InputField
					label={ t( 'contactInfo.fullName' ) }

					name="customer_name"
					placeholder={ t( 'contactInfo.namePlaceholder' ) }
					required
					control={ control }
				/>
			</div>
		</div>
	);
};

export default InfoClient;