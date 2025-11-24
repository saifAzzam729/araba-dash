import CreateColumn from "@components/table/CreateColumn";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";


const TitleColumn = CreateColumn({
    name: "Name",
    translateKey: 'brands.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});
const UuidColumn = CreateColumn({
    name: "uuid",
    translateKey: 'ebay.table.uuid',
    cellCustomizationFunction: (row) => <span>{row.uuid}</span>,
});


const columns = [TitleColumn, UuidColumn];

export const createColumns = (width) => {


    if (width <= WindowBreakpoint.md) {
        return [
            TitleColumn,
            UuidColumn,
        ]

    } else {
        return columns
    }

}

export default columns;
