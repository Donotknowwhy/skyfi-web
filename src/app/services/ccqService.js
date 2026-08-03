import { get,post } from "./api/base";

const getCcqForm=async (code,sign)=>{
    try {
        const res = await post(`/crm/subscriber-update-info/get_img4_dktt`, {
            request_code:code,
            signature_kh: sign
        })
        return res
    }
    catch (error) {}
}
const updateCcqForm=async (code,form,signature_img)=>{
    try {
        const res = await post(`/crm/subscriber-update-info/update_img4_dktt`, {
            hd_img: form,
            request_code: code,
            signature_img:signature_img
        })
        return res
    }
    catch (error) {}
}

const ccqService= {
    getCcqForm,
    updateCcqForm
}
export default ccqService
