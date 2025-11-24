import URLS from "@src/common/urls";
import ApiClient from "@src/common/api-client";

const generalUrl = URLS.PRODUCT_OPTIONS.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "", sort = '', attribute = '' }) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            sort,
            attribute
        },
    });
    return res.data;
};


const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const ProductOptionService = {
    getPagination,
    deleteObject: deleteById,
};

export default ProductOptionService;
