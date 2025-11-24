import {Button, Col, FormGroup, Input, Row} from "reactstrap";
import {useFieldArray} from "react-hook-form";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CheckFieldsVisibility from "@src/views/pages/eBay/policies/shipping/partials/CheckFieldsVisibility";
import {Trash} from "react-feather";
import {
    options,
    ShippingModeOptions,
    ShippingServiceDeOptions,
    ShippingServiceUsOptions
} from "@src/views/pages/eBay/policies/shipping/data";
import {useEffect, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {currencyOptions} from "@src/views/pages/eBay/constants/PoliciesType";

function DomesticShippingSection({control, errors, backendErrors, watch, setValue}) {
    const {translate} = useLocaleContext()
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'domesticReturns',
    });

    const [showDomesticChildren, setShowDomesticChildren] = useState(false);

    const marketVal = watch('marketPlace')?.value;
    const servicesBasedOnMarketPlace = marketVal === 'EBAY_US' ? ShippingServiceUsOptions : ShippingServiceDeOptions;
    const formErrors = Object.keys(errors).length > 0 ? errors : backendErrors;

    const costTypeValue = watch('shippingOptions.0.costType')?.value;
    const isFree = (index) => {
        return watch(`domesticReturns[${index}].mode`)?.value
    }
    const selectedCurrency = marketVal === 'EBAY_US' ? currencyOptions[0] : currencyOptions[1];
    useEffect(() => {
        fields.forEach((field, index) => {
            setValue(`domesticReturns[${index}].currency`, selectedCurrency?.label);
        });
    }, [marketVal]);
    return (
        <>
            <Row className={'p-2 '}>
                <Col xs={12} md={6}>
                    <h4>Domestic Returns</h4>
                </Col>
                <Col xs={12} md={6}>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={showDomesticChildren}
                            onClick={() => setShowDomesticChildren(!showDomesticChildren)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <hr/>
            <CheckFieldsVisibility showChildren={showDomesticChildren}>
                <Col xs={12} md={6} className="mb-2">
                    <CustomControlledDropdownField
                        label={translate('ebay-ship.forms.costType')}
                        name={"shippingOptions.0.costType"}
                        control={control}
                        options={options}
                        errors={formErrors}
                    />
                </Col>
                {
                    costTypeValue === 'FLAT_RATE' &&
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
                }
                {fields.map((item, index) => (
                    <Row key={item.id} className="mb-3 align-items-center">

                        {costTypeValue === 'FLAT_RATE' && (
                            <>
                                <Col xs={12} md={3} className="mb-2">
                                    <CustomControlledDropdownField
                                        label="Shipping Service"
                                        name={`domesticReturns[${index}].shippingServiceCode`}
                                        control={control}
                                        options={servicesBasedOnMarketPlace}
                                        errors={formErrors}
                                    />
                                </Col>
                                <Col xs={12} md={3} className="mb-2">
                                    <CustomControlledDropdownField
                                        label="Mode"
                                        name={`domesticReturns[${index}].mode`}
                                        control={control}
                                        options={ShippingModeOptions}
                                        errors={formErrors}
                                    />
                                </Col>
                                <Col xs={12} md={2} className="mb-2">
                                    <CustomControlledInputField
                                        label="Cost"
                                        name={`domesticReturns[${index}].cost`}
                                        control={control}
                                        placeholder="Enter Cost"
                                        errors={formErrors}
                                        type="number"
                                        readOnly={isFree(index)}
                                    />
                                </Col>
                                <Col xs={12} md={2} className="mb-2">
                                    <CustomControlledInputField
                                        label="Currency"
                                        name={`domesticReturns[${index}].currency`}
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

export default DomesticShippingSection;
