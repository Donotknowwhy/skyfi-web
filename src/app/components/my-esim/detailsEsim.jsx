import BuyAddData from './buyAddDatex';
import DetailEsim from './detailEsim';

const DetailsEsimData = ( props ) => {
	return (
		<div className="bg-gray-100 min-h-screen py-10 px-4 md:px-0">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-6">
					{props.isDetail && <DetailEsim esimData={props.data} />}
					<BuyAddData iccid={props.data.iccid} sim={props.data} />
				</div>
			</div>
		</div>

	);
};

export default DetailsEsimData;