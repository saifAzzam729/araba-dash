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
    translateKey:'tags.table.image',
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

const TitleColumn = CreateColumn({
    name: "Title",
    translateKey:'tags.table.title',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    translateKey:'tags.table.description',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});

// const ProductsColumn = CreateColumn({
//     name: "Products",
//     cellCustomizationFunction: (row) => <span id={`product-tags-${row.id}`}>{row.products.map((product) => <span className="badge bg-secondary text-capitalize" id={`product-tags-${row.id}`}>{product.name}</span>)}
//         </span>,
// });

const PublishColumn = CreateColumn({
    name: "Published To Website",
    translateKey:'tags.table.publish',
    cellCustomizationFunction: (row) => <>
        <SwitchBtnForTable item={row} initalValue={row.publish} confirmPromise={handleTogglePublish}/>
    </>,
});

const columns = [AvatarColumn, TitleColumn, DescriptionColumn, PublishColumn];


export const createColumns = (mutatuion, isLoading, width, isVendor = false) => {
    const PublishToggleColumn = CreateColumn({
        name: "Published To Website",
        translateKey:'tags.table.publish',
        cellCustomizationFunction: (row) => <ToggleBtnWithMutation
            item={row}
            mutation={mutatuion}
            isLoading={isLoading}
            booleanKey={'publish'}
        />,
    });

    const FeaturedToggleColumn = CreateColumn({
        name: "Featured To Website",
        translateKey: 'tags.table.featured',
        cellCustomizationFunction: (row) => <ToggleBtnWithMutation
            item={row}
            mutation={mutatuion}
            isLoading={isLoading}
            booleanKey={'featured'}
        />,
    });

    if (width <= WindowBreakpoint.md) {
        if (isVendor) {
            return [
                AvatarColumn,
                TitleColumn
            ]
        }
        return [
            AvatarColumn,
            TitleColumn,
            PublishToggleColumn,
            FeaturedToggleColumn
        ]

    } else {
        if (isVendor) {
            return [
                AvatarColumn,
                TitleColumn,
                DescriptionColumn
            ]
        }
        return [
            AvatarColumn,
            TitleColumn,
            DescriptionColumn,
            PublishToggleColumn,
            FeaturedToggleColumn
        ]
    }

}

export default columns;
