import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import UsersService from "@src/common/services/UsersService";
import {useEffect} from "react";
import useQueryParams from "@hooks/useQueryParams";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import PaymentMethodsService from "@src/common/services/PaymentMethodsService";

export default function SaleOrderPaymentDropdownFilter() {

    const {control, setValue, formState: {errors}} = useFormContext();
    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()


    const promiseMethodsOptions = (searchValue) => new Promise((resolve) => {
        PaymentMethodsService.getPagination({search: searchValue}).then((res) => {
            resolve(res.pagination.items.map((item) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
            )
        })
    });

    function fetchSelectedMethod(methodId) {
        PaymentMethodsService.getById(methodId).then(({data: method}) => setValue('paymentProvideCode', {label: method.name, value: method.id}))
    }

    useEffect(() => {

        // if (getQueryParams('paymentProvideCode')) {
        //     fetchSelectedMethod(getQueryParams('paymentProvideCode'));
        // }

    }, []);


    return (
        <CustomControlledAsyncSelectField
            label={translate('filter.forms.paymentProvideCode')}
            placeholder={translate('filter.forms.paymentProvideCode')}
            name={"paymentProvideCode"}
            control={control}
            getOptionsPromise={promiseMethodsOptions}
            errors={errors}
        />
    )
}
