import URLS from "../urls";
import ApiClient from "../api-client";


const generalUrl = URLS.EBAY_CATEGORIES_URLS.GENERAL;

const getPagination = async ({
                                 page = 1,
                                 limit = 10,
                                 search = "",
                                 locale = 'en',
                                 marketPlaceId = null

                             }) => {
    const res = await ApiClient.CustomAxios.get(`${generalUrl}`, {
        params: {
            page,
            limit,
            search,
            marketPlaceId
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const create = async (dataToSend) => {
    const url = `${generalUrl}`
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
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

const update = async (id, dataToSend) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const EbayCategoriesService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
    getById,
};

export default EbayCategoriesService;
