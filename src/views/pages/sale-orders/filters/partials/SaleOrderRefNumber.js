import useQueryParams from "@hooks/useQueryParams";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";

export default function SaleOrderRefNumberDropdownFilter() {

    const {control, setValue, register, formState: {errors}} = useFormContext();
    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()


    return (
        <UncontrolledTextInput
            name="refNumber"
            label={translate("filter.forms.refNumber")}
            register={register}
            errorMessage={errors && errors.translations?.en?.name?.message}
        />
    )
}
