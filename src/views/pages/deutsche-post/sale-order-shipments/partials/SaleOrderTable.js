import {Table} from "reactstrap";
import React from "react";
import {Eye} from "react-feather";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";


export default function ({saleOrders}) {

    const navigate = useNavigate()
    const {translate, makeLocaleUrl} = useLocaleContext()
    const handleShowOrder = (orderId) => {
        navigate(makeLocaleUrl(`ebay-sale-orders/view/${orderId}`))
    }
    return (
        <Table responsive bordered className='my-1'>
            <thead>
            <tr>
                <th>{translate("sale-orders-shipments.forms.refNumber")}</th>
                <th>{translate("sale-orders-shipments.forms.userFullName")}</th>
                <th>{translate("sale-orders-shipments.forms.address")}</th>
                <th>{translate("sale-orders-shipments.forms.action")}</th>
            </tr>
            </thead>
            <tbody>
            {saleOrders.map((order) => (
                <tr key={order.id}>
                    <td>
                        {order.refNumber}
                    </td>
                    <td>
                        {order.userFullName}
                    </td>
                    <td>
                        {`${order.address?.city || ''} - ${order.address?.userStreetAddress || ''}`}
                    </td>
                    <td className={'text-center'}>
                        <span className={'text-primary cursor-pointer '}>
                        <Eye size={17} onClick={() => handleShowOrder(order?.id)}/>
                        </span>

                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}