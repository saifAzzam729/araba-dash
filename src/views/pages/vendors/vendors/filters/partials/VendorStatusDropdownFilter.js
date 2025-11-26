import {useEffect} from "react";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import useQueryParams from "@hooks/useQueryParams";
import {useFormContext, useWatch} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {VENDOR_STATUS_OPTIONS, VENDOR_STATUS_VALUES} from "../../../constants";

export default function VendorStatusDropdownFilter() {

    const {control, setValue, formState: {errors}} = useFormContext();
    const {getQueryParams, toggleValueInQueryParam} = useQueryParams();
    const {translate} = useLocaleContext()

    const options = VENDOR_STATUS_OPTIONS.map(status => ({
        label: translate(status.labelKey),
        value: status.value
    }));

    function extractSelectedStatusFromOptions(statusValue) {
        const found = options.find(opt => opt.value === statusValue);
        if (found) {
            setValue('status', found);
        }
    }

    const statusValue = useWatch({control, name: 'status'});

    useEffect(() => {
        if (typeof statusValue === 'string' && statusValue) {
            extractSelectedStatusFromOptions(statusValue);
        }
    }, [statusValue]);

    useEffect(() => {
        const statusParam = getQueryParams('status');
        if (statusParam) {
            extractSelectedStatusFromOptions(statusParam);
        } else {
            toggleValueInQueryParam('status', VENDOR_STATUS_VALUES.ACTIVE);
            extractSelectedStatusFromOptions(VENDOR_STATUS_VALUES.ACTIVE);
        }
    }, []);

    return (
        <CustomControlledDropdownField
            label={translate('filter.forms.status')}
            name={"status"}
            placeholder={translate('filter.forms.status')}
            control={control}
            errors={errors}
            options={options}
            isClearable={true}
        />
    )
}
