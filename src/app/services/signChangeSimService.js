import { get,post } from "./api/base";

const getChangeSimForm=async (id,msisdn,sign)=>{
    try {
        const res = await post(`/changeSim/change-sim-form/${id}/${msisdn}`, {
            signature_kh: sign
        })
        return res
    }
    catch (error) {}
}
const updateChangeSimForm=async (id,msisdn,sign,form)=>{
    try {
        const res = await post(`/changeSim/update-change-sim-form/${id}/${msisdn}`, {
            img_form: form,
            img_sign: sign
        })
        return res
    }
    catch (error) {}
}

const signChangeSimService= {
    getChangeSimForm,
    updateChangeSimForm
}
export default signChangeSimService
