import * as yup from "yup";
import ProductAttributesService from "@src/common/services/ProductAttributesService";

export const createAddSchema = (translate) => {
    return yup.object().shape({
        nameAr: yup.string().required(translate('forms.field-required')),
        nameEn: yup.string().required(translate('forms.field-required')),
        attributes: yup.array().nullable(),
    });
}


export const promiseProductAttributesOptions = (
    searchValue,
    prevOptions,
    additional,
) => new Promise((resolve) => {
    const prevPage = additional?.prevPage ?? 0;

    const params = {
        search: searchValue,
        page: prevPage + 1,
    };
    const page = params.page;
    const perPage = 10;
    const search = params.search;
    ProductAttributesService.getPagination({page: page, search: search, limit: perPage}).then((res) => {
        const {pages, page: currentPage, items} = res.pagination;
        resolve({
            options: items.map((item) => ({
                label: item.name,
                value: item.id,
            })),
            hasMore: currentPage < pages,
            additional: {
                prevPage: currentPage,
                prevSearchValue: searchValue,
            },
        });
    });
});
