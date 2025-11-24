import {Input, Label} from "reactstrap";
import React from "react";
import {Circle, CheckCircle} from "react-feather";
import {Controller} from "react-hook-form";

function CustomControlledCheckboxInput({
                                           name,
                                           label,
                                           control,
                                           placeholder,
    onClick = () => {},
                                           checkIcon =(<CheckCircle color={'#00b602'} className='text-primary' size={30}/>),
                                           unCheckIcon= (<Circle size={30} strokeWidth={0.5}/>),
    defaultValue = undefined,
    styles = ''
}

) {
    return (
        <div className={`form-check p-0 ${styles}`}>
            <Label className="form-label d-block" for={name}>
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field: {onChange, value}}) => {
                    return (
                        <label htmlFor={name}>
                            <Input
                                type="checkbox"
                                id={name}
                                name={name}
                                placeholder={placeholder ?? ""}
                                style={{display: 'none'}}
                                onChange={onChange}
                                checked={value}
                                value={value}
                                onClick={onClick}
                            />
                            {!value && unCheckIcon}
                            {value && checkIcon}
                        </label>
                    )
                }
                }
            />
        </div>
    );
}

export default CustomControlledCheckboxInput;