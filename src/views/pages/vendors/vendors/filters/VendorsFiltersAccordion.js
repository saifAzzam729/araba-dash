import FilterAccordion from "@components/filter-accordion";
import {FormProvider, useForm} from "react-hook-form";
import useQueryParams from '@hooks/useQueryParams'
import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import VendorStatusDropdownFilter from "./partials/VendorStatusDropdownFilter";

export default function VendorsFiltersAccordion() {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(true);

    const {
        removeArrayOfQueryParams, getQueryParams, isParamsContainAnyOf, toggleValueInQueryParam,
    } = useQueryParams();


    const defaultValuesEmptyObject = {
        status: '',
    };
    const FILTERS_KEYS_ARRAY = Object.keys(defaultValuesEmptyObject);

    const formMethods = useForm({
        defaultValues: {...defaultValuesEmptyObject}
    });
    const onSubmit = (data) => {
        const {status} = data;
        const statusValue = status && status.value ? status.value : status;
        toggleValueInQueryParam('status', statusValue);
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
                            <VendorStatusDropdownFilter/>
                        </Col>
                    </Row>
                </FilterAccordion>
            </form>
        </FormProvider>

    )
}
