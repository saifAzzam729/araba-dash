import {Link} from "react-router-dom";
import {formatDate} from "@utils";
import CreateColumn from "@components/table/CreateColumn";
import {Badge} from "reactstrap";

const UserInfoColumn = CreateColumn({
    name: "User Info",
    translateKey: "affiliates.table.user-info",
    cellCustomizationFunction: (row) => <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <Link
                to={`/users/profile/${row.affiliate.id}`}
                className='user_name text-truncate text-body'
            >
                <span className='fw-bolder'>{row.affiliate.name}</span>
            </Link>
            <small className='text-truncate text-muted mb-0'>{row.affiliate.email}</small>
        </div>
    </div>,

});

const AmountColumn = CreateColumn({
    name: "Amount",
    translateKey: "affiliates.table.amount",
    cellCustomizationFunction: (row) =>  <div>{row.amount}</div>,
});

const PaymentDateColumn = CreateColumn({
    name: "paymentDate",
    translateKey: "affiliates.table.payment-date",
    cellCustomizationFunction: (row) => <div>{formatDate(row.paymentDate)}</div>,
});

const SaleOrderColumn = CreateColumn({
    name: "sale orders",
    translateKey: "affiliates.table.sale-orders",
    cellCustomizationFunction: (row) => {
        const { details } = row;
        return (
            <div className='d-flex flex-wrap gap-25 my-1 justify-content-center'>
                {details?.map((detail) => (
                    <Badge className="me-1" pill>
                        {detail.saleOrder.refNumber ?? detail.saleOrder.id}
                    </Badge>
                ))}
            </div>
        );
    }
});

const AffiliatePaymentDateOfCreationColumn = CreateColumn({
    name: "Created At",
    translateKey: "affiliates.table.created-at",
    cellCustomizationFunction: (row) => <div>
        {formatDate(row.createdAt)}
    </div>,
});


const columns = [UserInfoColumn, AmountColumn, SaleOrderColumn, PaymentDateColumn, AffiliatePaymentDateOfCreationColumn];

export default columns;
