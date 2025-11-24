import CreateColumn from "@components/table/CreateColumn";
import formatDescription from "@src/utility/helpers/formatDescription";

const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'shipment-packages.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    translateKey: 'shipment-packages.table.description',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});

const DimensionUomColumn = CreateColumn({
    name: "dimensionUom",
    translateKey: 'shipment-packages.table.dimensionUom',
    cellCustomizationFunction: (row) => <div className={"d-flex flex-column"}>
        <span>{row.dimensionUom?.value ?? "_"}</span>
    </div>,
});

const WeightUomColumn = CreateColumn({
    name: "weightUom",
    translateKey: 'shipment-packages.table.weightUom',
    cellCustomizationFunction: (row) => <span>{row.weightUom?.value ?? "_"}</span>,
});



export const createColumns = () => {
    return [
        NameColumn,
        DescriptionColumn,
        DimensionUomColumn,
        WeightUomColumn,
    ]
}