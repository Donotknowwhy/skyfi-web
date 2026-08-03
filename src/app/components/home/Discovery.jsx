"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Discovery() {
	const locale = useLocale();
	const t = useTranslations( 'home.discovery' );


	const convertTextHighlight = ( text ) => {
		text.split( /\\n|\\L|\n/ )
			.map( ( line, index, arr ) => (
				<span key={ index } className='text-white text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] hover:underline transition-all duration-200'>
					{ line }
					{ index < arr.length - 1 && <br /> }
				</span>
			) );
	};


return (
	<section className="w-full flex justify-center bg-[#F7F7F7]">
		<div className="container">
			<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
				<div className="flex-1 flex justify-center lg:justify-end">
					<div className="relative w-full max-w-[500px] lg:max-w-[600px]">
						<img
							src="/assets/images/getApphome.png"
							alt="Phone Mockup"
							layout="fill"


						/>

					</div>
				</div>

				{/* Left Content - Text and QR Code */ }
				<div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
					{/* Main Title */ }
					<h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-5xl xl:text-[68px] !leading-[1.1]  text-[#333333] mb-4">
						{ t( 'title' ) }
						<span className="text-[#ED1B2F]">{ t( 'titleHighlight' ) }</span>
						<br />
						{ t( 'title1' ) }
					</h2>

					{/* Subtitle */ }
					<p className="font-inter text-base sm:text-lg md:text-xl text-[#666666] mb-8 sm:mb-10 lg:mb-12 max-w-[500px]">
						{ t( 'subtitle' ) }
					</p>

					{/* QR Code Section */ }
					<div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8 sm:mb-10">

						<div className="flex flex-col gap-3 sm:gap-4">

							{/* Download Buttons */ }
							<div className="flex flex-col  gap-3">
								<a href={"https://play.google.com/store/apps/details?id=vn.galaxytelecom.skyfi"} className="flex items-center w-[200px] h-[60px] gap-3 bg-[#000000] rounded-[8px] px-4 py-3">
									<Image
										src="/assets/images/googlePlay.png"
										alt="App Store"
										width={ 200 }
										height={ 60 }
										className='w-full h-full object-contain'
									/>

								</a>

								<a href={"https://apps.apple.com/us/app/skyfi/id6747164804"} className="flex items-center w-[200px] h-[60px] gap-3 bg-[#000000] rounded-[8px] px-4 py-3">
									<Image
										src="/assets/images/appStore.png"
										alt="Google Play"
										width={ 200 }
										height={ 60 }
										className='w-full h-full   object-contain'
									/>

								</a>
							</div>
						</div>
						<div className="bg-white rounded-[16px]  flex-shrink-0">
							<div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] bg-[#F5F5F5] rounded-[8px] flex items-center justify-center">
								<Image
									src="/assets/home/qr_get_app_1.png"
									alt="QR Code"
									width={ 100 }
									height={ 100 }
									className="sm:w-[120px] sm:h-[120px] object-cover"
								/>
							</div>
						</div>
					</div>


				</div>

				{/* Right Content - Phone Mockups */ }

			</div>
		</div>
	</section>
);
}
