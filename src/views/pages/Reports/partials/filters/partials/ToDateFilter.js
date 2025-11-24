import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledDatePickerField from "../../../../../../@core/components/controlled-inputs/CustomControlledDatePickerField";

export default function ToDateFilter() {
  const {
    formState: { errors },
    control
  } = useFormContext();
  const { translate } = useLocaleContext();

  return (
    <CustomControlledDatePickerField
      name="toDate"
      label={translate("filter.forms.toDate")}
      control={control}
      errors={errors}
    />
  );
}
