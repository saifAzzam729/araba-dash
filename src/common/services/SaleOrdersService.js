import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.SALE_ORDERS_URL.GENERAL;

const getPagination = async ({
                                 page = 1,
                                 limit = 100,
                                 userId = "",
                                 status = "",
                                 search = "",
                                 direction = "asc",
                                 affiliate = "",
                                 isPaidForAffiliate = null,
                                 locale = "en",
                                 paymentProvideCode = null,
                                 itemProduct = null,
                                 shipping = null,
                                 sort = null,
                                 ebayOrderId = null
                             }) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            user: userId,
            status,
            search,
            direction,
            affiliate,
            isPaidForAffiliate,
            paymentProvideCode,
            shipping,
            itemProduct,
            sort,
            ebayOrderId
        },
        headers: {
            "x-locale": locale,
        },
    });

    return res.data;
};

const getById = async (id, {locale = "en"}) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.get(url, {
        headers: {
            "x-locale": locale,
        },
    });
    return res.data;
};

const update = async (id, {status}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        status,
    };
    const res = await ApiClient.CustomAxios.put(url, dataToSend);
    return res.data;
};
const updateAddress = async (id, dataToSend) => {
    const url = `${generalUrl}/${id}/address`;
    const res = await ApiClient.CustomAxios.put(url, dataToSend);
    return res.data;
};

const resendInvoiceToUser = async (id) => {
    const url = `${generalUrl}/${id}/resend-invoice-to-user`;
    const res = await ApiClient.CustomAxios.post(url);
    return res.data;
};

const SaleOrdersService = {
    getPagination,
    getById,
    update,
    updateAddress,
    resendInvoiceToUser
};




export default SaleOrdersService;
