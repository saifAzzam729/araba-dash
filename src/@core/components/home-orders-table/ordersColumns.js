import {Link} from "react-router-dom";
import {Badge} from "reactstrap";
import CreateColumn from "../table/CreateColumn";
import {formatDate} from "@fullcalendar/react";
import defaultAvatar from "@src/assets/images/logo/default-avatar.jpg";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const UserInfoColumn = CreateColumn({
    name: "User Info",
    minWidth: '150px',
    translateKey: "sale-order.table.user-info",
    cellCustomizationFunction: (row) => {
        return (
            <div className='d-flex flex-column'>
                <Link
                    to={`/users/profile/${row.user}`}
                    className='user_name text-truncate text-body'
                    style={{marginBottom: '4px'}}
                >
                    <span className='fw-bolder'>{row.userFullName}</span>
                </Link>
                <a href={`mailto:${row.userEmail}`} className='text-truncate text-muted'
                   style={{marginBottom: '4px'}}>{row.userEmail}</a>
                <a href={`tel:${row.userPhoneNumber}`}
                   className='text-truncate text-muted mb-0'>{row.userPhoneNumber}</a>
            </div>
        )
    },

});

const statusObj = {
    UNDERREVIEW: 'light-warning',
    REJECTED: 'light-danger',
    COMPLETED: 'light-success',
    CANCELED: 'light-secondary',
}

const StatusColumn = CreateColumn({
    name: "Status",
    translateKey: "sale-order.table.status",
    cellCustomizationFunction: (row) => <Badge className='text-capitalize' color={statusObj[row.status.value]} pill>
        {row.status.label}
    </Badge>,
});


const TotalPriceColumn = CreateColumn({
    name: "Total Price",
    translateKey: "sale-order.table.total-price",
    cellCustomizationFunction: (row) => <div>
        {row.totalPrice} {row.buyerCurrencyCode}
    </div>,
});

const OrderDateOfCreationColumn = CreateColumn({
    name: "Created At",
    translateKey: "sale-order.table.created-at",
    cellCustomizationFunction: (row) => {
        const isInLast24Hours = dayjs().diff(dayjs(row.createdAt), 'hours') <= 24;
        const className = isInLast24Hours ? 'text-primary' : '';

        if (isInLast24Hours) {
            return <span className={className}>{dayjs(row.createdAt).fromNow()}</span>
        }

        return (
            <span>{dayjs(row.createdAt).fromNow()} at {dayjs(row.createdAt).format('hh:mm A')}</span>
        )

    }
});


const ordersColumns = [UserInfoColumn, StatusColumn, TotalPriceColumn, OrderDateOfCreationColumn];

export default ordersColumns;
