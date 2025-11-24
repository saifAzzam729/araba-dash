import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.TAXES_URL.GENERAL;

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

const create = async ({
                          translations,
                          publish,
                          // products,
                          taxRate,
                      }) => {
    const dataToSend = {
        translations,
        publish,
        // products,
        taxRate,
    };
    const res = await ApiClient.CustomAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};

const update = async (id, {
    translations,
    publish,
    // products,
    taxRate,
    // deletedProducts
}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        translations,
        publish,
        // products,
        taxRate,
        // deletedProducts
    };
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const getProductPriceAfterTax = async (id, price) => {
    const url = `${generalUrl}/${id}/price-after-tax`;
    const res = await ApiClient.CustomAxios.get(url, {
        params: {
            price,
        },
    });
    return res.data.data
}

const TaxesService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
    getProductPriceAfterTax
};

export default TaxesService;
