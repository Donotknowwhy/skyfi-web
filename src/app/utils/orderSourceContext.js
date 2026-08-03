export const ORDER_BRANDS = {
  WEB: "web",
  VIKKI: "vikki",
  HDBANK: "hdbank",
};

const ORDER_SOURCE_CONFIG = {
  [ORDER_BRANDS.WEB]: {
    brand: ORDER_BRANDS.WEB,
    appSource: "WEB",
    sourceType: "",
    videoSource: "WEB",
    topupPathSegment: "web",
  },
  [ORDER_BRANDS.VIKKI]: {
    brand: ORDER_BRANDS.VIKKI,
    appSource: "vikki-app",
    sourceType: "VIKKI",
    videoSource: "VIKKI",
    topupPathSegment: "vikki-app",
  },
  [ORDER_BRANDS.HDBANK]: {
    brand: ORDER_BRANDS.HDBANK,
    appSource: "hdbank-app",
    sourceType: "HDBANK",
    videoSource: "HDBANK",
    topupPathSegment: "hdbank-app",
  },
};

export const getOrderSourceContext = (brand = ORDER_BRANDS.WEB) =>
  ORDER_SOURCE_CONFIG[brand] || ORDER_SOURCE_CONFIG[ORDER_BRANDS.WEB];

export const applyCheckoutSource = (brand, payload = {}) => ({
  ...payload,
  source: payload.source ?? getOrderSourceContext(brand).appSource,
});

export const applyPackageOrderSource = (brand, payload = {}) => ({
  ...payload,
  source: payload.source ?? getOrderSourceContext(brand).appSource,
});

export const applyTopupOrderSource = (brand, payload = {}) => ({
  ...payload,
  source: payload.source ?? getOrderSourceContext(brand).appSource,
});

export const applyPaymentSourceType = (brand, payload = {}) => ({
  ...payload,
  sourceType:
    payload.sourceType ?? getOrderSourceContext(brand).sourceType,
});

export const applyActivateVideoSource = (brand, payload = {}) => ({
  ...payload,
  videoSource:
    payload.videoSource ?? getOrderSourceContext(brand).videoSource,
});
