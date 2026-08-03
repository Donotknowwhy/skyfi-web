import DevicesEsim, { DevicesEsimVikki } from "../components/modals/my-esim/DevicesEsim";
import GuideESim from "../components/modals/my-esim/GuideESim";
import ModalCodeAndroid from "../components/modals/my-esim/ModalCodeAndroid";
import ModalCodeIos from "../components/modals/my-esim/ModalCodeIos";
import { modal } from "../utils/modal";

const useMyEsim = ( data ) => {
	const showCodeAndroid = () => {
		modal.open( {
			render: <ModalCodeAndroid data={ data } />,
			boxClassName: 'md:max-w-4xl',

		} );
	};

	const showCodeIos = () => {
		modal.open( {
			render: <ModalCodeIos data={ data } />,
			boxClassName: 'md:max-w-4xl',

		} );
	};

	const showGuideESim = () => {
		modal.open( {
			render: <GuideESim />,
			boxClassName: 'md:max-w-4xl',
		} );
	};

	const showDevicesEsim = () => {
		modal.open( {
			render: <DevicesEsim />,
			boxClassName: 'md:max-w-4xl',
		} );
	};

	const showDevicesEsimHDBank = () => {
		showDevicesEsim();
	};

	const showDevicesEsimVikki = () => {
		modal.open( {
			render: <DevicesEsimVikki />,
			boxClassName: 'md:max-w-4xl',
		} );
	}

	return {
		showCodeAndroid,
		showCodeIos,
		showGuideESim,
		showDevicesEsim,
		showDevicesEsimHDBank,
		showDevicesEsimVikki
	};
};


export default useMyEsim;

// {
// "iccid": "894000000000094862",
// "status": "NOT_ACTIVE",
// "data_amount": 1,
// "data_unit": "GB",
// "validity_days": 7,
// "qrcode": "LPA:1$lpa.airalo.com$TEST",
// "qrcode_url": "https://sandbox.airalo.com/qr?expires=1834135642&id=298174&signature=8600079f4eee0d7cf05323aeb34451b075e0a8f786d30e2d33c8f61e73eee013",
// "region_id": 250,
// "region_name": "Virgin Islands, U.S.",
// "provider_name": "Airalo",
// "data": {
// "remaining": 0,
// "total": 0,
// "expired_at": "2025-05-28 10:10:11",
// "is_unlimited": false,
// "status": "EXPIRED",
// "remaining_voice": 0,
// "remaining_text": 0,
// }
// }.
