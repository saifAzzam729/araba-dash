import { Controller } from "react-hook-form";
import { FormText, Label } from "reactstrap";
import Select from "react-select";

const CustomControlledMultiDropdownField = ({
	label,
	control,
	name,
	errors = {},
	options = [], // [{label, value}]
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
					// <Input type="select" id="type" name="type" {...field}>
					// 	{options.map((opt) => (
					// 		<option value={opt.value}>{opt.label}</option>
					// 	))}
					// </Input>
					<Select
						isClearable={false}
						isSearchable={false}
						classNamePrefix="select"
						options={options}
						getOptionValue={(option) => option.value}
						{...field}
						isMulti
					/>
				)}
			/>
			<FormText color="danger">{errors[name] && errors[name].message}</FormText>
		</>
	);
};

export default CustomControlledMultiDropdownField;
