import CardAction from "@components/card-actions";
import {CardBody, Col, Table} from "reactstrap";
import React from "react";
import {Link} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function CouponSaleOrdersTable({couponSaleOrders}) {
    const {makeLocaleUrl, translate} = useLocaleContext()
    return (
        <Col md={12} lg={6} >
            <CardAction
                title={translate('affiliate-statistics.coupon-table.title')}
                actions={['collapse']}
                titleClassName={'text-primary'}
            >
                <CardBody className='pt-0'>
                    {couponSaleOrders && couponSaleOrders.length > 0 ?
                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <td className={'text-primary fw-bold'}>{translate('affiliate-statistics.coupon-table.orders')} </td>
                                <td className={'text-primary fw-bold'}>{translate('affiliate-statistics.coupon-table.commission')}  </td>
                            </tr>
                        </thead>

                        <tbody>
                        {couponSaleOrders.map((coupon, index) => {
                            return (
                                <tr key={`coupon-${index}`}>
                                    <td style={{width: '80%'}}>
                                        <Link
                                            className='text-decoration-underline text-info'
                                            to={makeLocaleUrl(`sale-orders/view/${coupon.id}`)}
                                        >
                                            {coupon.refNumber}
                                        </Link>
                                    </td>
                                    <td className='text-center'>
                                        {coupon.commission}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    : <span>{translate('affiliate-statistics.no-orders')}</span>
                    }
                </CardBody>
            </CardAction>
        </Col>
    )
}