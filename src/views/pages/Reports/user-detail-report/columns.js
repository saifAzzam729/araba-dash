import CreateColumn from "@components/table/CreateColumn";

const EmailColumn = CreateColumn({
  name: "email",
  translateKey: "report.table.userEmail",
  cellCustomizationFunction: (row) => <span>{row.email}</span>,
});

const FullNameColumn = CreateColumn({
  name: "fullName",
  translateKey: "report.table.userName",
  cellCustomizationFunction: (row) => <span>{row.fullName}</span>,
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


export const createColumns = () => {
    return [FullNameColumn, EmailColumn, PhoneNumberColumn, CountryColumn];
}
