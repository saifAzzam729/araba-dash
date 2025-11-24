export default function translateSortableTableColumns(columns, translateFunction) {
    return columns.map(col => {
        return {
            ...col,
            headerName: !!col.translateKey ? translateFunction(col.translateKey) : translateFunction(col.headerName),
        };
    });
}