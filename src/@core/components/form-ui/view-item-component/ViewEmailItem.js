const ViewEmailItem = ({label, value}) => {
    return (
        <div className="d-flex flex-column" style={{ gap: "0.5rem" }}>
            <span>{label}</span>
            <span className="h3">
                {value}
            </span>
        </div>
    )
}

export default ViewEmailItem;