import URLS from "../urls";
import ApiClient from "../api-client";


const generalUrl = URLS.EBAY_ACCOUNT_URL.GENERAL;

const getPagination = async ({
                                 page = 1,
                                 limit = 10,
                                 search = "",
                                 publish = undefined,
                                 locale = 'en',
                                 accountId = '',
                                 marketPlace = null
                             }) => {
    const res = await ApiClient.CustomAxios.get(`${generalUrl}/${accountId}/locations`, {
        params: {
            page,
            limit,
            search,
            publish,
            marketplaceId: marketPlace

        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const create = async (dataToSend, accountId) => {
    const res = await ApiClient.CustomAxios.post(`${generalUrl}/${accountId}/locations`, dataToSend);
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

const EBayLocationService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
    getById,
};

export default EBayLocationService;
