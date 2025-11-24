import {Controller} from "react-hook-form";
import classnames from "classnames";
import {Input, InputGroup, InputGroupText, Label} from "reactstrap";
import {Eye, EyeOff} from "react-feather";
import {Fragment, useState} from "react";

export default function CustomControlledPasswordField({
                                           name,
                                           control,
                                           invalid,
                                           placeholder,
                                           inputClassName,
                                           style,
                                                          iconSize,
                                                          visible = false,
                                                          hideIcon,
                                                          showIcon,
    className,
                                                          label,
    blur

}) {

    const [inputVisibility, setInputVisibility] = useState(visible);

    const renderIcon = () => {
        const size = iconSize ? iconSize : 14;

        if (inputVisibility === false) {
            return hideIcon ? hideIcon : <Eye size={size} />;
        } else {
            return showIcon ? showIcon : <EyeOff size={size} />;
        }
    };

    return (
        <Controller
            id={name}
            name={name}
            control={control}
            render={({ field }) => (
                    <Fragment>
                        {label ? (
                            <Label className="form-label" for={name}>
                                {label}
                            </Label>
                        ) : null}
                        <InputGroup
                            className={classnames({
                                [className]: className,
                                "is-invalid": invalid,
                            })}
                        >
                            <Input
                                id={name}
                                name={name}
                                invalid={invalid}
                                type={inputVisibility === false || !blur ? "password" : "text"}
                                placeholder={placeholder ? placeholder : "············"}
                                className={classnames({
                                    [inputClassName]: inputClassName,
                                })}
                                style={blur ? {
                                    color: inputVisibility === false ? 'transparent' : 'black',
                                    textShadow: inputVisibility === false ? '0 0 5px rgba(0,0,0,0.5)' : 'none',
                                    caretColor: 'black',
                                    transition: 'text-shadow 0.2s ease-in-out',
                                } : style}
                                {...field}
                            />
                            <InputGroupText
                                className="cursor-pointer"
                                onClick={() => setInputVisibility(!inputVisibility)}
                            >
                                {renderIcon()}
                            </InputGroupText>
                        </InputGroup>
                    </Fragment>
            )}
        />
    )
}