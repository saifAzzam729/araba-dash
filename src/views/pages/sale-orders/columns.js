import {Link} from "react-router-dom";
import {MapPin} from "react-feather";
import makeGoogleMapsLinkForAddress from "@src/utility/helpers/makeGoogleMapsLinkForAddress";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime)

const columns = [
    {
        field: "userFullName",
        headerName: "userFullName",
        cellRenderer: "agGroupCellRenderer",
        headerClass: "header-product",
        translateKey: "sale-order.table.user-info",
        flex: 1.5,
        cellRendererParams: {
            innerRenderer: ({value, data: {userEmail, userPhoneNumber,username}}) => {
                return (
                    <div style={{lineHeight: 1.8, fontSize: 13}}>
                        <div className={'fw-bolder'}>{value}</div>
                        <div>{username ? username :userEmail}</div>
                        <div>{userPhoneNumber}</div>
                    </div>
                )
            }
        },
    },
    {
        field: "refNumber",
        translateKey: "sale-order.table.reference",
        headerClass: "header-sku",
        flex: 1.2,
    },
    {
        field: "userStreetAddress",
        translateKey: "sale-order.table.address",
        flex: 2,
        cellRenderer: ({
                           value,
                           data: {
                               country,
                               state,
                               city,
                               userFullName,
                               userStreetAddress,
                               userPostalCode,
                               userAddressNotes,
                               customShippingToAddress
                           }
                       }) => {
            const link = makeGoogleMapsLinkForAddress(
                country?.name,
                state?.name,
                city?.name,
                value,
            );
            return (
                <div className='d-flex justify-content-left align-items-start gap-50'>
                    <Link
                        className={"cursor-pointer"}
                        to={link}
                        target="_blank"
                    >
                        <MapPin/>
                    </Link>
                    <div className='d-flex flex-column' style={{lineHeight: 1.5}}>
                        {customShippingToAddress?.companyName && <span className='text-truncate text-muted mb-0'>{customShippingToAddress.companyName}</span>}
                        {customShippingToAddress?.fullName && <span className='text-truncate text-muted mb-0'>{customShippingToAddress.fullName}</span>}
                        {customShippingToAddress?.addressLine2 &&
                            <span className='text-truncate text-muted mb-0'>{customShippingToAddress?.addressLine2}</span>
                        }
                        {customShippingToAddress?.addressLine1 &&
                            <span className='text-truncate text-muted mb-0'>{customShippingToAddress?.addressLine1}</span>
                        }
                        {
                            customShippingToAddress?.postalCode &&
                            <span
                                className='text-truncate text-muted mb-0'>{`${customShippingToAddress.postalCode} - ${customShippingToAddress?.city}`}</span>
                        }
                        {customShippingToAddress?.countryIso3 && <span className='fw-bolder text-body'>{customShippingToAddress.countryIso3} </span> 
                            
                        }
                    </div>
                </div>
            )
        },

    },
    {
        field: "totalPrice",
        translateKey: "sale-order.table.total-price",
        cellRenderer: ({value, data: {buyerCurrencyCode}}) => {
            return <span>{value + " " + buyerCurrencyCode}</span>
        }
    },
    {
        field: "createdAt",
        translateKey: "sale-order.table.created-at",
        flex: 1.5,
        cellRenderer: ({value}) => {
            console.log(value);
            const isInLast24Hours = dayjs().diff(dayjs(value), 'hours') <= 24;
            // const className = isInLast24Hours ? 'text-primary' : '';
            // if (isInLast24Hours) {
            //     return <span className={className}>{dayjs(value.createdAt).fromNow()}</span>
            // }
            return (
                <span> {dayjs(value).format('YYYY-MM-DD:hh:mm A')}</span>
            )

        }
    }
];


export const createColumns = (width) => {
    return columns
}

export default columns;
