import FilterAccordion from "@components/filter-accordion";
import {FormProvider, useForm} from "react-hook-form";
import useQueryParams from '@hooks/useQueryParams'
import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import SaleOrderStatusDropdownFilter from "@src/views/pages/sale-orders/filters/partials/SaleOrderStatusDropdownFilter";
import SaleOrderUserDropdownFilter from "@src/views/pages/sale-orders/filters/partials/SaleOrderUserDropdownFilter";
import SaleOrderPaymentDropdownFilter from "@src/views/pages/sale-orders/filters/partials/SaleOrderPaymentDropdown";
import SaleOrderProductDropdownFilter from "@src/views/pages/sale-orders/filters/partials/SaleOrderProductDropdown";

export default function SaleOrdersFiltersAccordion() {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const {
        removeArrayOfQueryParams, getQueryParams, isParamsContainAnyOf, toggleValueInQueryParam,
    } = useQueryParams();


    const defaultValuesEmptyObject = {
        user: '',
        status: '',
        paymentProvideCode: '',
        refNumber: '',
        shipping: ' ',
        totalPriceFrom: '',
        totalPriceTo: '',
        itemProduct: ''
    };
    const FILTERS_KEYS_ARRAY = Object.keys(defaultValuesEmptyObject);

    const formMethods = useForm({
        defaultValues: {...defaultValuesEmptyObject}
    });
    const onSubmit = (data) => {
        console.log(data, '=')

        const {user, status, paymentProvideCode, refNumber, shipping, totalPriceFrom, totalPriceTo, itemProduct} = data;
        toggleValueInQueryParam('user', user ? user.value : null);
        toggleValueInQueryParam('status', status ? status.value : null);
        toggleValueInQueryParam('paymentProvideCode', paymentProvideCode ? paymentProvideCode.label : null);
        toggleValueInQueryParam('refNumber', refNumber ? refNumber : null);
        toggleValueInQueryParam('shipping', shipping ? shipping.value : null);
        toggleValueInQueryParam('totalPriceFrom', totalPriceFrom ? totalPriceFrom.value : null);
        toggleValueInQueryParam('totalPriceTo', totalPriceTo ? totalPriceTo.value : null);
        toggleValueInQueryParam('itemProduct', itemProduct ? itemProduct.value : null);
    }
    const onClear = () => {
        removeArrayOfQueryParams(FILTERS_KEYS_ARRAY);
        formMethods.reset({...defaultValuesEmptyObject})
    }


    useEffect(() => {

        if (isParamsContainAnyOf(FILTERS_KEYS_ARRAY)) {

            const initalObjectFromQueryParams = FILTERS_KEYS_ARRAY.reduce((acc, key) => {
                return {...acc, [key]: getQueryParams(key)};
            }, {});
            formMethods.reset(initalObjectFromQueryParams)
            setIsFilterDropdownOpen(true)
        }

    }, []);


    return (
        <FormProvider {...formMethods}>

            <form onSubmit={formMethods.handleSubmit(onSubmit)}>


                <FilterAccordion isOpen={isFilterDropdownOpen} onClear={onClear}>
                    <Row>
                        <Col xs={6}>
                            <SaleOrderUserDropdownFilter/>
                        </Col>
                        <Col xs={6}>
                            <SaleOrderStatusDropdownFilter/>
                        </Col>
                        <Col xs={6}>
                            <SaleOrderProductDropdownFilter/>
                        </Col>
                        <Col xs={6}>
                            <SaleOrderPaymentDropdownFilter/>
                        </Col>
                        {/*<Col xs={6}>*/}
                        {/*    <SaleOrderRefNumberDropdownFilter/>*/}
                        {/*</Col>*/}
                    </Row>
                </FilterAccordion>
            </form>
        </FormProvider>

    )
}
