import FilterAccordion from "@components/filter-accordion";
import {FormProvider, useForm} from "react-hook-form";
import useQueryParams from '@hooks/useQueryParams'
import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import PublishDropdownFilter from "@src/views/pages/locations/states-crud/filters/partials/PublishDropdownFilter";
import CountryDropdownFilter from "@src/views/pages/locations/states-crud/filters/partials/CountryDropdownFilter";

export default function StatesFiltersAccordion() {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const {
        removeArrayOfQueryParams,
        getQueryParams,
        isParamsContainAnyOf,
        toggleValueInQueryParam,
    } = useQueryParams();

    const defaultValuesEmptyObject = {
        country: '',
        publish: '',
    };
    const FILTERS_KEYS_ARRAY = Object.keys(defaultValuesEmptyObject);

    const formMethods = useForm({
        defaultValues: {...defaultValuesEmptyObject}
    });

    const onSubmit = (data) => {
        const {country, publish} = data;
        toggleValueInQueryParam('country', country ? country.value : null);
        toggleValueInQueryParam('publish', publish ? publish.value : null);
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
                        <Col xs={4}>
                            <CountryDropdownFilter />
                        </Col>
                        <Col xs={4}>
                            <PublishDropdownFilter />
                        </Col>
                    </Row>
                </FilterAccordion>
            </form>
        </FormProvider>

    )
}
