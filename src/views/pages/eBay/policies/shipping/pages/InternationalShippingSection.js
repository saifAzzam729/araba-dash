import {Button, Col, FormGroup, Input, Row} from "reactstrap";
import {useFieldArray} from "react-hook-form";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CheckFieldsVisibility from "@src/views/pages/eBay/policies/shipping/partials/CheckFieldsVisibility";
import {Trash} from "react-feather";
import {
    intShippingServiceDeOptions,
    intShippingServiceUsOptions,
    options,
    ShippingModeOptions
} from "@src/views/pages/eBay/policies/shipping/data";
import {currencyOptions} from "@src/views/pages/eBay/constants/PoliciesType";
import {useEffect} from "react";

function InternationalShippingSection({
                                          control,
                                          errors,
                                          backendErrors,
                                          watch,
                                          setValue,
                                          showInternationalChildren,
                                          setShowInternationalChildren
                                      }) {
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'internationalReturns',
    });

    const marketVal = watch('marketPlace')?.value;
    const intServicesBasedOnMarketPlace = marketVal === 'EBAY_US' ? intShippingServiceUsOptions : intShippingServiceDeOptions;
    const formErrors = Object.keys(errors).length > 0 ? errors : backendErrors;

    const intCostTypeValue = watch('shippingOptions.1.costType')?.value;
    const isFreeInternational = (index) => {
        return watch(`internationalReturns[${index}].mode`)?.value;
    };
    const selectedCurrency = marketVal === 'EBAY_US' ? currencyOptions[0] : currencyOptions[1];

    useEffect(() => {
        fields.forEach((field, index) => {
            setValue(`internationalReturns[${index}].currency`, selectedCurrency?.label);
        });
    }, [marketVal]);

    return (
        <>
            <Row className={'p-2 '}>
                <Col xs={12} md={6}>
                    <h4>International Returns</h4>
                </Col>
                <Col xs={12} md={6}>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={showInternationalChildren}
                            onClick={() => setShowInternationalChildren(!showInternationalChildren)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <hr/>
            <CheckFieldsVisibility showChildren={showInternationalChildren}>
                <Col xs={12} md={6} className="mb-2">
                    <CustomControlledDropdownField
                        label="Cost Type"
                        name={"shippingOptions.1.costType"}
                        control={control}
                        options={options}
                        errors={formErrors}
                    />
                </Col>
                {intCostTypeValue === 'FLAT_RATE' && (
                    <Col md={6}>
                        <Button color="primary"
                                onClick={() => {
                                    const selectedCurrency = marketVal === 'EBAY_US' ? currencyOptions[0].label : currencyOptions[1].label;
                                    append({
                                        shippingServiceCode: "",
                                        mode: "",
                                        cost: "",
                                        currency: selectedCurrency
                                    });
                                }}>
                            {translate('ebay.common.add-more-shipping')}
                        </Button>
                    </Col>
                )}
                {fields.map((item, index) => (
                    <Row key={item.id} className="mb-3 align-items-center">
                        {intCostTypeValue === 'FLAT_RATE' && (
                            <>
                                <Col xs={12} md={3} className="mb-2">
                                    <CustomControlledDropdownField
                                        label="Shipping Service"
                                        name={`internationalReturns[${index}].shippingServiceCode`}
                                        control={control}
                                        options={intServicesBasedOnMarketPlace}
                                        errors={formErrors}
                                    />
                                </Col>
                                <Col xs={12} md={3} className="mb-2">
                                    <CustomControlledDropdownField
                                        label="Mode"
                                        name={`internationalReturns[${index}].mode`}
                                        control={control}
                                        options={ShippingModeOptions}
                                        errors={formErrors}
                                    />
                                </Col>
                                <Col xs={12} md={2} className="mb-2">
                                    <CustomControlledInputField
                                        label="Cost"
                                        name={`internationalReturns[${index}].cost`}
                                        control={control}
                                        placeholder="Enter Cost"
                                        errors={formErrors}
                                        type="number"
                                        readOnly={isFreeInternational(index)}
                                    />
                                </Col>
                                <Col xs={12} md={2} className="mb-2">
                                    <CustomControlledInputField
                                        label="Currency"
                                        name={`internationalReturns[${index}].currency`}
                                        control={control}
                                        readOnly={true}
                                        placeholder="Currency"
                                        errors={formErrors}
                                    />
                                </Col>
                                <Col xs={12} md={1} className="d-flex align-items-center">
                                    <Button
                                        color="danger"
                                        onClick={() => remove(index)}
                                        outline
                                        size="sm"
                                    >
                                        <Trash size={14}/>
                                    </Button>
                                </Col>
                            </>
                        )}
                    </Row>
                ))}
            </CheckFieldsVisibility>
        </>
    );
}

export default InternationalShippingSection;
