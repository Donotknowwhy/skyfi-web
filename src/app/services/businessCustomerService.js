import {get, post} from "@/app/services/api/base";

const getCustomerInfo=async (id,code)=>{
    try {
        const res = await get( '/app/business-customer/'+id+'/'+code );
        console.log(res)
        if ( res.success ) {
            return res.data;
        }
        throw new Error( 'Failed to add item to cart' );
    } catch ( error ) {
        return error.response.result;
    }
}
const signCustomer=async (sign,id,code)=>{
    try {
        const res = await post( '/app/business-customer/sign',{
            customerId:parseInt(id) ,
            customerCode:code,
            signature:{
                name:"sign.png",
                extension:"png",
                base64:sign,
                size:sign.length,
                type:"image/png"
            }
        } );
        if ( res.success ) {
            return res;
        }
        throw new Error( 'Failed to add item to cart' );
    } catch ( error ) {
        return error;
    }
}
const businessCustomerService={
    getCustomerInfo,
    signCustomer
}
export default businessCustomerService;
