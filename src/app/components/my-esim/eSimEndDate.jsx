import { useTranslations } from 'next-intl';
import EmptyESim from './emtyEsim';
import { useMyEsim } from './myEsimProvider';
import {useRouter} from "next/navigation";

const InfoRow = ( { label, value, labelColor = '#333333' } ) => (
	<div className="flex justify-between items-center py-2 border-b border-[#F1F1F1] last:border-b-0">
		<span className="text-sm" style={ { color: labelColor } }>{ label }</span>
		<span className="text-base font-medium text-[#333333]">{ value }</span>
	</div>
);

const ESimEndDate = ( {
	coverage = "Singapore",
	dataLimit = "3 GB",
	iccid = "89840480003232863650",
	isExpired = true,
} ) => {
	const t = useTranslations( 'esim.endDate' );

	return (
		<div className="w-[full] bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] p-4">
			<div className="mb-2">
				<h3 className="text-lg font-semibold text-[#333333]">
					{ t( 'title' ) }
				</h3>
			</div>

			<div className="flex flex-col">
				<InfoRow
					label={ t( 'coverage' ) }
					value={ coverage }
				/>
				<InfoRow
					label={ t( 'dataLimit' ) }
					value={ dataLimit }
				/>
				<InfoRow
					label={ t( 'remainingTime' ) }
					value={ t( 'expired' ) }
				/>
				<InfoRow
					label={ t( 'iccid' ) }
					value={ iccid }
					labelColor="#5C5C5C"
				/>
			</div>
		</div>
	);
};

const PageEsimEndDate = () => {
	const t = useTranslations( 'esim.endDate' );
	const { getListESimByType } = useMyEsim();
	const esimData = getListESimByType( "expiredEsim" );
	const router=useRouter()
	return (
		<div className={"container gap-6 my-6 " + (esimData.length===0?"flex justify-center":"grid md:grid-cols-3")}>
			{ esimData && esimData.length > 0 ? esimData.map( ( esim ) => (
				<ESimEndDate
					key={ esim.iccid }
					coverage={ esim.region_name }
					dataLimit={ esim.data_amount+" "+ esim.data_unit }
					iccid={ esim.iccid }
					isExpired={ true }
				/>
			) ) : (
				<EmptyESim onBuyClick={ () => router.push("/travel-esim")} />
			) }
		</div>
	);
};

export default PageEsimEndDate;
