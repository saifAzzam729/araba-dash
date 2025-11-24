import {Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import React from "react";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import BrandsService from "@src/common/services/BrandsService";
import ProductGroupService from "@src/common/services/ProductGroupService";
import ModelCompatibilityService from "@src/common/services/ModelCompatibilityService";
import ProductsService from "@src/common/services/ProductsService";

export default function ProductExtraInformationForm() {
    const {translate} = useLocaleContext()
    const {
        control,
        formState: {errors},
    } = useFormContext()

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

    const promiseModelOptions = (
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
        ModelCompatibilityService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
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

    const promiseProducts = (
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
        ProductsService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
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
        <Row>
            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label="MPN"
                    name="mpn"
                    control={control}
                    placeholder="MPN"
                    errors={errors}
                />
            </Col>
            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label="GTIN"
                    name="gtin"
                    control={control}
                    placeholder="GTIN"
                    errors={errors}
                />
            </Col>

            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label={translate('common.cost')}
                    name="cost"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder="cost"
                />
            </Col>

            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label="EAN"
                    name="ean"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder="EAN"
                />
            </Col>

            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label="ISBN"
                    name="isbn"
                    control={control}
                    errors={errors}
                />
            </Col>

            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label="UPC"
                    name="upc"
                    control={control}
                    errors={errors}
                />
            </Col>

            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label={translate('products.forms.weightKg')}
                    name="weightKg"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder={translate('products.forms.weightKg')}
                />
            </Col>

            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label={translate('products.forms.widthCm')}
                    name="widthCm"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder={translate('products.forms.widthCm')}
                />
            </Col>

            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label={translate('products.forms.lengthCm')}
                    name="lengthCm"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder={translate('products.forms.lengthCm')}
                />
            </Col>
            <Col md={12} lg={4} className="mb-2">
                <CustomControlledInputField
                    label={translate('products.forms.heightCm')}
                    name="heightCm"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder="heightCm"
                />
            </Col>

            <Col md={12} lg={6} className="mb-2">
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

            <Col md={12} lg={6} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='brand'
                    name='brandCompatibilities'
                    label="brandCompatibilities"
                    control={control}
                    getOptionsPromise={promiseBrandsOptions}
                    defaultOptions={[]}
                    isMulti={true}
                    errors={errors}
                />
            </Col>

            <Col md={12} lg={6} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='modalProducts'
                    name='modalProducts'
                    label="modalProducts"
                    control={control}
                    getOptionsPromise={promiseModelOptions}
                    defaultOptions={[]}
                    isMulti={true}
                    errors={errors}
                />
            </Col>

            <Col md={12} lg={6} className="mb-2">
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

            <Col md={12} lg={6} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='relatedProducts'
                    name='relatedProducts'
                    label={'relatedProducts'}
                    control={control}
                    getOptionsPromise={promiseProducts}
                    defaultOptions={[]}
                    isMulti={true}
                    errors={errors}
                />
            </Col>

            <Col md={12} lg={6} className="mb-2">
                <CustomControlledAsyncSelectPaginate
                    placeholder='crossSellingProducts'
                    name='crossSellingProducts'
                    label={'crossSellingProducts'}
                    control={control}
                    getOptionsPromise={promiseProducts}
                    defaultOptions={[]}
                    isMulti={true}
                    errors={errors}
                />
            </Col>


        </Row>
    )
}