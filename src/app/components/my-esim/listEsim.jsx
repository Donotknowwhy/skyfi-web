import { CalendarIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import EmptyESim from "./emtyEsim";
import { useMyEsim } from "./myEsimProvider";
import {useRouter} from "next/navigation";

const ListEsim = ({ setDataDetails, setIsDetail }) => {
	const t = useTranslations("my-esim");
	const { getListESimByType } = useMyEsim();
	const esimData = getListESimByType("activeEsim");
	const router=useRouter()


	const calculateRemainingDays = (expiryDate) => {
		const currentDate = new Date();
		const expiry = new Date(expiryDate);
		const timeDiff = expiry - currentDate;
		const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return daysLeft > 0 ? daysLeft : 0;
	}


	const convertDataToGBString = (data) => {
		if (data >= 1024) {
			return `${(data / 1024).toFixed(0)} GB`;
		}
		return `${data} MB`;
	}


	return (

		<div className="flex flex-wrap gap-6 container py-10 justify-center">
			{esimData && esimData.length > 0 ? esimData.map((esim) => (
				<div
					key={esim.iccid}
					className="w-[450px] bg-white rounded-xl shadow-md flex flex-col font-koho"
				>
					{/* Card content */}
					<div className="px-5 py-5">
						<div className="flex justify-between items-center">
							{/* Info section */}
							<div className="flex-1 space-y-2">
								<div className="w-full">
									<h3 className="text-lg font-semibold text-[#333333] font-koho">{t("esimCard.planName")}</h3>
								</div>

								<div className="w-full">
									<p className="text-sm text-[#5C5C5C] font-koho">{t("esimCard.coverage")}</p>
									<p className="font-semibold font-koho text-[#333333]">{esim.region_name}</p>
								</div>

								<div className="w-full">
									<p className="text-sm text-[#5C5C5C] font-koho">{t("esimCard.iccid")}</p>
									<p className="font-semibold font-koho	 text-[#333333]">{esim.iccid}</p>
								</div>

								<div className="w-full">
									<p className="text-sm text-[#5C5C5C] font-koho">{t("esimCard.timeLeft")}</p>
									<div className="flex items-center gap-2">
										<p className="font-semibold font-koho text-[#333333]">
											{t("esimCard.days", { days: esim.data?.expired_at ? calculateRemainingDays(esim.data.expired_at) : 0 })}
										</p>
										<div className="bg-[#EAF1FF] rounded-full text-[#2F74FF] px-2 py-1 flex items-center gap-1 text-xs mt-2">
											<CalendarIcon className="h-4 w-4" />
											<span className="font-bold font-koho">{esim?.data?.expired_at?.split(' ')[0]}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Data usage circle */}
							<div className="w-[180px] h-[180px] relative flex flex-col items-center justify-center  rounded-full"
							>
								<div className="flex flex-col items-center">
									<p className="text-[#5C5C5C] font-semibold text-base">{t("esimCard.dataRemaining")}</p>
									<p className="text-xl font-semibold text-[#EA2227] font-koho">
										{convertDataToGBString((esim?.data?.remaining||0))}/{convertDataToGBString(esim?.data?.total||0)}
									</p>
								</div>
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
										strokeDashoffset={`${534 * ((esim.data?.remaining / esim.data?.total))}`}
										strokeLinecap="round"
									/>
									<defs>
										<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" stopColor="#FF787A" />
											<stop offset="100%" stopColor="#FFD76D" />
										</linearGradient>
									</defs>
								</svg>
							</div>
						</div>
					</div>

					{/* Card buttons */}
					<div className="p-5 flex gap-3 mt-auto">
						<button
							onClick={() => {
								setDataDetails(esim);
								setIsDetail(true);
							}}
							className="flex-1 py-2 px-4 border font-koho border-[#CC8F14] text-[#CC8F14] rounded-lg font-semibold">
							{t("esimCard.viewDetails")}
						</button>
						<button onClick={() => {
							setDataDetails(esim);
							setIsDetail(false);
						}} className="flex-1 py-2 px-4 bg-[#E69818] text-base font-koho text-white rounded-lg font-semibold">
							{t("esimCard.buyMoreData")}
						</button>
					</div>
				</div>
			)) : (
				<EmptyESim onBuyClick={() => router.push("/travel-esim")} />
			)}
		</div>
	);
};

export default ListEsim;
