import {Col, FormText, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import React, {useState} from "react";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import TagsService from "@src/common/services/TagsService";
import CategoriesService from "@src/common/services/CategoriesService";
import CustomControlledImageUploader from "@components/filepond-uploader/CustomControlledImageUploader";
import uuid from "draft-js/lib/uuid";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import CountriesService from "@src/common/services/CountriesService";
import ControlledCounterInputField from "@components/controlled-inputs/ControlledCounterInputField";
import TaxesService from "@src/common/services/TaxesService";
import {useQuery} from "react-query";
import ControlledCounterRichTextField from "@components/controlled-inputs/ControlledCounterRichTextField";
import BrandsService from "@src/common/services/BrandsService";
import ProductsService from "@src/common/services/ProductsService";
import {WITH_EXTRA_PRODUCT_DETAILS} from "@src/views/pages/products/config";

function ProductMainDetailsForm({product}) {
    const {translate} = useLocaleContext();
    const [image, setImage] = useState(null);
    const {preferredTableContentLocale} = useSettingsUiContext();

    const productImageFileUrl = product?.imageFileUrl;
    const productImageName= product?.imageFileName;

    const {
        register,
        control,
        formState:{errors},
        watch,
    } = useFormContext()

   

    async function uploadImage(e) {
        const file = e.target.files[0];
        if (file) {
            const imageObject = await readFileAsync(file);
            setImage(imageObject);
        }
    }

    function readFileAsync(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({
                    id: uuid(),
                    url: reader.result,
                    type: "image"
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

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
        CategoriesService.getPagination({
            page: page, search: search , limit: perPage,locale: preferredTableContentLocale
        }).then((res) => {
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
        TagsService.getPagination({
            page: page, search: search , limit: perPage, locale: preferredTableContentLocale
        }).then((res) => {
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

    const promiseTaxesOptions = (
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
        TaxesService.getPagination({page: page, search: search , limit: perPage, publish: true }).then((res) => {
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
        BrandsService.getPagination({
            page: page, search: search , limit: perPage, locale: preferredTableContentLocale
        }).then((res) => {
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

    return(
        <Row className='mb-2'>
            <h4 className='text-primary mb-2'>
                {translate('common.product-main-details')}
            </h4>
            <Col xs={12} className="mb-2">
                <Row className="flex-column flex-sm-row">
                    <Col xs={12} md={5} lg={3} className={'mb-2'}>
                        <label htmlFor="image" className="form-label">
                            {translate('product.forms.feature-image')}
                        </label>
                        <img
                            alt={productImageName}
                            src={image ? image.url : ParseImageUrl(productImageFileUrl)}
                            width={"100%"}
                            height={'400px'}
                        />
                        <input
                            className="form-control mt-1"
                            id="image"
                            {...register("image")}
                            type="file"
                            onChange={uploadImage}
                            placeholder="bg"
                        />
                        <FormText color="danger">
                            {errors.image && errors.image.message}
                        </FormText>
                    </Col>

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
                                    subLabel={translate('common.image-uploader-subLabel')}
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
                            {WITH_EXTRA_PRODUCT_DETAILS && (
                                <Col md={12} lg={6} className="mb-2">
                                    <CustomControlledAsyncSelectPaginate
                                        placeholder='tax'
                                        name='tax'
                                        label={translate('common.tax')}
                                        control={control}
                                        getOptionsPromise={promiseTaxesOptions}
                                        defaultOptions={[]}
                                        isMulti={false}
                                        errors={errors}
                                    />
                                </Col>
                            )}

                            <Col md={12} lg={4}>
                                <CustomControlledCheckboxInput
                                    control={control}
                                    label={translate('forms.publish')}
                                    name={'publish'}
                                />
                            </Col>

                            <Col md={12} lg={4}>
                                <CustomControlledCheckboxInput
                                    control={control}
                                    label={translate('forms.outOfStock')}
                                    name={'outOfStock'}
                                />
                            </Col>
                            <Col md={12} lg={4}>
                                <CustomControlledCheckboxInput
                                    control={control}
                                    label={translate('forms.featured')}
                                    name={'featured'}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ProductMainDetailsForm