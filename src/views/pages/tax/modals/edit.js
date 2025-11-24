import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Col, Row} from "reactstrap";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import TaxesService from "@src/common/services/TaxesService";
import {yupResolver} from "@hookform/resolvers/yup";
import {editTaxSchema} from "@src/views/pages/tax/schemas/Edit";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import ProductsService from "@src/common/services/ProductsService";
import {Alert} from "@mui/material";

const EditTaxModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }

    const {translate, isRtl, makeLocaleU} = useLocaleContext()
    const [backendErrors, setBackendErrors] = useState({});

    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {
            // ...item,
            nameEn: '',
            nameAr: '',
            descriptionEn:'',
            descriptionAr: '',
            taxRate: 0
        },
        resolver: yupResolver(editTaxSchema(translate)),
    });

    const {mutate, isError, isLoading} = useMutation(
        (data) => TaxesService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors || error.response.data.error);
            },
        }
    );

    const {data: tax} = useQuery(
        ['tax', item.id],
        () => TaxesService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("nameEn", data.translations.en.name);
                setValue("nameAr", data.translations.ar.name);
                setValue("descriptionEn", data.translations.en.description);
                setValue("descriptionAr", data.translations.ar.description);
                setValue("taxRate", data.taxRate);
                const productsValues = data?.products.map((product) => {
                    return {
                        value: product.id, label: product.name
                    }
                })
                setValue('products', productsValues)
                setValue('publish', data.publish)
            }
        }
    )

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

    const prepareData = (data) => {
        const {nameEn, nameAr, descriptionEn, descriptionAr, publish, taxRate} = data;
        // const extractedProducts = products.map(product => product.value);
        // const deletedProductsList = tax?.data?.products.filter(item => !extractedProducts.includes(item.id));
        const translations = {
            en: {
                name: nameEn,
                description: descriptionEn,

            },
            ar: {
                name: nameAr,
                description: descriptionAr,

            }
        }
        mutate({
            translations,
            publish,
            // products: products ? products.map((pro)  => pro.value) : null,
            // deletedProducts: deletedProductsList ? deletedProductsList.map((pro) => pro.id) : null,
            taxRate,
        });
    };

    return (
        <CustomModal translatedHeader={translate("tax.common.edit-tax")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>

                {typeof backendErrors === 'string' ? (() => {
                        const [message, jsonString] = backendErrors.split(' !!___*$*___');
                        const productsObject = JSON.parse(jsonString);
                        return (
                            <Alert severity="error">
                                <span>{message}:</span>
                                {Object.entries(productsObject).map(([key, value], index) => (
                                    <>
                                        <a className={"mx-25"} key={key} target={"_blank"}
                                           href={makeLocaleUrl(`/products/view/${key}`)}>
                                            {value}
                                        </a>
                                        {index < Object.entries(productsObject).length - 1 && ','}
                                    </>

                                ))}
                            </Alert>
                        );
                    })() :
                    <ErrorAlert isError={isError} errors={backendErrors}/>
                }

                <Row>
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name={'nameEn'}
                            label={translate("tax.forms.nameEn")}
                            control={control}
                            errors={errors}
                        />
                    </Col>
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name={'nameAr'}
                            label={translate("tax.forms.nameAr")}
                            control={control}
                            errors={errors}
                        />
                    </Col>
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name={'descriptionEn'}
                            label={translate("tax.forms.descriptionEn")}
                            control={control}
                            errors={errors}
                        />
                    </Col>
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name={'descriptionAr'}
                            label={translate("tax.forms.descriptionAr")}
                            control={control}
                            errors={errors}
                        />
                    </Col>
                    {/*<Col xs={12} className="mb-2">*/}
                    {/*    <CustomControlledAsyncSelectPaginate*/}
                    {/*        name='products'*/}
                    {/*        placeholder={translate("tax.forms.products")}*/}
                    {/*        label={translate("tax.forms.products")}*/}
                    {/*        control={control}*/}
                    {/*        getOptionsPromise={promiseProducts}*/}
                    {/*        defaultOptions={[]}*/}
                    {/*        isMulti={true}*/}
                    {/*        errors={errors}*/}
                    {/*    />*/}
                    {/*</Col>*/}
                    <Col xs={12} sm={6} className="mb-2">
                        <CustomControlledInputField
                            name={'taxRate'}
                            label={translate("tax.forms.taxRate")}
                            type={'number'}
                            control={control}
                            errors={errors}
                            percentageValidation={true}
                            acceptsDecimals={true}
                        />
                    </Col>
                    <Col xs={12} sm={6} className="mb-2 mt-25">
                        <CustomControlledCheckboxInput
                            name="publish"
                            label={translate("tax.forms.publish")}
                            control={control}
                        />
                    </Col>
                    <div className="d-flex align-items-center justify-content-end mt-1">
                        <LoadingButton
                            size="medium"
                            type="submit"
                            className={`text-primary border-primary rounded fw-bold gap-${isRtl ? 1 : 0}`}
                            startIcon={<Edit size={14}/>}
                            loadingPosition="start"
                            loading={isLoading}
                            variant="outlined"
                            sx={{padding: '7px 15px;'}}
                        >
                            {translate('forms.save')}
                        </LoadingButton>
                    </div>
                </Row>
            </form>
        </CustomModal>
    );
};

export default EditTaxModal;
