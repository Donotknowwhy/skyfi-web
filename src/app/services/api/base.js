import axios from 'axios';

// Function to extract language from current URL
const getCurrentLanguage = () => {
    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        // Match both 'en', 'vi' and 'zh-CN', 'zh-TW' formats
        const langMatch = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)(\/|$)/);
        return langMatch ? langMatch[1] : 'vi'; // Default to 'vi' if not found
    }
    return 'vi'; // Default language for SSR
};

// Create axios instance with default config
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Transform successful responses
        const data = response.data;
        console.log('API Response:', data);

        if (data.code === 200) {
            return {
                success: true,
                data: data.result,
                message: data.message,
                totalRecords: data.totalRecords,
                extra: data.extra,
                requestId: data.requestId
            };
        }

        // Handle non-200 API responses as errors
        return Promise.reject({
            success: false,
            message: data.message || 'Unknown error occurred',
            code: data.code,
            data: data.result
        });
    },
    (error) => {
        // Transform error responses
        const message = error.response?.data?.message || error.message || 'Network error occurred';
        return Promise.reject({
            success: false,
            message,
            code: error.response?.status || 500
        });
    }
);

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            let authToken = `Bearer ${token}`;
            config.headers.Authorization = authToken.replace(/['"]+/g, '');
        }

        // Add language header
        const currentLang = getCurrentLanguage();
        config.headers['lang'] = currentLang;
        config.headers['accept'] = 'application/json';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const get = async (url, params = {}) => {
    return api.get(url, { params });
};

export const post = async (url, data = {}) => {
    return api.post(url, data);
};

export const put = async (url, data = {}) => {
    return api.put(url, data);
};

export const del = async (url, data = {}) => {
    return api.delete(url, { data });
};

export const postWithoutAuth = async (url, data = {}) => {
    return api.post(url, data, {
        transformRequest: [(data, headers) => {
            // Remove Authorization header for this request
            delete headers.Authorization;
            return JSON.stringify(data);
        }],
    });
};

export default api;