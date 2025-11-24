import {CardBody, Table} from "reactstrap";
import CardAction from "@components/card-actions";
import React from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function UserTable({users}) {
    const {translate} = useLocaleContext()

    return (
        <CardAction
            title='Users'
            actions={['collapse']}
            style={{background: 'white !important'}}
        >
            <CardBody className='p-0 px-2'>
                <Table responsive bordered>
                    <tbody>
                    {users?.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={`user-${index}`}>
                                <td>{user?.fullName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>{translate('user-groups.table.no-users')}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </CardBody>
        </CardAction>
    )
}