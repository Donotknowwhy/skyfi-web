import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
export function formatImageForApi(image) {
    if (!image) {
        console.warn('Không có hình ảnh để xử lý');
        return '';
    }

    // Xóa phần đầu base64 (data:image/jpeg;base64, hoặc tương tự)
    const base64Prefix = image.indexOf(',');
    if (base64Prefix !== -1) {
        return image.substring(base64Prefix + 1);
    }

    // Nếu không có prefix, trả về như ban đầu
    return image;
}

const ekycMessages = {
    "0": "Thành công",
    "1": "Ảnh có dấu hiệu được chụp qua màn hình điện tử",
    "2": "Ảnh giấy tờ tùy thân là bản photocopy",
    "4": "Ảnh thẻ căn cước không có khuôn mặt.",
    "5": "Giấy tờ tùy thân bị cắt góc",
    "6": "Giấy tờ tùy thân bị nghi ngờ là giả mạo",
    "7": "Loại thẻ không đúng, có thể sai mặt trước và mặt sau",
    "-1": "Ảnh giấy tờ không đúng nội dung",
    "99": "Ảnh giấy tờ không hợp lệ"
};

export function getEkycMessage(id) {
    return ekycMessages[id.toString()] || "Mã trạng thái không xác định";
}
const faceMatchingMessages = {
    "0": "Thành công",
    "1": "Ảnh đầu vào không có giấy tờ tùy thân",
    "4": "Ảnh giấy tờ tùy thân không có mặt",
    "6": "Ảnh chứa nhiều hơn một mặt người",
    "10": "Ảnh chụp từ hình ảnh, màn hình, nhiễu mờ hoặc có dấu hiệu gian lận",
    "12": "Ảnh chân dung không hợp lệ",
    "13": "Ảnh chân dung không khớp với ảnh giấy tờ",
    "99": "Ảnh chân dung không hợp lệ",
    "-1": "Ảnh chân dung không hợp lệ"
};

export function getFaceMatchingMessage(id) {
    return faceMatchingMessages[id.toString()] || "Mã trạng thái không xác định";
}
/**
 * Kiểm tra ngày sinh đã đủ 14 tuổi chưa
 * @param {string|Date} birthDate - Ngày sinh (có thể là string với format DD/MM/YYYY hoặc Date object)
 * @param {string} format - Format của ngày sinh nếu là string (mặc định: 'DD/MM/YYYY')
 * @returns {boolean} - true nếu đủ 14 tuổi, false nếu chưa đủ
 */
export function isAtLeast14YearsOld(birthDate, format = 'DD/MM/YYYY') {
    if (!birthDate) {
        return false;
    }

    // Parse ngày sinh
    let birth;
    if (typeof birthDate === 'string') {
        birth = dayjs(birthDate, format);
    } else {
        birth = dayjs(birthDate);
    }

    // Kiểm tra tính hợp lệ của ngày sinh
    if (!birth.isValid()) {
        return false;
    }

    // Tính ngày 14 năm trước từ hôm nay
    const today = dayjs();
    const fifteenYearsAgo = today.subtract(14, 'year');

    // Kiểm tra xem ngày sinh có trước hoặc bằng ngày 14 năm trước không
    return birth.isBefore(fifteenYearsAgo) || birth.isSame(fifteenYearsAgo, 'day');
}

