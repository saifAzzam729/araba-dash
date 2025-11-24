import {SortableContainer} from "react-sortable-hoc";
import SortableItem from "./sortable-item";

const SortableList = SortableContainer(({items}) => {
    return (
        <div className={"d-flex gap-3"}>
            {items.map((opt, index) => {
                return (
                    <SortableItem key={`item-${opt.id}`} index={index} value={opt}/>
                )
            })}
        </div>
    );
});

export default SortableList;
