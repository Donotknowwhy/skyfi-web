import {
  ORDER_BRANDS,
  getOrderSourceContext,
  applyTopupOrderSource,
} from "../utils/orderSourceContext";
import { get, post } from "./api/base";



// Get topup network list
const getTopupNetwork = async () => {
	try {
		const res = await get('/app/get-topup-network');
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to get topup network');
	} catch (error) {
		return error;
	}
};

// Get topup values by network ID
const getTopupValue = async (networkId, brand = ORDER_BRANDS.WEB) => {
	try {
		const { topupPathSegment } = getOrderSourceContext(brand);
		const res = await get(`/app/get-topup-value/${networkId}/${topupPathSegment}`);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to get topup value');
	} catch (error) {
		return error;
	}
};

// Get topup history
const getTopupHistory = async () => {
	try {
		const res = await get('/app/get-topup-history');
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to get topup history');
	} catch (error) {
		return error;
	}
};

// Create topup order
const createOrderTopup = async (params) => {
	try {
		const { brand = ORDER_BRANDS.WEB, ...payload } = params || {};
		const res = await post(
			'/app/create-order-topup',
			applyTopupOrderSource( brand, payload ),
		);
		if (res.success) {
			return res;
		}
		throw new Error('Failed to create topup order');
	} catch (error) {
		return error;
	}
};

const TopupService = {

	getTopupNetwork,
	getTopupValue,
	getTopupHistory,
	createOrderTopup
};

export default TopupService;
