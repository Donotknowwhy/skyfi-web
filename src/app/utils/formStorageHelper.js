/**
 * Helper functions để quản lý lưu trữ dữ liệu form trong localStorage
 */

const STORAGE_KEYS = {
  CHECKOUT_FORM: 'checkout_form_data',
  CONTACT_FORM: 'contact_form_data',
  PROFILE_FORM: 'profile_form_data',
  REGISTER_SIM_DRAFT: 'register_sim_draft'
};

/**
 * Lưu dữ liệu form vào localStorage
 * @param {string} key - Khóa để lưu trữ
 * @param {Object} formData - Dữ liệu form cần lưu
 */
export const saveFormDataToStorage = (key, formData) => {
  try {
    localStorage.setItem(key, JSON.stringify(formData));
    console.log(`Đã lưu dữ liệu form với key: ${key}`);
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu form:', error);
    return false;
  }
};

/**
 * Tải dữ liệu form từ localStorage
 * @param {string} key - Khóa để tải dữ liệu
 * @returns {Object|null} - Dữ liệu form hoặc null nếu không có
 */
export const loadFormDataFromStorage = (key) => {
  try {
    const savedData = localStorage.getItem(key);
    if (!savedData) {
      return null;
    }

    const formData = JSON.parse(savedData);
    console.log(`Đã tải dữ liệu form với key: ${key}`);
    return formData;
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu form:', error);
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Xóa dữ liệu form khỏi localStorage
 * @param {string} key - Khóa cần xóa
 */
export const clearFormDataFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    console.log(`Đã xóa dữ liệu form với key: ${key}`);
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu form:', error);
    return false;
  }
};

/**
 * Xóa tất cả dữ liệu form
 */
export const clearAllFormData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('Đã xóa tất cả dữ liệu form');
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa tất cả dữ liệu form:', error);
    return false;
  }
};

/**
 * Kiểm tra xem có dữ liệu form đã lưu không
 * @param {string} key - Khóa cần kiểm tra
 * @returns {boolean}
 */
export const hasFormDataInStorage = (key) => {
  const data = loadFormDataFromStorage(key);
  return data !== null;
};

// Export các khóa để sử dụng
export { STORAGE_KEYS };
