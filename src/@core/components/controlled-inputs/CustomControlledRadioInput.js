import {Input, Label} from "reactstrap";
import {Controller} from "react-hook-form";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

export default function CustomControlledRadioInput({
                                                       name,
                                                       control,
                                                       defaultValue = undefined,
                                                       options = [] // list of values
                                                   }) {

    const {width} = useWindowSize()

    return (

        <div className={`d-flex ${width > WindowBreakpoint.sm ? 'flex-row gap-3' : 'flex-column gap-1'}`}>
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({field}) => {
                return options.map(opt => (
                    <div key={opt.value}>
                        <Input
                            type='radio'
                            id={`${opt.value}-input`}
                            name={opt.value}
                            {...field}
                            value={opt.value}
                            checked={field.value === opt.value}
                        />
                        <Label
                            className='form-check-label'
                            htmlFor={`${opt.value}-input`}>
                            {opt.label}
                        </Label>
                    </div>
                ))
            }}
        />

        </div>

    )
}