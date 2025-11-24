import {Link} from "react-router-dom";
import {Badge} from "reactstrap";
import {formatDate} from "@utils";
import CreateColumn from "@components/table/CreateColumn";

const UserInfoColumn = CreateColumn({
    name: "User Info",
    translateKey: "affiliates.table.user-info",
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
    translateKey: "affiliates.table.status",
    cellCustomizationFunction: (row) => <Badge className='text-capitalize' color={statusObj[row.status.value]} pill>
        {row.status.label}
    </Badge>,
});

const AddressColumn = CreateColumn({
    name: "Address",
    translateKey: "affiliates.table.address",
    cellCustomizationFunction: (row) => <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <span className='fw-bolder text-body'>{row.userCity}</span>
            <small className='text-truncate text-muted mb-0'>{row.userStreetAddress} / {row.userBuildingNumber}</small>
        </div>
    </div>,
});

const AffiliateCommissionColumn = CreateColumn({
    name: "Affiliate Commission",
    translateKey: "affiliates.table.commission",
    cellCustomizationFunction: (row) => <div>
            {row.affiliate ? row.affiliate.commission : "_"}
        </div>,
});

const TotalPriceColumn = CreateColumn({
    name: "Total Price",
    translateKey: "affiliates.table.total-price",
    cellCustomizationFunction: (row) => <div>
        {row.totalPrice} {row.buyerCurrencyCode}
    </div>,
});

const AffiliateOrderDateOfCreationColumn = CreateColumn({
    name: "Created At",
    translateKey: "affiliates.table.created-at",
    cellCustomizationFunction: (row) => <div>
        {formatDate(row.createdAt)}
    </div>,
});


const columns = [UserInfoColumn, StatusColumn, AddressColumn, AffiliateCommissionColumn, TotalPriceColumn, AffiliateOrderDateOfCreationColumn];

export default columns;
