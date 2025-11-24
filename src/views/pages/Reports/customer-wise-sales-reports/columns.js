import CreateColumn from "@components/table/CreateColumn";

const FullNameColumn = CreateColumn({
  name: "fullName",
  translateKey: "report.table.userName",
  cellCustomizationFunction: (row) => <span>{row.userName}</span>,
});

const EmailColumn = CreateColumn({
  name: "email",
  translateKey: "report.table.userEmail",
  cellCustomizationFunction: (row) => <span>{row.userEmail}</span>,
});

const PhoneNumberColumn = CreateColumn({
  name: "phoneNumber",
  translateKey: "report.table.phoneNumber",
  cellCustomizationFunction: (row) => <span>{row.phoneNumber}</span>,
});

const CountryColumn = CreateColumn({
  name: "country",
  translateKey: "report.table.country",
  cellCustomizationFunction: (row) => <span>{row.country}</span>,
});

const TotalOrderColumn = CreateColumn({
  name: "totalOrder",
  translateKey: "report.table.totalOrder",
  cellCustomizationFunction: (row) => <span>{row.totalOrder}</span>,
});

const TotalAmountColumn = CreateColumn({
  name: "totalAmount",
  translateKey: "report.table.totalPrice",
  cellCustomizationFunction: (row) => <span>{row.totalPrice}</span>,
});

const CurrencyColumn = CreateColumn({
  name: "totalAmount",
  translateKey: "report.table.currency",
  cellCustomizationFunction: (row) => <span>{row.currency}</span>,
});



export const createColumns = () => {
    return [FullNameColumn, EmailColumn, PhoneNumberColumn, CountryColumn, TotalOrderColumn, TotalAmountColumn, CurrencyColumn];
}
