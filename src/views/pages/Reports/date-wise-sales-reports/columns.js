import CreateColumn from "@components/table/CreateColumn";
import {formatDate} from "@utils";

const TotalOrderColumn = CreateColumn({
  name: "totalOrder",
  translateKey: "report.table.totalOrder",
  cellCustomizationFunction: (row) => <span>{row.totalOrder}</span>,
});

const TotalAmount = CreateColumn({
  name: "totalAmount",
  translateKey: "report.table.totalPrice",
  cellCustomizationFunction: (row) => <span>{row.totalPrice}</span>,
});

const DateOfCreationColumn = CreateColumn({
  name: "Created At",
  translateKey: "report.table.created-at",
  cellCustomizationFunction: (row) => <div>
    {formatDate(row.createdAt)}
  </div>,
});

export const createColumns = () => {
  return [TotalAmount, TotalOrderColumn, DateOfCreationColumn];
};
