import FilterAccordion from "@components/filter-accordion";
import {FormProvider, useForm} from "react-hook-form";
import useQueryParams from '@hooks/useQueryParams'
import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import ProductQuantity from "./partials/ProductQuantity";
import ProductSku from "./partials/ProductSku";

export default function ProductsFiltersAccordion() {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const {
        removeArrayOfQueryParams, getQueryParams, isParamsContainAnyOf, toggleValueInQueryParam,
    } = useQueryParams();


    const defaultValuesEmptyObject = {
        quantity: '',
        sku: '',
    };
    const FILTERS_KEYS_ARRAY = Object.keys(defaultValuesEmptyObject);

    const formMethods = useForm({
        defaultValues: {...defaultValuesEmptyObject}
    });
    const onSubmit = (data) => {
        const {
            quantity,
            sku
        } = data;
       
        toggleValueInQueryParam('quantity', quantity ? quantity : null);
        toggleValueInQueryParam('sku', sku ? sku : null);

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
                    <Row className={' align-items-center'}>
                        <Col xs={6 } className={'mt-2'}>
                            <ProductQuantity/>
                        </Col> 
                        <Col xs={6 } className={'mt-2'}>
                            <ProductSku/>
                        </Col>
                    </Row>
                </FilterAccordion>
            </form>
        </FormProvider>

    )
}
