import { get, post } from "./api/base";

// HDBank-specific endpoints. Base URL already includes `/api/bss`, so paths are
// relative to that (e.g. `/hdbank/...` -> `/api/bss/hdbank/...`).

const getSimRandom = async () => {
	try {
		const res = await get('/hdbank/get-random-msisdn');
		if (res.success && res.data && res.data.length > 0) {
			return res.data[0];
		}
		throw new Error(res.message || 'Failed to fetch random sim data');
	} catch (error) {
		console.error('Error fetching random sim data:', error);
		throw error;
	}
};

const searchSim = async (params) => {
	try {
		const res = await post('/hdbank/get-phone-numbers', params);
		if (res.success) {
			return res.data;
		}
		throw new Error(res.message || 'Failed to fetch sim data');
	} catch (error) {
		console.error('Error fetching sim list:', error);
		throw error;
	}
};

const getPackageSim = async (phone, type = 'ESIM') => {
	try {
		const res = await get(`/hdbank/get-package-by-msisdn/${phone}/${type}`);
		if (res.success) {
			return { packages: res.data, extra: res.extra };
		}
		throw new Error(res.message || 'Failed to fetch package data');
	} catch (error) {
		console.error('Error fetching package data:', error);
		throw error;
	}
};

const createOrder = async (params) => {
	try {
		const res = await post('/hdbank/create-order', params);
		if (res.success) {
			return res;
		}
		throw new Error('Failed to create order');
	} catch (error) {
		return error;
	}
};

const HDBankService = {
	getSimRandom,
	searchSim,
	getPackageSim,
	createOrder,
};

export { HDBankService };
export default HDBankService;
