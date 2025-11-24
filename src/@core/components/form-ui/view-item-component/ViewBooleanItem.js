import {Check, X} from "react-feather";
import classnames from "classnames";

const ViewBooleanItem = ({label, value, className = ''}) => {
    return (
        <div className={classnames("d-flex flex-column", {
            [className]: className,
        })}  style={{ gap: "0.5rem" }}>
            <span>{label}</span>
            <div className="d-flex flex-column" style={{ gap: "0.5rem" }}>
                <span className="h3">
                    {value ? <Check className={"text-success"}/> : <X className={"text-danger"}/>}
                </span>
            </div>
        </div>
    )
}

export default ViewBooleanItem;