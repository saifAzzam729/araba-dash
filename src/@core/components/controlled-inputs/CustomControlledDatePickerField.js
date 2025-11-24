import { Controller } from "react-hook-form";
import { FormText, Label } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
const CustomControlledDatePickerField = ({
	label,
	control,
	name,
	errors = {},
}) => {
	return (
		<>
			<Label className="form-label" for="fullName">
				{label}
			</Label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Flatpickr className="form-control bg-white" id={name} {...field} />
				)}
			/>
			<FormText color="danger">{errors[name] && errors[name].message}</FormText>
		</>
	);
};

export default CustomControlledDatePickerField;
