import BreadCrumbs from "@components/breadcrumbs";
import {Button, Card, Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useForm} from "react-hook-form";
import {useState} from "react";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {useMutation, useQuery} from "react-query";
import ProductGroupService from "@src/common/services/ProductGroupService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {yupResolver} from "@hookform/resolvers/yup";
import {createEditSchema, promiseProductAttributesOptions} from "@src/views/pages/product-group/pages/edit/data";

function EditPage() {

    const {id: groupID} = useParams();
    const navigate = useNavigate();
    const {translate, makeLocaleUrl} = useLocaleContext();

    const [backendErrors, setBackendErrors] = useState([]);


    const schema = createEditSchema(translate);

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    });


    useQuery(
        ['product-group'],
        () => ProductGroupService.getById(groupID),
        {
            onSuccess: ({data}) => {
                setValue('nameEn', data.translations.en.name);
                setValue('nameAr', data.translations.ar.name);

                const attributesValue = data.attributes.map((att) => ({value: att.id, label: att.name}))
                setValue("attributes", attributesValue);
            }
        }
    )

    const {mutate, isError, isLoading} = useMutation(
        (data) => ProductGroupService.update(groupID, data),
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

    const prepareDataAndSubmit = ({nameEn, nameAr, attributes}) => {
        const objectToSend = {
            translations: {
                en: {name: nameEn},
                ar: {name: nameAr}
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
                title={"edit-product-group"} data={[]}
            />
            <Card className="p-5 bg-white">
                <div>
                    <h3>{translate("product-group.edit-page.text-header")}</h3>
                    <p>{translate("product-group.edit-page.text-sub-header")}</p>
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

                        <div className="d-flex align-items-center justify-content-end gap-1">
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

export default EditPage;
