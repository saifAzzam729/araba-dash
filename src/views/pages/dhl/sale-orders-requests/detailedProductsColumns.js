import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import Avatar from "@mui/material/Avatar";
import {UncontrolledTooltip} from "reactstrap";

dayjs.extend(relativeTime)

const detailedColumns = [
    {
        field: 'imageFileUrl',
        translateKey: 'common.product-image',
        cellStyle: {
            justifyContent: 'center'
        },
        cellRenderer: ({value}) => {
            return (
                <Link
                    to={value ? ParseImageUrl(value) : "#"}
                    target={value ? "_blank" : undefined}
                    className="my-2"
                >
                    <Avatar
                        alt={`avatar`}
                        sx={{
                            width: 56,
                            height: 56,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                cursor: 'pointer',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transform: 'scale(1.3)',
                            },
                        }}
                        src={ParseImageUrl(value)}
                    />
                </Link>
            )
        }
    },
    {
        field: "name",
        flex: 2,
        sort: true,
        translateKey: 'common.product-info',
        cellRenderer: ({data}) => {
            return (
                <div className="d-flex flex-column my-2">
                    <div className="h6" id={`product-name-${data.id}`}>
                        {data.name}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                        }}
                    >
                        {data.category.length > 0 &&
                            <>
						<span className='d-flex gap-25' id={`product-category-${data.id}`}>
						{data?.category.map((category) => <span class="badge bg-secondary text-capitalize"
                                                                id={`product-category-${data.id}`}>{category?.name}</span>)}

						</span>
                                <UncontrolledTooltip
                                    placement="top"
                                    target={`product-category-${data.id}`}
                                >
                                    Category
                                </UncontrolledTooltip>
                            </>
                        }
                    </div>
                </div>
            )
        },

    },

    {
        field: "saleOrderItemOption",
        translateKey: 'common.product-options',
        flex: 1.5,
        cellRenderer: ({value}) => {
            return (
                <>
                    {value &&
                        <div
                            style={{
                                display: "flex",
                                gap: '0.5rem',
                                marginTop: '12px',
                                marginBottom: '12px',
                                width: '100%',
                                flexWrap: 'wrap'
                            }}
                        >
                            {value.map((saleOrderItemOption) => {
                                return (
                                    <>
                                    <span class="badge bg-warning text-capitalize fs-6"
                                          id={`attributeOption-${saleOrderItemOption.attribute}-${saleOrderItemOption.id}`}>
                                        {saleOrderItemOption?.attributeOption || '-'}
                                    </span>
                                        <UncontrolledTooltip placement="bottom"
                                                             target={`attributeOption-${saleOrderItemOption.attribute}-${saleOrderItemOption.id}`}>
                                            {saleOrderItemOption?.attribute} / {saleOrderItemOption?.price}
                                        </UncontrolledTooltip>
                                    </>
                                )
                            })
                            }
                            {value.length === 0 && <>_</>}
                        </div>
                    }
                </>
            )
        }
    },
    {
        field: 'saleOrderItemQuantity',
        translateKey: 'common.quantity',
        cellRenderer: ({value}) => (
            <div>{value}</div>
        ),

    },
    {
        field: "unitPriceAfterDiscount",
        translateKey: 'common.price',
        cellRenderer: ({value}) => (
            <div>{value}</div>
        ),
    },
    {
        field: "unitPriceAfterDiscount",
        headerName: 'Total',
        translateKey: 'common.total',
        cellRenderer: ({value, data: {saleOrderItemQuantity}}) => {
            return (
                <div>{value * saleOrderItemQuantity}</div>
            )
        },
    },
];


export const createColumns = (width) => {
    return detailedColumns
}

export default detailedColumns;
