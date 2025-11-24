import BreadCrumbs from "@components/breadcrumbs";
import {Button, Card, Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {useMutation} from "react-query";
import ProductGroupService from "@src/common/services/ProductGroupService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {yupResolver} from "@hookform/resolvers/yup";
import {createAddSchema, promiseProductAttributesOptions} from "@src/views/pages/product-group/pages/add/data";

function AddPage() {

    const navigate = useNavigate();
    const {translate, makeLocaleUrl} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState([]);

    const schema = createAddSchema(translate);

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch, setValue
    } = useForm({
        resolver: yupResolver(schema),
    });


    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductGroupService.create(data),
        {
            onSuccess: (data) => {
                navigate(makeLocaleUrl("/product-group"));
                showSuccessAlert({});
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            }
        }
    );

    const nameEnValue = watch('nameEn') ?? ''

    useEffect(() => {
        if (nameEnValue) {
            setValue('nameAr', nameEnValue);
        }

    }, [nameEnValue]);

    const prepareDataAndSubmit = ({nameEn, nameAr, attributes}) => {
        const objectToSend = {
            translations: {
                en: {name: nameEn},
                ar: {name: nameAr},
            },
            attributes: attributes?.map((attribute) => attribute.value) ?? []
        }

        mutate(objectToSend)
    }

    const goBack = () => {
        navigate(makeLocaleUrl("/product-group"));
    };

    return (
        <>
            <BreadCrumbs
                title={"add-product-group"} data={[]}
            />
            <Card className="p-5 bg-white">
                <div>
                    <h3>{translate("product-group.add-page.text-header")}</h3>
                    <p>{translate("product-group.add-page.text-sub-header")}</p>
                    <hr/>
                </div>
                <div className="invoice-add-wrapper">
                    <form onSubmit={handleSubmit(prepareDataAndSubmit)}>
                        <ErrorAlert isError={isError} errors={backendErrors}/>
                        <Row className={"py-3"}>
                            <Col xs={12} md={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('forms.nameEn')}
                                    name="nameEn"
                                    control={control}
                                    placeholder={translate('forms.nameEn')}
                                    errors={errors}
                                />
                            </Col>
                            <Col xs={12} md={6} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('forms.nameAr')}
                                    name="nameAr"
                                    control={control}
                                    placeholder={translate('forms.nameAr')}
                                    errors={errors}
                                />
                            </Col>
                            <Col xs={12} md={6} className="mb-2">
                                <CustomControlledAsyncSelectPaginate
                                    placeholder={translate('product-group.forms.text-attributes-label')}
                                    name='attributes'
                                    label={translate('product-group.forms.text-attributes-label')}
                                    control={control}
                                    getOptionsPromise={promiseProductAttributesOptions}
                                    defaultOptions={[]}
                                    isMulti={true}
                                    errors={errors}
                                />
                            </Col>
                        </Row>

                        <div className="d-flex align-items-center justify-content-start gap-1">
                            <SubmitLoadingBtn isLoading={isLoading}/>

                            <Button
                                type="button"
                                color="secondary"
                                outline
                                onClick={goBack}
                                className="mb-3"
                            >
                                {translate('common.back')}
                            </Button>

                        </div>
                    </form>
                </div>
            </Card>
        </>
    );
}

export default AddPage;
