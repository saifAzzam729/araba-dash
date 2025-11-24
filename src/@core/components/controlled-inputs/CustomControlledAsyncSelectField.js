import { Controller } from "react-hook-form";
import { FormText, Label } from "reactstrap";
import AsyncSelect from "react-select/async";

const CustomControlledAsyncSelectField = ({
	label,
	control,
	name,
	errors = {},
    getOptionsPromise,
											  placeholder = "No Items"
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
					<AsyncSelect
						{...field}
						isClearable
						defaultOptions
						placeholder={placeholder}
						loadOptions={getOptionsPromise}
					/>
				)}
			/>
			<FormText color="danger">{errors[name] && errors[name].message}</FormText>
		</>
	);
};

export default CustomControlledAsyncSelectField;
