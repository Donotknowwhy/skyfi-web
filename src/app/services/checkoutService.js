const { post, get,postWithoutAuth } = require("./api/base");



const getCities = async () => {
	try {
		const res = await get('/app/get-cities');

		if (res.success && res.data.cities && res.data.cities.length > 0) {
			return res.data.cities;
		}
		throw new Error('Failed to get cities');
	} catch (error) {
		return error.response.data;
	}
};
const getDistricts = async () => {
	try {
		const res = await get(`/app/get-districts`);
		if (res.success && res.data.districts && res.data.districts.length > 0) {
			return res.data.districts;
		}
		throw new Error('Failed to get districts');
	} catch (error) {
		return error.response.data;
	}
};
const getWards = async () => {
	try {
		const res = await get(`/app/get-wards`);
		if (res.success && res.data.wards && res.data.wards.length > 0) {
			return res.data.wards;
		}
		throw new Error('Failed to get wards');
	} catch (error) {
		return error.response.data;
	}
};
const getPaymentMethods = async () => {
	try {
		const res = await get(`/payment/gateways/GALAXYPAY/methods`);
		if (res.success && res.data.methods && res.data.methods.length > 0) {
			return res.data.methods;
		}
		throw new Error('Failed to get payment methods');
	} catch (error) {
		return error.response.data;
	}
};
const getPaymentMethods_SKYJOY = async () => {
	try {
		const res = await get(`/payment/gateways/SKYJOY/methods`);
		if (res.success && res.data.methods && res.data.methods.length > 0) {
			return res.data.methods;
		}
		throw new Error('Failed to get payment methods');
	} catch (error) {
		return error.response.data;
	}
};

const getFeeShipping = async (params) => {
	try {
		const res = await post(`/app/get-shipping-fee`, params);

		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to get fee shipping');
	} catch (error) {
		console.log(error);

		return error;
	}
}

const getFeeShippingVikki = async (params) => {
	try {
		const res = await postWithoutAuth(`/app/get-shipping-fee`, params);

		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to get fee shipping');
	} catch (error) {
		console.log(error);

		return error;
	}
}

const createOrder = async (params) => {
	try {
		const res = await post('/app/create-order', params);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to create order');
	} catch (error) {
		return error;
	}
};

const createOrderPackage = async (params) => {
	try {
		const res = await post('/app/create-order-package', params);
		if (res.success) {
			return res.data;
		}
		return { success: false, message: res.message };
	} catch (error) {
		return error;
	}
};

const getlinkPayment = async (params) => {
	try {
		const res = await post('/payment/gateways/GALAXYPAY/redirect', params);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to create payment link');
	} catch (error) {
		return error;
	}
};
const getlinkPayment_SKYJOY = async (params) => {
	try {
		const res = await post('/payment/gateways/SKYJOY/redirect', params);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to create payment link');
	} catch (error) {
		return error;
	}
};

const getOrder = async (orderCode) => {
	try {
		const res = await get(`/app/get-order/${orderCode}`);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to get order');
	} catch (error) {
		return error;
	}
}

const validateCoupon = async (params) => {
	try {
		const res = await post('/app/validate-coupon', params);
		if (res.success) {
			return res.data;
		}
		throw new Error(res.message || 'Lỗi khi kiểm tra mã giảm giá');
	} catch (error) {
		throw error;
	}
}

const CheckoutService = {
	createOrder,
	createOrderPackage,
	getCities,
	getDistricts,
	getWards,
	getPaymentMethods,
	getFeeShipping,
	getFeeShippingVikki,
	getlinkPayment,
	getOrder,
	validateCoupon,
	getlinkPayment_SKYJOY,
	getPaymentMethods_SKYJOY
};

export default CheckoutService;
