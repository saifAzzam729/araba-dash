import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.CITIES.GENERAL;

const getPagination = async ({ page = 1, limit = 20, search , locale= 'en', publish = null, state = null}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            limit,
            page,
            search,
            publish,
            state
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async ({ translations, state, publish }) => {
    const res = await ApiClient.CustomAxios.post(generalUrl, {
        translations, state, publish });
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url);

    return res.data;
};

const update = async (id, { translations, state, publish }) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.post(url, {
        translations, state, publish });
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const CitiesService = {
    getPagination,
    create,
    update,
    deleteById,
    getById,
};

export default CitiesService;
