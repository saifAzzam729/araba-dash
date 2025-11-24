import CreateColumn from "@components/table/CreateColumn";
import parseDate from "@src/common/helpers/ParseDate";

const PaymentMethod = CreateColumn({
    name: "Payment Method",
    translateKey: 'common.paymentMethod',
    cellCustomizationFunction: (row) => <span>{row.paymentMethod}</span>
})

const PaymentReferenceIdColumn = CreateColumn({
    name: "Payment Reference Id",
    translateKey: 'common.paymentReferenceId',

    cellCustomizationFunction: (row) => <span>{row.paymentReferenceId}</span>
});

const AmountColumn = CreateColumn({
    name: "Amount",
    translateKey: 'common.amount',
    cellCustomizationFunction: (row) => <span>{`${row?.amount.value}  - ${row?.amount?.currency}`}</span>
});


const PaymentDateColumn = CreateColumn({
    name: "Payment Date",
    translateKey: 'common.date',
    cellCustomizationFunction: (row) => <span>{parseDate(row.paymentDate)}</span>
});


const columns = [PaymentMethod, PaymentReferenceIdColumn, AmountColumn, PaymentDateColumn];

export default columns;