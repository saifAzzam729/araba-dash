export default function translateColumns(columns, translateFunction) {
    return columns.map(col => {
        return {
            ...col,
            name: !!col.translateKey ? translateFunction(col.translateKey) : translateFunction(col.name)
        }
    })
}