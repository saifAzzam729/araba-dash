import CreateColumn from "../../../@core/components/table/CreateColumn";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";

dayjs.extend(relativeTime)


const ErrorCodeColumn = CreateColumn({
    name: "Error Code",
    translateKey: 'error-logs.table.error-code',
    cellCustomizationFunction: (row) => <span>{row.errorCode}</span>,
});

const EndPointColumn = CreateColumn({
    name: "Endpoint",
    translateKey: 'error-logs.table.endpoint',
    cellCustomizationFunction: (row) => <span>{row.endpoint}</span>,
});


const ErrorDetailsColumn = CreateColumn({
    name: "Error Details",
    translateKey: 'error-logs.table.error-details',
    cellCustomizationFunction: (row) => <span>{row.errorDetails}</span>,
});

const ErrorDateColumn = CreateColumn({
    name: "Error Date", translateKey: 'error-logs.table.error-date', cellCustomizationFunction: (row) => {
        const isInLast24Hours = dayjs().diff(dayjs(row.createdAt), 'hours') <= 24;
        const className = isInLast24Hours ? 'text-danger' : '';
        return (<span className={className}>{dayjs(row.createdAt).fromNow()}</span>)
    },
});


const columns = [ErrorCodeColumn, EndPointColumn, ErrorDetailsColumn, ErrorDateColumn];

export default columns;
