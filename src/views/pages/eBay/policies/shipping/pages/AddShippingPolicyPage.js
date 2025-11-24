import {Button, Card, Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useMutation} from "react-query";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import EBayPoliciesService from "@src/common/services/EBayPoliciesService";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {addShippingPolicySchema, timeOptions} from "@src/views/pages/eBay/policies/shipping/data";
import {yupResolver} from "@hookform/resolvers/yup";
import {marketPlaceOptions, PoliciesTypes} from "@src/views/pages/eBay/constants/PoliciesType";
import DomesticShippingSection from "@src/views/pages/eBay/policies/shipping/pages/DomesticShippingSection";
import InternationalShippingSection from "@src/views/pages/eBay/policies/shipping/pages/InternationalShippingSection";

function AddShippingPolicyPage() {

    const navigate = useNavigate();
    const {translate, makeLocaleUrl} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState([]);
    const [showInternationalChildren, setShowInternationalChildren] = useState(false)
    const [globalError, setGlobalError] = useState({})
    const {id: accountId} = useParams()
    const [currencyState, setCurrencyState] = useState('')

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
        setValue

    } = useForm({
        resolver: yupResolver(addShippingPolicySchema(translate)),

    });


    const {mutate, isError, isLoading} = useMutation((data) => EBayPoliciesService.create(data, accountId), {
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
                                      title,
                                      shippingOptions = {},
                                      handlingTime = {},
                                      marketPlace,
                                      domesticReturns,
                                      internationalReturns
                                  }) => {
        const objectToSend = {
            name: title,
            type: PoliciesTypes.shippingPolicy,
            marketplaceId: marketPlace.value,

            data: {
                handlingTime: {
                    unit: "DAY",
                    value: handlingTime?.value?.value
                },

                shippingOptions: [
                    {
                        costType: shippingOptions[0]?.costType?.value ?? 'NOT_SPECIFIED',
                        optionType: "DOMESTIC",
                        shippingServices: domesticReturns.map((service) => {
                            return {
                                freeShipping: service.mode?.value,
                                shippingServiceCode: service.shippingServiceCode?.value,
                                ...(service.mode?.value === false && {
                                    shippingCost: {
                                        currency: service.currency,
                                        value: service.cost
                                    }
                                })
                            };
                        })
                    }
                ]
            }
        };

        if (showInternationalChildren && internationalReturns.length > 0) {
            objectToSend.data.shippingOptions.push({
                costType: shippingOptions[1]?.costType?.value,
                optionType: "INTERNATIONAL",
                shippingServices: internationalReturns.map((service) => {
                    return {
                        freeShipping: service.mode?.value,
                        shippingServiceCode: service.shippingServiceCode?.value,
                        shipToLocations: {
                            regionIncluded: [{regionName: "Worldwide"}]
                        },
                        ...(service.mode?.value === false && {
                            shippingCost: {
                                currency: service.currency,
                                value: service.cost
                            }
                        })
                    };
                })
            });
        }

        mutate(objectToSend);

    };


    const goBack = () => {
        navigate(-1);
    };


    const formErrors = Object.keys(errors).length > 0 ? errors : backendErrors


    return (<>

        <Card className="p-5 bg-white">
            <div>
                <h3>{translate("ebay-ship.header")}</h3>
                <p>{translate("ebay-ship.sub-header")}</p>
                <hr/>
            </div>
            <div className="invoice-add-wrapper">
                <form onSubmit={handleSubmit(prepareDataAndSubmit)}>
                    <ErrorAlert isError={isError} errors={globalError}/>
                    <Row className={"py-3 align-items-center"}>
                        {/*==============GENERAL=================*/}
                        <Col xs={12} md={12}>
                            <h4>{translate("ebay-ship.forms.General")}</h4>
                            <hr/>
                        </Col>
                        <Col xs={12} md={4} className="mb-2">
                            <CustomControlledInputField
                                label={translate('ebay-ship.forms.title')}
                                name="title"
                                control={control}
                                placeholder={translate('ebay-ship.forms.title')}
                                errors={formErrors}
                            />
                        </Col>
                        <Col xs={12} md={4} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-ship.forms.time')}
                                name={"handlingTime.value"}
                                control={control}
                                options={timeOptions}
                                errors={formErrors}
                            />
                        </Col>

                        <Col xs={12} md={4} className="mb-2">
                            <CustomControlledDropdownField
                                label={translate('ebay-ship.forms.marketPlace')}
                                name={"marketPlace"}
                                control={control}
                                options={marketPlaceOptions}
                                errors={formErrors}
                            />
                        </Col>
                        <hr/>

                        {/*==============DOMESTIC=================*/}
                        <DomesticShippingSection control={control}
                                                 errors={errors}
                                                 backendErrors={backendErrors}
                                                 watch={watch}
                                                 setValue={setValue}
                                                 currency={currencyState}
                        />


                        {/*==============INTERNATIONAL=================*/}
                        <InternationalShippingSection
                            translate={translate}
                            control={control}
                            errors={errors}
                            backendErrors={backendErrors}
                            watch={watch}
                            setValue={setValue}
                            showInternationalChildren={showInternationalChildren}
                            setShowInternationalChildren={setShowInternationalChildren}
                        />
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

export default AddShippingPolicyPage;
