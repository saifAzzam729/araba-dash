import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledDatePickerField from "../../../../../../@core/components/controlled-inputs/CustomControlledDatePickerField";

export default function FromDateFilter() {

    const {control, formState: {errors}} = useFormContext();
    const {translate} = useLocaleContext()


    return (
      <CustomControlledDatePickerField
        label={translate("filter.forms.fromDate")}
        name="fromDate"
        control={control}
        errors={errors}
      />
    );
}
