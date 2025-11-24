import {Input, Label} from "reactstrap";
import {useState} from "react";

const SwitchBtnForTable = ({item, initalValue = false, confirmPromise = null}) => {

    const [value, setValue] = useState(initalValue)
    return (
        <div className='d-flex flex-column cursor-pointer'>
            <div className='form-switch form-check-primary cursor-pointer'>
                <Input
                    type='switch'
                    id='switch-primary'
                    name='primary'
                    className="cursor-pointer"
                    checked={value}
                    onChange={(e) => {
                        if (confirmPromise) {
                            confirmPromise(item, e.target.checked, setValue)
                        } else {
                            setValue(e.target.checked);
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default SwitchBtnForTable;
