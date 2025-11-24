import {Controller} from "react-hook-form";
import {FormFeedback, FormText, Input, Label} from "reactstrap";
import _ from "lodash";

const CustomControlledInputField = ({
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
                                        readOnly = false
                                    }) => {

    const fieldConditionalProps = {
        // min: acceptsPositiveOnly ? '0' : undefined,
        step: acceptsDecimals ? '0.00001' : '1',
        max: percentageValidation ? '100' : undefined, // min: minValue ? minValue : undefined
        min: (acceptsPositiveOnly || minValue !== null) ? (acceptsPositiveOnly ? '0' : minValue) : undefined
    }

    const invalidityChecker = (value) => {
        if (acceptsPositiveOnly) {
            return value < 0
        }
        if (percentageValidation) {
            return (value < 0 || value > 100)
        }
        return false; // all is valid
    }


    const foundError = _.get(errors, name);


    return (<>
        <Label className="form-label" for="fullName">
            {label}
        </Label>
        <Controller
            name={name}
            control={control}
            render={({field}) => (<Input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder ?? ""}
                invalid={foundError && true || invalidityChecker(field.value)}
                {...field}
                {...fieldConditionalProps}
                style={style}
                readOnly={readOnly}
                onWheel={(e) => e.target.blur()}
            />)}
        />
        <FormText color="danger">{foundError && foundError.message || foundError}</FormText>

        {percentageValidation && <FormFeedback>
            The number must be between 0 and 100.
        </FormFeedback>}

    </>);
};
export default CustomControlledInputField;
