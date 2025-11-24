import formatDateToISO from "@src/utility/helpers/formatDateToISO";

const ViewDateItem = ({label, value}) => {
    return (
        <div className="d-flex flex-column" style={{ gap: "0.5rem" }}>
            <span>{label}</span>
            <span className="h3">
                {formatDateToISO(value)}
            </span>
        </div>
    )
}

export default ViewDateItem;