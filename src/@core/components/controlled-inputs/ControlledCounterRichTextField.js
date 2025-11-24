import JoditEditor from 'jodit-react';
import React, { useMemo, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Label } from 'reactstrap';

const RichText = ({ onValueChangedCb, value }) => {
    const editor = useRef(null);
    const config = useMemo(
        () => ({
            placeholder: 'Description',
            toolbarButtonSize: 'large',
            removeButtons: [
                'video', 'table', 'file', 'source', 'about', 'fullsize', 'hr',
                'link', 'selectall', 'spellcheck', 'copyformat', 'spellcheck',
                // 'brush', 'font', 'classSpan', 'image',
            ],
            showPlaceholder: true,
            statusbar: false,
            tabIndex: 0,
            color: 'black',
        }),
        []
    );

    return (
        <div>
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onChange={newContent => onValueChangedCb(newContent)}
            />
        </div>
    );
};

const ControlledCounterRichTextField = ({ control, errors, name, label }) => {
    const [charCount, setCharCount] = useState(0);

    return (
        <>
            <Label className="form-label" for="fullName">
                {`${label} / (${charCount})`}
            </Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    const handleChange = (newValue) => {
                        setCharCount(newValue.length);
                        onChange(newValue);
                    };

                    return (
                        <>
                            <RichText
                                width="100%"
                                onValueChangedCb={handleChange}
                                value={value || ""}
                            />
                        </>
                    );
                }}
            />
            <p>{errors && errors[name]?.message}</p>
        </>
    );
};

export default ControlledCounterRichTextField;
