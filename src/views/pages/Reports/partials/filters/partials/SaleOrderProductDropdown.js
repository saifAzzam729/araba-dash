import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import {useEffect} from "react";
import useQueryParams from "@hooks/useQueryParams";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ProductsService from "@src/common/services/ProductsService";

export default function SaleOrderProductDropdownFilter() {

    const {control, setValue, formState: {errors}} = useFormContext();
    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()


    const promiseProductsOptions = (searchValue) => new Promise((resolve) => {
        ProductsService.getPagination({search: searchValue}).then((res) => {
            resolve(res.pagination.items.map((item) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            )
        })
    });

    function fetchSelectedProduct(productId) {
        ProductsService.getById(productId, {locale: 'en'}).then(({data: product}) => {
            setValue('itemProduct', {
                label: product.name,
                value: product.id
            })
        })
    }

    useEffect(() => {

        if (getQueryParams('itemProduct')) {
            fetchSelectedProduct(getQueryParams('itemProduct'));
        }

    }, []);


    return (
        <CustomControlledAsyncSelectField
            label={translate('filter.forms.itemProduct')}
            placeholder={translate('filter.forms.itemProduct')}
            name={"itemProduct"}
            control={control}
            getOptionsPromise={promiseProductsOptions}
            errors={errors}
        />
    )
}
