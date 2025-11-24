import {useQuery} from "react-query";
import OptionsService from "@src/common/services/OptionsService";
import {useEffect, useState} from "react";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import useQueryParams from "@hooks/useQueryParams";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import preferredHomePageLocalService from "@src/common/services/PreferredHomePageLocalService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

export default function SaleOrderStatusDropdownFilter() {

    const {control, setValue, formState: {errors}} = useFormContext();

    const [saleOrderStatusOptions, setSaleOrderStatusOptions] = useState([]);
    const {preferredTableContentLocale} = useSettingsUiContext();


    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()

    useQuery(
        ['sale-order-options-list'],
        () => OptionsService.getSaleOrdersStatus({
            locale: preferredTableContentLocale
        }), {
            onSuccess: ({data}) => {
                setSaleOrderStatusOptions(data)
            }
        }
    )

    function extractSelectedStatusFromOptions(statusValue) {
        const found = saleOrderStatusOptions.find(opt => opt.value === statusValue);
        if (found) {
            setValue('status', found);
        }
    }

    useEffect(() => {

        if (getQueryParams('status')) {
            extractSelectedStatusFromOptions(getQueryParams('status'));
        }

    }, [saleOrderStatusOptions]);


    return (
        <CustomControlledDropdownField
            label={translate('filter.forms.status')}
            name={"status"}
            placeholder={translate('filter.forms.status')}
            control={control}
            errors={errors}
            options={saleOrderStatusOptions}
            isClearable={true}
        />
    )

}
