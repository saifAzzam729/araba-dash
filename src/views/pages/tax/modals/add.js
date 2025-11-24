import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import TaxesService from "@src/common/services/TaxesService";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import {Col, Row} from "reactstrap";
import LoadingButton from "@mui/lab/LoadingButton";
import {Edit} from "react-feather";
import {yupResolver} from "@hookform/resolvers/yup";
import {addTaxSchema} from "@src/views/pages/tax/schemas/Add";
import ProductsService from "@src/common/services/ProductsService";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {Alert} from "@mui/material";

export default function AddTaxModal({isOpen, closeModal, onAddSuccessCb, item = null}) {
    const {translate, isRtl, makeLocaleUrl} = useLocaleContext()
    const [backendErrors, setBackendErrors] = useState([]);

    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        resolver: yupResolver(addTaxSchema(translate)),
    });

    const {mutate, isError, isLoading} = useMutation(
        (data) => TaxesService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors || error.response.data.error);
            },
        }
    );

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
            // products: products ? products.map((pro) => pro.value) : null,
            taxRate,
        });
    };
    return (
        <CustomModal translatedHeader={translate("tax.common.add-tax")} isOpen={isOpen}
                     closeModal={closeModal}>
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
