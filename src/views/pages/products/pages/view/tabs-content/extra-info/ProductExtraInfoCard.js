import {Card, Col, Row} from "reactstrap";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import React, {useEffect, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation, useQuery, useQueryClient} from "react-query";
import ProductsService from "@src/common/services/ProductsService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import ProductGroupService from "@src/common/services/ProductGroupService";
import BrandsService from "@src/common/services/BrandsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import ModelCompatibilityService from "@src/common/services/ModelCompatibilityService";
import {Alert} from "@mui/material";

export default function ProductExtraInfoCard({product}) {
    const {translate, isRtl} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState({});
    const {preferredTableContentLocale} = useSettingsUiContext();
    const queryClient = useQueryClient()


    const {data: relatedProducts} = useQuery(
        ['related-products', product.id],
        () => ProductsService.getRelatedProducts(product.id, {
            locale: preferredTableContentLocale
        }),
        {
            enabled: !!product.id
        }
    )

    const {data: crossSellingProducts} = useQuery(
        ['cross-selling-products', product.id],
        () => ProductsService.getCrossSellingProducts(product.id, {
            locale: preferredTableContentLocale
        }),
        {
            enabled: !!product.id
        }
    )

    const schema = yup.object().shape({
        gtin: yup.string().nullable(),
        mpn: yup.string().nullable(),
        // cost: yup.number().nullable(),
        cost: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
        connectivity: yup.string().nullable(),
        color: yup.string().nullable(),
        brand: yup.object().nullable(),
        productGroup: yup.object().nullable(),
        ean: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
        weightKg: yup.number().nullable(),
        widthCm: yup.number().nullable(),
        lengthCm: yup.number().nullable(),
        heightCm: yup.number().nullable(),
        brandCompatibilities: yup.array().nullable(),
        modalProducts: yup.array().nullable(),
        relatedProducts: yup.array().nullable(),
        crossSellingProducts: yup.array().nullable(),
    });

    const brandCompatibilitiesValue = product?.brandCompatibilities?.map((obj) => {
        return {
            value:obj.id, label: obj.name
        }
    });

    const modalProductsValue = product?.modalProducts?.map((obj) => {
        return {
            value:obj.id, label: obj.name
        }
    });

    const {
        handleSubmit,
        control,
        formState: {errors},
        reset,
        getValues
    } = useForm({
        defaultValues: {
            cost: product.cost,
            connectivity: product.connectivity,
            color: product.color,
            gtin: product.gtin,
            mpn: product.mpn,
            brand: {
                label: product.brand?.name,
                value: product.brand?.id,
            },
            productGroup: {
                label: product.ProductGroup?.name,
                value: product.ProductGroup?.id,
            },
            ean: product.ean,
            weightKg: product.weightKg,
            widthCm: product.widthCm,
            lengthCm: product.lengthCm,
            heightCm: product.heightCm,
            brandCompatibilities: brandCompatibilitiesValue,
            modalProducts: modalProductsValue,
            relatedProducts: [],
            crossSellingProducts: [],
            isbn: product.isbn,
            upc: product.upc,
        },
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (relatedProducts) {
            const relatedProductsValue = relatedProducts.items.map((obj) => ({
                value: obj.id,
                label: obj.name
            }));
            reset((formValues) => ({
                ...formValues,
                relatedProducts: relatedProductsValue,
            }));
        }
    }, [relatedProducts]);

    useEffect(() => {
        if (crossSellingProducts) {
            const crossSellingProductsValue = crossSellingProducts?.items?.map((obj) => ({
                value: obj.id,
                label: obj.name
            }));
            reset((formValues) => ({
                ...formValues,
                crossSellingProducts: crossSellingProductsValue,
            }));
        }
    }, [crossSellingProducts]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductsService.update(product.id, data, preferredTableContentLocale),
        {
            onSuccess: () => {
                showSuccessAlert({});
                queryClient.invalidateQueries({ queryKey: ['related-products'] })
                queryClient.invalidateQueries({ queryKey: ['cross-selling-products'] })
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors || error.response.data.error);
            },
        }
    );

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
        BrandsService.getPagination({
            page: page, search: search, limit: perPage, locale: preferredTableContentLocale
        }).then((res) => {
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
        ProductGroupService.getPagination({
            page: page, search: search, limit: perPage, locale: preferredTableContentLocale
        }).then((res) => {
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
        ProductsService.getPagination({page: page, search: search, limit: perPage}).then((res) => {
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
        ModelCompatibilityService.getPagination({page: page, search: search, limit: perPage}).then((res) => {
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

    const onSubmit = ({
                          gtin,
                          mpn,
                          brand,
                          productGroup,
                          cost,
                          ean,
                          weightKg,
                          widthCm,
                          lengthCm,
                          heightCm,
                          brandCompatibilities,
                          modalProducts,
                          relatedProducts,
                          crossSellingProducts,
                          isbn,
                          upc,
                          connectivity,
                          color
                      }) => {
        mutate({
            gtin,
            mpn,
            brand: brand ? brand.value : '',
            productGroup: productGroup.value ?? '',
            cost: cost ?? 0,
            ean: ean ?? 0,
            weightKg,
            widthCm,
            lengthCm,
            heightCm,
            brandCompatibilities: brandCompatibilities ? brandCompatibilities.map((brand)  => brand.value) : null,
            modalProducts: modalProducts ? modalProducts.map((obj)  => obj.value) : null,
            relatedProducts: relatedProducts ? relatedProducts.map((pro)  => pro.value) : null,
            crossSellingProducts: crossSellingProducts ? crossSellingProducts.map((pro)  => pro.value) : null,
            isbn,
            upc,
            connectivity,
            color
        })
    };


    return (
        <Card className="p-5 bg-white">
            <Row>
                <Col>
                    <h2>{translate('product.tabs.extra-info.header')}</h2>
                    <p>{translate('product.tabs.extra-info.sub-header')}</p>
                    <hr/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {typeof backendErrors === 'string' ? (
                            <Alert severity="error">
                                <span>{backendErrors}</span>
                            </Alert>
                        ) : (
                            <ErrorAlert isError={isError} errors={backendErrors} />
                        )}
                        <Row>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('common.cost')}
                                    name="cost"
                                    control={control}
                                    errors={errors}
                                    type="number"
                                    placeholder="cost"
                                    acceptsDecimals={true}
                                />
                            </Col>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label="MPN"
                                    name="mpn"
                                    control={control}
                                    placeholder="MPN"
                                    errors={errors}
                                />
                            </Col>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label="GTIN"
                                    name="gtin"
                                    control={control}
                                    placeholder="GTIN"
                                    errors={errors}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label="EAN"
                                    name="ean"
                                    control={control}
                                    errors={errors}
                                    type="number"
                                    placeholder="EAN"
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label="ISBN"
                                    name="isbn"
                                    control={control}
                                    errors={errors}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label="UPC"
                                    name="upc"
                                    control={control}
                                    errors={errors}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('products.forms.weightKg')}
                                    name="weightKg"
                                    control={control}
                                    errors={errors}
                                    type="number"
                                    placeholder={translate('products.forms.weightKg')}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('products.forms.widthCm')}
                                    name="widthCm"
                                    control={control}
                                    errors={errors}
                                    type="number"
                                    placeholder={translate('products.forms.widthCm')}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('products.forms.lengthCm')}
                                    name="lengthCm"
                                    control={control}
                                    errors={errors}
                                    type="number"
                                    placeholder={translate('products.forms.lengthCm')}
                                />
                            </Col>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('products.forms.heightCm')}
                                    name="heightCm"
                                    control={control}
                                    errors={errors}
                                    type="number"
                                    placeholder={translate('products.forms.heightCm')}
                                />
                            </Col>


                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder={translate('common.brands')}
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
                                    placeholder={translate('products.forms.brandCompatibilities')}
                                    name='brandCompatibilities'
                                    label={translate('products.forms.brandCompatibilities')}
                                    control={control}
                                    getOptionsPromise={promiseBrandsOptions}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder={translate('products.forms.modalProducts')}
                                    name='modalProducts'
                                    label={translate('products.forms.modalProducts')}
                                    control={control}
                                    getOptionsPromise={promiseModelOptions}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder={translate('common.product-group')}
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
                                    placeholder={translate('products.forms.relatedProducts')}
                                    name='relatedProducts'
                                    label={translate('products.forms.relatedProducts')}
                                    control={control}
                                    getOptionsPromise={promiseProducts}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder={translate('products.forms.crossSellingProducts')}
                                    name='crossSellingProducts'
                                    label={translate('products.forms.crossSellingProducts')}
                                    control={control}
                                    getOptionsPromise={promiseProducts}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </Col>

                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('products.forms.connectivity')}
                                    name="connectivity"
                                    control={control}
                                    errors={errors}
                                    type="string"
                                    placeholder={translate('products.forms.connectivity')}
                                />
                            </Col>
                             <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('products.forms.color')}
                                    name="color"
                                    control={control}
                                    errors={errors}
                                    type="string"
                                    placeholder={translate('products.forms.color')}
                                />
                            </Col>

                            
                        </Row>

                        <div className="d-flex align-items-center justify-content-start gap-1">
                            <LoadingButton
                                size="medium"
                                type="submit"
                                className={`text-warning border-warning rounded fw-bold gap-${isRtl ? 1 : 0}`}
                                startIcon={<Edit size={14}/>}
                                loadingPosition="start"
                                loading={isLoading}
                                variant="outlined"
                                sx={{padding: '7px 15px;'}}
                            >
                                {translate('forms.update')}
                            </LoadingButton>
                        </div>
                    </form>
                </Col>
            </Row>
        </Card>
    )
}