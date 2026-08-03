'use client';

import { modal } from '@/app/utils/modal';
import { useFormContext, useWatch } from 'react-hook-form';

import useMyEsim from '../../hooks/useMyEsim';
import { priceSim } from '../../utils/calculate';
import { formatPhoneNumber, toCurrency } from '../../utils/format';
import Tooltip from '../ui/Tooltip';
import PhoneNumberBottomSheet from './modals/PhoneNumberBottomSheet';



const InfoSim = () => {
	const { control, register, setValue, watch } = useFormContext();
	const { showDevicesEsimVikki } = useMyEsim();

	// Watch the current form values
	const sim = useWatch( { control, name: 'dataSim' } );
	const isSim = useWatch( { control, name: 'dataSim.isSim' } );
	const simTypeSelect = isSim == '1' ? 'USIM' : 'ESIM';

	// Handle SIM type selection
	const handleSimTypeChange = ( value ) => {
		setValue( 'dataSim.isSim', value );
	};

	// Handle choose another number
	const handleChooseAnotherNumber = () => {

		modal.open( {
			render: <PhoneNumberBottomSheet />,
			boxClassName: '!p-2 -mx-4',
			classContainer: '!p-0 relative top-10',
			onDone: ( selectedSim ) => {
				console.log( 'Selected SIM from modal:', selectedSim );
				if ( selectedSim ) {
					setValue( 'dataSim', {
						...sim,
						...selectedSim
					} );
				}
			}
		} );
	};




	return (
		<div className="flex flex-col gap-4 w-full mt-4">
			{/* Phone Number Section */ }
			<div className="flex items-center gap-2 w-full">
				{/* SIM Icon */ }
				<div className="flex items-center justify-center w-10 h-10 bg-[#0000EA] rounded-xl p-1">
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.8 5.5H19.03C19.2819 4.9863 19.4139 4.422 19.4161 3.85C19.4161 2.82892 19.0105 1.84965 18.2885 1.12764C17.5664 0.405624 16.5872 0 15.5661 0C13.6774 0 12.0296 1.32 10.802 2.7291C9.24 0.9262 7.6439 0 6.05 0C5.02892 0 4.04965 0.405624 3.32764 1.12764C2.60562 1.84965 2.2 2.82892 2.2 3.85C2.2033 4.422 2.3353 4.9863 2.5861 5.5H2.2C1.61652 5.5 1.05694 5.73178 0.644365 6.14436C0.231785 6.55694 0 7.11652 0 7.7V9.9C0 10.1917 0.115892 10.4715 0.322182 10.6778C0.528472 10.8841 0.808262 11 1.1 11H20.9C21.1917 11 21.4715 10.8841 21.6778 10.6778C21.8841 10.4715 22 10.1917 22 9.9V7.7C22 7.11652 21.7682 6.55694 21.3556 6.14436C20.9431 5.73178 20.3835 5.5 19.8 5.5ZM8.8638 5.5H6.05C5.61239 5.5 5.19271 5.32616 4.88327 5.01673C4.57384 4.70729 4.4 4.28761 4.4 3.85C4.4 3.41239 4.57384 2.99271 4.88327 2.68327C5.19271 2.37384 5.61239 2.2 6.05 2.2C7.04 2.2 8.25 3.0294 9.4512 4.5342C9.2103 4.9049 9.02 5.2327 8.8638 5.5ZM15.5738 5.5H11.4576C12.4839 3.9952 14.0657 2.2 15.5705 2.2C16.0081 2.2 16.4278 2.37384 16.7372 2.68327C17.0467 2.99271 17.2205 3.41239 17.2205 3.85C17.2205 4.28761 17.0467 4.70729 16.7372 5.01673C16.4278 5.32616 16.0081 5.5 15.5705 5.5H15.5738ZM12.1 13.2H9.9V22H12.1V13.2ZM7.7 13.2H2.2V19.8C2.2 20.3835 2.43178 20.9431 2.84436 21.3556C3.25694 21.7682 3.81652 22 4.4 22H7.7V13.2ZM14.3 13.2V22H17.6C18.1835 22 18.7431 21.7682 19.1556 21.3556C19.5682 20.9431 19.8 20.3835 19.8 19.8V13.2H14.3Z" fill="white" />
					</svg>

				</div>

				{/* Phone Number Display */ }
				<div className="flex-1">
					<div className="text-sm text-[#5C5C5C] font-inter">
						Số dành cho bạn
					</div>
					<div className="text-lg font-semibold text-[#333333] font-inter">
						{ sim ? formatPhoneNumber(sim.msisdn||'') : '0707 123 456' }
					</div>
				</div>

				{/* Choose Another Number Button */ }
				<button
					type="button"
					onClick={ handleChooseAnotherNumber }
					className="px-4 py-2.5 bg-[rgba(210,0,140,0.1)] text-[#D2008C] text-sm font-semibold rounded-full hover:bg-[rgba(210,0,140,0.2)] transition-colors"
				>
					Chọn số khác
				</button>
			</div>

			{/* SIM Type Section */ }
			<div className="flex flex-col gap-2 w-full">
				{/* Radio Options and Price */ }
				<div className="flex items-center justify-between w-full">
					{/* Radio Button Group */ }
					<div className="flex gap-6">
						{/* Physical SIM Option */ }
						<label className="flex items-center gap-2 cursor-pointer">
							<div className="relative w-6 h-6">
								<input
									type="radio"
									value="1"
									checked={ isSim == '0' }
									onChange={ () => handleSimTypeChange( '0' ) }
									className="absolute opacity-0 w-full h-full cursor-pointer"
								/>
								<div className={ `w-6 h-6 rounded-full border-2 flex items-center justify-center ${ isSim == '0'
									? 'border-[#0000EA] bg-white'
									: 'border-[#A1A1A1] bg-white'
									}` }>
									{ ( isSim == '0' ) && (
										<div className="w-3 h-3 rounded-full bg-[#0000EA]"></div>
									) }
								</div>
							</div>
							<span className="text-sm text-[#333333] font-inter">
								SIM vật lý
							</span>
						</label>

						{/* eSIM Option */ }
						<label className="flex items-center gap-2 cursor-pointer">
							<div className="relative w-6 h-6">
								<input
									type="radio"
									value="0"
									checked={ isSim == '1' }
									onChange={ () => handleSimTypeChange( '1' ) }
									className="absolute opacity-0 w-full h-full cursor-pointer"
								/>
								<div className={ `w-6 h-6 rounded-full border-2 flex items-center justify-center ${ isSim == '1'
									? 'border-[#0000EA] bg-white'
									: 'border-[#A1A1A1] bg-white'
									}` }>
									{ ( isSim == '1' ) && (
										<div className="w-3 h-3 rounded-full bg-[#0000EA]"></div>
									) }
								</div>
							</div>
							<span className="text-sm text-[#333333] font-inter">
								eSIM
							</span>
						</label>
					</div>

					{/* Price and Info Icon */ }
					<div className="flex items-center gap-1">
						<div className="flex flex-col items-end">

							<span className="text-lg font-semibold text-[#333333] font-inter ">
								{ toCurrency( 0 ) }</span>
							<span className="font-inter font-medium text-[12px]  sm:text-right line-through text-[#A1A1A1]">{ toCurrency( priceSim( sim, simTypeSelect ) ) }</span>
							{/* { basePriceSim( sim, simTypeSelect ) > priceSim( sim, simTypeSelect ) && <span className="font-inter font-medium text-[12px]  sm:text-right line-through text-[#A1A1A1]">{ toCurrency( basePriceSim( sim, simTypeSelect ) ) }</span> } */ }
						</div>

						<Tooltip
							content={
								<span className='text-xs !text-white'>Giá tiền bao gồm tiền SIM + Phí hòa mạng + Số</span>
							}
						position="left"
						className=" h-6 flex items-center justify-center !w-[300px] !bg-black"
						>
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="11" cy="11" r="10" stroke="rgba(128,128,128,0.55)" strokeWidth="1.5" />
							<path d="M11 7V11" stroke="rgba(128,128,128,0.55)" strokeWidth="1.5" strokeLinecap="round" />
							<circle cx="11" cy="15" r="1" fill="rgba(128,128,128,0.55)" />
						</svg>
					</Tooltip>
				</div>
			</div>

			{/* Shipping Info */ }
			{ isSim == '0' ? (
				<p className="text-xs text-[#5C5C5C] font-inter">
					*Giao SIM tại nhà - Có tính phí vận chuyển
				</p>
			) : (
				<p className="text-xs text-[#5C5C5C] font-inter">
					Lưu ý: eSIM là SIM điện tử, được gửi qua email khách hàng. eSIM chỉ sử dụng được trên các thiết bị di động có hỗ trợ.
					<span className="text-[#D2008C] cursor-pointer" onClick={ showDevicesEsimVikki }> Xem danh sách thiết bị</span>
				</p>
			) }
		</div>
		</div >
	);
};

export default InfoSim;
