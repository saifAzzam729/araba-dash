import React, {useEffect, useState} from 'react';
import { SketchPicker} from 'react-color';
import {Controller} from "react-hook-form";
import reactCSS from 'reactcss'
import hexToRGBA from "@src/utility/helpers/hexToRgba";
import { Label } from "reactstrap";

const CustomControlledColorPicker = ({
                                         label,
                                         name,
                                         control,
                                         colorValueRGBA = '',
                                         isAlignedStart= false
                                     }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);


    const [color, setColor] = useState(hexToRGBA(colorValueRGBA));

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    //change the color state when the component is first rendered.
    // and the colorValueRGBA changed after the first render,
    useEffect(() => {
        setColor(hexToRGBA(colorValueRGBA));
    }, [colorValueRGBA]);


    const styles = reactCSS({
        'default': {
            color: {
                width: '30px',
                height: '30px',
                borderRadius: '20%',
                background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            },
            swatch: {
                // padding: '5px',
                background: '#fff',
                borderRadius: '20%',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <div className={`d-flex flex-column ${isAlignedStart ? 'align-items-start' : 'align-items-center'} w-auto mb-1`} style={{width:'fit-content'}}>
            <Label className="form-label" for="fullName">
                {label}
            </Label>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color}/>
            </div>
            {displayColorPicker ? (
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose}/>
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={color}
                        render={({field: {onChange, value}}) => (
                            <SketchPicker color={value} onChange={(selectedCColorScheme) => {
                                onChange(selectedCColorScheme.hex)
                                setColor(selectedCColorScheme.rgb)
                            }}/>
                        )}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default CustomControlledColorPicker;
