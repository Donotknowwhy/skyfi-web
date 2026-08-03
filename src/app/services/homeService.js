import { get } from "./api/base";

const getPackageHome = async () => {

	try {
		const res = await get( `/app/get-outstanding-package` );
		if ( res.success && res.data && res.data.length > 0 ) {
			return res;
		} else {
			throw new Error( res.message || 'Failed to fetch package data' );
		}
	} catch ( error ) {
		console.error( error );
		return error.response.data;
	}
};

const getMenuFooter = async (language) => {
	try {
		const res = await get( `/app/footer/menu`, { language} );
		console.log(res);

		if ( res.success && res.data ) {
			return res.data;
		} else {
			throw new Error( res.message || 'Failed to fetch footer menu data' );
		}
	} catch ( error ) {
		console.error( error );
		return error.response.data;
	}
};
const getFooterNewsDetail = async (newsId, language = 'en') => {
	try {
		const res = await get(`/app/footer/pages/by-url/footer/${newsId}`, { language });
		if (res.success) {
			return res;
		} else {
			throw new Error(res.message || 'Failed to fetch news detail');
		}
	} catch (error) {
		console.error('Error fetching news detail:', error);
		return error.response?.data || error;
	}
};

const homeService = {
	getPackageHome,
	getMenuFooter,
	getFooterNewsDetail
};

export default homeService;
