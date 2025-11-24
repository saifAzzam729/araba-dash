import {Button, Card} from "reactstrap";
import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation, useQuery, useQueryClient} from "react-query";
import ProductsService from "@src/common/services/ProductsService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import * as yup from "yup";
import ProductMainDetailsForm
    from "@src/views/pages/products/pages/view/tabs-content/info/partials/ProductMainDetailsForm";
import {Edit} from "react-feather";
import LoadingButton from "@mui/lab/LoadingButton";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import showErrorAlert from "@components/alert/showErrorAlert";
import {Alert} from "@mui/material";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";

function ProductInfoCard({product, publish = true}) {

    const navigate = useNavigate();
    const {makeLocaleUrl, translate, isRtl} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState({});
    const queryClient = useQueryClient()
    const {preferredTableContentLocale} = useSettingsUiContext();



    const schema = yup.object().shape({
        nameEn: yup.string().required(translate('forms.field-required')),
        // descriptionEn: yup.string().required(translate('forms.field-required')),
        // price: yup.number().required(translate('forms.field-required')),
    });

    const categoryValue = product?.categories?.map((category) => {
        return {
            value: category.id, label: category.name
        }
    })

    const tagsValue = product?.tags?.map((tag) => {
        return {
            value: tag.id, label: tag.title
        }
    })

    const imageUrl = product.defaultImages?.map((img) => {
        return {
            fileUrl: ParseImageUrl(img.imageFileUrl),
            id: img.id
        }
    })

    const defaultImagesUrl = imageUrl?.map((img)=> img.fileUrl)


    const {data: autoCalcTaxSettings} = useQuery(
        ['website-Links-included'],
        () => MultiTypeSettingsService.getById('AUTO_CALCULATE_TAX_VALUE'),
    );

    const isAutoCalcTaxSettingEnabled = autoCalcTaxSettings?.data?.value === "1";

    const FormMethods = useForm({
        defaultValues: {
            nameAr: product.translations?.ar?.name,
            nameEn: product.translations.en.name,
            descriptionAr: product.translations?.ar?.description,
            descriptionEn: product.translations.en?.description,
            shortDescriptionEn: product.translations.en?.shortDescription,
            shortDescriptionAr: product.translations.ar?.shortDescription,
            cost: product.cost,
            price: product.price,
            quantity: product.quantity,
            sku: product.sku,

            categories: categoryValue,
            tags: tagsValue,
            publish: product.publish,
            featured: product.featured,
            outOfStock: product.outOfStock,
            tax: product?.tax && {value: product?.tax?.id, label: product?.tax?.name},
            countryOfOrigin: product?.countryOfOrigin && {
                label: product?.countryOfOrigin?.name,
                value: product?.countryOfOrigin?.id,
            },

            images: defaultImagesUrl && defaultImagesUrl
        },
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (product?.tax && isAutoCalcTaxSettingEnabled) {
            FormMethods.setValue('price', product?.nativePrice)
        }
    }, [isAutoCalcTaxSettingEnabled, product, autoCalcTaxSettings]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductsService.update(product.id, data, preferredTableContentLocale),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['product']})
                showSuccessAlert({});
            },
            onError: (error) => {
                showErrorAlert({})
                setBackendErrors(error.response.data.formErrors || error.response.data.error);
            },
        }
    );

    const goBack = () => {
        navigate(makeLocaleUrl("/products"));
    };

    const onSubmit = (data) => {
        const {
            nameAr,
            nameEn,
            descriptionAr,
            descriptionEn,
            cost,
            price,
            quantity,
            sku,
            categories,
            tags,
            image,
            publish,
            images,
            outOfStock,
            tax,
            featured,
            countryOfOrigin,
            shortDescriptionEn,
            shortDescriptionAr
        } = data;

        const translations = {
            en: {
                name: nameEn,
                description: descriptionEn,
                shortDescription: shortDescriptionEn,
            },
            ar: {
                name: nameAr,
                description: descriptionAr,
                shortDescription: shortDescriptionAr
            },
        }

        const extractImageName = images.map(item => item.name);
        const deletedImages = product.defaultImages.filter(item => !extractImageName.includes(item.imageFileUrl.split('/').pop()));
        const imagesToSend = images.filter(file => file instanceof File);

        mutate({
            translations,
            cost,
            price,
            quantity,
            sku,
            publish,
            "categories[]": categories && categories.length > 0 ? categories.map((category => category.value)) : "",
            "tags[]": tags && tags.length > 0 ? tags.map((tag => tag.value)) : "",
            outOfStock,
            countryOfOrigin: countryOfOrigin ? countryOfOrigin.value : '',

            image: image.item(0),
            images: imagesToSend.map((img) => (
                {
                    image: img,
                    publish: true
                }
            )),
            deletedImages: deletedImages.length > 0 ? deletedImages.map((obj)=>obj.id) : [],
            tax: tax?.value,
            featured

        })

    };

    return (
        <Card className="p-3 p-sm-5 bg-white">
            <div>
                <h2>{translate('product.tabs.view.header')}</h2>
                <p>{translate('product.tabs.view.sub-header')}</p>
                <hr/>
                <FormProvider {...FormMethods}>
                    <form onSubmit={FormMethods.handleSubmit(onSubmit)}>
                        {typeof backendErrors === 'string' ? (
                            <Alert severity="error">
                                <span>{backendErrors}</span>
                            </Alert>
                        ) : (
                            <ErrorAlert isError={isError} errors={backendErrors} />
                        )}
                        <ProductMainDetailsForm product={product}/>

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
                                {translate('forms.update')}
                            </LoadingButton>
                        </div>
                    </form>
                </FormProvider>

            </div>
        </Card>
    )
}

export default ProductInfoCard
