import CreateColumn from "../../../@core/components/table/CreateColumn";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import {Link} from "react-router-dom";
import SwitchBtnForTable from "@components/table/SwitchBtnForTable";
import {handleTogglePublish} from "@src/views/pages/brands/data";
import formatDescription from "@src/utility/helpers/formatDescription";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";


const AvatarColumn = CreateColumn({
    name: "Image",
    translateKey: 'brands.table.image',
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

const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'brands.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    translateKey: 'brands.table.description',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});

const PublishColumn = CreateColumn({
    name: "Published To Website",
    translateKey: 'brands.table.publish',
    cellCustomizationFunction: (row) => <>
        <SwitchBtnForTable item={row} initalValue={row.publish} confirmPromise={handleTogglePublish}/>
    </>,
});

const columns = [AvatarColumn, NameColumn, DescriptionColumn, PublishColumn];

export const createColumns = (mutatuion, isLoading, width) => {

    const PublishToggleColumn = CreateColumn({
        name: "Published To Website",
        translateKey: 'brands.table.publish',
        cellCustomizationFunction: (row) => <ToggleBtnWithMutation
            item={row}
            mutation={mutatuion}
            isLoading={isLoading}
            booleanKey={'publish'}
        />,
    });

    const FeaturedToggleColumn = CreateColumn({
        name: "Featured To Website",
        translateKey: 'brands.table.featured',
        cellCustomizationFunction: (row) => <ToggleBtnWithMutation
            item={row}
            mutation={mutatuion}
            isLoading={isLoading}
            booleanKey={'featured'}
        />,
    });

    if (width <= WindowBreakpoint.md) {
        return [
            AvatarColumn,
            NameColumn,
            PublishToggleColumn,
            FeaturedToggleColumn
        ]

    } else {
        return [
            AvatarColumn,
            NameColumn,
            DescriptionColumn,
            PublishToggleColumn,
            FeaturedToggleColumn
        ]
    }

}

export default columns;
