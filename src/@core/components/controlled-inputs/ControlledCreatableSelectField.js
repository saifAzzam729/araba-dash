import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {FormText, Label} from "reactstrap";
import AsyncCreatableSelect from "react-select/async-creatable";

const createOption = (label) => ({
    label,
    // value: label.toLowerCase().replace(/\W/g, ''),
    value: label,
});

export default function ControlledCreatableSelectField({
                                                           label,
                                                           control,
                                                           name,
                                                           errors = {},
                                                           getOptionsPromise,
                                                           placeholder = "No Items"
                                                       }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = (inputValue, onChange) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            onChange(newOption);
        }, 1000);
    };

    return (
        <>
            <Label className="form-label" for="fullName">
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                render={({field: {onChange, value}}) => (
                    <AsyncCreatableSelect
                        isClearable
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        onChange={onChange}
                        onCreateOption={(inputValue) => handleCreate(inputValue, onChange)}
                        loadOptions={getOptionsPromise}
                        defaultOptions
                        value={value}
                        placeholder={placeholder}
                    />
                )}
            />
            <FormText color="danger">{errors[name] && errors[name].message}</FormText>

        </>
    )
};
