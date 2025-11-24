import URLS from "../urls";
import ApiClient from "../api-client";


const generalUrl = URLS.EBAY_LISTINGS_URLS.GENERAL;

const getPagination = async ({
                                 page = 1,
                                 limit = 10,
                                 search = "",
                                 publish = undefined,
                                 locale = 'en',
                             }) => {
    const res = await ApiClient.CustomAxios.get(`${generalUrl}`, {
        params: {
            page,
            limit,
            search,
            publish,

        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const create = async (dataToSend) => {
    const res = await ApiClient.CustomAxios.post(`${generalUrl}`, dataToSend);
    return res.data;
};

const getById = async (id, {locale = 'en'}) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url, {
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const update = async (id, {clientKey, secretKey, redirectUrl}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        clientKey, secretKey, redirectUrl
    };

    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const EbayListingService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
    getById,
};

export default EbayListingService
