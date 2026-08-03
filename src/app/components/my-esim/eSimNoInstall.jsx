import { useTranslations } from 'next-intl';
import EmptyESim from './emtyEsim';
import { useMyEsim } from './myEsimProvider';
import {useRouter} from "next/navigation";

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-[#F1F1F1] last:border-b-0">
    <span className="text-sm text-[#333333]">{label}</span>
    <span className="text-sm font-medium text-[#333333]">{value}</span>
  </div>
);

const ESimNoInstall = ({
  coverage = "",
  dataLimit = "",
	dataUnit = "",
	validity = "",
  onSelect
}) => {
  const t = useTranslations('esim.noInstall');

  return (
    <div className="w-[450px] bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] p-4">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-[#333333]">
          {t('title')}
        </h3>
      </div>

      <div className="flex flex-col">
        <InfoRow
          label={t('coverage')}
          value={coverage}
        />
        <InfoRow
          label={t('dataLimit')}
          value={dataLimit+" " +dataUnit}
        />
        <InfoRow
          label={t('activationPolicy')}
          value={t('activationPolicyDesc')}
        />
        <InfoRow
          label={t('validity')}
          value={validity + " "+ t("days")}
        />
      </div>

      <button className="w-full mt-2 py-3 px-6 bg-[#E69818] text-white rounded-lg font-semibold text-base" onClick={onSelect}>
        {t('installNow')}
      </button>
    </div>
  );
};

const PageEsimNoInstall = ( { setDataDetails } ) => {
	const t = useTranslations( 'esim.noInstall' );
		const { getListESimByType } = useMyEsim();
	const esimData = getListESimByType( "notInstalledEsim" );
	const router=useRouter()

	return (
		<div className="flex flex-wrap gap-6 container py-10">
			{ esimData && esimData.length > 0 ? esimData.map( ( esim ) => (
				<ESimNoInstall
					key={ esim.iccid }
					coverage={ esim.region_name }
					dataLimit={ esim.data_amount }
					dataUnit={ esim.data_unit }
					validity={ esim.validity_days }
					onSelect={ () => setDataDetails( esim ) }
				/>
			) ) : (
				<EmptyESim onBuyClick={ () => router.push("/travel-esim") } />
			) }
		</div>
	);
}

export default PageEsimNoInstall;
