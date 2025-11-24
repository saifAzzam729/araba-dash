import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.PRODUCT_ATTRIBUTES.GENERAL;

const getPagination = async ({page = 1, limit = 10, search = "", sort = '', excluded_ids = [], locale = 'en'}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            sort,
            excluded_ids
        },
        headers: {
            'x-locale': locale
        }

    });
    return res.data;
};

const create = async ({translations, options, publish, icon}) => {
    const dataToSend = {
        translations, options, publish, icon
    };
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url);

    return res.data;
};

const update = async (id, {translations, options, publish, icon}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        translations, options, publish, icon
    };
    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data;
};

const sortOptions = async ({product, items}) => {
    const url = URLS.PRODUCT_ATTRIBUTES_SORT_ORDER.GENERAL;
    const dataToSend = {
        product, items,
    };
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const ProductAttributesService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
    sortOptions

};

export default ProductAttributesService;
