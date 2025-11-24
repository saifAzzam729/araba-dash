import {SortableElement} from "react-sortable-hoc";
import {Card} from "reactstrap";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";

const SortableItem = SortableElement((props) => {

    const {value: attributeOption} = props;

    const optionName = attributeOption.option.value;
    const src = parseImageUrl(attributeOption.imageFileUrl);

    return (
        <Card className={"p-3"} style={{
            cursor: 'grab'
        }}
        >
            <div className='d-flex'>
                <img className='rounded me-1' src={src} height='30' alt={optionName}/>
                <h6 className='align-self-center mb-0'>{optionName}</h6>
            </div>
        </Card>
    )
});


export default SortableItem;
