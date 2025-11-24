import {Input, Label} from "reactstrap";
import {useEffect, useState} from "react";

export default function SelectAllInMatrix({roles, getValues, setValue, watch}) {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const calcIsChecked = roles.every(({roles:permissions}) => {
            return permissions.every(perm => {
                return getValues(`permissions.${perm.role}`);
            })
        });
        setIsChecked(calcIsChecked);
    }, [roles, watch()]);


    return (
        <div style={{display: 'flex', gap: '10px'}}>
            <Input
                id={`select-all-in-matrix`}
                type="checkbox"
                checked={isChecked}
                onClick={() => {
                    roles.map(({roles:permissions}) => {
                        permissions.map((perm) => {
                            setValue(`permissions.${perm.role}`, !isChecked)
                        })
                    });
                    setIsChecked(prevState => !prevState);
                }}
            />
            <Label
                className="form-check-label"
                for={`select-all-in-matrix`}
            >
                {isChecked ? 'un-select all' : 'select all'}
            </Label>
        </div>
    )
}
