import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.VENDORS_URLS.GENERAL;

const getPagination = async ({
                                 page = 1,
                                 limit = 10,
                                 search = '',
                                 locale = 'en',
                                 status = undefined,
                                 sort = undefined,
                                 direction = undefined,
                             }) => {
                                
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search : search || undefined,
            status,
            sort,
            direction,
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const VendorsService = {
    getPagination,
};

export default VendorsService;

