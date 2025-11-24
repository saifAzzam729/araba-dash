import CreateColumn from "@components/table/CreateColumn";

const TotalOrderColumn = CreateColumn({
  name: "totalOrder",
  translateKey: "report.table.totalOrder",
  cellCustomizationFunction: (row) => <span>{row.totalOrder}</span>,
});

const TotalAmount = CreateColumn({
  name: "totalPrice",
  translateKey: "report.table.totalPrice",
  cellCustomizationFunction: (row) => <span>{row.totalPrice}</span>,
});

const CountryColumn = CreateColumn({
  name: "Name",
  translateKey: "report.table.country",
  cellCustomizationFunction: (row) => <span>{row.country}</span>,
});


export const createColumns = () => {
    return [CountryColumn, TotalAmount, TotalOrderColumn,];
}
