import { get, post } from "./api/base";

const getSimRandom = async () => {
	try {
		const res = await get( '/sales/viki/get-random-msisdn' );
		if ( res.success && res.data && res.data.length > 0 ) {
			return res.data[ 0 ];
		} else {
			throw new Error( res.message || 'Failed to fetch random sim data' );
		}
	} catch ( error ) {
		console.error( 'Error fetching random sim data:', error );
		throw error;

	}
};
const getPackageSim = async ( phone ) => {
	try {
		const res = await get( `/sales/viki/get-package-by-msisdn/${ phone }` );
		if ( res.success ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to fetch sim data' );
		}

	} catch ( error ) {
		console.error( 'Error fetching random sim data:', error );
		throw error;

	}
};
const searchSim = async ( params ) => {
	try {
		const res = await post( '/sales/viki/get-phone-numbers', params );
		if ( res.success ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to fetch sim data' );
		}

	} catch ( error ) {
		console.error( 'Error fetching random sim data:', error );
		throw error;

	}
};


const createOrder = async ( params ) => {
	try {
		const res = await post( '/sales/viki/create-order', params );
		if ( res.success ) {
			return res;
		}
		throw new Error( 'Failed to create order' );
	} catch ( error ) {
		return error;
	}
};

const getDataByToken = async ( token ) => {
	try {
		const res = await post( `/sales/viki/decode-token`, { token } );
		if ( res.success ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to fetch sim data' );
		}

	} catch ( error ) {
		console.error( 'Error fetching random sim data:', error );
		return error.data;

	}
}

/**
 * Convert S3 image URLs to base64 strings
 * @param {Object} params - Object containing image URLs
 * @param {string} params.img_front - Front ID image URL
 * @param {string} params.img_back - Back ID image URL
 * @param {string} params.img_portrait - Portrait image URL
 * @returns {Promise<Object>} Object containing base64 strings
 */
const convertS3ToBase64 = async ( params ) => {
	try {
		const res = await post( '/app/image-conversion/s3-to-base64', params );
		if ( res.success ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to convert images to base64' );
		}
	} catch ( error ) {
		console.error( 'Error converting images to base64:', error );
		throw error;
	}
};

const VikkiService = {
	getSimRandom,
	getPackageSim,
	searchSim,
	createOrder,
	getDataByToken,
	convertS3ToBase64
};

export default VikkiService;