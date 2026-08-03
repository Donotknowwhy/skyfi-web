'use client';

import { useFormContext } from 'react-hook-form';
import { toCurrency } from '../../utils/format';

const ListPackage = () => {
	const { setValue, watch } = useFormContext();
	const listPackage = watch( 'listPackage' );
	const selectedPackage = watch( 'dataSim.package' );


	const handleSelectPackage = ( packageData ) => {
		setValue( 'dataSim.package', packageData.code );
		setValue( 'dataSim.packagePrice', packageData.sale_price );
	};


	const PackageItem = ( { packageData } ) => {
		const isSelected = selectedPackage === packageData.code;

		return (
			<div
				className={ `bg-white rounded-xl  p-4 border-2 cursor-pointer transition-all ${ isSelected
					? 'border-[#DA2128] shadow-md'
					: 'border-[#F1F1F1] shadow-sm hover:border-gray-300'
					}` }
				style={ {
					boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)'
				} }
				onClick={ () => handleSelectPackage( packageData ) }
			>
				{/* Header */ }
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-3">
						<h3 className="text-base font-semibold text-[#333333] font-inter">
							{ packageData.name }
						</h3>
						<div className="bg-[#DA2128] rounded px-2 py-1 flex items-center justify-center">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.6 3.5H12.11C12.2703 3.1731 12.3543 2.814 12.3557 2.45C12.3557 1.80022 12.0976 1.17705 11.6381 0.717588C11.1786 0.258124 10.5555 0 9.9057 0C8.7038 0 7.6552 0.84 6.874 1.7367C5.88 0.5894 4.8643 0 3.85 0C3.20022 0 2.57705 0.258124 2.11759 0.717588C1.65812 1.17705 1.4 1.80022 1.4 2.45C1.4021 2.814 1.4861 3.1731 1.6457 3.5H1.4C1.0287 3.5 0.672601 3.6475 0.41005 3.91005C0.1475 4.1726 0 4.5287 0 4.9V6.3C0 6.48565 0.0737498 6.6637 0.205025 6.79497C0.336301 6.92625 0.514348 7 0.7 7H13.3C13.4857 7 13.6637 6.92625 13.795 6.79497C13.9263 6.6637 14 6.48565 14 6.3V4.9C14 4.5287 13.8525 4.1726 13.5899 3.91005C13.3274 3.6475 12.9713 3.5 12.6 3.5ZM5.6406 3.5H3.85C3.57152 3.5 3.30445 3.38938 3.10754 3.19246C2.91062 2.99555 2.8 2.72848 2.8 2.45C2.8 2.17152 2.91062 1.90445 3.10754 1.70754C3.30445 1.51062 3.57152 1.4 3.85 1.4C4.48 1.4 5.25 1.9278 6.0144 2.8854C5.8611 3.1213 5.74 3.3299 5.6406 3.5ZM9.9106 3.5H7.2912C7.9443 2.5424 8.9509 1.4 9.9085 1.4C10.187 1.4 10.454 1.51062 10.651 1.70754C10.8479 1.90445 10.9585 2.17152 10.9585 2.45C10.9585 2.72848 10.8479 2.99555 10.651 3.19246C10.454 3.38938 10.187 3.5 9.9085 3.5H9.9106ZM7.7 8.4H6.3V14H7.7V8.4ZM4.9 8.4H1.4V12.6C1.4 12.9713 1.5475 13.3274 1.81005 13.5899C2.0726 13.8525 2.4287 14 2.8 14H4.9V8.4ZM9.1 8.4V14H11.2C11.5713 14 11.9274 13.8525 12.1899 13.5899C12.4525 13.3274 12.6 12.9713 12.6 12.6V8.4H9.1Z" fill="white" />
							</svg>

						</div>
					</div>

				</div>

				{/* Divider */ }
				<div className="w-full h-px bg-[#F1F1F1] mb-3"></div>

				{/* Features */ }
				<div className="space-y-2 mb-3">
					{ packageData.description.map( ( feature, index ) => (
						<div key={ index } className="flex items-center gap-2">
							<div className="w-6 h-6 flex items-center justify-center">
								{ feature.includes( 'GB/' ) ? (
									// Data icon
									<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M10.7589 0.75C12.9491 0.749987 14.6695 0.750117 16.0128 0.930664C17.3894 1.11575 18.4817 1.50313 19.3399 2.36133C20.1981 3.21953 20.5855 4.31182 20.7706 5.68848C20.9511 7.03174 20.9512 8.75212 20.9512 10.9424V11.0576C20.9512 13.2479 20.9511 14.9683 20.7706 16.3115C20.5855 17.6882 20.1981 18.7805 19.3399 19.6387C18.4817 20.4969 17.3894 20.8842 16.0128 21.0693C14.6695 21.2499 12.9491 21.25 10.7589 21.25H10.6436C8.45337 21.25 6.73297 21.2499 5.38971 21.0693C4.01305 20.8842 2.92076 20.4969 2.06256 19.6387C1.20436 18.7805 0.816984 17.6882 0.631897 16.3115C0.45135 14.9683 0.45122 13.2479 0.451233 11.0576V10.9424C0.45122 8.75213 0.45135 7.03174 0.631897 5.68848C0.816984 4.31182 1.20436 3.21953 2.06256 2.36133C2.92076 1.50313 4.01305 1.11575 5.38971 0.930664C6.73297 0.750117 8.45336 0.749987 10.6436 0.75H10.7589ZM16.1954 7.43555C15.8837 7.16283 15.4096 7.19427 15.1368 7.50586L11.6983 11.4365C11.3893 11.3163 11.0528 11.25 10.7012 11.25C9.18245 11.25 7.95124 12.4812 7.95123 14C7.95123 15.5188 9.18245 16.75 10.7012 16.75C12.22 16.75 13.4512 15.5188 13.4512 14C13.4512 13.3782 13.2445 12.8044 12.8965 12.3438L16.2657 8.49414C16.5384 8.18246 16.507 7.70833 16.1954 7.43555ZM10.7012 4.25C6.97331 4.25 3.95123 7.27208 3.95123 11C3.95123 11.4142 4.28702 11.75 4.70123 11.75C5.11545 11.75 5.45123 11.4142 5.45123 11C5.45123 8.1005 7.80174 5.75 10.7012 5.75C11.6586 5.75 12.5539 6.00597 13.3253 6.45215C13.6837 6.6595 14.1432 6.53705 14.3506 6.17871C14.558 5.82025 14.4356 5.3608 14.0772 5.15332C13.0836 4.57855 11.9295 4.25 10.7012 4.25Z" fill="#DA2128" />
									</svg>

								) : (
									// Vikki app icon

										<svg width="21" height="21" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='bg-[#DA2128] rounded-md'>
											<path d="M10.2605 3.48975H6.73962C5.84216 3.48975 5.11462 4.21728 5.11462 5.11475V11.8856C5.11462 12.783 5.84216 13.5106 6.73962 13.5106H10.2605C11.1579 13.5106 11.8855 12.783 11.8855 11.8856V5.11475C11.8855 4.21728 11.1579 3.48975 10.2605 3.48975Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
											<path d="M7.95837 11.6147H9.04171" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
										</svg>


								) }
							</div>
							<span className="text-sm font-medium text-[#333333] font-inter">
								{ feature }
							</span>
						</div>
					) ) }
				</div>

				{/* Divider */ }
				<div className="w-full h-px bg-[#F1F1F1] mb-3"></div>

				{/* Pricing */ }
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-4 w-full justify-between	">
						<div className="flex items-center gap-1">
							{ packageData.price > packageData.sale_price && (
								<>
									<span className="text-lg font-semibold text-[#333333] font-inter line-through">
										{ toCurrency( packageData.price ) }
									</span>
									<span className="text-sm text-[#8A8A8A] font-inter">
										/ { packageData.validity_day } ngày
									</span>
								</>
							) }
						</div>

						<div className="text-lg font-semibold text-[#DA2128] font-inter">
							{ toCurrency( packageData.sale_price ) }
						</div>
					</div>

					{/* Radio Button */ }
					<div className="flex items-center justify-center">
						<div className={ `w-6 h-6 rounded-full border-2 flex items-center justify-center ${ isSelected
							? 'border-[#DA2128]'
							: 'border-[#A1A1A1]'
							}` }>
							{ isSelected && (
								<div className="w-3 h-3 rounded-full bg-[#DA2128]"></div>
							) }
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full space-y-4 mt-4">
			{ listPackage.map( ( packageData ) => (
				<PackageItem
					key={ packageData.code }
					packageData={ packageData }
				/>
			) ) }
		</div>
	);
};

export default ListPackage;

// {
//     "code": "SF69",
//     "name": "SF69",
//     "cycle": "M",
//     "is_main": 1,
//     "price": 110000,
//     "brief": "<div style=\"background-color: #F1F1F2; padding-top: 3px; padding-left: 10px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);\"> <h1 style=\"color: #333; margin-bottom: 10px; font-size: 16px; font-weight: bold;\">M&ocirc; tả</h1> <ul style=\"padding-left: 20px;\"> <li style=\"margin-bottom: 8px; color: #555;\">Miễn ph&iacute; 2GB/ng&agrave;y (tối đa 60GB/th&aacute;ng) data tốc độ cao, hết data tốc độ cao ngừng truy cập.</li> <li style=\"margin-bottom: 8px; color: #555;\">Thời gian sử dụng: 30 ng&agrave;y.</li> <li style=\"margin-bottom: 8px; color: #555;\">G&oacute;i cước tự động gia hạn.</li> </ul> <h1 style=\"color: #333; margin-bottom: 10px; font-size: 16px; font-weight: bold;\">C&uacute; ph&aacute;p kiểm tra g&oacute;i cước</h1> <ul style=\"padding-left: 20px;\"> <li style=\"margin-bottom: 8px; color: #555;\">Kiểm tra g&oacute;i cước: Soạn *090*5# bấm gọi (miễn ph&iacute;)</li> <li style=\"margin-bottom: 8px; color: #555;\">Hoặc soạn KT ALL gửi 9199 (miễn ph&iacute;)</li> </ul><br> <h1 style=\"margin-bottom: 8px; color: #555; font-size: 16px;\">C&ocirc;ng ty TNHH Galaxy Digital Holdings, T&ograve;a nh&agrave; PV Gas, 673 Nguyễn Hữu Thọ, Phước Kiển, Nh&agrave; B&egrave;, TP. HCM, Việt Nam</h1> <h1 style=\"margin-bottom: 8px; color: #555; font-size: 16px;\">Xuất xứ h&agrave;ng h&oacute;a: Việt Nam</h1> </div>",
//     "data_per_day": 2,
//     "data_per_month": 60,
//     "is_outstanding": 1,
//     "index": 1,
//     "sale_price": 69000,
//     "status": 1,
//     "arr_reg_code": "251091CT11",
//     "on_buy_sim": 1,
//     "reg_code_tkc": "SF69",
//     "reg_code_0d": "SF69_GLX",
//     "description_detail": "[ \"Miễn phí 2GB/ ngày (tối đa 60GB/ tháng) data tốc độ cao, hết data tốc độ cao ngừng truy cập.\", \"Gói cước tự động gia hạn.\" ]",
//     "id": 1,
//     "is_internal_package": 0,
//     "free_call_minute": 0,
//     "free_sms": 0,
//     "validity_day": 30,
//     "is_default": 0,
//     "bhm_createsub": null,
//     "discount_percent": 37,
//     "description": [
//         "Hết data tốc độ cao ngừng truy cập.",
//         "Gói cước tự động gia hạn"
//     ]
// }