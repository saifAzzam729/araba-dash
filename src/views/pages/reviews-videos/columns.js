import CreateColumn from "../../../@core/components/table/CreateColumn";
import SwitchBtnForTable from "@components/table/SwitchBtnForTable";
import {handleTogglePublish} from "./data";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";

const UserFullNameColumn = CreateColumn({
    name: "User FullName",
    cellCustomizationFunction: (row) => <span>{row.userFullName}</span>,
});

const CommentColumn = CreateColumn({
    name: "Comment",
    cellCustomizationFunction: (row) => <span>{row.comment}</span>,
});

const PublishColumn = CreateColumn({
    name: "Published To Website",
    cellCustomizationFunction: (row) => <>
        <SwitchBtnForTable item={row} initalValue={row.publish} confirmPromise={handleTogglePublish}/>
    </>,
});

const columns = [UserFullNameColumn, CommentColumn, PublishColumn];

export default columns;

export const createColumns = (mutatuion, isLoading) => {
    return [
		UserFullNameColumn,
		CommentColumn,
		CreateColumn({
			name: "Published To Website",
			cellCustomizationFunction: (row) => <ToggleBtnWithMutation 
			item={row} mutation={mutatuion}
			isLoading={isLoading} booleanKey={'publish'}/>,
		})
	]
}