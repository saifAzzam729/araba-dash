import FilterAccordion from "@components/filter-accordion";
import {FormProvider, useForm} from "react-hook-form";
import useQueryParams from '@hooks/useQueryParams'
import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import SaleOrderUserDropdownFilter from "@src/views/pages/eBay/orders/filters/partials/SaleOrderUserDropdownFilter";
import SaleOrderStatusDropdownFilter from "@src/views/pages/eBay/orders/filters/partials/SaleOrderStatusDropdownFilter";
import SaleOrderProductDropdownFilter from "@src/views/pages/eBay/orders/filters/partials/SaleOrderProductDropdown";
import SaleOrderSearchField from "@src/views/pages/eBay/orders/filters/partials/SaleOrderSearchField";

export default function SaleOrdersFiltersAccordion() {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const {
        removeArrayOfQueryParams, getQueryParams, isParamsContainAnyOf, toggleValueInQueryParam,
    } = useQueryParams();


    const defaultValuesEmptyObject = {
        user: '',
        status: '',
        sort: '',
        paymentProvideCode: '',
        refNumber: '',
        shipping: ' ',
        totalPriceFrom: '',
        totalPriceTo: '',
        itemProduct: '',
        search: '',
    };
    const FILTERS_KEYS_ARRAY = Object.keys(defaultValuesEmptyObject);

    const formMethods = useForm({
        defaultValues: {...defaultValuesEmptyObject}
    });
    const onSubmit = (data) => {

        const {
          user,
          status,
          paymentProvideCode,
        //   refNumber,
        //   shipping,
          totalPriceFrom,
          totalPriceTo,
          itemProduct,
          sort,
          ebayOrderId,
          search,
        } = data;


        toggleValueInQueryParam('user', user ? user.value : null);
        toggleValueInQueryParam('status', status ? status.value:null);
        toggleValueInQueryParam('sort', sort ? sort.value : null);
        toggleValueInQueryParam('paymentProvideCode', paymentProvideCode ? paymentProvideCode.label : null);
        // toggleValueInQueryParam('refNumber', refNumber ? refNumber : null);
        // toggleValueInQueryParam('shipping', shipping ? shipping.value : null);
        toggleValueInQueryParam('totalPriceFrom', totalPriceFrom ? totalPriceFrom.value : null);
        toggleValueInQueryParam('totalPriceTo', totalPriceTo ? totalPriceTo.value : null);
        toggleValueInQueryParam('itemProduct', itemProduct ? itemProduct.value : null);
        toggleValueInQueryParam("search", search || null);
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
            <Row className={" align-items-center"}>
                <Col xs={6}  className="mb-1">
                    <SaleOrderSearchField />
                </Col>
              <Col xs={6} className="mb-1">
                <SaleOrderStatusDropdownFilter />
              </Col>
              <Col xs={6} className="mb-1">
                <SaleOrderUserDropdownFilter />
              </Col>
              <Col xs={6} className="mb-1">
                <SaleOrderProductDropdownFilter />
              </Col>

            </Row>
          </FilterAccordion>
        </form>
      </FormProvider>
    );
}
