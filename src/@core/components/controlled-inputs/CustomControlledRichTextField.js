import JoditEditor from 'jodit-react'
import React, {useMemo, useRef} from 'react'
import {Controller} from 'react-hook-form'
import {Label} from "reactstrap";

const RichText = ({
                      onValueChangedCb,
                      value,
                  }) => {
    const editor = useRef(null)
    const config = useMemo(
        () => ({
            placeholder: 'Description',
            toolbarButtonSize: 'large',
            removeButtons: [
                'video',
                'table',
                'file',
                'source',
                'about',
                'fullsize',
                'hr',
                'link',
                "selectall",
                'spellcheck',
                'copyformat',
                'spellcheck',
                // 'brush',
                'font',
                'classSpan',
                'image',
            ],
            showPlaceholder: true,
            statusbar: false,
            tabIndex: 0,
            color: 'black',

        }),
        [],
    )

    return (
        <div>
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onBlur={newContent => onValueChangedCb(newContent)}

            />
        </div>
    )
}


const CustomControlledRichTextField = ({control, errors, name, label}) => {
    return (
        <>

            <Label className="form-label" for="fullName">
                {label}
            </Label>
            <Controller
                control={control}
                name={name}
                render={({field: {onChange, value}}) => (<>
                        <RichText
                            width="100%"
                            onValueChangedCb={values => onChange(values)}
                            value={value}
                        />
                    </>
                )}
            />
            <p>
                {errors && errors[name]?.message}
            </p>
        </>
    )
}

export default CustomControlledRichTextField
