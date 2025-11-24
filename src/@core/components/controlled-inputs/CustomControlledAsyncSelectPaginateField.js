import React from 'react';
import {Controller} from 'react-hook-form';
import {AsyncPaginate} from 'react-select-async-paginate';
import {FormText, Label} from "reactstrap";
import {isDisabled} from "bootstrap/js/src/util";

function CustomControlledAsyncSelectPaginate({
                                                 label,
                                                 placeholder,
                                                 control,
                                                 name,
                                                 errors = {},
                                                 getOptionsPromise,
                                                 defaultOptions = [],
                                                 isMulti,
                                                 handelOnchange,
                                                 isDisabled = false,
    
                                                 isClearable = true
                                             }) {
    return (
        <div className="w-100">
            <Label className="form-label" for="fullName">
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <AsyncPaginate
                        isClearable={isClearable}
                        isDisabled={isDisabled}
                        defaultOptions={defaultOptions}
                        placeholder={placeholder}
                        loadOptions={getOptionsPromise}
                        styles={{
                            menuList: (prev) => ({
                                ...prev,
                                height: '95px'
                            })
                        }}
                        isMulti={isMulti}
                        {...field}
                        onChange={(newValue, actionMeta) => {
                            field.onChange(newValue);
                            handelOnchange && handelOnchange(newValue, field.value, actionMeta);
                        }}
                    />
                )}
            />
            <FormText color="danger">{errors[name] && errors[name].message || errors.message}</FormText>
        </div>
    );
}

export default CustomControlledAsyncSelectPaginate;
