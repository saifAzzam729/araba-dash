import {Button, Col, FormText, Row} from "reactstrap";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import React, {useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useFormContext} from "react-hook-form";
import CategoriesService from "@src/common/services/CategoriesService";
import TagsService from "@src/common/services/TagsService";
import ProductExtraInformationForm from "@src/views/pages/products/pages/add/partials/ProductExtraInformationForm";
import ProductMetaInformation from "@src/views/pages/products/custom-component/ProductMetaInformation";
import ProductFeatureImageComponent from "@src/views/pages/products/pages/add/partials/ProductFeatureImageComponent";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import CountriesService from "@src/common/services/CountriesService";
import ControlledCounterInputField from "@components/controlled-inputs/ControlledCounterInputField";
import TaxesService from "@src/common/services/TaxesService";
import {useQuery} from "react-query";
import CustomControlledRichTextField from "@components/controlled-inputs/CustomControlledRichTextField";
import ControlledCounterRichTextField from "@components/controlled-inputs/ControlledCounterRichTextField";
import BrandsService from "@src/common/services/BrandsService";
import ProductsService from "@src/common/services/ProductsService";
import {WITH_EXTRA_PRODUCT_DETAILS} from "@src/views/pages/products/config";

export default function ProductMainDetailsForm() {
    const [openExtraInformation, setOpenExtraInformation] = useState(false);
    const [openMetaInformation, setOpenMetaInformation] = useState(false);

    const {translate}= useLocaleContext();
    const {
        control,
        formState:{errors},
        watch
    } = useFormContext()

    // const taxId = watch('tax')
    // const price = watch('price')

    // const {data} = useQuery(
    //     ['price-after-tax', price, taxId],
    //     () => TaxesService.getProductPriceAfterTax(taxId.value, price),
    //     {
    //         enabled: !!taxId && !!price
    //     }
    // )

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
    const promiseTaxessOptions = (
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
        TaxesService.getPagination({page: page, search: search , limit: perPage, publish: true}).then((res) => {
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

    const promiseCountriesOptions = (
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
        CountriesService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
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

    const handleAddExtraInformation = () => {
        setOpenExtraInformation(!openExtraInformation)
    }
    const handleAddMetaInformation = () => {
        setOpenMetaInformation(!openMetaInformation)
    }

    return (
        <>
            <Row className='mb-2'>
                <h4 className='text-primary mb-2'>
                    {translate('common.product-main-details')}
                </h4>
                <Col xs={12} className="mb-2">
                    <Row className="flex-column flex-sm-row">
                        <ProductFeatureImageComponent />
                        <Col xs={12} md={7} lg={9}>
                            <Row className='mt-2 mt-sm-0'>
                                <Col lg={12}>
                                    <label htmlFor="image" className="form-label">
                                        {translate('product.forms.product-images')}
                                    </label>
                                    <CustomControlledImageUploader
                                        control={control}
                                        errors={errors}
                                        name={'images'}
                                        multiple={true}
                                    />
                                </Col>
                                <Col md={12} lg={6} className="mb-2">
                                    <ControlledCounterInputField
                                        label={translate('forms.nameEn')}
                                        name="nameEn"
                                        control={control}
                                        placeholder="John Doe"
                                        errors={errors}
                                        style={{padding: '16px 13px 30px'}}
                                    />
                                </Col>
                                <Col md={12} lg={6} className="mb-2">
                                    <ControlledCounterInputField
                                        label={translate('forms.nameAr')}
                                        name="nameAr"
                                        control={control}
                                        placeholder="John Doe"
                                        errors={errors}
                                        style={{padding: '16px 13px 30px'}}
                                    />
                                </Col>

                                <Col md={12} lg={6} className="mb-2">
                                    <ControlledCounterInputField
                                        label={translate('forms.shortDescriptionEn')}
                                        name="shortDescriptionEn"
                                        control={control}
                                        errors={errors}
                                    />
                                </Col>
                                <Col md={12} lg={6} className="mb-2">
                                    <ControlledCounterInputField
                                        label={translate('forms.shortDescriptionAr')}
                                        name="shortDescriptionAr"
                                        control={control}
                                        errors={errors}
                                    />
                                </Col>

                                <Col md={12} lg={6} className="mb-2">
                                    <ControlledCounterRichTextField
                                        label={translate('forms.descriptionEn')}
                                        name="descriptionEn"
                                        control={control}
                                        errors={errors}
                                    />
                                </Col>
                                <Col md={12} lg={6} className="mb-2">
                                    <ControlledCounterRichTextField
                                        label={translate('forms.descriptionAr')}
                                        name="descriptionAr"
                                        control={control}
                                        errors={errors}
                                    />
                                </Col>

                                <Col md={12} lg={4} className="mb-2">
                                    <CustomControlledInputField
                                        label={translate('common.price')}
                                        name="price"
                                        control={control}
                                        errors={errors}
                                        type="number"
                                        acceptsDecimals={true}
                                        acceptsPositiveOnly={true}
                                    />
                                    {/*{data?.price && <span style={{color: '#ff6f6f'}}>Price {data?.taxAvailable ? 'After' : 'Before'}  Tax: ${data.price} </span>}*/}
                                </Col>

                                <Col md={12} lg={4} className="mb-2">
                                    <CustomControlledInputField
                                        label={translate('common.quantity')}
                                        name="quantity"
                                        control={control}
                                        errors={errors}
                                        type="number"
                                        placeholder="quantity"
                                    />
                                </Col>
                                {WITH_EXTRA_PRODUCT_DETAILS && (
                                    <Col md={12} lg={4} className="mb-2">
                                        <CustomControlledInputField
                                            label="sku"
                                            name="sku"
                                            control={control}
                                            placeholder="sku"
                                            errors={errors}
                                        />
                                    </Col>
                                )}

                                {WITH_EXTRA_PRODUCT_DETAILS && (
                                    <Col md={12} lg={6} className="mb-2">
                                        <CustomControlledAsyncSelectPaginate
                                            placeholder={translate('common.countryOfOrigin')}
                                            name='countryOfOrigin'
                                            label={translate('common.countryOfOrigin')}
                                            control={control}
                                            getOptionsPromise={promiseCountriesOptions}
                                            defaultOptions={[]}
                                            errors={errors}
                                        />
                                    </Col>
                                )}

                                <Col md={12} lg={6} className="mb-2">
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
                                <Col md={12} lg={6} className="mb-2">
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
                                {WITH_EXTRA_PRODUCT_DETAILS && (
                                    <Col md={12} lg={6} className="mb-2">
                                        <CustomControlledAsyncSelectPaginate
                                            placeholder='tax'
                                            name='tax'
                                            label={translate('common.tax')}
                                            control={control}
                                            getOptionsPromise={promiseTaxessOptions}
                                            defaultOptions={[]}
                                            isMulti={false}
                                            errors={errors}
                                        />
                                    </Col>
                                )}


                                <Col md={12} lg={4} className="mb-2">
                                    <CustomControlledCheckboxInput
                                        control={control}
                                        label={translate('forms.publish')}
                                        name={'publish'}
                                    />
                                </Col>

                                <Col md={12} lg={4} className="mb-2">
                                    <CustomControlledCheckboxInput
                                        control={control}
                                        label={translate('forms.outOfStock')}
                                        name={'outOfStock'}
                                    />
                                </Col>

                                <Col md={12} lg={4} className="mb-2">
                                    <CustomControlledCheckboxInput
                                        control={control}
                                        label={translate('forms.featured')}
                                        name={'featured'}
                                    />
                                </Col>

                                <Col md={12} lg={12}>
                                    {openExtraInformation &&
                                        <div>
                                            <hr/>
                                            <ProductExtraInformationForm />
                                        </div>
                                    }
                                </Col>

                                <Col md={12} lg={12}>
                                    {openMetaInformation &&
                                        <div>
                                            <hr/>
                                            <ProductMetaInformation />
                                        </div>
                                    }
                                </Col>

                                <Col
                                    md={12} lg={12}
                                     className='d-flex flex-column align-items-center flex-sm-row gap-sm-1'
                                >
                                    {WITH_EXTRA_PRODUCT_DETAILS && !openExtraInformation &&
                                        <div className='mb-2' >
                                            <Button type="button" color="primary" outline onClick={handleAddExtraInformation}>
                                                {translate('product.common.add-info')}
                                            </Button>
                                        </div>
                                    }

                                    {!openMetaInformation &&
                                        <div className='mb-2'>
                                            <Button  type="button" color="primary" outline onClick={handleAddMetaInformation}>
                                                {translate('product.common.add-meta')}
                                            </Button>
                                        </div>
                                    }
                                </Col>


                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}