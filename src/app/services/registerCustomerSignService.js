import { post } from "./api/base";

const getForm = async (code, sign) => {
    try {
        const res = await post(`/crm/subscriber-update-info/get_img4_dktt_regis`, {
            request_code: code,
            signature_kh: sign
        })
        return res
    }
    catch (error) {}
}

const updateForm = async (code, form, signature_img) => {
    try {
        const res = await post(`/crm/subscriber-update-info/update_img4_dktt_regis`, {
            hd_img: form,
            request_code: code,
            signature_img: signature_img
        })
        return res
    }
    catch (error) {}
}

const registerCustomerSignService = {
    getForm,
    updateForm
}
export default registerCustomerSignService
