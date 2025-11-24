import BreadCrumbs from "@components/breadcrumbs";
import {Button, Card, Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useMutation} from "react-query";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EBayPolicyService from "@src/common/services/EBayPoliciesService";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {
    addReturnPolicySchema,
    options,
    PayerOptionsFactory,
    PeriodTypeOptionsFactory
} from "@src/views/pages/eBay/policies/return/data";
import {yupResolver} from "@hookform/resolvers/yup";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {marketPlaceOptions, PoliciesTypes} from "@src/views/pages/eBay/constants/PoliciesType";

function AddReturnPolicyPage() {

    const navigate = useNavigate();
    const {translate, makeLocaleUrl} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState([]);
    const [globalError, setGlobalError] = useState({});
    const periodTypeOptions = PeriodTypeOptionsFactory(translate)
    const PayerOptions = PayerOptionsFactory(translate)

    const {id: accountId} = useParams()

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        resolver: yupResolver(addReturnPolicySchema(translate)),
    });


    const {mutate, isError, isLoading} = useMutation((data) => EBayPolicyService.create(data, accountId), {
        onSuccess: (data) => {
            showSuccessAlert({});
        },
        onError: (error) => {
            if (error.response.status === 500) {
                setGlobalError(
                    {
                        serveError: {errors: 'backend error'},
                    }
                );
            } else {
                const decodedErrors = JSON.parse(error.response.data.formErrors?.data.errors)
                setBackendErrors(decodedErrors);
            }
        },


    });


    const prepareDataAndSubmit = ({
                                      title,
                                      description,
                                      returnPeriod = {},
                                      returnShippingCostPayer,
                                      internationalOverride = {},
                                      returnPolicy,
                                      returnIntPolicy,
                                      marketPlace
                                  }) => {
        const objectToSend = {
            name: title,
            type: PoliciesTypes.returnPolicy,
            marketplaceId: marketPlace?.value,
            data: {
                description,
                returnPeriod: {
                    unit: 'DAY',
                    value: parseInt(returnPeriod?.value?.value)
                },
                internationalOverride: {
                    returnPeriod: {
                        unit: 'DAY',
                        value: parseInt(internationalOverride?.returnPeriod?.value?.value)
                    },
                    returnsAccepted: returnIntPolicy?.value === 'yes',
                    returnShippingCostPayer: internationalOverride?.returnShippingCostPayer?.value
                },
                returnShippingCostPayer: returnShippingCostPayer?.value,
                returnsAccepted: returnPolicy?.value === 'yes',
            }
        };

        mutate(objectToSend);
    };

    const goBack = () => {
        navigate(-1);
    };
    const returnPolicyValue = watch('returnPolicy') ?? 'no'
    const internationalReturnPolicyValue = watch('returnIntPolicy') ?? 'no'

    const formErrors = Object.keys(errors).length > 0 ? errors : backendErrors

    return (<>
        <BreadCrumbs
            title={"add-return-policy"} data={[]}
        />
        <Card className="p-5 bg-white">
            <div>
                <h3>{translate("ebay.policy.add.text-header")}</h3>
                <p>{translate("ebay.policy.add.text-sub-header")}</p>
                <hr/>
            </div>
            <div className="invoice-add-wrapper">
                <ErrorAlert isError={isError} errors={globalError}/>

                <form onSubmit={handleSubmit(prepareDataAndSubmit)}>
                    <Row className={"py-3"}>
                        {/*==============GENERAL=================*/}
                        <Col xs={12} md={12}>
                            <h4>{translate("ebay.forms.General")}</h4>
                            <hr/>
                        </Col>
                        <Col xs={12} md={4} className="mb-2">
                            <CustomControlledInputField
                                label={translate('ebay.forms.title')}
                                name="title"
                                control={control}
                                placeholder={translate('ebay.forms.title')}
                                errors={formErrors}
                            />
                        </Col>
                        <Col xs={12} md={4} className="mb-2">
                            <CustomControlledInputField
                                label={translate('forms.description')}
                                name="description"
                                control={control}
                                placeholder={translate('forms.description')}
                                errors={formErrors}
                            />
                        </Col>
                        <Col xs={12} md={4} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay.forms.marketPlace')}
                                name={"marketPlace"}
                                control={control}
                                options={marketPlaceOptions}
                                errors={formErrors}
                            />
                        </Col>

                        {/*==============DOMESTIC=================*/}
                        <Col xs={12} md={12}>
                            <h4>{translate('ebay.forms.Domestic-Returns')}</h4>
                            <hr/>
                        </Col>
                        <Col xs={12} md={12} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay.forms.return-policy')}
                                name={"returnPolicy"}
                                control={control}
                                options={options}
                                errors={formErrors}
                            />
                        </Col>
                        {
                            returnPolicyValue?.value === 'yes' &&
                            <>

                                <Col xs={12} md={6} className="mb-2">
                                    <CustomControlledDropdownField
                                        label={translate('ebay.forms.unit')}
                                        name={"returnPeriod.value"}
                                        control={control}
                                        options={periodTypeOptions}
                                        errors={formErrors}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <CustomControlledDropdownField
                                        label={translate('ebay.forms.payer')}
                                        name={"returnShippingCostPayer"}
                                        control={control}
                                        options={PayerOptions}
                                        errors={formErrors}
                                    />
                                </Col>
                            </>

                        }

                        {/*==============INTERNATIONAL=================*/}
                        <Col xs={12} md={12}>
                            <h4>{translate('ebay.forms.international-Returns')}</h4>
                            <hr/>
                        </Col>


                        <Col xs={12} md={12} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay.forms.int-return-policy')}
                                name={"returnIntPolicy"}
                                control={control}
                                options={options}
                                errors={formErrors}
                            />
                        </Col>
                        {
                            internationalReturnPolicyValue?.value === 'yes' &&
                            <>
                                <Col xs={12} md={6} className="mb-2">
                                    <CustomControlledDropdownField
                                        label={translate('ebay.forms.unit')}
                                        name={"internationalOverride.returnPeriod.value"}
                                        control={control}
                                        options={periodTypeOptions}
                                        errors={formErrors}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="mb-2">
                                    <CustomControlledDropdownField
                                        label={translate('ebay.forms.payer')}
                                        name={"internationalOverride.returnShippingCostPayer"}
                                        control={control}
                                        options={PayerOptions}
                                        errors={formErrors}
                                    />
                                </Col>
                            </>

                        }

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
    </>);
}

export default AddReturnPolicyPage;
