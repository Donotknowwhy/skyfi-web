import axios from 'axios';
import { get, post } from "./api/base";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1QgZm9yIGFwb3RhIiwiaWF0IjoxNjkzMTg0MjYwLCJleHAiOjE3MjQ3MjAyNjAsImF1ZCI6InJhci5pZGNoZWNrLmNvbS52biIsInN1YiI6ImFwb3RhQGlkY2hlY2suZGV2IiwiUm9sZSI6Ik1hbmFnZXIifQ.aqrv1yApu2S-p53dZnhQLFLVShD92Xn5-1AmHpXE5RU"
const baseEKYC= process.env.NEXT_PUBLIC_API_BASE_URL?.includes('.network')?'ocr-api-dev.ekyc.solutions':'ocr-api-uat.ekyc.solutions'

const checkRegistrationLink = async (id) => {
    try {
        const res = await get(`/campaign/skyfi/check-registration-link/${id}`);
        if (res.success && res.data) {
            return res.data;
        } else {
            throw new Error(res.message || 'Failed to fetch package data');
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};
const getLocalConfig = async (param) => {
    try {
        const res = await post(`/videocall/get-local-config`, param);
        console.log(res.data)
        if (res.success && res.data) {
            return res.data;
        } else {
            throw new Error(res.message || 'Failed to fetch package data');
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};
const getInfoCardFront = async (img) => {
    try {
        const res = await axios.post(`https://${baseEKYC}/api/ekyc/v1/front`, {
            image_front_base64: img
        }, { headers: { token: token } });
        if (res && res.data && res.data.code === 200) {
            return res.data.result;
        }
        else {
            return res.data;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};
const getInfoCardBoth = async (imgFront, imgBack) => {
    try {
        const res = await axios.post(`https://${baseEKYC}/api/ekyc/v1/ocr`, {
            image_front_base64: imgFront,
            image_back_base64: imgBack
        }, { headers: { token: token } });
        if (res && res.data && res.data.code === 0) {
            return res.data.result;
        }
        else {
            return res.data;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};
const faceMatching = async (imgFront, imgFace) => {
    try {
        const res = await axios.post(`https://${baseEKYC}/api/ekyc/v1/face_matching`, {
            image_front_base64: imgFront,
            image_face_base64: imgFace
        }, { headers: { token: token } });
        if (res && res.data && res.data.code === 0) {
            return res.data.result;
        }
        else {
            return res.data;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};
const saveRegistrationInfo = async (param) => {
    try {
        const res = await post(`/campaign/skyfi/save-registration-info`, param)
        if (res && res.success) {
            return res;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};
const saveVideo = async (param) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/videocall/save_video_1`, param, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if (res && res.data) {
            return res.data;
        }
    } catch (error) {
        console.error(error);
        return error?.response?.data;
    }
};
const saveVideoBusy = async (param) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/videocall/save-video-busy`, param, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if (res && res.data) {
            return res.data;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};
const checkNumberSimRegistered = async (param) => {
    try {
        const res = await post(`videocall/check-number-sim-registered`, param)
        if (res && res.success) {
            return res;
        }
    } catch (error) {
        console.error(error);
        return error.response;
    }
};
const getForm = async (param) => {
    try {
        const res = await post(`videocall/get_img4_app`, param)
        if (res && res.success) {
            return res;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

const getInfoByCode = async (barcode) => {
    try {
        const res = await post(`/videocall/get-info-from-iccd`, { barcode })
        if (res && res.success) {
            return res.data;
        }
    } catch (error) {
        throw new Error(error?.message || 'Lỗi không xác định');
    }
}
const checkSim = async (param) => {
    try {
        const res = await post(`/videocall/check-sim-exist`, param)
        if (res && res.success) {
            return res;
        }
    } catch (error) {
        console.error(error);
        throw new Error(error?.message || 'Lỗi không xác định');
    }
}


const getContact = async (param) => {
    try {
        const res = await post(`/videocall/get_img4_app`, param)
        if (res && res.success) {
            return res;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

const getContactHD = async (param) => {
    try {
        const res = await post(`/v1/hdbank/videocall/get_img4_app`, param)
        if (res && res.success) {
            return res;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const saveLogVideoCall = async (param) => {
    try {
        const res = await post(`/videocall/save-log-video-call`, param)
        if (res && res.success) {
            return res;
        }
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

const getEkycSession = async (sessionId) => {
    try {
        const res = await get(`/v1/ekyc/session/${sessionId}`);
        if (res && res.success && res.data?.ekyc) {
            return res.data.ekyc;
        }
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getEkycSessionHD = async (sessionId) => {
    try {
        const res = await get(`/v1/hdbank/ekyc/session/${sessionId}`);
        if (res && res.success && res.data?.ekyc) {
            return res.data.ekyc;
        }
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const loginWithSession = async () => {
    try {
        const res = await get(`/app/login-with-session`,);
        if (res && res.success) {
            return res.data;
        }
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Update SIM information (phone, seri, imsi) by session ID
 * @param {Object} params - Object containing SIM info
 * @param {string} params.session_id - Session ID from eKYC
 * @param {string} params.phone - Phone number
 * @param {string} params.seri - SIM serial number (ICCID)
 * @param {string} params.imsi - IMSI number
 * @returns {Promise<Object>} Updated session data
 */
const updateSimInfo = async (params) => {
    try {
        const res = await post(`/v1/sessions/update-sim-info`, params);
        if (res && res.success) {
            return res.data;
        }
        throw new Error(res.message || 'Failed to update SIM info');
    } catch (error) {
        console.error('Error updating SIM info:', error);
        throw error;
    }
}

const updateSimInfoHD = async (params) => {
    try {
        const res = await post(`/v1/hdbank/sessions/update-sim-info`, params);
        if (res && res.success) {
            return res.data;
        }
        throw new Error(res.message || 'Failed to update SIM info');
    } catch (error) {
        console.error('Error updating SIM info:', error);
        throw error;
    }
}

/**
 * Get SIM information by session ID
 * @param {string} sessionId - Session ID from eKYC
 * @returns {Promise<Object>} SIM info object containing phone, seri, imsi
 */
const getSimInfo = async (sessionId) => {
    try {
        const res = await get(`/v1/sessions/${sessionId}/sim-info`);
        if (res && res.success && res.data?.sim_info) {
            return res.data.sim_info;
        }
        throw new Error(res.message || 'Failed to get SIM info');
    } catch (error) {
        console.error('Error getting SIM info:', error);
        throw error;
    }
}

/**
 * Get SIM information by session ID (HDBank flow)
 * @param {string} sessionId - Session ID from eKYC
 * @returns {Promise<Object>} SIM info object containing phone, seri, imsi
 */
const getSimInfoHD = async (sessionId) => {
    try {
        const res = await get(`/v1/hdbank/sessions/${sessionId}/sim-info`);
        if (res && res.success && res.data?.sim_info) {
            return res.data.sim_info;
        }
        throw new Error(res.message || 'Failed to get SIM info');
    } catch (error) {
        console.error('Error getting SIM info:', error);
        throw error;
    }
}

/**
 * Register MSISDN with NFC data (HDBank v2 activation flow)
 * @param {Object} params - Payload with face_enroll (personId, transId, nfcData from eKYC chip_raw) and subscriber info (strIsdn, strSerial, ...)
 * @returns {Promise<Object>} API response
 */
const registerMsisdnNfc = async (params) => {
    try {
        const res = await post(`/app/register-msisdn-nfc`, params);
        return res;
    } catch (error) {
        console.error('Error registering msisdn nfc:', error);
        return error?.response?.data || error;
    }
}

// "Phiếu cam kết DVVT" — trả về URL (bbck) gửi kèm body register-msisdn-nfc,
// giống fetchCamKetDvvt bên app SkyFi (Flutter)
const viewCamKetDvvt = async (param) => {
    try {
        const res = await post(`/app/view-cam-ket-dvvt`, param);
        return res;
    } catch (error) {
        console.error('Error fetching cam ket dvvt:', error);
        return error?.response?.data || error;
    }
}

const dkttService = {
    checkRegistrationLink,
    getInfoCardFront,
    getInfoCardBoth,
    faceMatching,
    getLocalConfig,
    saveRegistrationInfo,
    saveVideo,
    checkNumberSimRegistered,
    getForm,
    getInfoByCode,
    checkSim,
    saveVideoBusy,
    getContact,
    getContactHD,
    saveLogVideoCall,
    getEkycSession,
    getEkycSessionHD,
    loginWithSession,
    updateSimInfo,
    getSimInfo,
    getSimInfoHD,
    updateSimInfoHD,
    registerMsisdnNfc,
    viewCamKetDvvt
};

export default dkttService;
