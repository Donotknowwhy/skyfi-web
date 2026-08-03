import { get } from "./api/base";
const getFAQs = async (language) => {

    try {
        const res = await get( `/app/faq?language=${language}` );
        if ( res.success && res.data && res.data.length > 0 ) {
            return res;
        } else {
            throw new Error( res.message || 'Failed to fetch faq' );
        }
    } catch ( error ) {
        console.error( error );
        return error.response.data;
    }
};
const faqService = {
    getFAQs,
};
export default faqService
