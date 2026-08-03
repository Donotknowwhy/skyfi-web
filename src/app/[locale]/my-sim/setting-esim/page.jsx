"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect } from "react";

const SettingESim = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = useParams();

	useEffect(() => {
		// Lấy locale hiện tại từ params
		const locale = params.locale || 'vi';

		// Lấy tất cả query params hiện tại
		const currentParams = searchParams.toString();

		// Tạo URL redirect với query params được giữ nguyên
		const redirectUrl = currentParams
			? `/${locale}/my-eSim?${currentParams}`
			: `/${locale}/my-eSim`;

		// Redirect về route cũ
		router.replace(redirectUrl);
	}, [router, searchParams, params]);

	// Return loading spinner trong khi redirect
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ED1B2F] mx-auto"></div>
				<p className="mt-2 text-gray-600">Đang chuyển hướng...</p>
			</div>
		</div>
	);
};

export default SettingESim;
