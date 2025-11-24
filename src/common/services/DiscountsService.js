import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.DISCOUNTS_URL.GENERAL;

const getPagination = async ({ page = 1, limit = 20, search = "" , isCoupon = false, locale= 'en'}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            isCoupon
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async ({
                          translations,
                          value,
                          applicableTo,
                          active,
                          startDate,
                          expiryDate,
                          type,
                          categories,
                          products,
                          couponCode = null,
                          usageLimitPerUser = null,
                          userGroups,
                          tags,
                          applyToAll,
                      }) => {
    const dataToSend = {
        translations, value, applicableTo, active, startDate, expiryDate, type, categories, products, userGroups, tags, applyToAll
    };
    if (couponCode) {
        dataToSend["couponCode"] = couponCode;
    }
    if (usageLimitPerUser) {
        dataToSend["usageLimitPerUser"] = usageLimitPerUser;
    }
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};

const update = async (id, {
    translations,
    value,
    applicableTo,
    active,
    startDate,
    expiryDate,
    type,
    categories,
    products,
    couponCode = null,
    usageLimitPerUser = null,
    userGroups,
    tags,
    applyToAll
}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        translations,
        value,
        applicableTo,
        active,
        startDate,
        expiryDate,
        type,
        categories,
        products,
        userGroups,
        tags,
        applyToAll
    };
    if (couponCode) {
        dataToSend["couponCode"] = couponCode;
    }
    if (usageLimitPerUser) {
        dataToSend["usageLimitPerUser"] = usageLimitPerUser;
    }
    const res = await ApiClient.CustomAxios.put(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const DiscountsService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
};

export default DiscountsService;
