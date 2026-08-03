import * as Sentry from "@sentry/nextjs";
import { get, post, del } from "./api/base";

/**
 * Get subscriber information
 * @param {string} msisdn - Phone number
 * @returns {Promise} API response with subscriber info
 * Response: { msisdn, full_name, address, active_date, balace, id_number, id_issue_place, id_issue_date, gender, email }
 */
const getSubscriberInfo = async (msisdn) => {
	try {
		const response = await get(`/app/get-subscriber-info/${msisdn}`);
		if (response.success) {
			return response;
		}
		throw new Error('Failed to get subscriber info');
	} catch (error) {
		console.error('Error getting subscriber info:', error);
		return { success: false, message: error.message };
	}
};

/**
 * Get current package information
 * @param {string} msisdn - Phone number
 * @returns {Promise} API response with current package info
 * Response: { packageName, fromDate, toDate, remainData, totalData }
 */
const getCurrentPackage = async (msisdn) => {
	try {
		const response = await get(`/app/get-current-package/${msisdn}`);
		if (response.success) {
			return response;
		}
		throw new Error('Failed to get current package');
	} catch (error) {
		console.error('Error getting current package:', error);
		return { success: false, message: error.message };
	}
};

/**
 * Get packages available by msisdn
 * @param {string} msisdn - Phone number
 * @returns {Promise} API response with list of packages
 */
const getPackagesByMsisdn = async (msisdn) => {
	try {
		const response = await get(`/app/get-package-by-msisdn/${msisdn}`);
		if (response.success) {
			return response;
		}
		throw new Error('Failed to get packages by msisdn');
	} catch (error) {
		console.error('Error getting packages by msisdn:', error);
		return { success: false, message: error.message };
	}
};

/**
 * Get autobill info for a msisdn
 * @param {string} msisdn - Phone number
 * @returns {Promise} API response with autobill info
 */
const getAutobill = async (msisdn) => {
	try {
		const response = await post('/app/get-autobill', { msisdn });
		return response;
	} catch (error) {
		Sentry.withScope((scope) => {
			scope.setTag("app", "vikki");
			scope.setTag("service", "autobill");
			scope.setContext("autobill", { msisdn });
			Sentry.captureException(error);
		});
		console.error('Error getting autobill:', error);
		return { success: false, message: error.message };
	}
};

/**
 * Create autobill for automatic package renewal
 * @param {Object} params - { msisdn, package_id, user_id, session_id }
 * @returns {Promise} API response
 */
const createAutobill = async (params) => {
	try {
		const response = await post('/v1/autobills/create', params);
		return response;
	} catch (error) {
		console.error('Error creating autobill:', error);
		return { success: false, message: error.message };
	}
};

/**
 * Cancel autobill by bill_id
 * @param {string} billId - AutoBill ID
 * @returns {Promise} API response
 */
const cancelAutobill = async (billId) => {
	try {
		const response = await del(`/v1/autobills/${billId}`);
		return response;
	} catch (error) {
		console.error('Error cancelling autobill:', error);
		return { success: false, message: error.message };
	}
};

const subscriberService = {
	getSubscriberInfo,
	getCurrentPackage,
	getPackagesByMsisdn,
	getAutobill,
	createAutobill,
	cancelAutobill
};

export default subscriberService;
