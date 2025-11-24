import CreateColumn from "../../../@core/components/table/CreateColumn";
import formatDescription from "@src/utility/helpers/formatDescription";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";


const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'tax.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    translateKey: 'tax.table.description',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});

const TaxRateColumn = CreateColumn({
    name: "Value",
    translateKey: 'tax.table.taxRate',
    cellCustomizationFunction: (row) => <div className={"d-flex flex-column"}>
        <span>{row.taxRate} %</span>
    </div>,
});


const columns = [NameColumn, DescriptionColumn, TaxRateColumn];

export const createColumns = (mutatuion, isLoading) => {
    return [
        NameColumn,
        DescriptionColumn,
        TaxRateColumn,
        CreateColumn({
            name: "Published To Website",
            translateKey: 'tax.table.publish',
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
