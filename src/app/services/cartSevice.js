import { del, post } from "./api/base";

const addToCart = async (item) => {
	try {
		const res = await post('/app/add-to-cart', item);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to add item to cart');
	} catch (error) {
		return error.response.data;
	}
}
const getCart = async (customer_id) => {
	try {
		const res = await post('/app/get-cart', { customer_id });
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to get cart');
	} catch (error) {
		console.log('error', error);

		return [];
	}
}

const changeQuantity = async (item) => {
	try {
		const res = await post('/app/increase-quantity', item);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to change quantity');
	} catch (error) {
		return error.response.data;
	}
}
const updateQuantity = async (item) => {
	try {
		const res = await post('/app/update-quantity', item);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to change quantity');
	} catch (error) {
		return error.response.data;
	}
}

const removeItem = async (item) => {
	try {
		const res = await del('/app/remove-from-cart', item);
		if (res.success) {
			return res.data;
		}
		throw new Error('Failed to remove item');
	} catch (error) {
		return error.response.data;
	}
}




const CartService = {
	addToCart,
	getCart,
	changeQuantity,
	removeItem,
	updateQuantity
};

export default CartService;
