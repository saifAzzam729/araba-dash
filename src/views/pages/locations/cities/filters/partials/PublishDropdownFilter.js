import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {useFormContext} from "react-hook-form";
import useQueryParams from "@hooks/useQueryParams";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useEffect} from "react";

export default function PublishDropdownFilter() {
    const publishOptions = [
        {label: 'true', value: 'true'},
        {label: 'false', value: 'false'}
    ];

    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()

    const {
        control,
        setValue,
        formState: {errors}
    } = useFormContext();

    useEffect(() => {
        const publishFromQuery = getQueryParams('publish');
        if (
            publishFromQuery &&
            (publishFromQuery === 'true' || publishFromQuery === 'false')
        ) {
            const foundOpt = publishOptions.find(opt => opt.value === publishFromQuery);
            setValue('publish', foundOpt)
        }
    }, [getQueryParams]);

    return (
        <CustomControlledDropdownField
            label={translate('filter.forms.publish')}
            name={"publish"}
            control={control}
            errors={errors}
            options={publishOptions}
            isClearable={true}
        />
    )
}
