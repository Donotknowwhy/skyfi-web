import { get } from "./api/base";

const getNewsList = async (params = {}) => {
	try {
		const queryParams = {
			language: 'vi',
			page: 1,
			pageSize: 5,
			...params
		};

		const res = await get('/app/news', queryParams);
		if (res.success) {
			return res;
		} else {
			throw new Error(res.message || 'Failed to fetch news list');
		}
	} catch (error) {
		console.error('Error fetching news list:', error);
		return error.response?.data || error;
	}
};

const getNewsDetail = async (newsId, language = 'en') => {
	try {
		const res = await get(`/app/news/${newsId}`, { language });
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

const getNewsMasterData = async (language = 'en') => {
	try {
		const res = await get('/app/news/master-data', { language });
		if (res.success) {
			return res;
		} else {
			throw new Error(res.message || 'Failed to fetch news master data');
		}
	} catch (error) {
		console.error('Error fetching news master data:', error);
		return error.response?.data || error;
	}
};

const getNewsLanguages = async () => {
	try {
		const res = await get('/app/news/languages');
		if (res.success) {
			return res;
		} else {
			throw new Error(res.message || 'Failed to fetch news languages');
		}
	} catch (error) {
		console.error('Error fetching news languages:', error);
		return error.response?.data || error;
	}
};

const getNewsSitemap = async (language = 'en') => {
	try {
		const res = await get('/app/news/sitemap', { language });
		if (res.success) {
			return res;
		} else {
			throw new Error(res.message || 'Failed to fetch news sitemap');
		}
	} catch (error) {
		console.error('Error fetching news sitemap:', error);
		return error.response?.data || error;
	}
};

const getMostViewedNews = async (params = {}) => {
	try {
		const queryParams = {
			language: 'vi',
			limit: 10,
			days: 7,
			...params
		};

		const res = await get('/app/news/most-viewed', queryParams);
		if (res.success) {
			return res;
		} else {
			throw new Error(res.message || 'Failed to fetch most viewed news');
		}
	} catch (error) {
		console.error('Error fetching most viewed news:', error);
		return error.response?.data || error;
	}
};

const newsService = {
	getNewsList,
	getNewsDetail,
	getNewsMasterData,
	getNewsLanguages,
	getNewsSitemap,
	getMostViewedNews
};

export default newsService;