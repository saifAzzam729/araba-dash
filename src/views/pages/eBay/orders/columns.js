import {Link} from "react-router-dom";
import {Edit, Edit3, Eye, MapPin, Truck, XOctagon} from "react-feather";
import makeGoogleMapsLinkForAddress from "@src/utility/helpers/makeGoogleMapsLinkForAddress";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import CustomCan from "@components/Authorize/CustomCan";
import EditStatusColumn from "@src/views/pages/sale-orders/partials/EditStatusColumn";
import {Button} from "reactstrap";

dayjs.extend(relativeTime)

const columns = [
    {
        field: "select",
        headerName: "selectOrder",
        headerClass: "header-product",
        translateKey: "sale-order.table.select",
        cellRenderer: (params) => {

            let saleOrderShipment= true;
            if(params.data.saleOrderShipment){
                saleOrderShipment = false;
            }else if(params.data.selfPickup){
                saleOrderShipment = false;
            }
            const isSelected = params.node.isSelected();

            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: saleOrderShipment ? 'pointer' : 'not-allowed',
                        opacity: saleOrderShipment ? 1 : 0.5
                    }}
                    onClick={() => {
                        if (saleOrderShipment) {
                            params.node.setSelected(!isSelected);
                        }
                    }}
                >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid #0073cf',
                            borderRadius: '4px',
                            backgroundColor: isSelected ? '#0073cf' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}
                    >
                        {isSelected && '✔'}
                    </div>
                </div>
            );
        },
        resizable: true,
        // flex: 1,
        width: 150,
        minWidth: 150,
        cellStyle: {
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        }

    },
    {
        field: "soipvp.id",
        translateKey: "sale-order.table.productId",
        headerClass: "productId",
        flex: 0.9,
        cellStyle: {
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        cellRenderer: ({data: {saleOrderItems}}) => {

            return <span>{saleOrderItems?.length}</span>
        }
    },
    {
        field: "userFullName",
        headerName: "userFullName",
        cellRenderer: "agGroupCellRenderer",
        headerClass: "header-product",
        translateKey: "sale-order.table.user-info",
        // flex: 1.5,
        width: 200,
        minWidth: 200,
        cellRendererParams: {
            innerRenderer: ({value, data: {userEmail, userPhoneNumber, username}}) => {
                return (
                    <div style={{lineHeight: 1.3, fontSize: 13, whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxWidth: '100px'}}>
                        <div className={'fw-bolder'}>{value}</div>
                        <div style={{lineHeight: 1.5, color: '#0073cf'}}>{username || userEmail}</div>
                        <div>{userPhoneNumber}</div>
                    </div>
                )
            }
        },
    },
    {
        field: "userStreetAddress",
        translateKey: "sale-order.table.address",
        flex: 2,
        cellStyle: {
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        cellRenderer: ({
                           data: {
                               country,
                               city,
                               userFullName,
                               userStreetAddress,
                               userPostalCode,
                               userAddressNotes,
                               customShippingToAddress
                           }
                       }) => {

            return (
                <div className='d-flex justify-content-left align-items-start gap-50'>

                    <div className='d-flex flex-column ' style={{lineHeight: 1.5, color: '#0073cf'}}>
                        {customShippingToAddress?.companyName &&
                            <span className='text-truncate  mb-0'>{customShippingToAddress.companyName}</span>}
                        {customShippingToAddress?.fullName &&
                            <span className='text-truncate  mb-0'>{customShippingToAddress.fullName}</span>}
                        {customShippingToAddress?.addressLine2 &&
                            <span className='text-truncate  mb-0'>{customShippingToAddress?.addressLine2}</span>
                        }
                        {customShippingToAddress?.addressLine1 &&
                            <span className='text-truncate  mb-0'>{customShippingToAddress?.addressLine1}</span>
                        }
                        {
                            customShippingToAddress?.postalCode &&
                            <span
                                className='text-truncate  mb-0'>{`${customShippingToAddress.postalCode} - ${customShippingToAddress?.city}`}</span>
                        }
                        {customShippingToAddress?.countryIso3 &&
                            <span className='fw-bolder '>{customShippingToAddress.countryIso3} </span>

                        }
                    </div>
                </div>
            )
        },

    },
   

   
    {
        field: "totalPrice",
        translateKey: "sale-order.table.total-price",
        cellStyle: {
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        cellRenderer: ({value, data: {buyerCurrencyCode}}) => {
            return <span>{value + " " + buyerCurrencyCode}</span>
        }
    },
   
    {
        field: "ebayOrderDetails.orderId",
        translateKey: "sale-order.table.ebayOrderId",
        headerClass: "header-sku",
        flex: 1.5,
    },

];


export const createColumns = (width, permissionObject, onView, onEditAddress, onOpenEditPage, statusOptions, onEditSuccess) => {
    return [...columns,
        // {
        //     field: 'status',
        //     headerName: "status",
        //     translateKey: "sale-order.table.status",
        //     flex: 1,
        //     cellRenderer: ({data}) => {
        //         return (
        //             <div>
        //                 <EditStatusColumn
        //                     row={data}
        //                     statusOptions={statusOptions ? statusOptions.data : []}
        //                     onEditSuccess={onEditSuccess}
        //                     className={'d-flex'}
        //                 />
        //             </div>
        //         )
        //     },
        // },
        {
            field: "createdAt",
            translateKey: "sale-order.table.created-at",
            flex: 1.5,
            cellRenderer: ({value}) => {

                const isInLast24Hours = dayjs().diff(dayjs(value), 'hours') <= 24;
                // const className = isInLast24Hours ? 'text-primary' : '';
                // if (isInLast24Hours) {
                //     return <span className={className}>{dayjs(value.createdAt).fromNow()}</span>
                // }
                return (
                    <span> {dayjs(value).format('YYYY-MM-DD:hh:mm A')}</span>
                )
    
            }
        },
        {
            field: "ActionColumn",
            translateKey: "sale-order.table.ActionColumn",
            flex: 1.5,
            cellStyle: {
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
            cellRenderer: ({data}) => {
                const hasShipmentId = data?.saleOrderShipment?.id
                const selfPickup = data?.selfPickup
                return (
                    <>
                        <CustomCan permissionName={permissionObject?.view}>
                        <span
                            className='cursor-pointer mx-1 text-primary me-1'
                            onClick={() => onView(data)}>
                            <Eye size={17}/>
                        </span>
                        </CustomCan>
                        <CustomCan permissionName={permissionObject?.edit}>
                        <span
                            className='cursor-pointer mx-1 text-warning me-1'
                            onClick={() => onEditAddress(data)}>
                            <Edit size={17}/>
                        </span>
                        </CustomCan>
                        <Button
                            disabled={!hasShipmentId || selfPickup}
                            color={'link'}
                            className={`${!hasShipmentId || selfPickup ? 'text-muted' : 'text-info cursor-pointer'}  me-1`}
                            onClick={() => onOpenEditPage(data)}>


                            <Truck size={17}/>
                        </Button>
                    </>
                )
            }
        },
    ]
}

export default columns;
