import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.PRODUCTS_URLS.GENERAL;


const productVariants = URLS.PRODUCTS_VARIANTS_URL.GENERAL
const getPagination = async ({ page = 1, limit = 10, search = "", locale = 'en', id = null }) => {
    const res = await ApiClient.CustomAxios.get(`${generalUrl}/${id}/variants`, {
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

const create = async (id, { quantity, sku, price,  cost, options}, locale = 'en') => {
    const res = await ApiClient.CustomAxios.post(`${generalUrl}/${id}/variants`, {
        price,
        cost,
        sku,
        quantity,
        options
    }, {
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const getById = async (id, { locale = 'en'}) => {
    const url = `${productVariants}/${id}`;

    const res = await ApiClient.CustomAxios.get(url, {
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const update = async (id, productId, objectToSend, locale = 'en') => {
    const url = `${generalUrl}/${productId}`;
    const res = await ApiClient.CustomAxios.post(`${url}/variants/${id}`, objectToSend,
        {
            headers: {
                'x-locale': locale
            }
        });
    return res.data;
};

const deleteById = async (id) => {
    const url = `${productVariants}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const productAttributes = async ({locale = 'en', id = null, excluded_ids = null,  search = '' }) => {
    const url = `${generalUrl}/${id}/attributes`;
    const res = await ApiClient.CustomAxios.get(url, {
        params: {
            excluded_ids,
            search
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data
}

const productVariantSortOrder = async (id, objectToSend) => {
    const url = `${generalUrl}/${id}/variants/update-sort-order`;
    const res = await ApiClient.CustomAxios.post(url, objectToSend);
    return res.data
}


const ProductVariantsService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
    getById,
    productAttributes,
    productVariantSortOrder

};

export default ProductVariantsService;
