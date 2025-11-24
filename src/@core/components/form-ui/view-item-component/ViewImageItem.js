import ParseImageUrl from "@src/common/helpers/ParseImageUrl";

const ViewImageItem = ({label, value, width = "200px"}) => {
    return (
        <div className="d-flex flex-column" style={{gap: "0.5rem"}}>
            <span>{label}</span>
            <span className="h3">
                <img src={ParseImageUrl(value)} width={width}/>
            </span>
        </div>
    )
}

export default ViewImageItem;

