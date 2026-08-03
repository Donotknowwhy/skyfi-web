"use client";

import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { ShippingNote, WarningNote } from '../../components/vikki/note';

export default function VikkiResultPage( { searchParams } ) {
	const router = useRouter();
	const param = use( searchParams );
	const type = param?.type;
	console.log( 'type', type );


	const handleGoBack = () => {
		router.back();
	};

	const handleClose = () => {
		router.push( '/vikki' );
	};

	return (
		<div className="min-h-screen ">


			{/* Header */ }
			<div className="flex items-center justify-between px-4 py-3 ">
				<button
					onClick={ handleGoBack }
					className="w-6 h-6 flex items-center justify-center"
				>
					<ChevronLeftIcon className="w-5 h-5 text-[#333333]" />
				</button>

				<h1 className="text-base font-semibold text-[#333333] text-center flex-1">
					Chi tiết giao dịch
				</h1>

				<button
					onClick={ handleClose }
					className="w-6 h-6 flex items-center justify-center"
				>
					<XMarkIcon className="w-5 h-5 text-[#333333]" />
				</button>
			</div>

			{/* Main Content */ }
			<div className="flex flex-col items-center px-4 pt-16">
				{/* Success Icon */ }
				<div className="w-36 h-36 mb-6 relative">
					<svg width="145" height="144" viewBox="0 0 145 144" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M108.983 22.2117C84.3961 22.6704 67.269 10.2473 55.4219 10.4713C43.5748 10.6953 18.8139 17.9735 19.8343 72.4801C20.8548 126.987 54.4796 134.361 67.5143 134.119C128.538 132.978 152.531 21.3975 108.983 22.2117Z" fill="#EAEEF2" />
						<path fillRule="evenodd" clipRule="evenodd" d="M56.2236 109.913L32.8326 77.4109C27.1266 69.4834 28.9281 58.4299 36.8571 52.7224L69.3576 29.3314C77.2866 23.6269 88.3401 25.4284 94.0461 33.3574L117.437 65.8579C123.143 73.7869 121.342 84.8404 113.413 90.5464L80.9106 113.937C72.9831 119.642 61.9296 117.84 56.2236 109.913Z" fill="#D2008C" />
						<path fillRule="evenodd" clipRule="evenodd" d="M102.952 104.228L63.1583 112.777C53.7848 114.791 44.5538 108.824 42.5408 99.4522L33.9908 59.6587C31.9793 50.2852 37.9433 41.0557 47.3168 39.0412L87.1103 30.4927C96.4838 28.4797 105.715 34.4452 107.728 43.8187L116.276 83.6122C118.291 92.9842 112.324 102.215 102.952 104.228Z" fill="url(#paint0_linear_661_35024)" />
						<path d="M59.5542 73.9908L69.4392 82.4703L90.7137 60.7983" stroke="white" stroke-width="4.1535" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M119.5 122C120.052 122 120.5 122.448 120.5 123V125C120.5 125.552 120.052 126 119.5 126C118.948 126 118.5 125.552 118.5 125V123C118.5 122.448 118.948 122 119.5 122ZM116.5 119C117.052 119 117.5 119.448 117.5 120C117.5 120.552 117.052 121 116.5 121H114.5C113.948 121 113.5 120.552 113.5 120C113.5 119.448 113.948 119 114.5 119H116.5ZM124.5 119C125.052 119 125.5 119.448 125.5 120C125.5 120.552 125.052 121 124.5 121H122.5C121.948 121 121.5 120.552 121.5 120C121.5 119.448 121.948 119 122.5 119H124.5ZM119.5 114C120.052 114 120.5 114.448 120.5 115V117C120.5 117.552 120.052 118 119.5 118C118.948 118 118.5 117.552 118.5 117V115C118.5 114.448 118.948 114 119.5 114Z" fill="#ABD653" />
						<path d="M16.5 77.667C16.9601 77.6671 17.333 78.0398 17.333 78.5V80.167C17.3328 80.627 16.96 80.9999 16.5 81C16.0399 81 15.6662 80.6271 15.666 80.167V78.5C15.666 78.0398 16.0398 77.667 16.5 77.667ZM14 75.167C14.4602 75.167 14.833 75.5398 14.833 76C14.833 76.4602 14.4602 76.833 14 76.833H12.333C11.8729 76.8328 11.5 76.4601 11.5 76C11.5 75.5399 11.8729 75.1672 12.333 75.167H14ZM20.667 75.167C21.127 75.1672 21.5 75.5399 21.5 76C21.5 76.4601 21.127 76.8328 20.667 76.833H19C18.5398 76.833 18.167 76.4602 18.167 76C18.167 75.5398 18.5398 75.167 19 75.167H20.667ZM16.5 71C16.96 71.0001 17.3328 71.373 17.333 71.833V73.5C17.333 73.9602 16.9601 74.3329 16.5 74.333C16.0398 74.333 15.666 73.9602 15.666 73.5V71.833C15.6662 71.3729 16.0399 71 16.5 71Z" fill="#ABD653" />
						<path d="M122.5 45.667C122.822 45.6671 123.083 45.9279 123.083 46.25V47.417C123.083 47.739 122.822 47.9999 122.5 48C122.178 48 121.917 47.739 121.917 47.417V46.25C121.917 45.9278 122.178 45.667 122.5 45.667ZM120.75 43.917C121.072 43.917 121.333 44.1778 121.333 44.5C121.333 44.8222 121.072 45.083 120.75 45.083H119.583C119.261 45.0828 119 44.822 119 44.5C119 44.1779 119.261 43.9172 119.583 43.917H120.75ZM125.417 43.917C125.739 43.9172 126 44.178 126 44.5C126 44.822 125.739 45.0828 125.417 45.083H124.25C123.928 45.083 123.667 44.8222 123.667 44.5C123.667 44.1778 123.928 43.917 124.25 43.917H125.417ZM122.5 41C122.822 41.0001 123.083 41.261 123.083 41.583V42.75C123.083 43.0721 122.822 43.3329 122.5 43.333C122.178 43.333 121.917 43.0722 121.917 42.75V41.583C121.917 41.261 122.178 41 122.5 41Z" fill="#ABD653" />
						<defs>
							<linearGradient id="paint0_linear_661_35024" x1="30.4546" y1="127.259" x2="119.118" y2="124.459" gradientUnits="userSpaceOnUse">
								<stop stop-color="#2C4EFF" />
								<stop offset="0.165" stop-color="#0000FF" />
								<stop offset="0.50492" stop-color="#6100FF" />
								<stop offset="0.756211" stop-color="#DA0191" />
								<stop offset="0.909314" stop-color="#FF8A00" />
								<stop offset="1" stop-color="#FFB907" />
							</linearGradient>
						</defs>
					</svg>

				</div>

				{/* Success Message */ }
				<h2 className="text-[22px] font-bold text-[#D2008C] text-center leading-[1.2] mb-6">
					Chúc mừng bạn<br />
					đã đăng ký thành công
				</h2>

				{/* Warning Banner */ }
				{/* <div className="w-full max-w-sm mx-auto mb-6">
					<div className="bg-[#FFF5E9]  rounded-xl p-4">
						<div className="flex items-center gap-4">
							<div className="w-6 h-6 bg-[#FFF0DD] rounded-full flex items-center justify-center flex-shrink-0">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect width="24" height="24" rx="12" fill="#FFF0DD" />
									<circle cx="12" cy="12" r="10" fill="white" />
									<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5229 17.5229 22 12 22C6.47716 22 2 17.5229 2 12C2 6.47716 6.47716 2 12 2C17.5229 2 22 6.47716 22 12ZM12 6.10714C12.4931 6.10714 12.8929 6.50689 12.8929 7V11.2857C12.8929 11.7788 12.4931 12.1786 12 12.1786C11.5069 12.1786 11.1071 11.7788 11.1071 11.2857V7C11.1071 6.50689 11.5069 6.10714 12 6.10714ZM12 17C12.789 17 13.4286 16.3604 13.4286 15.5714C13.4286 14.7824 12.789 14.1429 12 14.1429C11.211 14.1429 10.5714 14.7824 10.5714 15.5714C10.5714 16.3604 11.211 17 12 17Z" fill="#FF8A00" />
								</svg>

							</div>



							{ type === '1' ? (
								<p className="text-xs text-[#0C0C0E] leading-[1.33] font-normal">
									eSIM của bạn sẽ được gửi qua email đăng ký và app Vikki
								</p> ) : (
								<p className="text-xs text-[#0C0C0E] leading-[1.33] font-normal">
									SIM của bạn sẽ được gửi tới địa chỉ đăng ký
								</p>
							) }

						</div>
					</div>
				</div> */}
				<ShippingNote className={ "mt-4" }>
					SIM sẽ được gửi tới bạn sau khi hồ sơ được duyệt thành công (từ 15/10 đến 20/10)
				</ShippingNote>

				<WarningNote className={ "mt-4" }>
					Khi kích hoạt, số thuê bao bạn chọn sẽ được liên kết vào tài khoản Vikki để nhận OTP và tin nhắn CSKH của Vikki Bank
				</WarningNote>

				{/* Footer Message */ }
				{/* <p className="text-[13px] text-[#0C0C0E] font-normal leading-[1.54] text-center">
					Chúc bạn một ngày tốt lành !
				</p> */}
			</div>
		</div>
	);
}
