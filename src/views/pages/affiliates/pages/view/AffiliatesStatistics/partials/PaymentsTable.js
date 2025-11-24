import CardAction from "@components/card-actions";
import {CardBody, Col, Table} from "reactstrap";
import {formatDate} from "@fullcalendar/react";
import React from "react";
import {Link} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function PaymentsTable({payments}) {
    const {makeLocaleUrl, translate} = useLocaleContext()

    return (
        <Col sm={12} md={12}>
            <CardAction
                title={translate('affiliate-statistics.payment-table.title')}
                actions={['collapse']}
                style={{background: 'white !important'}}
                titleClassName={'text-primary'}
            >
                <CardBody className='pt-0'>
                    {payments && payments.length > 0 ?
                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <td className={'text-primary fw-bold'}>{translate('affiliate-statistics.payment-table.orders')} </td>
                                <td className={'text-primary fw-bold'}>{translate('affiliate-statistics.payment-table.amount')} </td>
                                <td className={'text-primary fw-bold text-center'}>{translate('affiliate-statistics.payment-table.date')} </td>
                            </tr>
                        </thead>

                        <tbody>
                        {payments.map((pay, index) => {
                            return (
                                <tr key={`pay-${index}`}>
                                    <td style={{width: '80%'}}>
                                        {pay.saleOrders.map((order) =>{
                                            return (
                                                <p className={'mb-0'} style={{paddingBottom: '5px'}}>
                                                    {translate('affiliate-statistics.payment-table.order')} :
                                                    <Link
                                                        className='px-25 text-decoration-underline text-info'
                                                        to={makeLocaleUrl(`sale-orders/view/${order.id}`)}
                                                    >
                                                        {order.refNumber}
                                                    </Link>
                                                    / {translate('affiliate-statistics.payment-table.total')} :{order.totalPrice}
                                                </p>
                                            )
                                        }
                                        )}
                                    </td>

                                    <td className='text-center'>
                                        <span className='cursor-pointer mx-1 fw-bold me-1'>
                                           {pay.amount}
                                        </span>
                                    </td>

                                    <td className='text-center'>
                                        <span className='cursor-pointer mx-1 me-1'>
                                           {formatDate(pay.paymentDate)}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    : <span>{translate('affiliate-statistics.no-payments')}</span>
                    }
                </CardBody>
            </CardAction>
        </Col>
    )
}