import {CardBody, Table} from "reactstrap";
import CardAction from "@components/card-actions";
import React from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function DiscountsTable({discounts}) {
    const {translate} = useLocaleContext()

    return (
        <CardAction
            title='Discounts'
            actions={['collapse']}
            style={{background: 'white !important'}}
        >
            <CardBody className='p-0 px-2'>
                <Table responsive bordered>
                    <tbody>
                    {discounts?.length > 0 ? (
                        discounts.map((discount, index) => (
                            <tr key={`user-${index}`}>
                                <td>{discount?.name}</td>
                                <td>{discount?.value}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>{translate('user-groups.table.no-discounts')}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </CardBody>
        </CardAction>
    )
}