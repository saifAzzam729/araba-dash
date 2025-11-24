import CardAction from "@components/card-actions";
import {CardBody, Col, Table} from "reactstrap";
import React from "react";
import {Link} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function LinkSaleOrdersTable({linkSaleOrders}) {
    const {translate, makeLocaleUrl} = useLocaleContext();

    return (
        <Col md={12} lg={6}>
            <CardAction
                title={translate('affiliate-statistics.link-table.title')}
                actions={['collapse']}
                titleClassName={'text-primary'}
            >
                <CardBody className='pt-0'>
                    {linkSaleOrders && linkSaleOrders.length > 0 ?
                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <td className={'text-primary fw-bold'}>{translate('affiliate-statistics.link-table.orders')} </td>
                                <td className={'text-primary fw-bold'}>{translate('affiliate-statistics.link-table.commission')} </td>
                            </tr>
                        </thead>
                        <tbody>
                        {linkSaleOrders.map((link, index) => {
                            return (
                                <tr key={`link-${index}`}>
                                    <td style={{width: '80%'}}>
                                        <Link
                                            className='text-decoration-underline text-warning'
                                            to={makeLocaleUrl(`sale-orders/view/${link.id}`)}
                                        >
                                            {link.refNumber}
                                        </Link>
                                    </td>
                                    <td className='text-center'>
                                        {link.commission}
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
