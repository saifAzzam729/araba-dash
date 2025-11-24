import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.STATES.GENERAL;

const getPagination = async ({ page = 1, limit = 50, search , locale= 'en', publish = null, country = null}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            limit,
            page,
            search,
            publish,
            country
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async ({ translations, country, publish }) => {
    const res = await ApiClient.CustomAxios.post(generalUrl, {
        translations, country, publish });
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url);

    return res.data;
};

const update = async (id, { translations, country, publish }) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.post(url, {
        translations, country, publish });
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const StatesService = {
    getPagination,
    create,
    update,
    deleteById,
    getById,
};

export default StatesService;
