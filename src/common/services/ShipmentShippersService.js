import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.SHIPMENT_SHIPPERS.GENERAL;

const getPagination = async ({page = 1, limit = 10, search = "", locale = 'en'}) => {
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

const create = async ({name, description, addressStreet, additionalAddressInformation, email, phone, country, city, postalCode}) => {
    const dataToSend = {
        name, description, addressStreet, additionalAddressInformation, email, phone, country, city, postalCode,
    };
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

const update = async (id, {name, description, addressStreet, additionalAddressInformation, email, phone, country, city, postalCode,}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {name, description, addressStreet, additionalAddressInformation, email, phone, country, city, postalCode,};
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const ShipmentShippersService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
};

export default ShipmentShippersService;
