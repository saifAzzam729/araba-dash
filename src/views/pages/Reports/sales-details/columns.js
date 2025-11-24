import CreateColumn from "@components/table/CreateColumn";
import {Badge} from "reactstrap";
import {formatDate} from "@utils";

const OrderNumberColumn = CreateColumn({
    name: "Name",
    translateKey: 'report.table.orderNo',
    cellCustomizationFunction: (row) => <span>{row.orderNo}</span>,
});

const FullNameColumn = CreateColumn({
  name: "Name",
  translateKey: "report.table.userName",
  cellCustomizationFunction: (row) => <span>{row.userName}</span>,
});

const StatusColumn = CreateColumn({
    name: "Name",
    translateKey: 'report.table.status',
    cellCustomizationFunction: (row) => <Badge className='text-capitalize' color={"primary"} pill>
        {row.status}
    </Badge>,
});

const TotalColumn = CreateColumn({
    name: "Name",
    translateKey: 'report.table.total',
    cellCustomizationFunction: (row) => <span>{row.total}</span>,
});

const DateOfCreationColumn = CreateColumn({
    name: "Created At",
    translateKey: "report.table.created-at",
    cellCustomizationFunction: (row) => <div>
        {formatDate(row.createdAt)}
    </div>,
});

export const createColumns = () => {
    return [FullNameColumn, OrderNumberColumn, StatusColumn, TotalColumn, DateOfCreationColumn];
}
