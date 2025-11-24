import CreateColumn from "../../../@core/components/table/CreateColumn";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import {Link} from "react-router-dom";
import SwitchBtnForTable from "@components/table/SwitchBtnForTable";
import {handleTogglePublish} from "@src/views/pages/shippings/data";
import formatDescription from "@src/utility/helpers/formatDescription";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";


const AvatarColumn = CreateColumn({
    name: "Image",
    translateKey: 'shipping.table.image',
    cellCustomizationFunction: (row) => (
        <Link
            to={row.iconFileUrl ? ParseImageUrl(row.iconFileUrl) : "#"}
            target={row.iconFileUrl ? "_blank" : undefined}
            className="my-2"
        >
            <Avatar
                alt={`${row.name} avatar`}
                sx={{width: 56, height: 56}}
                src={ParseImageUrl(row.iconFileUrl)}
            />
        </Link>
    ),
});

const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'shipping.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    translateKey: 'shipping.table.description',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});
const ValueColumn = CreateColumn({
    name: "Value",
    translateKey: 'shipping.table.value',
    cellCustomizationFunction: (row) => <div className={"d-flex flex-column"}>
        <span>Value: {row.value}</span>
        <span>Min Subtotal Value: {row.minSubtotalValue}</span>
    </div>,
});

const PublishColumn = CreateColumn({
    name: "Published To Website",
    translateKey: 'shipping.table.publish',
    cellCustomizationFunction: (row) => <>
        <SwitchBtnForTable item={row} initalValue={row.publish} confirmPromise={handleTogglePublish}/>
    </>,
});

const columns = [AvatarColumn, NameColumn, DescriptionColumn, ValueColumn, PublishColumn];

export const createColumns = (mutatuion, isLoading) => {
    return [
        AvatarColumn,
        NameColumn,
        DescriptionColumn,
        ValueColumn,
        CreateColumn({
            name: "Published To Website",
            translateKey: 'shipping.table.publish',
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
