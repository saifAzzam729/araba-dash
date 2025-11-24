import CreateColumn from "../../../@core/components/table/CreateColumn";
import {Link} from "react-router-dom";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import Avatar from "@mui/material/Avatar";
import SwitchBtnForTable from "../../../@core/components/table/SwitchBtnForTable";
import {handleTogglePublish} from "./data";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import formatDescription from "@src/utility/helpers/formatDescription";


const ImageColumn = CreateColumn({
    name: "Image",
    cellCustomizationFunction: (row) => (
        <Link
            to={row.imageFileUrl ? ParseImageUrl(row.imageFileUrl) : "#"}
            target={row.imageFileUrl ? "_blank" : undefined}
            className="my-2"
        >
            <Avatar
                alt={`${row.name} avatar`}
                sx={{width: 56, height: 56}}
                src={ParseImageUrl(row.imageFileUrl)}
            />
        </Link>
    ),
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});

const PublishColumn = CreateColumn({
    name: "Published To Website",
    cellCustomizationFunction: (row) => <>
        <SwitchBtnForTable item={row} initalValue={row.publish} confirmPromise={handleTogglePublish}/>
    </>,
});


const columns = [
    ImageColumn,
    DescriptionColumn,
    PublishColumn,
];

export const createColumns = (mutatuion, isLoading) => {
    return [
        ImageColumn,
        DescriptionColumn,
        CreateColumn({
            name: "Published To Website",
            cellCustomizationFunction: (row) => <ToggleBtnWithMutation 
            item={row}
            mutation={mutatuion}
            isLoading={isLoading} 
            booleanKey={'publish'}
            />,
    })
]
}

export default columns;
