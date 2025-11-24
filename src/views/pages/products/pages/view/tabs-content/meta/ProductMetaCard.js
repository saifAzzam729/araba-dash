import {Button, Card, Col, Row} from "reactstrap";
import React, {useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation} from "react-query";
import ProductsService from "@src/common/services/ProductsService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import * as yup from "yup";
import {Edit} from "react-feather";
import LoadingButton from "@mui/lab/LoadingButton";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

function ProductMetaCard({product}) {
    const {translate, isRtl} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState({});
    const {preferredTableContentLocale} = useSettingsUiContext();


    const schema = yup.object().shape({
        metaKeywordsEn: yup.string(),
        metaKeywordsAr: yup.string(),
        metaDescriptionEn: yup.string(),
        metaDescriptionAr: yup.string(),
    });

    const {
        handleSubmit,
        control,
        formState:{errors}
    } = useForm({
        defaultValues:{
            metaKeywordsEn: product.translations.en?.metaKeyword,
            metaKeywordsAr: product.translations.ar?.metaKeyword,
            metaDescriptionEn:product.translations.en?.metaDescription,
            metaDescriptionAr: product.translations.ar?.metaDescription
        },
        resolver: yupResolver(schema),
    });

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductsService.update(product.id, data, preferredTableContentLocale),
        {
            onSuccess: () => {
                showSuccessAlert({});
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const onSubmit = (data) => {
        const {
            metaDescriptionAr,
            metaDescriptionEn,
            metaKeywordsAr,
            metaKeywordsEn,

        } = data;

        const translations = {
            en: {
                metaDescription: metaDescriptionEn,
                metaKeyword: metaKeywordsEn
            },
            ar: {
                metaDescription: metaDescriptionAr,
                metaKeyword: metaKeywordsAr
            }
        }
        
        mutate({
            translations
        })

    };
    return (
        <Card className="p-5 bg-white">
            <Row>
                <Col>
                    <h2>{translate('product.tabs.meta.header')}</h2>
                    <p>{translate('product.tabs.meta.sub-header')}</p>
                    <hr/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ErrorAlert isError={isError} errors={backendErrors} />
                        <Row>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('forms.meta-keywords')}
                                    name="metaKeywordsEn"
                                    control={control}
                                    placeholder="John Doe"
                                    errors={errors}
                                />
                            </Col>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label="Meta Keywords Arabic"
                                    name="metaKeywordsAr"
                                    control={control}
                                    placeholder="John Doe"
                                    errors={errors}
                                />
                            </Col>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('forms.meta-description')}
                                    name="metaDescriptionEn"
                                    control={control}
                                    placeholder="John Doe"
                                    errors={errors}
                                />
                            </Col>
                            <Col md={12} lg={6} className="mb-2">
                                <CustomControlledInputField
                                    label="Meta Description Arabic"
                                    name="metaDescriptionAr"
                                    control={control}
                                    placeholder="John Doe"
                                    errors={errors}
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

export default ProductMetaCard
