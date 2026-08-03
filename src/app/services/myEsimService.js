import { get, post } from "./api/base";

const getListESim = async () => {
	try {
		const res = await get("/travel-esim/my-travel-esim");
		if (res.success) {
			return res.data;
		}
		throw new Error("Failed to get eSIM list");
	} catch (error) {
		return error;

	}
}

const getListTopupESim = async (iccid) => {
	try {
		const res = await get(`/travel-esim/list-topup-package/${iccid}`);
		if (res.success) {
			return res.data;
		}
		throw new Error("Failed to get eSIM topup list");
	} catch (error) {
		return error;
	}
}

const addTopupPackage = async (id, iccid) => {
	try {
		const params = {
			"product_id": id,
			"iccid": iccid,
			"source": "WEB"
		};

		const res = await post(`/travel-esim/create-order-topup`, params);

		if ( res.data.order_number ) {
			return res.data.order_number;

		}
	} catch (error) {
		return '';
	}
}

const getLinkPayment = async (orderID) => {

	const response = await post('/payment/gateways/GALAXYPAY/redirect',
		{ 'orderNumber': orderID });
	if (response.data) {
		const link = response.data.redirectUrl;
		if (link) {
			return link;
		}
	}
	return '';
}
const travelEsimDetail = async (iccid) => {

	const response = await get('/travel-esim/my-travel-esim/detail/'+iccid);
	if (response.data) {
		return response.data;
	}
	return {};
}

const getBrandModels = async () => {
	try {
		const response = await get(`/app/get-compatible-devices`);
		if (response.data) {
			return response.data;
		}
		throw new Error("Failed to get brand models");
	} catch (error) {
		return error;
	}
}

const MyESimService = {
	getListESim,
	getListTopupESim,
	addTopupPackage,
	getLinkPayment,
	travelEsimDetail,
	getBrandModels
};
export default MyESimService;
