
import { get, post } from "./api/base";
const getSimRandom = async () => {
	try {
		const res = await get( '/app/get-random-msisdn' );
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

const searchSim = async ( params ) => {
	try {
		const res = await post( '/app/get-phone-numbers', params );
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
const getPackageSim = async ( phone , type='ESIM') => {
	
	try {
		const res = await get( `/app/get-package-by-msisdn/${ phone }/${type}` );
		if ( res.success ) {
			return {
				packages: res.data,
				extra: res.extra
			};
		} else {
			throw new Error( res.message || 'Failed to fetch sim data' );
		}

	} catch ( error ) {
		console.error( 'Error fetching random sim data:', error );
		throw error;

	}
};

const checkVj71Promotion = async () => {
	try {
		const res = await get( '/app/check-vj71-promotion' );
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

const SimDataService = {
	getSimRandom,
	searchSim,
	getPackageSim,
	checkVj71Promotion
};
export default SimDataService;