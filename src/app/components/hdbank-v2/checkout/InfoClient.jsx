import InputField from '@/app/components/form/inputField';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

const InfoClient = ({ isFullEsim }) => {
	const { control } = useFormContext();
	const t = useTranslations('hdbank.checkout.infoClient');

	return (
		<div className="bg-white rounded-[16px] p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] mb-4">
			<h2 className="font-inter font-bold text-[18px] leading-[24px] text-[#1C1C1E] mb-2">
				{t('title')}
			</h2>
			<p className="font-inter text-[14px] leading-[20px] text-[#5C5C5C] mb-4">
				{t('description')}
			</p>

			<div className="flex flex-col gap-4">
				{/* Email */}
				<InputField
					label={t('emailLabel')}
					type="email"
					name="email"
					placeholder={t('emailPlaceholder')}
					required
					control={control}
					className='border px-3 py-2 !rounded-[12px] !gap-0'
					classNameLabel='font-semibold'
					classInput="border-none !p-0 !py-1"

				/>

				{/* Phone Number */}
				{!isFullEsim && (
					<InputField
						label={t('phoneLabel')}
						type="tel"
						name="contact_phone"
						placeholder={t('phonePlaceholder')}
						required
						control={control}
						className='border px-3 py-2 !rounded-[12px] !gap-0'
						classNameLabel='font-semibold'
						classInput="border-none !p-0 !py-1"
					/>)}

				{/* Full Name */}
				<InputField
					label={t('nameLabel')}
					name="customer_name"
					placeholder={t('namePlaceholder')}
					required
					control={control}
					className='border px-3 py-2 !rounded-[12px] !gap-0'
					classNameLabel='font-semibold'
					classInput="border-none !p-0 !py-1"
				/>
			</div>
		</div>
	);
};

export default InfoClient;