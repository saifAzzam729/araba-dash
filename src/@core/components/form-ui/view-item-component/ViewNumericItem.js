const ViewNumericItem = ({label, value, unit = ''}) => {
    return (
        <div className="d-flex flex-column" style={{ gap: "0.5rem" }}>
            <span>{label}</span>
            <span className="h3">
                {value} {unit ? ` - ${unit}` : ''}
            </span>
        </div>
    )
}

export default ViewNumericItem;