import CreateColumn from "@components/table/CreateColumn";
import formatDescription from "@src/utility/helpers/formatDescription";
import {Badge} from "reactstrap";

const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'shipment-products.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const DescriptionColumn = CreateColumn({
    name: "Description",
    translateKey: 'shipment-products.table.description',
    cellCustomizationFunction: (row) => <span>{formatDescription(row.description)}</span>,
});

const CodeColumn = CreateColumn({
    name: "Code",
    translateKey: 'shipment-products.table.code',
    cellCustomizationFunction: (row) => <div className={"d-flex flex-column"}>
        <span>{row.code}</span>
    </div>,
});

const BillingNumberColumn = CreateColumn({
    name: "Billing Number",
    translateKey: 'shipment-products.table.billingNumber',
    cellCustomizationFunction: (row) => <span>{row.billingNumber}</span>,
});

const ShippingColumn = CreateColumn({
    name: "Shipping",
    translateKey: 'shipment-products.table.shipping',
    cellCustomizationFunction: (row) => <Badge color='light-success cursor-pointer'>{row.shipping.name}</Badge>,
});

export const createColumns = () => {
    return [
        NameColumn,
        ShippingColumn,
        DescriptionColumn,
        CodeColumn,
        BillingNumberColumn,
    ]
}