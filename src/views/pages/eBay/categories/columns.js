import CreateColumn from "@components/table/CreateColumn";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";
import {Badge} from "reactstrap";


const TitleColumn = CreateColumn({
    name: "Name",
    translateKey: 'ebay-cate.table.treeName',
    cellCustomizationFunction: (row) => <span>{row.categoryTreeName}</span>,
    minWidth : '200px'
});
const ParentColumn = CreateColumn({
    name: "parent",
    translateKey: 'ebay-cate.table.parent',
    cellCustomizationFunction: (row) => <span>{row.parent?.name}</span>,
});
const MarketPlaceColumn = CreateColumn({
    name: "marketplace",
    translateKey: 'ebay-cate.table.marketplace',
    cellCustomizationFunction: (row) => <span>{row.marketPlaceId}</span>,
});
const ReferenceColumn = CreateColumn({
    name: "Reference",
    translateKey: 'ebay-cate.table.reference',
    cellCustomizationFunction: (row) => <span>{row.ebayReferenceCategoryId}</span>,
});
const PublishColumn = CreateColumn({
        name: "publish",
        translateKey: 'ebay-cate.table.publish',
        cellCustomizationFunction: (row) => {
            const badgeColor = row.publish ? 'light-success' : 'light-danger';
            const badgeText = row.publish ? 'YES' : 'NO';

            return (
                <Badge className='text-capitalize' color={badgeColor} pill>
                    {badgeText}
                </Badge>
            );
        }
    })
;


const columns = [TitleColumn, MarketPlaceColumn, PublishColumn];

export const createColumns = (width) => {


    if (width <= WindowBreakpoint.md) {
        return [
            TitleColumn,
        ]

    } else {
        return columns
    }

}

export default columns;
