import axios from "axios";
import { get, post } from "./api/base";

/**
 * Get travel sim packages by code
 * @param {string} code - Package code (e.g., "124")
 * @returns {Promise<Array>} Array of travel sim packages
 */
const getPackageByCode = async ( code, { source, locale } ) => {
	try {
		const res = await axios.get( `${process.env.NEXT_PUBLIC_API_BASE_URL}/vj/get-package-by-code/${ code }`, { headers: { source, locale } } );
		if ( res.data.code === 200 ) {
			return res.data.result;
		} else {
			throw new Error( res.data.message || 'Failed to fetch travel sim packages' );
		}
	} catch ( error ) {
		console.error( 'Error fetching travel sim packages:', error );
		throw error;
	}
};
const getPackageByCodeV2 = async ( code, { source, locale } ) => {
	try {
		const res = await axios.get( `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/vj/get-package-by-code`, { headers: { source, locale } } );
		if ( res.data.code === 200 ) {
			return res.data.result;
		} else {
			throw new Error( res.data.message || 'Failed to fetch travel sim packages' );
		}
	} catch ( error ) {
		console.error( 'Error fetching travel sim packages:', error );
		throw error;
	}
};



/**
 * Get MSISDN (phone numbers) by code
 * @param {string} code - Order code (e.g., "2V2G89")
 * @returns {Promise<Array>} Array of MSISDN records with sim details
 */
const getMsisdnByCode = async ( code, {source, locale} ) => {
	try {
		const res = await axios.get( `${process.env.NEXT_PUBLIC_API_BASE_URL}/vj/get-msisdn-by-code/${ code }`, { headers: { source, locale } } );


		if ( res.data.code === 200 ) {
			return res.data.result	;
		} else {
			throw new Error( res.data.message || 'Failed to fetch MSISDN by code' );
		}
	} catch ( error ) {
		// console.error('Error fetching MSISDN by code:', error);
		throw error;
	}
};

/**
 * Get MSISDN (phone numbers) by code
 * @param {string} code - Order code (e.g., "2V2G89")
 * @returns {Promise<Array>} Array of MSISDN records with sim details
 */

const getMsisdnByPhone = async ( phone ) => {
	try {
		const res = await get( `/vj/get-msisdn-info/${ phone }` );
		if ( res.success ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to fetch MSISDN by phone' );
		}
	} catch ( error ) {
		// console.error('Error fetching MSISDN by phone:', error);
		throw error;
	}
};

/**
 * Create a new travel sim order
 * @param {Object} orderData - Order data object
 * @param {string} orderData.code - Order code (e.g., "2V2G89")
 * @param {Array} orderData.items - Array of order items
 * @param {number} orderData.items[].msisdn_id - MSISDN ID
 * @param {number} orderData.items[].quantity - Quantity
 * @param {number} orderData.items[].sim_id - SIM ID
 * @param {string} orderData.items[].package_code - Package code (e.g., "SF65T")
 * @param {number} orderData.items[].pack_price - Package price
 * @returns {Promise<Object>} Order creation response
 */
const createOrder = async ( orderData ) => {
	try {
		const res = await post( '/vj/create-order', orderData );
		if ( res.success ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to create travel sim order' );
		}
	} catch ( error ) {
		console.error( 'Error creating travel sim order:', error );
		throw error;
	}
};
const createOrderV1 = async ( orderData, { locale }  ) => {
    try {
        const res = await axios.post( `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/vj/create-order`,orderData, { headers: {locale } });
        if ( res.data.code === 200 ) {
            return res.data.result;
        } else {
            throw new Error( res.data.message || 'Failed to create travel sim order' );
        }
    } catch ( error ) {
        console.error( 'Error creating travel sim order:', error );
        throw error;
    }
};
const createOrderV2 = async ( orderData, {  locale }  ) => {
	try {
		const res = await axios.post( `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/vj/create-order-v2`,orderData, { headers: {locale } });;
        if ( res.data.code === 200 ) {
            return res.data.result;
        }else {
			throw new Error( res.data.message || 'Failed to create travel sim order' );
		}
	} catch ( error ) {
		console.error( 'Error creating travel sim order:', error );
		throw error;
	}
};
const giftEsim = async (  email,pnr ) => {
	try {
		const res =  await axios.post( process.env.NEXT_PUBLIC_API_BASE_URL+'/v1/vj/gift-esim', {email:email,pnr:pnr} );
		if ( res.data ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to create travel sim order' );
		}
	} catch ( error ) {
		console.error( 'Error creating travel sim order:', error );
		throw error;
	}
};

const validateEmailPnr = async ( email,pnr ) => {
	try {
		const res = await axios.post( process.env.NEXT_PUBLIC_API_BASE_URL+'/v1/vj/validate-email-pnr', {email:email,pnr:pnr} );
		if ( res.data ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to create travel sim order' );
		}
	} catch ( error ) {
		console.error( 'Error creating travel sim order:', error );
		throw error;
	}
};
const sendOtpEmail = async ( email ) => {
	try {
		const res = await post( 'v1/vj/send-otp-email', {email} );
		if ( res.success ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to create travel sim order' );
		}
	} catch ( error ) {
		console.error( 'Error creating travel sim order:', error );
		throw error;
	}
};
const verifyOtpEmail = async ( email,otp ) => {
	try {
		const res = await post( 'v1/vj/verify-otp-email', {email:email,code:otp} );
		if ( res.success ) {
			return res;
		} else {
			throw new Error( res.message || 'Failed to create travel sim order' );
		}
	} catch ( error ) {
		console.error( 'Error creating travel sim order:', error );
		throw error;
	}
};


const TravelSimService = {
	getPackageByCode,
    createOrderV1,
    getPackageByCodeV2,
	getMsisdnByCode,
	createOrder,
    createOrderV2,
	getMsisdnByPhone,
    sendOtpEmail,
    verifyOtpEmail,
	validateEmailPnr,
    giftEsim
};

export default TravelSimService;
