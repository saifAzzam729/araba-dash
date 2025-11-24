import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.AFFILIATES.AFFILIATE_PAYMENT;

const getPagination = async ({ page = 1, limit = 10, search = "", locale= 'en', id = ''}) => {
    const res = await ApiClient.CustomAxios.get(`${generalUrl}/${id}/payments`, {
        params: {
            page,
            limit,
            search,
            id,
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const create = async (id ,{ amount, paymentDate, details}) => {
    const dataToSend = {
        amount, paymentDate, details
    };
    const res = await ApiClient.CustomAxios.post(`${generalUrl}/${id}/payments`, dataToSend);
    return res.data;
};

const getById = async (id, paymentId) => {
    const url = `${generalUrl}/${id}/payments/${paymentId}`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};

const update = async (id, paymentId, { amount, paymentDate, details}) => {
    const url = `${generalUrl}/${id}/payments/${paymentId}`;
    const dataToSend = { amount, paymentDate, details};
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
    return res.data;
}

const deleteById = async (id, paymentId) => {
    const url = `${generalUrl}/${id}/payments/${paymentId}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};


const AffiliatesService = {
    getPagination,
    create,
    getById,
    update,
    deleteById
};

export default AffiliatesService;