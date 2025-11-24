import CreateColumn from "@components/table/CreateColumn";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

const FullNameColumn = CreateColumn({
    name: "Full Name",
    translateKey: "user-groups.table.name",
    minWidth: "120px",
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});


const columns = [
    FullNameColumn,
];

export const createColumns = (width) => {
    if (width <= WindowBreakpoint.sm) {
        return [
            FullNameColumn,
        ]

    } else if (width <= WindowBreakpoint.md) {
        return [
            FullNameColumn,
        ]
    }
    return [
        FullNameColumn,
    ];
};

export default columns;
