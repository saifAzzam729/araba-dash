import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.PRODUCTS_URLS.GENERAL;

const productAttribute = URLS.SINGLE_PRODUCT_ATTRIBUTES.GENERAL

const getPagination = async ({page = 1, limit = 100, search = "", locale = 'en', quantity=null, sku=null}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            quantity,
            sku,
            sort:'p.id',
            direction:'desc'
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const create = async ({
                          translations,
                          image,
                          price,
                          brand,
                          categories,
                          productGroup,
                          cost,
                          mpn,
                          sku,
                          gtin,
                          tags,
                          quantity,
                          images,
                          publish,
                          outOfStock,
                          ean,
                          weightKg,
                          widthCm,
                          lengthCm,
                          heightCm,
                          brandCompatibilities,
                          modalProducts,
                          relatedProducts,
                          crossSellingProducts,
                          tax,
                          featured,
                          countryOfOrigin,
                          isbn,
                          upc,
                          locale = 'en'
                      }) => {
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, {
        translations,
        image,
        price,
        brand,
        categories,
        productGroup,
        cost,
        mpn,
        sku,
        gtin,
        tags,
        quantity,
        images,
        publish,
        outOfStock,
        ean,
        weightKg,
        widthCm,
        lengthCm,
        heightCm,
        brandCompatibilities,
        modalProducts,
        relatedProducts,
        crossSellingProducts,
        tax,
        featured,
        countryOfOrigin,
        isbn,
        upc,
    },
        {
            headers: {
                'x-locale': locale
            }
        }

    );
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

const update = async (id, objectToSend, locale = 'en') => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomMultiPartAxios.post(url, objectToSend, {
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const productOutOfStock = async ({page = 1, limit = 100}) => {
    const url = `${generalUrl}/almost-out-of-stock`;
    const res = await ApiClient.CustomAxios.get(url, {
        params: {
            page,
            limit,
        },
    });
    return res.data.pagination
}

const sendProductAttributes = async (objectToSend, locale = 'en') => {
    const url = `${productAttribute}`;
    const res = await ApiClient.CustomAxios.post(url, objectToSend, {
        headers: {
            'x-locale': locale
        }
    } );
    return res.data;
};

const getRelatedProducts = async (id, {page = 1, limit = 10 ,locale = 'en'}) => {
    const url = `${generalUrl}/${id}/related-products`;
    const res = await ApiClient.CustomAxios.get(url, {
        params: {
            page,
            limit,
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data.pagination;
};
const getCrossSellingProducts = async (id, {page = 1, limit = 10 ,locale = 'en'}) => {
    const url = `${generalUrl}/${id}/cross-selling-products`;
    const res = await ApiClient.CustomAxios.get(url, {
        params: {
            page,
            limit,
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data.pagination;
};

const ProductsService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
    getById,
    productOutOfStock,
    sendProductAttributes,
    getRelatedProducts,
    getCrossSellingProducts
};

export default ProductsService;
