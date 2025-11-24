import { Controller } from "react-hook-form";
import { FormText, Label } from "reactstrap";
import AsyncSelect from "react-select/async";

const CustomControlledMultiAsyncSelectField = ({
	label,
	control,
	name,
	errors = {},
    getOptionsPromise,
}) => {

	return (
		<>
			<Label className="form-label" for="fullName">
				{label}
			</Label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
          return (
					<AsyncSelect
						{...field}
						isClearable
						defaultOptions
						placeholder={"No Items"}
						loadOptions={getOptionsPromise}
            isMulti
					/>
          )
        }}
			/>
			<FormText color="danger">{errors[name] && errors[name].message}</FormText>
		</>
	);
};

export default CustomControlledMultiAsyncSelectField;
