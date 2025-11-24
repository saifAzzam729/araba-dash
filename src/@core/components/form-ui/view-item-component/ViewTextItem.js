import classnames from "classnames";

const ViewTextItem = ({label, value, className = ''}) => {
    return (
        <div className={classnames("d-flex flex-column", {
            [className]: className,
        })} style={{ gap: "0.5rem" }}>
            <span>{label}</span>
            <span className="h3">
                {value}
            </span>
        </div>
    )
}

export default ViewTextItem;