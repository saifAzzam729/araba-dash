import {useFormContext} from "react-hook-form";
import {Col, Row} from "reactstrap";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import CategoriesService from "@src/common/services/CategoriesService";
import BrandsService from "@src/common/services/BrandsService";
import TagsService from "@src/common/services/TagsService";
import ProductGroupService from "@src/common/services/ProductGroupService";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function ProductRelations() {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    const {translate} = useLocaleContext()

    const promiseCategoriesOptions = (
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
        CategoriesService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
            const { pages, page: currentPage, items } = res.pagination;
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

    const promiseBrandsOptions = (
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
        BrandsService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
            const { pages, page: currentPage, items } = res.pagination;
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

    const promiseTagsOptions = (
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
        TagsService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
            const { pages, page: currentPage, items } = res.pagination;
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

    const promiseProductGroups = (
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
        ProductGroupService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
            const { pages, page: currentPage, items } = res.pagination;
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

    return (
        <Row className='mb-2'>
            <h4 className='text-primary'>
                {translate('common.product-relations')}
            </h4>

            <Col xs={3} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='brand'
                    name='brand'
                    label={translate('common.brands')}
                    control={control}
                    getOptionsPromise={promiseBrandsOptions}
                    defaultOptions={[]}
                    errors={errors}
                />
            </Col>
            <Col xs={3} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='categories'
                    name='categories'
                    label={translate('common.categories')}
                    control={control}
                    getOptionsPromise={promiseCategoriesOptions}
                    defaultOptions={[]}
                    isMulti={true}
                    errors={errors}
                />
            </Col>
            <Col xs={3} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='tags'
                    name='tags'
                    label={translate('common.tags')}
                    control={control}
                    getOptionsPromise={promiseTagsOptions}
                    defaultOptions={[]}
                    isMulti={true}
                    errors={errors}
                />
            </Col>
            <Col xs={3} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='product group'
                    name='productGroup'
                    label={translate('common.product-group')}
                    control={control}
                    getOptionsPromise={promiseProductGroups}
                    defaultOptions={[]}
                    errors={errors}
                />
            </Col>
        </Row>
    )
}

export default ProductRelations