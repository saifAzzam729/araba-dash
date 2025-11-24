import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.SHIPMENT_PRODUCTS.GENERAL;

const getPagination = async ({
                                 page = 1,
                                 limit = 10,
                                 search = "",
                                 publish = undefined,
                                 locale = 'en',
                                 shipping = null
                             }) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            publish,
            shipping
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};
const getProductsPagination = async ({
                                         page = 1,
                                         limit = 10,

                                     }) => {
    const res = await ApiClient.CustomAxios.get(`${generalUrl}/deutsche-post`, {
        params: {
            page,
            limit,

        },

    });

    return res.data;
};

const create = async (dataToSend) => {

    const res = await ApiClient.CustomAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id, {locale = 'en'}) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.get(url,
        {
            headers: {
                'x-locale': locale
            }
        });
    return res.data;
};

const update = async (id, dataToSend) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const ShipmentProductsService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
    getProductsPagination
};

export default ShipmentProductsService;
