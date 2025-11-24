import CreateColumn from "@components/table/CreateColumn";
import formatDescription from "@src/utility/helpers/formatDescription";

const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'shipment-shippers.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});
const EmailColumn = CreateColumn({
    name: "Name",
    translateKey: 'shipment-shippers.table.email',
    cellCustomizationFunction: (row) => <span>{row.email}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    translateKey: 'shipment-shippers.table.description',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});

const PostalCodeColumn = CreateColumn({
    name: "postalCode",
    translateKey: 'shipment-shippers.table.postalCode',
    cellCustomizationFunction: (row) => <span>{row.postalCode}</span>,
});


export const createColumns = () => {
    return [
        NameColumn,
        EmailColumn,
        PostalCodeColumn,
        DescriptionColumn,
    ]
}