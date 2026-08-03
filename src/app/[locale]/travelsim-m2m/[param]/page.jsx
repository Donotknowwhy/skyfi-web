"use client";

import { saveLocal } from '@/app/utils/saveLocal';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { use } from 'react';
import Footer from '../../../components/Footer';
import HeaderVJ from '../../../components/HeaderVJ';
import TravelSimItemPage from '../../../components/travelsim-m2m/TravelSimItemPage';
import TravelSimPackagePage from '../../../components/travelsim-m2m/TravelSimPackagePage';



export default function TravelSimPage(props) {
	const searchParams = useSearchParams();


	const params = use(props.params);
	const code = params?.param; // This gets 'sim' from the URL path
	const type = searchParams.get('type');
	const phone = searchParams.get('phone');
	saveLocal('type', type || 'skyboss'); // This gets 'skyboss' from the query parameter
	if (type === 'freemium') {
		return (
			<>
				<HeaderVJ />
				<TravelSimPackagePage code={code} phone={phone} />
				<div className='hidden md:block'>
					<Footer />
				</div>
			{/*	<Script*/}
			{/*		src="https://www.googletagmanager.com/gtag/js?id=G-JWM8CQNVB2"*/}
			{/*		strategy="afterInteractive"*/}
			{/*	/>*/}
			{/*	<Script id="google-analytics-freemium" strategy="afterInteractive">*/}
			{/*		{`*/}
          {/*  window.dataLayer = window.dataLayer || [];*/}
          {/*  function gtag(){dataLayer.push(arguments);}*/}
          {/*  gtag('js', new Date());*/}
          {/*  gtag('config', 'G-JWM8CQNVB2');*/}
          {/*`}*/}
			{/*	</Script>*/}
			</>
		);
	}

	if (type === 'skyboss') {
		return (
			<>
				<HeaderVJ />
				<TravelSimItemPage code={code} phone={phone} />

				<div className='hidden md:block'>
					<Footer />
				</div>
			{/*	<Script*/}
			{/*		src="https://www.googletagmanager.com/gtag/js?id=G-F9HQDJ3267"*/}
			{/*		strategy="afterInteractive"*/}
			{/*	/>*/}
			{/*	<Script id="google-analytics-skyboss" strategy="afterInteractive">*/}
			{/*		{`*/}
          {/*  window.dataLayer = window.dataLayer || [];*/}
          {/*  function gtag(){dataLayer.push(arguments);}*/}
          {/*  gtag('js', new Date());*/}
          {/*  gtag('config', 'G-F9HQDJ3267');*/}
          {/*`}*/}
			{/*	</Script>*/}
			</>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-[#333333] mb-6">
						Invalid Type
					</h1>
					<p className="text-gray-600">
						Please use either 'package' or 'sim' as the type parameter.
					</p>
				</div>
			</div>
		</div>
	);
}
