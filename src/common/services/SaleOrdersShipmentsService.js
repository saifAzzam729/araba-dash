import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.SALE_ORDERS_SHIPMENTS.GENERAL;

const getPagination = async ({page = 1, limit = 10, search = "", locale = 'en', shipping = null}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            shipping
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async (dataToSend, validateShipment) => {
    const url = validateShipment ? `${generalUrl}?validateShipment=${validateShipment}` : generalUrl;
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
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

const createManifest = async (data) => {
    const url = `${generalUrl}/manifest`;
    const res = await ApiClient.CustomAxios.post(url, data);
    return res.data;
};


const SaleOrdersShipmentsService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
    createManifest,
};

export default SaleOrdersShipmentsService;
