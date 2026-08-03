"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import DetailNoActive from "../../components/my-esim/detailNoActive";
import DetailsEsimData from "../../components/my-esim/detailsEsim";
import PageEsimEndDate from "../../components/my-esim/eSimEndDate";
import PageEsimNoInstall from "../../components/my-esim/eSimNoInstall";
import ListEsim from "../../components/my-esim/listEsim";
import MyEsimProvider from "../../components/my-esim/myEsimProvider";
import {useSearchParams} from "next/navigation";
import MyESimService from "@/app/services/myEsimService";
import {useLoad} from "@/app/utils/load";

const MyESim = () => {
	const t = useTranslations("my-esim");
	const [activeTab, setActiveTab] = useState("activeEsim");

	const [dataDetails, setDataDetails] = useState(null);
	const [isDetail, setIsDetail] = useState(true);
	const loader = useLoad();

	const searchParams = useSearchParams();
	const iccid=searchParams.get('iccid')

	useEffect(() => {
		const fetchESimDetail = async () => {
			if (iccid) {
				try {
					loader.open();
					const resp = await MyESimService.travelEsimDetail(iccid);
					setDataDetails(resp);
				} catch (error) {
					console.error('Lỗi khi lấy thông tin eSIM:', error);
					// Có thể thêm thông báo lỗi cho người dùng
				} finally {
					loader.close();
				}
			}
		};
		fetchESimDetail();
	}, [iccid]);


	const renderTabContent = (setDataDetails, setIsDetail) => {
		switch (activeTab) {
			case "activeEsim":
				return <ListEsim setDataDetails={setDataDetails} setIsDetail={setIsDetail} />;
			case "notInstalledEsim":
				return <PageEsimNoInstall setDataDetails={setDataDetails} />;
			case "expiredEsim":
				return <PageEsimEndDate />;
			default:
				return null;
		}
	};

	const renderDataDetails = (data, isDetail = true) => {
		switch (activeTab) {
			case "activeEsim":
				return <DetailsEsimData data={data} isDetail={isDetail} />;
			case "notInstalledEsim":
				return <DetailNoActive data={data} />;
			case "expiredEsim":
				return <PageEsimEndDate />;
			default:
				return null;
		}
	};


	const _setActiveTab = (tab) => {
		setActiveTab(tab);
		setDataDetails(null); // Reset dataDetails when switching tabs
	};


	return (
		<MyEsimProvider>
			<div className="bg-[#F5F5F5]">
				<Header />

				<div className="w-full container justify-center pt-10 space-y-5">
					<h1 className="text-3xl font-semibold text-[#333333]">{t("pageTitle")}</h1>

					{/* Tabs */}
					{!iccid &&(
						<div className="flex border-b border-[#F1F1F1]">
							<button
								className={`py-3 px-4 font-semibold text-base ${activeTab === "activeEsim"
									? "text-[#ED1B2F] border-b-2 border-[#ED1B2F]"
									: "text-[#A1A1A1]"
								}`}
								onClick={() => _setActiveTab("activeEsim")}
							>
								{t("tabs.activeEsim")}
							</button>
							<button
								className={`py-3 px-4 font-semibold text-base ${activeTab === "notInstalledEsim"
									? "text-[#ED1B2F] border-b-2 border-[#ED1B2F]"
									: "text-[#A1A1A1]"
								}`}
								onClick={() => _setActiveTab("notInstalledEsim")}
							>
								{t("tabs.notInstalledEsim")}
							</button>
							<button
								className={`py-3 px-4 font-semibold text-base ${activeTab === "expiredEsim"
									? "text-[#ED1B2F] border-b-2 border-[#ED1B2F]"
									: "text-[#A1A1A1]"
								}`}
								onClick={() => _setActiveTab("expiredEsim")}
							>
								{t("tabs.expiredEsim")}
							</button>
						</div>
					)}

				</div>
				{dataDetails ? (
					renderDataDetails(dataDetails,isDetail)
				) : renderTabContent(setDataDetails, setIsDetail)}

				{/* CTA Section */}
				<div className="w-full py-20 flex justify-center">
					<div className="container bg-[#333333] rounded-2xl p-10 md:p-20 flex flex-col items-start relative overflow-hidden">
						<div className="absolute  inset-0 opacity-50">
							<Image fill src="/images/my-esim/bg-myeSim.png" alt="Graphic" className="object-fill" />
						</div>
						<h2 className="text-4xl font-semibold text-white mb-5 max-w-2xl z-10">
							{t("cta.title")}
						</h2>
						<p className="text-white mb-10 max-w-2xl z-10">
							{t("cta.description")}
						</p>
						<Link href="/esim" className="z-10">
							<button className="bg-[#E69818] text-white py-4 px-6 rounded-lg font-semibold z-10">
								{t("cta.buyEsim")}
							</button>
						</Link>

					</div>
				</div>
				<Footer />
			</div>
		</MyEsimProvider>
	);
};

export default MyESim;
