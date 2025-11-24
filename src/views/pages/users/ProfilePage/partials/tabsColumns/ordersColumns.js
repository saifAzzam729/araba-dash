import {Link} from "react-router-dom";
import {Badge} from "reactstrap";
import CreateColumn from "../../../../../../@core/components/table/CreateColumn";
import {formatDate} from "@fullcalendar/react";

const UserInfoColumn = CreateColumn({
    name: "User Info",
    cellCustomizationFunction: (row) => <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <Link
                to={`/users/profile/${row.user}`}
                className='user_name text-truncate text-body'
            >
                <span className='fw-bolder'>{row.userFullName}</span>
            </Link>
            <small className='text-truncate text-muted mb-0'>{row.userEmail}</small>
        </div>
    </div>,

});

const statusObj = {
    UNDERREVIEW: 'light-warning',
    REJECTED: 'light-danger',
    COMPLETED: 'light-success',
    CANCELED: 'light-secondary',
}

const StatusColumn = CreateColumn({
    name: "Status",
    cellCustomizationFunction: (row) => <Badge className='text-capitalize' color={statusObj[row.status.value]} pill>
        {row.status.label}
    </Badge>,
});

const AddressColumn = CreateColumn({
    name: "Address",
    cellCustomizationFunction: (row) => <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <span className='fw-bolder text-body'>{row.userCity}</span>
            <small className='text-truncate text-muted mb-0'>{row.userStreetAddress} / {row.userBuildingNumber}</small>
        </div>
    </div>,
});

const TotalPriceColumn = CreateColumn({
    name: "Total Price",
    cellCustomizationFunction: (row) => <div>
        {row.totalPrice} {row.invoice.buyerCurrencyCode}
    </div>,
});

const OrderDateOfCreationColumn = CreateColumn({
    name: "Created At",
    cellCustomizationFunction: (row) => <div>
        {formatDate(row.createdAt)}
    </div>,
});


const ordersColumns = [UserInfoColumn, StatusColumn, AddressColumn, TotalPriceColumn, OrderDateOfCreationColumn];

export default ordersColumns;
