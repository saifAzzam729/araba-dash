import BreadCrumbs from "@components/breadcrumbs";
import {Button, Card, Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EBayPolicyService from "@src/common/services/EBayPoliciesService";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {
    addSellingPolicySchema,
    listingOptions,
    priceOptions,
    quantityOptions,
    vatOptions
} from "@src/views/pages/eBay/policies/selling/data";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {yupResolver} from "@hookform/resolvers/yup";
import {currencyOptions, marketPlaceOptions, PoliciesTypes} from "@src/views/pages/eBay/constants/PoliciesType";

function AddSellingPolicyPage() {

    const navigate = useNavigate();
    const {translate, makeLocaleUrl} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState([]);
    const [globalError, setGlobalError] = useState({});


    const {id: accountId} = useParams()

    const defaultValues = {
        format: {label: listingOptions[0].label, value: listingOptions[0].value},
        availableQuantity: {label: quantityOptions[0].label, value: quantityOptions[0].value},
        vatRate: {label: vatOptions[0].label, value: vatOptions[0].value},
        pricingSummary: {
            price: {
                value:
                    {
                        label: priceOptions[0].label, value: priceOptions[0].value
                    }
            }
        }
    };
    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
        setValue
    } = useForm({
        resolver: yupResolver(addSellingPolicySchema(translate)),
        defaultValues
    });


    const {mutate, isError, isLoading} = useMutation((data) => EBayPolicyService.create(data, accountId), {
        onSuccess: (data) => {
            showSuccessAlert({});
        }, onError: (error) => {
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
                                      format,
                                      availableQuantity,
                                      pricingSummary = {},
                                      title,
                                      tax = {},
                                      marketPlace

                                  }) => {
        const objectToSend = {
            name: title,
            type: PoliciesTypes.sellingPolicy,
            marketplaceId: marketPlace?.value,

            data: {
                sku: "test-J-item",

                format: format?.value,
                availableQuantity: availableQuantity?.value,
                pricingSummary: {
                    price: {
                        value: pricingSummary?.price?.value?.value,
                        currency: pricingSummary?.price?.currency?.value
                    }
                },
                tax: {
                    vatPercentage: tax?.vatPercentage
                }
            }

        }
        mutate(objectToSend);
    };

    const goBack = () => {
        navigate(-1);
    };

    const vatRateVal = watch('vatRate') ?? 'no'
    const formErrors = Object.keys(errors).length > 0 ? errors : backendErrors
    const marketVal = watch('marketPlace')?.value;

    useEffect(() => {
        const selectedOption = marketVal === 'EBAY_US' ? currencyOptions[0] : currencyOptions[1];
        setValue('pricingSummary.price.currency', {
            label: selectedOption?.label,
            value: selectedOption?.value
        });

    }, [marketVal]);

    return (<>
        <BreadCrumbs
            title={"add-selling-policy"} data={[]}
        />
        <Card className="p-5 bg-white">
            <ErrorAlert isError={isError} errors={globalError}/>
            <div>
                <h3>{translate("ebay-selling-policy.header")}</h3>
                <p>{translate("ebay-selling-policy.sub-header")}</p>
                <hr/>
            </div>
            <div className="invoice-add-wrapper">
                <form onSubmit={handleSubmit(prepareDataAndSubmit)}>
                    <Row className={"py-3"}>
                        {/*==============GENERAL=================*/}
                        <Col xs={12} md={12}>
                            <h4>{translate("ebay-selling-policy.forms.General")}</h4>
                            <hr/>
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                label={translate('ebay-selling-policy.forms.title')}
                                name="title"
                                control={control}
                                placeholder={translate('ebay-selling-policy.forms.title')}
                                errors={formErrors}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-selling-policy.forms.marketplace')}
                                name={"marketPlace"}
                                control={control}
                                options={marketPlaceOptions}
                                errors={formErrors}
                            />
                        </Col>

                        {/*==============How you want to sell =================*/}
                        <Col xs={12} md={12}>
                            <h4>{translate('ebay-selling-policy.forms.how')}</h4>
                            <hr/>
                        </Col>
                        <Col xs={12} md={12} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-selling-policy.forms.listing-type')}
                                name={"format"}
                                control={control}
                                rea
                                options={listingOptions}
                                errors={formErrors}
                                readOnly={true}
                            />
                        </Col>


                        {/*==============Quantity=================*/}
                        <Col xs={12} md={12}>
                            <h4>{translate('ebay-selling-policy.forms.quantity')}</h4>
                            <hr/>
                        </Col>

                        <Col xs={12} md={12} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-selling-policy.forms.quantity')}
                                name={"availableQuantity"}
                                control={control}
                                options={quantityOptions}
                                errors={formErrors}
                                readOnly={true}

                            />
                        </Col>

                        {/*==============taxation================*/}

                        <Col xs={12} md={12}>
                            <h4>{translate('ebay-selling-policy.forms.taxation')}</h4>
                            <hr/>
                        </Col>

                        <Col xs={12} md={12} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-selling-policy.forms.vatRate')}
                                name={"vatRate"}
                                control={control}
                                options={vatOptions}
                                errors={formErrors}

                            />
                        </Col>
                        {
                            vatRateVal.value === 'yes' &&

                            <Col xs={12} md={12} className="mb-2">
                                <CustomControlledInputField
                                    label={translate('ebay-selling-policy.forms.percentage')}
                                    name="tax.vatPercentage"
                                    control={control}
                                    placeholder={translate('ebay-selling-policy.forms.percentage')}
                                    errors={formErrors}

                                />
                            </Col>
                        }
                        {/*==============price=================*/}

                        <Col xs={12} md={12}>
                            <h4>{translate('ebay-selling-policy.forms.price')}</h4>
                            <hr/>
                        </Col>

                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-selling-policy.forms.price')}
                                name={"pricingSummary.price.value"}
                                control={control}
                                options={priceOptions}
                                errors={formErrors}
                                readOnly={true}

                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-selling-policy.forms.currency')}
                                name={"pricingSummary.price.currency"}
                                control={control}
                                options={currencyOptions}
                                errors={formErrors}
                                readOnly={true}
                                // key={marketVal}

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
    </>);
}

export default AddSellingPolicyPage;
