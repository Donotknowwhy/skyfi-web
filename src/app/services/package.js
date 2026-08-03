import {
  ORDER_BRANDS,
  applyPackageOrderSource,
} from "../utils/orderSourceContext";
import { get, post } from "./api/base";

// Get packages with filters
const getPackages = async (params) => {
  try {
    const res = await post("/app/get-packages", params);
    if (res.success) {
      return { data: res.data, totalRecords: res.totalRecords || 0 };
    }
    throw new Error("Failed to get packages");
  } catch (error) {
    return error;
  }
};

// Get available packages for a phone number
const getAvailablePackages = async (params) => {
  try {
    const res = await post("/app/get-available-package", params);
    if (res.success) {
      return res.data;
    }
    throw new Error("Failed to get available packages");
  } catch (error) {
    return error;
  }
};

// Check package registration eligibility
const checkPackageRegister = async (params) => {
  try {
    const res = await post("/app/check-package-register", params);

    if (res.success) {
      return res;
    }
    throw new Error("Failed to check package registration");
  } catch (error) {
    return error;
  }
};
const checkPackageRegisterVikki = async (params) => {
  try {
    const res = await post("/app/check-package-register-vikki", params);

    if (res.success) {
      return res;
    }
    throw new Error("Failed to check package registration");
  } catch (error) {
    return error;
  }
};

const checkPackageRegisterHDBank = async (params) => {
  return checkPackageRegisterVikki(params);
};

// Send OTP for package registration
const sendOtpRegisterPackage = async (params) => {
  try {
    const res = await post("/app/send-otp-register-package", params);
    if (res.success) {
      return res;
    }
    throw new Error("Failed to send OTP for package registration");
  } catch (error) {
    return error;
  }
};

// Register package
const registerPackage = async (params) => {
  try {
    const res = await post("/app/register-package", params);
    if (res.success) {
      return res;
    }
    throw new Error("Failed to register package");
  } catch (error) {
    return error;
  }
};

// Get package history
const getPackageHistory = async () => {
  try {
    const res = await get("/app/get-package-history");
    if (res.success) {
      return res.data;
    }
    throw new Error("Failed to get package history");
  } catch (error) {
    return error;
  }
};

// Get current package information
const getCurrentPackage = async (msisdn) => {
  try {
    const res = await get(`/get-current-package/${msisdn}`);
    if (res.success) {
      return res.data;
    }
    throw new Error("Failed to get current package");
  } catch (error) {
    return error;
  }
};

const getPackageHistoryVikki = async (msisdn) => {
  try {
    const res = await get(`/app/get-package-history/${msisdn}`);
    if (res.success) {
      return res.data;
    }
    throw new Error("Failed to get package history");
  } catch (error) {
    return error;
  }
};

const checkPackageChange = async (params) => {
  try {
    const res = await post("/app/check-package-change", params);
    return res;
  } catch (error) {
    return error;
  }
};

const createOrderPackage = async (params) => {
  try {
    const { brand = ORDER_BRANDS.VIKKI, ...payload } = params || {};
    const res = await post(
      "/app/create-order-package",
      applyPackageOrderSource(brand, payload),
    );
    if (res.success) {
      return res.data;
    }
    throw new Error("Failed to create order package");
  } catch (error) {
    return error;
  }
};

const PackageService = {
  getPackages,
  getAvailablePackages,
  checkPackageRegister,
  checkPackageChange,
  sendOtpRegisterPackage,
  registerPackage,
  getPackageHistory,
  getCurrentPackage,
  createOrderPackage,
  checkPackageRegisterVikki,
  checkPackageRegisterHDBank,
  getPackageHistoryVikki,
};

export default PackageService;
