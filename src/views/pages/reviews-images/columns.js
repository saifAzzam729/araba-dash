import CreateColumn from "../../../@core/components/table/CreateColumn";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import {Link} from "react-router-dom";
import SwitchBtnForTable from "@components/table/SwitchBtnForTable";
import {handleTogglePublish} from "./data";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";

const AvatarColumn = CreateColumn({
    name: "Image",
    cellCustomizationFunction: (row) => (
        <Link
            to={row.mediaFileUrl ? ParseImageUrl(row.mediaFileUrl) : "#"}
            target={row.mediaFileUrl ? "_blank" : undefined}
            className="my-2"
        >
            <Avatar
                alt={`${row.userFullName} avatar`}
                sx={{width: 56, height: 56}}
                src={ParseImageUrl(row.mediaFileUrl)}
            />
        </Link>
    ),
});

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

const columns = [AvatarColumn, UserFullNameColumn, CommentColumn, PublishColumn];

export default columns;

export const createColumns = (mutatuion, isLoading) => {
    return [
		AvatarColumn,
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