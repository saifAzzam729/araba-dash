import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.VENDORS_URLS.GENERAL;

const getPagination = async ({
    page = 1,
    limit = 10,
    search = '',
    locale = 'en',
    status = undefined,
    sort = undefined,
    direction = undefined,
}) => {

    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search: search || undefined,
            status,
            sort,
            direction,
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const approve = async (id) => {
    const res = await ApiClient.CustomAxios.put(`${generalUrl}/${id}/approve`);
    return res.data;
};

const reject = async (id) => {
    const res = await ApiClient.CustomAxios.put(`${generalUrl}/${id}/reject`);
    return res.data;
};

const getById = async (id, {locale = 'en'}) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url, {
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const banProduct = async (vendorId, productId) => {
    const url = `${generalUrl}/${vendorId}/products/${productId}/ban`;
    const res = await ApiClient.CustomAxios.put(url);
    return res.data;
};

const unbanProduct = async (vendorId, productId) => {
    const url = `${generalUrl}/${vendorId}/products/${productId}/unban`;
    const res = await ApiClient.CustomAxios.put(url);
    return res.data;
};

const updateProfile = async ({
    storeName,
    storeDescription,
    storeLogo,
    registrationDocument
}, {locale = 'en'} = {}) => {
    const dataToSend = {};
    
    if (storeName !== undefined) {
        dataToSend.storeName = storeName;
    }
    if (storeDescription !== undefined) {
        dataToSend.storeDescription = storeDescription;
    }
    if (storeLogo && storeLogo.length > 0) {
        dataToSend.storeLogo = storeLogo.item(0);
    }
    if (registrationDocument && registrationDocument.length > 0) {
        dataToSend.registrationDocument = registrationDocument.item(0);
    }
    
    const url = `${URLS.API_BASE_BACKEND_URL}/auth/edit/vendors/profile`;
    const res = await ApiClient.CustomMultiPartAxios.put(url, dataToSend, {
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const VendorsService = {
    getPagination,
    approve,
    reject,
    getById,
    banProduct,
    unbanProduct,
    updateProfile,
};

export default VendorsService;

