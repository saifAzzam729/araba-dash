import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.SHIPPING_URLS.GENERAL;

const getPagination = async ({page = 1, limit = 10, search = "", publish = undefined, locale = 'en'}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            publish
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async ({translations, icon, publish, value, minSubtotalValue, defaultMethod}) => {
    const dataToSend = {
        translations,
        publish,
        icon: icon.item(0),
        value,
        minSubtotalValue,
        defaultMethod,
    };
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url);

    return res.data;
};

const update = async (id, {translations, icon, publish, value, minSubtotalValue, defaultMethod}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        translations,
        publish,
        value,
        minSubtotalValue,
        defaultMethod,
    };
    if (icon) {
        dataToSend["icon"] = icon.item(0);
    }
    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const ShippingService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
};

export default ShippingService;
