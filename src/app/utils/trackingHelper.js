import axios from 'axios';

// ============================================================================
// CONFIGURATION
// ============================================================================

const TRACKING_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TRACKING_ENDPOINTS = {
  INIT: `${TRACKING_API_BASE_URL}/public/tracking/init`,
  EVENT: `${TRACKING_API_BASE_URL}/public/tracking/event`,
  IDENTIFY: `${TRACKING_API_BASE_URL}/public/tracking/identify`,
  PURCHASE: `${TRACKING_API_BASE_URL}/public/tracking/purchase`,
  CONVERSION: `${TRACKING_API_BASE_URL}/public/tracking/conversion`,
};

// Session storage key
const SESSION_STORAGE_KEY = 'Skyfi_tracking_session';
const CLIENT_ID_STORAGE_KEY = 'Skyfi_client_id';

// In-memory fallback khi storage không khả dụng (iOS private mode, WebView)
let memoryStorage = {
  session: null,
  clientId: null,
};

// ============================================================================
// STORAGE HELPERS (với fallback cho mobile)
// ============================================================================

/**
 * Kiểm tra xem storage có khả dụng không
 * iOS Safari trong private mode sẽ throw exception khi access storage
 */
const isStorageAvailable = (type = 'sessionStorage') => {
  if (typeof window === 'undefined') return false;

  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    // iOS private browsing, WebView restrictions, quota exceeded
    console.warn(`[Tracking] ${type} not available:`, error.message);
    return false;
  }
};

/**
 * Safe storage getter với fallback to memory
 */
const safeStorageGet = (key, storageType = 'sessionStorage') => {
  if (typeof window === 'undefined') return null;

  // Try real storage first
  if (isStorageAvailable(storageType)) {
    try {
      return window[storageType].getItem(key);
    } catch (error) {
      console.warn(`[Tracking] Error reading ${storageType}:`, error);
    }
  }

  // Fallback to memory
  if (storageType === 'sessionStorage' && key === SESSION_STORAGE_KEY) {
    return memoryStorage.session;
  }
  if (storageType === 'localStorage' && key === CLIENT_ID_STORAGE_KEY) {
    return memoryStorage.clientId;
  }

  return null;
};

/**
 * Safe storage setter với fallback to memory
 */
const safeStorageSet = (key, value, storageType = 'sessionStorage') => {
  if (typeof window === 'undefined') return false;

  // Try real storage first
  if (isStorageAvailable(storageType)) {
    try {
      window[storageType].setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`[Tracking] Error writing ${storageType}:`, error);
    }
  }

  // Fallback to memory
  if (storageType === 'sessionStorage' && key === SESSION_STORAGE_KEY) {
    memoryStorage.session = value;
    console.log('[Tracking] Using in-memory session storage (fallback)');
    return true;
  }
  if (storageType === 'localStorage' && key === CLIENT_ID_STORAGE_KEY) {
    memoryStorage.clientId = value;
    console.log('[Tracking] Using in-memory client ID storage (fallback)');
    return true;
  }

  return false;
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Lấy session ID từ storage
 * @returns {string|null} Session ID hoặc null nếu chưa có
 */
export const getSessionId = () => {
  return safeStorageGet(SESSION_STORAGE_KEY, 'sessionStorage');
};

/**
 * Lưu session data vào storage
 * @param {string} sessionData - Session ID string từ API response
 */
export const saveSessionData = (sessionData) => {
  const saved = safeStorageSet(SESSION_STORAGE_KEY, sessionData, 'sessionStorage');
  if (!saved) {
    console.error('[Tracking] Failed to save session data');
  }
};

/**
 * Lấy full session data từ storage
 * @returns {string|null} Session ID string hoặc null
 */
export const getSessionData = () => {
  return safeStorageGet(SESSION_STORAGE_KEY, 'sessionStorage');
};

/**
 * Lấy hoặc generate client ID (Google Analytics style)
 * @returns {string} Client ID
 */
export const getOrGenerateClientId = () => {
  if (typeof window === 'undefined') return null;

  let clientId = safeStorageGet(CLIENT_ID_STORAGE_KEY, 'localStorage');

  if (!clientId) {
    // Generate GA-style client ID: GA1.2.random.timestamp
    const random = Math.floor(Math.random() * 2147483647);
    const timestamp = Math.floor(Date.now() / 1000);
    clientId = `GA1.2.${random}.${timestamp}`;
    safeStorageSet(CLIENT_ID_STORAGE_KEY, clientId, 'localStorage');
  }

  return clientId;
};

/**
 * Detect device info từ user agent (enhanced cho mobile)
 * @returns {Object} Device information
 */
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return {
      device_type: 'desktop',
      browser: 'Unknown',
      os: 'Unknown',
      os_version: 'Unknown',
      device_model: 'Unknown',
      user_agent: '',
      is_webview: false,
      is_standalone: false,
    };
  }

  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);

  // Detect WebView (important for mobile app tracking)
  const isWebView = /(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*(wv|\.0\.0\.0)/i.test(ua);

  // Detect standalone mode (PWA installed)
  const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;

  // Detect browser (more accurate for mobile)
  let browser = 'Unknown';
  if (ua.includes('Instagram')) browser = 'Instagram WebView';
  else if (ua.includes('FBAN') || ua.includes('FBAV')) browser = 'Facebook WebView';
  else if (ua.includes('Line')) browser = 'Line WebView';
  else if (ua.includes('Twitter')) browser = 'Twitter WebView';
  else if (isWebView) browser = 'WebView';
  else if (ua.includes('CriOS')) browser = 'Chrome iOS';
  else if (ua.includes('FxiOS')) browser = 'Firefox iOS';
  else if (ua.includes('EdgiOS')) browser = 'Edge iOS';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  // Detect OS and version
  let os = 'Unknown';
  let osVersion = 'Unknown';
  let deviceModel = 'Unknown';

  if (ua.includes('Android')) {
    os = 'Android';
    const match = ua.match(/Android\s+([\d.]+)/);
    if (match) osVersion = match[1];

    // Try to get device model
    const modelMatch = ua.match(/\(([^)]+)\).*Android/);
    if (modelMatch) {
      const models = modelMatch[1].split(';').map(s => s.trim());
      deviceModel = models[models.length - 1];
    }
  } else if (ua.includes('iPhone')) {
    os = 'iOS';
    deviceModel = 'iPhone';
    const match = ua.match(/OS\s+([\d_]+)/);
    if (match) osVersion = match[1].replace(/_/g, '.');
  } else if (ua.includes('iPad')) {
    os = 'iOS';
    deviceModel = 'iPad';
    const match = ua.match(/OS\s+([\d_]+)/);
    if (match) osVersion = match[1].replace(/_/g, '.');
  } else if (ua.includes('iPod')) {
    os = 'iOS';
    deviceModel = 'iPod';
    const match = ua.match(/OS\s+([\d_]+)/);
    if (match) osVersion = match[1].replace(/_/g, '.');
  } else if (ua.includes('Windows')) {
    os = 'Windows';
  } else if (ua.includes('Mac')) {
    os = 'macOS';
  } else if (ua.includes('Linux')) {
    os = 'Linux';
  }

  return {
    device_type: isTablet ? 'tablet' : (isMobile ? 'mobile' : 'desktop'),
    browser,
    os,
    os_version: osVersion,
    device_model: deviceModel,
    user_agent: ua,
    is_webview: isWebView,
    is_standalone: isStandalone,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
  };
};

/**
 * Extract UTM parameters từ URL
 * @returns {Object} UTM parameters
 */
export const getUtmParams = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
  };
};

/**
 * Debug helper - kiểm tra tracking status (dùng cho troubleshooting mobile)
 * Gọi hàm này trong console để debug: window.checkTracking()
 * @returns {Object} Tracking status information
 */
export const checkTrackingStatus = () => {
  const status = {
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    client_id: getOrGenerateClientId(),
    storage: {
      sessionStorage: isStorageAvailable('sessionStorage'),
      localStorage: isStorageAvailable('localStorage'),
      usingMemoryFallback: !isStorageAvailable('sessionStorage') || !isStorageAvailable('localStorage'),
    },
    device: getDeviceInfo(),
    utm: getUtmParams(),
    api_base_url: TRACKING_API_BASE_URL,
    endpoints: TRACKING_ENDPOINTS,
  };

  console.log('=== TRACKING STATUS ===');
  console.log('Session ID:', status.session_id || '❌ Not initialized');
  console.log('Client ID:', status.client_id);
  console.log('Storage Available:', status.storage.sessionStorage && status.storage.localStorage ? '✅' : '⚠️ Using memory fallback');
  console.log('Device:', status.device.os, status.device.os_version, '-', status.device.device_model);
  console.log('Browser:', status.device.browser);
  console.log('WebView:', status.device.is_webview ? '⚠️ Yes' : 'No');
  console.log('API Base:', status.api_base_url);
  console.table(status.device);

  return status;
};

// Expose to window for debugging
if (typeof window !== 'undefined') {
  window.checkTracking = checkTrackingStatus;
}

// ============================================================================
// SESSION INITIALIZATION
// ============================================================================

/**
 * Khởi tạo tracking session (Web Platform)
 *
 * @param {Object} options - Session configuration
 * @param {string} options.client_id - Client ID (auto-generate nếu không có)
 * @param {string} options.landing_page - Landing page URL
 * @param {string} options.referrer - Referrer URL
 * @param {string} options.affiliate_code - Affiliate code (nếu có)
 * @param {number} options.campaign_id - Campaign ID (nếu có)
 * @param {Object} options.utm - UTM parameters (auto-detect nếu không có)
 *
 * @returns {Promise<Object>} Response với session_id, identity_id, session_number
 *
 * @example
 * // Basic usage - tự động detect mọi thứ
 * const session = await initTrackingSession();
 * console.log(session.session_id); // "sess_abc123xyz"
 *
 * @example
 * // Với affiliate code
 * const session = await initTrackingSession({
 *   affiliate_code: 'AFF001',
 *   campaign_id: 101
 * });
 *
 * @example
 * // Custom UTM params
 * const session = await initTrackingSession({
 *   utm: {
 *     utm_source: 'facebook',
 *     utm_campaign: 'summer_sale_2025'
 *   }
 * });
 */
export const initTrackingSession = async (options = {}) => {
  try {
    // Kiểm tra đã có session chưa
    const existingSession = getSessionData();
    if (existingSession) {
      console.log('[Tracking] Session already exists:', existingSession);
      return existingSession;
    }

    const deviceInfo = getDeviceInfo();
    const utmParams = options.utm || getUtmParams();

    const payload = {
      client_id: options.client_id || getOrGenerateClientId(),
      platform: 'web',
      device_type: deviceInfo.device_type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      user_agent: deviceInfo.user_agent,
      landing_page: options.landing_page || (typeof window !== 'undefined' ? window.location.href : undefined),
      landing_page_title: typeof document !== 'undefined' ? document.title : undefined,
      referrer: options.referrer || (typeof document !== 'undefined' ? document.referrer : undefined),
      ...utmParams,
      affiliate_code: options.affiliate_code,
      campaign_id: options.campaign_id,
    };

    const response = await axios.post(TRACKING_ENDPOINTS.INIT, payload);

    // Standardized response checking
    const isSuccess = response.data?.code === 200 || response.data?.success === true;
    const sessionId = response.data?.result?.session_id || response.data?.data?.session_id;

    if (isSuccess && sessionId) {
      saveSessionData(sessionId);
      console.log('[Tracking] Session initialized:', sessionId);
      return sessionId;
    }

    throw new Error(response.data?.message || 'Failed to initialize session');
  } catch (error) {
    console.error('[Tracking] Init session error:', error);
    throw error;
  }
};

/**
 * Khởi tạo session cho Mobile App (iOS/Android)
 *
 * @param {Object} options - Mobile session configuration
 * @param {string} options.platform - 'ios' hoặc 'android'
 * @param {string} options.app_instance_id - Firebase app instance ID
 * @param {string} options.device_id - Device UUID
 * @param {string} options.device_brand - Device brand (Apple, Samsung, etc)
 * @param {string} options.device_model - Device model
 * @param {string} options.os_version - OS version
 *
 * @returns {Promise<Object>} Session data
 *
 * @example
 * // iOS App
 * const session = await initMobileSession({
 *   platform: 'ios',
 *   app_instance_id: 'firebase_xyz123',
 *   device_id: 'device_uuid_abc456',
 *   device_brand: 'Apple',
 *   device_model: 'iPhone 13',
 *   os_version: '16.5'
 * });
 */
export const initMobileSession = async (options) => {
  try {
    const payload = {
      platform: options.platform,
      app_instance_id: options.app_instance_id,
      device_id: options.device_id,
      device_type: 'mobile',
      device_brand: options.device_brand,
      device_model: options.device_model,
      os: options.platform === 'ios' ? 'iOS' : 'Android',
      os_version: options.os_version,
      utm_source: options.platform === 'ios' ? 'app_store' : 'google_play',
      utm_campaign: options.utm_campaign || 'organic',
    };

    const response = await axios.post(TRACKING_ENDPOINTS.INIT, payload);

    // Standardized response checking
    const isSuccess = response.data?.code === 200 || response.data?.success === true;
    const sessionId = response.data?.result?.session_id || response.data?.data?.session_id;

    if (isSuccess && sessionId) {
      saveSessionData(sessionId);
      console.log('[Tracking] Mobile session initialized:', sessionId);
      return sessionId;
    }

    throw new Error(response.data?.message || 'Failed to initialize mobile session');
  } catch (error) {
    console.error('[Tracking] Init mobile session error:', error);
    throw error;
  }
};

// ============================================================================
// EVENT TRACKING
// ============================================================================

/**
 * Track generic event
 *
 * @param {Object} eventData - Event data
 * @param {string} eventData.event_name - Event name
 * @param {string} eventData.event_category - Event category
 * @param {Object} eventData.event_params - Additional event parameters
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackEvent({
 *   event_name: 'button_click',
 *   event_category: 'engagement',
 *   event_params: {
 *     button_id: 'cta_button',
 *     button_text: 'Mua ngay'
 *   }
 * });
 */
export const trackEvent = async (eventData) => {
  try {
    const sessionId = getSessionData();
    console.log('[Tracking] sessionId -->', sessionId);
    console.log('trackEvent called with:', eventData);

    if (!sessionId) {
      console.warn('[Tracking] No session ID found. Initialize session first.');
      // Try to auto-initialize if possible
      try {
        await autoInitTracking();
        const newSessionId = getSessionData();
        if (!newSessionId) {
          console.error('[Tracking] Failed to auto-initialize session');
          return null;
        }
      } catch (initError) {
        console.error('[Tracking] Auto-init failed:', initError);
        return null;
      }
    }

    const payload = {
      session_id: getSessionData(), // Get again after potential auto-init
      page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
      ...eventData,
    };

    //

    const response = await axios.post(TRACKING_ENDPOINTS.EVENT, payload, {
      timeout: 10000, // 10s timeout for mobile networks
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('[Tracking] Event tracked successfully:', eventData.event_name);
  } catch (error) {
    // Enhanced error logging for mobile debugging
    if (error.code === 'ECONNABORTED') {
      console.error('[Tracking] Request timeout - check network connection');
    } else if (error.response) {
      console.error('[Tracking] Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('[Tracking] Network error - no response received');
    } else {
      console.error('[Tracking] Event tracking error:', error.message);
    }
    return null;
  }
};

/**
 * Track page view
 *
 * @param {Object} options - Page view options
 * @param {string} options.page_location - Page URL (auto-detect nếu không có)
 * @param {string} options.page_title - Page title (auto-detect nếu không có)
 * @param {string} options.page_referrer - Referrer URL
 * @param {number} options.engagement_time_msec - Time spent on page
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * // Basic page view
 * await trackPageView();
 *
 * @example
 * // With engagement time
 * await trackPageView({
 *   engagement_time_msec: 5000
 * });
 */
export const trackPageView = async (options = {}) => {
  return trackEvent({
    event_name: 'page_view',
    event_category: 'engagement',
    page_location: options.page_location || (typeof window !== 'undefined' ? window.location.href : undefined),
    page_title: options.page_title || (typeof document !== 'undefined' ? document.title : undefined),
    page_referrer: options.page_referrer || (typeof document !== 'undefined' ? document.referrer : undefined),
    engagement_time_msec: options.engagement_time_msec,
  });
};

/**
 * Track product view (Xem chi tiết sản phẩm)
 *
 * @param {Object} product - Product information
 * @param {number} product.product_id - Product ID
 * @param {string} product.product_name - Product name
 * @param {string} product.product_category - Product category
 * @param {number} product.product_price - Product price
 * @param {string} product.product_sku - Product SKU
 * @param {string} product.currency - Currency code (default: VND)
 * @param {Object} options - Additional options
 * @param {string} options.funnel_name - Funnel name
 * @param {number} options.funnel_step - Funnel step number
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackProductView({
 *   product_id: 101,
 *   product_name: 'eSIM Hàn Quốc 7 ngày - 30GB',
 *   product_category: 'eSIM/Korea',
 *   product_price: 299000,
 *   product_sku: 'ESIM-KR-7D-30GB',
 *   currency: 'VND'
 * });
 *
 * @example
 * // With funnel tracking
 * await trackProductView({
 *   product_id: 101,
 *   product_name: 'eSIM Hàn Quốc',
 *   product_price: 299000
 * }, {
 *   funnel_name: 'esim_purchase',
 *   funnel_step: 1
 * });
 */
export const trackProductView = async (product, options = {}) => {
  return trackEvent({
    event_name: 'product_view',
    event_category: 'ecommerce',
    product_id: product.product_id,
    product_name: product.product_name,
    product_category: product.product_category,
    product_brand: product.product_brand,
    product_variant: product.product_variant,
    product_price: product.product_price,
    product_sku: product.product_sku,
    currency: product.currency || 'VND',
    funnel_name: options.funnel_name || 'esim_purchase',
    funnel_step: options.funnel_step || 1,
    funnel_step_name: options.funnel_step_name || 'Product View',
    event_params: options.event_params,
  });
};

/**
 * Track product list view (Xem danh sách sản phẩm)
 *
 * @param {Object} options - List view options
 * @param {string} options.item_list_name - List name
 * @param {number} options.item_count - Number of items
 * @param {Object} options.filters - Applied filters
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackProductListView({
 *   item_list_name: 'eSIM Collection',
 *   item_count: 12,
 *   filters: {
 *     category: 'Korea',
 *     sort_by: 'popular'
 *   }
 * });
 */
export const trackProductListView = async (options = {}) => {
  return trackEvent({
    event_name: 'product_list_view',
    event_category: 'ecommerce',
    event_params: {
      item_list_name: options.item_list_name,
      item_count: options.item_count,
      ...options.filters,
    },
  });
};

/**
 * Track add to cart
 *
 * @param {Object} product - Product being added
 * @param {number} product.product_id - Product ID
 * @param {string} product.product_name - Product name
 * @param {number} product.product_price - Product price
 * @param {number} product.product_quantity - Quantity added
 * @param {number} product.cart_total - New cart total
 * @param {Object} options - Additional options
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackAddToCart({
 *   product_id: 101,
 *   product_name: 'eSIM Hàn Quốc 7 ngày',
 *   product_category: 'eSIM/Korea',
 *   product_price: 299000,
 *   product_quantity: 2,
 *   product_sku: 'ESIM-KR-7D-30GB',
 *   cart_total: 598000,
 *   currency: 'VND'
 * });
 */
export const trackAddToCart = async (product, options = {}) => {
  return trackEvent({
    event_name: 'add_to_cart',
    event_category: 'ecommerce',
    product_id: product.product_id,
    product_name: product.product_name,
    product_category: product.product_category,
    product_price: product.product_price,
    product_quantity: product.product_quantity,
    product_sku: product.product_sku,
    currency: product.currency || 'VND',
    cart_total: product.cart_total,
    funnel_name: options.funnel_name || 'esim_purchase',
    funnel_step: options.funnel_step || 2,
    funnel_step_name: options.funnel_step_name || 'Add to Cart',
    event_params: options.event_params,
  });
};

/**
 * Track remove from cart
 *
 * @param {Object} product - Product being removed
 * @param {number} product.cart_total - New cart total after removal
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackRemoveFromCart({
 *   product_id: 102,
 *   product_name: 'eSIM Nhật Bản',
 *   product_price: 250000,
 *   product_quantity: 1,
 *   cart_total: 598000
 * });
 */
export const trackRemoveFromCart = async (product) => {
  return trackEvent({
    event_name: 'remove_from_cart',
    event_category: 'ecommerce',
    product_id: product.product_id,
    product_name: product.product_name,
    product_price: product.product_price,
    product_quantity: product.product_quantity,
    cart_total: product.cart_total,
    event_params: {
      removal_reason: 'user_action',
    },
  });
};

/**
 * Track search
 *
 * @param {string} searchTerm - Search term
 * @param {number} resultsCount - Number of results
 * @param {Object} options - Additional options
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackSearch('esim thai lan gia re', 8, {
 *   search_type: 'autocomplete',
 *   search_category: 'all'
 * });
 */
export const trackSearch = async (searchTerm, resultsCount, options = {}) => {
  return trackEvent({
    event_name: 'search',
    event_category: 'engagement',
    search_term: searchTerm,
    search_results_count: resultsCount,
    event_params: options,
  });
};

/**
 * Track begin checkout
 *
 * @param {Object} checkout - Checkout information
 * @param {number} checkout.cart_total - Cart total
 * @param {Array} checkout.items - Items in cart
 * @param {string} checkout.coupon_code - Applied coupon
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackBeginCheckout({
 *   cart_total: 598000,
 *   currency: 'VND',
 *   items: [
 *     {
 *       product_id: 101,
 *       product_name: 'eSIM Hàn Quốc',
 *       quantity: 2,
 *       price: 299000
 *     }
 *   ],
 *   coupon_code: 'SUMMER2025'
 * });
 */
export const trackBeginCheckout = async (checkout) => {
  return trackEvent({
    event_name: 'begin_checkout',
    event_category: 'ecommerce',
    cart_total: checkout.cart_total,
    checkout_step: 1,
    currency: checkout.currency || 'VND',
    funnel_name: 'esim_purchase',
    funnel_step: 3,
    funnel_step_name: 'Begin Checkout',
    event_params: {
      items: checkout.items,
      coupon_code: checkout.coupon_code,
    },
  });
};

/**
 * Track add shipping info
 *
 * @param {Object} shipping - Shipping information
 * @param {number} shipping.cart_total - Cart total
 * @param {string} shipping.shipping_tier - Shipping tier
 * @param {number} shipping.shipping_cost - Shipping cost
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackAddShippingInfo({
 *   cart_total: 598000,
 *   currency: 'VND',
 *   shipping_tier: 'standard',
 *   shipping_cost: 0
 * });
 */
export const trackAddShippingInfo = async (shipping) => {
  return trackEvent({
    event_name: 'add_shipping_info',
    event_category: 'ecommerce',
    cart_total: shipping.cart_total,
    checkout_step: 2,
    currency: shipping.currency || 'VND',
    event_params: {
      shipping_tier: shipping.shipping_tier,
      shipping_cost: shipping.shipping_cost,
    },
  });
};

/**
 * Track add payment info
 *
 * @param {Object} payment - Payment information
 * @param {number} payment.cart_total - Cart total
 * @param {string} payment.payment_method - Payment method (momo, vnpay, etc)
 * @param {string} payment.payment_type - Payment type (e_wallet, bank_transfer, etc)
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackAddPaymentInfo({
 *   cart_total: 598000,
 *   currency: 'VND',
 *   payment_method: 'momo',
 *   payment_type: 'e_wallet'
 * });
 */
export const trackAddPaymentInfo = async (payment) => {
  return trackEvent({
    event_name: 'add_payment_info',
    event_category: 'ecommerce',
    cart_total: payment.cart_total,
    checkout_step: 3,
    payment_method: payment.payment_method,
    currency: payment.currency || 'VND',
    funnel_name: 'esim_purchase',
    funnel_step: 4,
    funnel_step_name: 'Add Payment',
    event_params: {
      payment_type: payment.payment_type,
    },
  });
};

/**
 * Track purchase (Hoàn thành mua hàng)
 *
 * @param {Object} purchase - Purchase information
 * @param {string} purchase.transaction_id - Order/Transaction ID
 * @param {number} purchase.transaction_revenue - Total revenue
 * @param {number} purchase.product_id - Product ID
 * @param {string} purchase.product_name - Product name
 * @param {number} purchase.product_price - Product price
 * @param {number} purchase.product_quantity - Product quantity
 * @param {string} purchase.payment_method - Payment method
 * @param {number} purchase.order_id - Internal order ID
 * @param {number} purchase.customer_id - Customer ID
 * @param {number} purchase.commission_rate - Commission rate (optional, default 0)
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackPurchase({
 *   transaction_id: 'ORDER-2025-10-15-001',
 *   transaction_revenue: 598000,
 *   product_id: 101,
 *   product_name: 'eSIM Hàn Quốc 7 ngày',
 *   product_price: 299000,
 *   product_quantity: 2,
 *   currency: 'VND',
 *   payment_method: 'momo',
 *   order_id: 5001,
 *   customer_id: 12345,
 *   commission_rate: 5.0
 * });
 */
export const trackPurchase = async (purchase) => {
  try {
    const sessionId = getSessionData();
    if (!sessionId) {
      console.warn('[Tracking] No session ID found for purchase tracking.');
      // Try to auto-initialize if possible
      try {
        await autoInitTracking();
        const newSessionId = getSessionData();
        if (!newSessionId) {
          console.error('[Tracking] Failed to auto-initialize session for purchase');
          return null;
        }
      } catch (initError) {
        console.error('[Tracking] Auto-init failed for purchase:', initError);
        return null;
      }
    }

    // Construct items array from purchase data
    const items = purchase.items || [
      {
        product_id: purchase.product_id,
        product_name: purchase.product_name,
        quantity: purchase.product_quantity || 1,
        price: purchase.product_price || 0,
      }
    ];

    // Extract product IDs from items
    const productIds = items.map(item => item.product_id).filter(Boolean);

    const payload = {
      session_id: getSessionData(),
      order_id: purchase.order_id,
      customer_id: purchase.customer_id,
      order_value: purchase.transaction_revenue,
      order_items_count: purchase.product_quantity || items.length || 1,
      product_ids: productIds.length > 0 ? productIds : [purchase.product_id],
      commission_rate: purchase.commission_rate || 0,
      items: items,
      payment_method: purchase.payment_method,
      currency: purchase.currency || 'VND',
      transaction_id: purchase.transaction_id,
    };

    const response = await axios.post(TRACKING_ENDPOINTS.PURCHASE, payload, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('[Tracking] Purchase tracked successfully:', purchase.transaction_id);
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('[Tracking] Purchase request timeout');
    } else if (error.response) {
      console.error('[Tracking] Purchase server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('[Tracking] Purchase network error');
    } else {
      console.error('[Tracking] Purchase tracking error:', error.message);
    }
    return null;
  }
};

/**
 * Track login
 *
 * @param {Object} options - Login options
 * @param {string} options.login_method - Login method (email, google, facebook, etc)
 * @param {boolean} options.is_first_time - First time login?
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackLogin({
 *   login_method: 'email',
 *   is_first_time: false
 * });
 */
export const trackLogin = async (options = {}) => {
  return trackEvent({
    event_name: 'login',
    event_category: 'user_action',
    event_params: {
      login_method: options.login_method || 'email',
      is_first_time: options.is_first_time || false,
    },
  });
};

/**
 * Track sign up
 *
 * @param {Object} options - Sign up options
 * @param {string} options.signup_method - Sign up method
 * @param {string} options.referral_code - Referral code used
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackSignUp({
 *   signup_method: 'google',
 *   referral_code: 'FRIEND123'
 * });
 */
export const trackSignUp = async (options = {}) => {
  return trackEvent({
    event_name: 'sign_up',
    event_category: 'user_action',
    event_params: {
      signup_method: options.signup_method || 'email',
      referral_code: options.referral_code,
    },
  });
};

/**
 * Track click event
 *
 * @param {Object} element - Element information
 * @param {string} element.element_id - Element ID
 * @param {string} element.element_type - Element type (button, banner, link, etc)
 * @param {string} element.element_text - Element text
 * @param {string} element.link_url - Destination URL
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackClick({
 *   element_id: 'banner_summer_sale',
 *   element_type: 'banner',
 *   element_text: 'Giảm giá 50% eSIM',
 *   link_url: '/esim-han-quoc?promo=summer'
 * });
 */
export const trackClick = async (element) => {
  return trackEvent({
    event_name: 'click',
    event_category: 'engagement',
    event_params: element,
  });
};

/**
 * Track form submit
 *
 * @param {Object} form - Form information
 * @param {string} form.form_id - Form ID
 * @param {string} form.form_name - Form name
 * @param {string} form.form_type - Form type
 * @param {number} form.fields_filled - Number of fields filled
 * @param {number} form.total_fields - Total number of fields
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackFormSubmit({
 *   form_id: 'contact_form',
 *   form_name: 'Liên hệ tư vấn',
 *   form_type: 'contact',
 *   fields_filled: 5,
 *   total_fields: 6
 * });
 */
export const trackFormSubmit = async (form) => {
  return trackEvent({
    event_name: 'form_submit',
    event_category: 'engagement',
    form_id: form.form_id,
    form_name: form.form_name,
    form_destination: form.form_destination,
    event_params: {
      form_type: form.form_type,
      fields_filled: form.fields_filled,
      total_fields: form.total_fields,
    },
  });
};

/**
 * Track share
 *
 * @param {Object} share - Share information
 * @param {string} share.share_method - Share method (facebook, twitter, etc)
 * @param {string} share.content_type - Content type being shared
 * @param {string} share.content_id - Content ID
 * @param {number} share.product_id - Product ID (if sharing product)
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackShare({
 *   share_method: 'facebook',
 *   content_type: 'product',
 *   content_id: '101',
 *   product_id: 101
 * });
 */
export const trackShare = async (share) => {
  return trackEvent({
    event_name: 'share',
    event_category: 'engagement',
    product_id: share.product_id,
    event_params: {
      share_method: share.share_method,
      content_type: share.content_type,
      content_id: share.content_id,
    },
  });
};

/**
 * Track scroll depth
 *
 * @param {number} scrollDepth - Scroll depth percentage (0-100)
 * @param {number} engagementTime - Time spent in milliseconds
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackScroll(75, 15000);
 */
export const trackScroll = async (scrollDepth, engagementTime) => {
  return trackEvent({
    event_name: 'scroll',
    event_category: 'engagement',
    scroll_depth: scrollDepth,
    engagement_time_msec: engagementTime,
  });
};

// ============================================================================
// USER IDENTIFICATION
// ============================================================================

/**
 * Identify user (khi login/register)
 *
 * @param {Object} user - User information
 * @param {number} user.customer_id - Customer ID
 * @param {string} user.email - Email
 * @param {string} user.phone - Phone number
 * @param {string} user.name - Full name
 * @param {Object} user.user_properties - Additional user properties
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await identifyUser({
 *   customer_id: 12345,
 *   email: 'user@example.com',
 *   phone: '+84912345678',
 *   name: 'Nguyen Van A',
 *   user_properties: {
 *     account_created_at: '2024-01-15T10:30:00Z',
 *     total_orders: 5,
 *     total_spent: 2500000,
 *     favorite_category: 'eSIM',
 *     membership_tier: 'gold'
 *   }
 * });
 */
export const identifyUser = async (user) => {
  try {
    const sessionId = getSessionId();
    if (!sessionId) {
      console.warn('[Tracking] No session ID found.');
      return null;
    }

    const payload = {
      session_id: sessionId,
      customer_id: user.customer_id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      user_properties: user.user_properties,
    };

    const response = await axios.post(TRACKING_ENDPOINTS.IDENTIFY, payload);
    console.log('[Tracking] User identified:', user.customer_id);
    return response.data;
  } catch (error) {
    console.error('[Tracking] Identify user error:', error);
    return null;
  }
};

// ============================================================================
// CONVERSION TRACKING
// ============================================================================

/**
 * Track conversion với affiliate commission
 *
 * @param {Object} conversion - Conversion data
 * @param {number} conversion.order_id - Order ID
 * @param {number} conversion.customer_id - Customer ID
 * @param {number} conversion.order_value - Order value
 * @param {number} conversion.order_items_count - Number of items
 * @param {Array<number>} conversion.product_ids - Product IDs
 * @param {number} conversion.commission_rate - Commission rate (%)
 * @param {Array} conversion.items - Order items detail
 *
 * @returns {Promise<Object>} API response
 *
 * @example
 * await trackConversion({
 *   order_id: 5001,
 *   customer_id: 12345,
 *   order_value: 598000,
 *   order_items_count: 2,
 *   product_ids: [101, 102],
 *   commission_rate: 5.0,
 *   items: [
 *     {
 *       product_id: 101,
 *       product_name: 'eSIM Hàn Quốc',
 *       quantity: 2,
 *       price: 299000
 *     }
 *   ]
 * });
 */
export const trackConversion = async (conversion) => {
  try {
    const sessionId = getSessionId();
    if (!sessionId) {
      console.warn('[Tracking] No session ID found.');
      return null;
    }

    const payload = {
      session_id: sessionId,
      ...conversion,
    };

    const response = await axios.post(TRACKING_ENDPOINTS.CONVERSION, payload);
    console.log('[Tracking] Conversion tracked:', conversion.order_id);
    return response.data;
  } catch (error) {
    console.error('[Tracking] Conversion tracking error:', error);
    return null;
  }
};

// ============================================================================
// HIGH-LEVEL TRACKING FLOWS
// ============================================================================

/**
 * Track complete purchase flow (purchase event + conversion)
 * Gọi cả trackPurchase và trackConversion cùng lúc
 *
 * @param {Object} purchaseData - Combined purchase and conversion data
 *
 * @returns {Promise<{purchase: Object, conversion: Object}>} Both responses
 *
 * @example
 * await trackCompletePurchase({
 *   // Purchase data
 *   transaction_id: 'ORDER-2025-001',
 *   transaction_revenue: 598000,
 *   product_id: 101,
 *   product_name: 'eSIM Hàn Quốc',
 *   product_price: 299000,
 *   product_quantity: 2,
 *   payment_method: 'momo',
 *
 *   // Conversion data
 *   order_id: 5001,
 *   customer_id: 12345,
 *   commission_rate: 5.0,
 *
 *   items: [
 *     { product_id: 101, product_name: 'eSIM Hàn Quốc', quantity: 2, price: 299000 }
 *   ]
 * });
 */
export const trackCompletePurchase = async (purchaseData) => {
  try {
    // Track purchase event
    const purchaseResponse = await trackPurchase({
      transaction_id: purchaseData.transaction_id,
      transaction_revenue: purchaseData.transaction_revenue,
      product_id: purchaseData.product_id,
      product_name: purchaseData.product_name,
      product_category: purchaseData.product_category,
      product_price: purchaseData.product_price,
      product_quantity: purchaseData.product_quantity,
      currency: purchaseData.currency,
      payment_method: purchaseData.payment_method,
      items: purchaseData.items,
      order_id: purchaseData.order_id,
      coupon_code: purchaseData.coupon_code,
      discount_amount: purchaseData.discount_amount,
    });

    // Track conversion
    const conversionResponse = await trackConversion({
      order_id: purchaseData.order_id,
      customer_id: purchaseData.customer_id,
      order_value: purchaseData.transaction_revenue,
      order_items_count: purchaseData.items?.length || 1,
      product_ids: purchaseData.items?.map(item => item.product_id) || [purchaseData.product_id],
      commission_rate: purchaseData.commission_rate,
      items: purchaseData.items,
    });

    return {
      purchase: purchaseResponse,
      conversion: conversionResponse,
    };
  } catch (error) {
    console.error('[Tracking] Complete purchase tracking error:', error);
    throw error;
  }
};

/**
 * Auto-initialize tracking khi user vào website
 * Tự động detect UTM params, device info, và khởi tạo session
 *
 * @param {Object} options - Optional configuration
 * @returns {Promise<Object>} Session data
 *
 * @example
 * // Trong _app.js hoặc layout.js
 * useEffect(() => {
 *   autoInitTracking({
 *     affiliate_code: getAffiliateCode(),
 *     campaign_id: getCampaignId()
 *   });
 * }, []);
 */
export const autoInitTracking = async (options = {}) => {
  try {
    // Kiểm tra đã có session chưa
    const existingSession = getSessionData();
    if (existingSession) {
      console.log('[Tracking] Using existing session:', existingSession);
      return existingSession;
    }

    // Khởi tạo session mới
    const session = await initTrackingSession(options);

    // Track page view đầu tiên
    await trackPageView();

    return session;
  } catch (error) {
    console.error('[Tracking] Auto-init error:', error);
    return null;
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Session
  initTrackingSession,
  initMobileSession,
  autoInitTracking,

  // Events
  trackEvent,
  trackPageView,
  trackProductView,
  trackProductListView,
  trackAddToCart,
  trackRemoveFromCart,
  trackSearch,
  trackBeginCheckout,
  trackAddShippingInfo,
  trackAddPaymentInfo,
  trackPurchase,
  trackLogin,
  trackSignUp,
  trackClick,
  trackFormSubmit,
  trackShare,
  trackScroll,

  // User
  identifyUser,

  // Conversion
  trackConversion,
  trackCompletePurchase,

  // Utilities
  getSessionId,
  getSessionData,
  saveSessionData,
  getOrGenerateClientId,
  getDeviceInfo,
  getUtmParams,
};
