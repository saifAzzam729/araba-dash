import CreateColumn from "@components/table/CreateColumn";

const CountryColumn = CreateColumn({
    name: "country",
    translateKey: 'report.table.country',
    cellCustomizationFunction: (row) => <span>{row.countryName}</span>,
});

const TotalPRiceColumn = CreateColumn({
    name: "value",
    translateKey: 'report.table.totalPrice',
    cellCustomizationFunction: (row) => <span>{row.totalPrice}</span>,
});

const ProductColumn = CreateColumn({
    name: "date",
    translateKey: "report.table.product",
    cellCustomizationFunction: (row) => <span>{row.productName}</span>,
});

const ProductIdColumn = CreateColumn({
    name: "date",
    translateKey: "report.table.productId",
    cellCustomizationFunction: (row) => <span>{row.productId}</span>,
});

const SkuColumn = CreateColumn({
    name: "date",
    translateKey: "report.table.sku",
    cellCustomizationFunction: (row) => <span>{row.sku}</span>,
});

const UserNameColumn = CreateColumn({
    name: "fullName",
    translateKey: "report.table.userName",
    cellCustomizationFunction: (row) => <span>{row.userName}</span>,
});
const CurrencyColumn = CreateColumn({
    name: "fullName",
    translateKey: "report.table.currency",
    cellCustomizationFunction: (row) => <span>{row.currency}</span>,
});


export const createColumns = () => {
    return [ UserNameColumn, ProductColumn, ProductIdColumn, SkuColumn, CountryColumn, TotalPRiceColumn, CurrencyColumn];
}
