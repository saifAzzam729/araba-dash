// ** Reactstrap Imports
import {useNavigate} from "react-router-dom";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "@components/breadcrumbs";
import {Button, Card} from "reactstrap";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import ProductsService from "../../../../../common/services/ProductsService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import React, {useEffect, useState} from "react";
import {useMutation} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Edit} from "react-feather";
import ProductMainDetailsForm
    from "@src/views/pages/products/pages/add/partials/ProductMainDetailsForm";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/material";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

const AddPage = () => {
    const navigate = useNavigate();
    const {translate, makeLocaleUrl, isRtl} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

    const schema = yup.object().shape({
        // brand: yup.object().required(translate('forms.field-required')),
        // nameAr: yup.string().required(translate('forms.field-required')),
        nameEn: yup.string().required(translate('forms.field-required')),
        // descriptionAr: yup.string().required(translate('forms.field-required')),
        // descriptionEn: yup.string().required(translate('forms.field-required')),
        // price: yup.number().required(translate('forms.field-required')),
        // quantity: yup.number().required(translate('forms.field-required')),
        // metaDescriptionAr: yup.string(),//
        // metaDescriptionEn: yup.string(),
        // metaKeywordsAr: yup.string(),
        // metaKeywordsEn: yup.string(),
        // image: yup.mixed().required(translate('forms.field-required')),
        // categories: yup.array().of(
        //     yup.object().shape({
        //         value: yup.number().required(translate('forms.field-required')),
        //     })
        // ),
        // cost: yup.number().required(translate('forms.field-required')),
        // mpn: yup.string().required(translate('forms.field-required')),
        // sku: yup.string().required(translate('forms.field-required')),
        // gtin: yup.string().required(translate('forms.field-required')),
        // tags: yup.array().of(
        //     yup.object().shape({
        //         value: yup.number().required(translate('forms.field-required')),
        //     }),
        // ),
    });

    const FormMethods = useForm({

        resolver: yupResolver(schema),
        defaultValues: {
            price: 0
        }
    });

    const nameEnValue = FormMethods.watch('nameEn') ?? ''
    const shortDescriptionEnValue = FormMethods.watch('shortDescriptionEn') ?? ''
    const descriptionEnValue = FormMethods.watch('descriptionEn') ?? ''

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductsService.create({
            ...data, locale: preferredTableContentLocale
        }),
        {
            onSuccess: (res) => {
                const {data} = res
                navigate(makeLocaleUrl(`/products/view/${data.id}`));
                showSuccessAlert({});
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors || error.response.data.error);
            }
        }
    );
    useEffect(() => {
        if (nameEnValue) {
            FormMethods.setValue('nameAr', nameEnValue);
        }

        if (shortDescriptionEnValue) {
            FormMethods.setValue('shortDescriptionAr', shortDescriptionEnValue);
        }
        if (descriptionEnValue) {
            FormMethods.setValue('descriptionAr', descriptionEnValue);
        }
    }, [nameEnValue, shortDescriptionEnValue, descriptionEnValue]);

    const prepareDataAndSubmit = (data) => {
        const {
            brand,
            categories,
            nameAr,
            nameEn,
            descriptionAr,
            descriptionEn,
            price,
            metaDescriptionAr,
            metaDescriptionEn,
            metaKeywordsAr,
            metaKeywordsEn,
            image,
            productGroup,
            cost,
            mpn,
            sku,
            gtin,
            tags,
            quantity,
            outOfStock,
            publish,
            images,
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
            shortDescriptionEn,
            shortDescriptionAr,
            isbn,
            upc
        } = data;


        mutate({
            translations: {
                en: {
                    name: nameEn,
                    description: descriptionEn,
                    metaKeyword: metaKeywordsEn,
                    metaDescription: metaDescriptionEn,
                    shortDescription: shortDescriptionEn
                },
                ar: {
                    name: nameAr,
                    description: descriptionAr,
                    metaKeyword: metaKeywordsAr,
                    metaDescription: metaDescriptionAr,
                    shortDescription: shortDescriptionAr
                },
            },
            image: image.item(0),
            price,
            brand: brand ? brand.value : null,
            categories: categories ? categories.map((category => category.value)) : null,
            productGroup: productGroup ? productGroup.value : null,
            tags: tags ? tags.map((tag => tag.value)) : null,
            cost,
            mpn,
            sku,
            gtin,
            quantity,
            outOfStock,
            publish,
            images: images && images.length > 0 && images.map((img) => (
                {
                    image: img,
                    publish: true
                }
            )),
            ean,
            weightKg,
            widthCm,
            lengthCm,
            heightCm,
            brandCompatibilities: brandCompatibilities ? brandCompatibilities.map((brand) => brand.value) : null,
            modalProducts: modalProducts ? modalProducts.map((obj) => obj.value) : null,
            relatedProducts: relatedProducts ? relatedProducts.map((pro) => pro.value) : null,
            crossSellingProducts: crossSellingProducts ? crossSellingProducts.map((pro) => pro.value) : null,
            tax: tax ? tax.value : null,
            featured,
            countryOfOrigin: countryOfOrigin ? countryOfOrigin.value : null,
            isbn,
            upc
        })
    };

    const goBack = () => {
        navigate(makeLocaleUrl("/products"));
    };

    return (
        <>
            <BreadCrumbs
                title={'add-product-page'}
                data={[{title: "Products", link: "/products"}]}
            />

            <Card className="p-3 p-sm-5 bg-white">
                <div>
                    <h2>{translate('product.common.add.header')}</h2>
                    <p>{translate('product.common.add.sub-header')}</p>
                    <hr/>
                    <FormProvider {...FormMethods}>
                        <form onSubmit={FormMethods.handleSubmit(prepareDataAndSubmit)}>
                            {typeof backendErrors === 'string' ? (
                                <Alert severity="error">
                                    <span>{backendErrors}</span>
                                </Alert>
                            ) : (
                                <ErrorAlert isError={isError} errors={backendErrors}/>
                            )}

                            <ProductMainDetailsForm/>

                            <div className="d-flex align-items-center justify-content-start gap-1">
                                <Button type="button" color="secondary" outline onClick={goBack}>
                                    {translate('common.back')}
                                </Button>

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
                                    {translate('forms.save')}
                                </LoadingButton>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </Card>
        </>
    );
};

export default AddPage;
