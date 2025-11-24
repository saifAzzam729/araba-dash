import { Controller } from "react-hook-form";
import { Label, Input, FormText, FormFeedback } from "reactstrap";
import _ from "lodash";
import React, { useState } from 'react';



const ControlledCounterInputField = ({
										 label,
										 control,
										 name,
										 placeholder = "",
										 errors = {},
										 type = "text",
										 acceptsPositiveOnly = false,
										 acceptsDecimals = false,
										 percentageValidation = false,
										 minValue = null,
										 style = {},
									 }) => {
	const fieldConditionalProps = {
		step: acceptsDecimals ? "0.01" : "1",
		max: percentageValidation ? "100" : undefined,
		min: (acceptsPositiveOnly || minValue !== null) ? (acceptsPositiveOnly ? "0" : minValue) : undefined,
	};

	const invalidityChecker = (value) => {
		if (acceptsPositiveOnly) {
			return value < 0;
		}
		if (percentageValidation) {
			return value < 0 || value > 100;
		}
		return false; // All is valid
	};

	const foundError = _.get(errors, name);

	return (
		<>
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					const [charCount, setCharCount] = useState(field.value?.length || 0);

					const handleChange = (e) => {
						const value = e.target.value;
						setCharCount(value.length);
						field.onChange(value);
					};

					return (
						<>
							<Label className="form-label" for={name}>
								{`${label} / (${charCount})`}
							</Label>
							<Input
								type={type}
								id={name}
								name={name}
								placeholder={placeholder ?? ""}
								invalid={foundError || invalidityChecker(field.value)}
								value={field.value || ""}
								onChange={handleChange}
								{...fieldConditionalProps}
								style={style}
							/>
						</>
					);
				}}
			/>
			<FormText color="danger">{foundError && foundError.message}</FormText>

			{percentageValidation && (
				<FormFeedback>
					The number must be between 0 and 100.
				</FormFeedback>
			)}
		</>
	);
};

export default ControlledCounterInputField;
