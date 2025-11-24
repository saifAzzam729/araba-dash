import {Controller} from "react-hook-form";
import {FormText, Label} from "reactstrap";
import Select from "react-select";

const CustomControlledDropdownField = ({
                                           label,
                                           control,
                                           name,
                                           errors = {},
                                           options = [], // [{label, value}],
                                           isClearable = false,
                                           isRtL = false,
                                           placeholder = 'select',
                                           readOnly = false
                                       }) => {


    return (
        <>
            <Label className="form-label" for="fullName">
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <Select
                        styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                        menuPortalTarget={document.body}
                        isClearable={isClearable}
                        isSearchable={false}
                        classNamePrefix="select"
                        options={options}
                        getOptionValue={(option) => option.value}
                        placeholder={placeholder}
                        isRtl={isRtL}
                        {...field}
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormText
                color="danger">{errors[name] && errors[name].message || errors[name] || errors?.message}</FormText>
        </>
    );
};

export default CustomControlledDropdownField;
