import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.PRODUCT_GROUP.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "" , locale = 'en'}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};
const getAll = async () => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page: 1,
            limit: 100,
        },
    });

    return res.data.pagination.items;
};

const create = async ({ translations , attributes}) => {
    const dataToSend = {
        translations, attributes
    };
    const res = await ApiClient.CustomAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url);

    return res.data;
};

const update = async (id, { translations, attributes }) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        translations, attributes
    };
    const res = await ApiClient.CustomAxios.put(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const ProductGroupService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
    getAll
};

export default ProductGroupService;
