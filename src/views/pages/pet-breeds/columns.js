import CreateColumn from "../../../@core/components/table/CreateColumn";
import {handleTogglePublish} from "../reviews-videos/data";
import SwitchBtnForTable from "../../../@core/components/table/SwitchBtnForTable";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";

const PetTypeColumn = CreateColumn({
    name: "Pet Type",
    cellCustomizationFunction: (row) => <span>{row.pet.name}</span>,
});
const NameColumn = CreateColumn({
    name: "Name",
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const PublishColumn = CreateColumn({
    name: "Published To Website",
    cellCustomizationFunction: (row) => <SwitchBtnForTable item={row} initalValue={row.publish}
                                                           confirmPromise={handleTogglePublish}/>,
});

const columns = [PetTypeColumn, NameColumn, PublishColumn];

export const createColumns = (mutation, isLoading) => {
    return [
        NameColumn,
        PetTypeColumn,
        CreateColumn({
            name: "Published To Website",
            cellCustomizationFunction: (row) => (
                <ToggleBtnWithMutation
                        item={row}
                        mutation={mutation}
                        isLoading={isLoading}
                        booleanKey={'publish'}
                />
            )
        })
    ]
}
export default columns;
