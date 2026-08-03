import { useTranslations } from "next-intl";
import Image from "next/image";
const Step = ( { isCheckOut } ) => {
  const t = useTranslations('checkout');

	if ( isCheckOut ) {
		return (
			<section className="w-full mt-[0] mb-[20px] hidden  bg-white border-b border-[#F1F1F1] md:flex flex-row justify-center items-center gap-[12px] p-0 h-[63px]">
				{/* Steps Item 1 - Completed */ }
				<div className="flex flex-col justify-center w-[373px] h-[53px]">
					<div className="flex flex-row items-center w-full gap-[12px]">
						<div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#E6F7EC]">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3.5 8L6.5 11L12.5 5" stroke="#00B141" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
						<span className="font-inter font-semibold text-[16px] leading-[1.5em] text-[#333]">{ t( 'steps.step1' ) }</span>
						<div className="py-[12px] pl-[8px] flex-1">
							<Image
								src="/images/steps_tail.svg"
								width={ 100 }
								height={ 1 }
								alt=""
								className="w-full"
							/>
						</div>
					</div>
				</div>

				{/* Steps Item 2 - Active */ }
				<div className="flex flex-col justify-center h-[53px]">
					<div className="flex flex-row items-center gap-[12px]">
						<div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-primary">
							<span className="font-inter font-semibold text-[14px] leading-[1.5em] text-white text-center">2</span>
						</div>
						<span className="font-inter font-semibold text-[16px] leading-[1.5em] text-[#333]">{ t( 'steps.step2' ) }</span>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="w-full mt-[0] mb-[20px] bg-white border-b hidden border-neutral-100 md:flex flex-row justify-center items-center gap-[12px] p-0 h-[63px]">
			{/* Steps Item 1 - Active */ }
			<div className="flex flex-col justify-center w-[373px] h-[53px]">
				<div className="flex flex-row items-center w-full gap-[12px]">
					<div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-primary">
						<span className="font-inter font-semibold text-[14px] leading-[1.5em] text-white text-center">1</span>
					</div>
					<span className="font-inter font-semibold text-[16px] leading-[1.5em] text-[#333]">{ t( 'steps.step1' ) }</span>
					<div className="py-[12px] pl-[8px] flex-1">
						<Image
							src="/images/steps_tail.svg"
							width={ 100 }
							height={ 1 }
							alt=""
							className="w-full"
						/>
					</div>
				</div>
			</div>

			{/* Steps Item 2 - Inactive */ }
			<div className="flex flex-col justify-center h-[53px]">
				<div className="flex flex-row items-center gap-[12px]">
					<div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#EBEBEB]">
						<span className="font-inter font-semibold text-[14px] leading-[1.5em] text-[#A1A1A1] text-center">2</span>
					</div>
					<span className="font-inter font-semibold text-[16px] leading-[1.5em] text-[#A1A1A1]">{ t( 'steps.step2' ) }</span>
				</div>
			</div>
		</section>
	);
};

export default Step;