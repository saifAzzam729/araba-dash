import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.MODAL_COMPATIBILITY.GENERAL;

const getPagination = async ({page = 1, limit = 10, locale = 'en', search = ''}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async ({translations, publish, brand, modelImage}) => {
    const dataToSend = {translations, publish, brand, modelImage};
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
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
const update = async (id, {translations, publish, brand, modelImage}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {translations, publish, brand, modelImage};
    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const ModelCompatibilityService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
};

export default ModelCompatibilityService;
