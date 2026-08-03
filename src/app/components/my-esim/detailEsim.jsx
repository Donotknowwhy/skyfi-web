import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { toCurrency } from '../../utils/format';
import {useMemo} from "react";

const DetailEsim = (props) => {
	const { esimData } = props;
	const t = useTranslations('defaultEsim');


	const convertDataToGBString = (data) => {
		if (data >= 1024) {
			return `${(data / 1024).toFixed(0)} GB`;
		}
		return `${data} MB`;
	};

	const isVj=useMemo(()=>{
		return esimData?.type==="vj"
	},[esimData])
    const isDaily=useMemo(()=>{
		return esimData.package_type==='daily'
	},[esimData])
    //rebuild
	console.log(esimData)
	return (
		<div>{/* Current Plan */}
			<h1 className="text-3xl font-semibold font-koho text-neutral-900 mb-6">{t('title')}</h1>
			<div className="rounded-xl shadow-sm overflow-hidden">
				<div className=" bg-white relative">
					<div className='p-6'>
						{/*<h2 className="text-xl font-semibold mb-6 font-koho text-neutral-900">{t('currentPlan')}</h2>*/}
						{/* Data Usage Circle */}
						<div className="flex justify-center mb-8">
							<div className="relative w-[180px] h-[180px]  flex flex-col items-center justify-center  rounded-full">
								<svg
									width="180"
									height="180"
									viewBox="0 0 180 180"
									className="absolute left-0 top-0 -rotate-90 "
								>
									<circle
										cx="90"
										cy="90"
										r="85"
										fill="none"
										stroke="#f0f0f0"
										strokeWidth="10"
									/>
									<circle
										cx="90"
										cy="90"
										r="85"
										fill="none"
										stroke="url(#gradient)"
										strokeWidth="10"
										strokeDasharray="534"
										strokeDashoffset={` ${(534 * ((esimData?.data?.remaining||0) / (esimData?.data?.total||0)))}`}
										strokeLinecap="round"
									/>
									<defs>
										<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" stopColor="#FF787A" />
											<stop offset="100%" stopColor="#FFD76D" />
										</linearGradient>
									</defs>
								</svg>


								<div className="flex  flex-col items-center font-koho z-10">
									<span className="font-koho text-[#5C5C5C] font-bold	">{t('dataRemaining')}</span>
									<span className=" text-neutral-800"> <span className='text-[#EA2227] text-xl font-semibold'>{convertDataToGBString((esimData?.data?.remaining||0))}</span>/{convertDataToGBString(esimData?.data?.total||0)}</span>
								</div>

							</div>
						</div>

						{/* eSIM Info Grid */}
						<div className="space-y-0  mb-6">
							{!isVj&&(
								<div className="flex justify-between py-2 border-b border-white">
									<span className="text-sm font-koho text-neutral-900">{t('esimInfo.coverage')}</span>
									<span className="text-base font-medium font-koho text-neutral-900">{esimData.region_name}</span>
								</div>
							)}

							{!isVj&&(
							<div className="flex justify-between py-2 border-b border-white">
								<span className="text-sm font-koho text-neutral-900">{t('esimInfo.provider')}</span>
								<div className="flex items-center">
									<span className="text-base font-medium mr-2 font-koho text-neutral-900">{esimData.provider_name}</span>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="12" cy="12" r="10" stroke="#333333" strokeWidth="1.5" />
										<path d="M12 16V12M12 8H12.01" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
									</svg>
								</div>
							</div>
								)}

							<div className="flex justify-between py-2 border-b border-white">
								<span className="text-sm font-koho text-neutral-900">{t('esimInfo.dataCapacity')}</span>
								<span className="text-base font-medium font-koho text-neutral-900">{convertDataToGBString(esimData?.data?.total||esimData?.data_amount *1024||0)} {isDaily?("/"+ t('currentPackage.days')):""}</span>
							</div>

							<div className="flex justify-between py-2 border-b border-white">
								<span className="text-sm font-koho text-neutral-900">{t('esimInfo.packageType')}</span>
								<div className="flex items-center">
									<span className="text-base font-medium mr-2 font-koho text-neutral-900">{t('esimInfo.dataOnly')}</span>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="12" cy="12" r="10" stroke="#333333" strokeWidth="1.5" />
										<path d="M12 16V12M12 8H12.01" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
									</svg>
								</div>
							</div>

							<div className="flex justify-between py-2 border-b border-white">
								<span className="text-sm font-koho text-neutral-900">{t('esimInfo.validity')}</span>
								<span className="text-base font-medium font-koho text-neutral-900">{t('esimInfo.daysValidity', { days: esimData.validity_days })}</span>
							</div>

							<div className="flex justify-between py-2 border-b border-white">
								<span className="text-sm font-koho text-neutral-900">{t('esimInfo.eKYC')}</span>
								<span className="text-base font-medium font-koho text-neutral-900">{t('esimInfo.notRequired')}</span>
							</div>

							<div className="flex justify-between py-2">
								<span className="text-sm font-koho text-neutral-900">{t('esimInfo.iccid')}</span>
								<span className="text-base font-medium font-koho text-neutral-900">{esimData.iccid}</span>
							</div>
						</div>


					</div>
				</div>
			</div>
			<div className="my-6">
				<h3 className="font-semibold text-lg font-koho text-neutral-900 mb-4 ">{t('currentPackage.title')}</h3>
				<div className=" rounded-xl p-6 border border-gray-100 shadow" style={{background: "linear-gradient(147deg, #fae9e4 38.87%, rgb(238, 246, 254) 65.62%, #f5fff9 109.46%)"}}>
					<div className="space-y-4">
						{/* Package Name */}
						<div className="flex justify-between items-start">
							<span className="text-gray-700 font-medium">{t('currentPackage.name')} {esimData.package_name||""}</span>
						</div>

						{/* Data Limit */}
						<div className="flex justify-between items-center">
							<span className="text-gray-600">{t('currentPackage.limitData')}</span>
							<span className="text-lg font-semibold text-gray-900">	{convertDataToGBString((esimData?.data?.total||esimData?.data_amount *1024||0)*(isDaily?esimData?.validity_days:1))}</span>
						</div>

						{/* Validity Period */}
						{!isVj&&(
						<div className="flex justify-between items-center">
							<span className="text-gray-600">{t('currentPackage.countdown')}</span>
							<div className="flex items-center space-x-2">
								<div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium flex items-center">
									<CalendarDaysIcon className="h-4 w-4 mr-1" />
									{esimData?.data?.expired_at ? new Date(esimData?.data?.expired_at).toLocaleDateString('vi-VN') : 'Chưa xác định'}

								</div>

							</div>
						</div>
						)}

						{/* Effectiveness */}
						<div className="flex justify-between items-center">
							<span className="text-gray-600">{t('currentPackage.effectiveness')}</span>
							<span className="font-semibold text-gray-900">{esimData?.validity_days} {t('currentPackage.days')}</span>
						</div>

						{/* Price */}
						{!isVj&&(
						<div className="flex justify-between items-center pt-2 border-t border-gray-200">
							<span className="text-gray-600">{t('currentPackage.price')}</span>
							<span className="text-xl font-bold text-gray-900">{ toCurrency(esimData.selling_price |esimData.price) }</span>
						</div>
							)}
					</div>
				</div>
			</div>

		</div>
	);
};

export default DetailEsim;
