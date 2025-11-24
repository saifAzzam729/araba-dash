import CreateColumn from "@components/table/CreateColumn";

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

const ProductColumn = CreateColumn({
  name: "date",
  translateKey: "report.table.product",
  cellCustomizationFunction: (row) => <span>{row.item}</span>,
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

export const createColumns = () => {
  return [ ProductColumn, SkuColumn, ProductIdColumn, TotalAmount, TotalOrderColumn];
};
