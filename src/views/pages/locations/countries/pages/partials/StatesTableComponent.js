import {CardBody, Col, Row, Table} from "reactstrap";
import {Edit, Eye, Trash} from "react-feather";
import CardAction from "@components/card-actions";
import React from "react";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import CustomCan from "@components/Authorize/CustomCan";

export default function StatesTableComponent({
    states,
    openEditModal,
    openViewPage,
    onDelete,
    setItem
                                             }) {

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_STATES_ADD,
        PERMISSIONS_NAMES.ROLE_STATES_UPDATE,
        PERMISSIONS_NAMES.ROLE_STATES_DELETE,
        PERMISSIONS_NAMES.ROLE_STATES_SHOW,
        PERMISSIONS_NAMES.ROLE_STATES_LIST
    );

    return(
        <Row>
            <Col sm='12' className='p-0'>
            <CardAction
                title='States'
                actions={['collapse']}
                style={{background: 'white !important'}}
            >
                <CardBody className='pt-0'>
                    <Table responsive bordered>
                        <tbody>
                        {states.map((state, index) => {
                            return (
                                <tr key={`city-${index}`}>
                                    <td style={{ width: '80%' }}>{state.name}</td>
                                    <td className='text-center'>
                                        <CustomCan permissionName={permissionObject?.view}>
                                        <span
                                            className='cursor-pointer mx-1 text-primary me-1'
                                            onClick={()=>{
                                                openViewPage(state.id)
                                            }}>
                                            <Eye size={17} />
                                        </span>
                                        </CustomCan>

                                        <CustomCan permissionName={permissionObject?.edit}>
                                        <span
                                            className='cursor-pointer mx-1 text-warning me-1'
                                            onClick={()=> {
                                                openEditModal()
                                                setItem(state)
                                            }}>
                                            <Edit size={17} />
                                        </span>
                                        </CustomCan>

                                        <CustomCan permissionName={permissionObject?.delete}>
                                        <span
                                            className='cursor-pointer mx-1 text-danger me-1'
                                            onClick={()=>onDelete(state)}>
                                            <Trash size={17} />
                                        </span>
                                        </CustomCan>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </CardBody>
            </CardAction>
        </Col>
    </Row>
    )
}