import {Input, Label} from "reactstrap";
import {useEffect, useState} from "react";

export default function SelectAllInRow({sectionName, permissions, getValues, setValue, watch}) {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const calcIsChecked = permissions.every(perm => {
            const val = getValues(`permissions.${perm.role}`);
            console.log("permission", perm.role, " ", val);
            return val;
        })
        setIsChecked(calcIsChecked);
    }, [permissions, watch()]);


    return (
        <div style={{display: 'flex', gap: '10px', width:'200px'}}>
            <Input
                id={`select-all-${sectionName}`}
                type="checkbox"
                checked={isChecked}
                onClick={() => {
                    permissions.map((permission) => {
                        setValue(`permissions.${permission.role}`, !isChecked)
                    });
                    setIsChecked(prevState => !prevState);
                }}
            />
            <Label
                className="form-check-label"
                for={`select-all-${sectionName}`}
            >
                {isChecked ? 'un-select all' : 'select all'}
            </Label>
        </div>
    )
}
