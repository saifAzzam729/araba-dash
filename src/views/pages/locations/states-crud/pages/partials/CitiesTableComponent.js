import {CardBody, Col, Row, Table} from "reactstrap";
import {Edit, Eye, Trash} from "react-feather";
import CardAction from "@components/card-actions";
import React from "react";
import CustomCan from "@components/Authorize/CustomCan";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";

export default function CitiesTableComponent({
    cities,
    openEditModal,
    openViewModal,
    onDelete,
    setItem
                                             }) {

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_CITIES_ADD,
        PERMISSIONS_NAMES.ROLE_CITIES_UPDATE,
        PERMISSIONS_NAMES.ROLE_CITIES_DELETE,
        PERMISSIONS_NAMES.ROLE_CITIES_SHOW,
        PERMISSIONS_NAMES.ROLE_CITIES_LIST
    );

    return(
        <Row>
            <Col sm='12' className='p-0'>
            <CardAction
                title='Cities'
                actions={['collapse']}
                style={{background: 'white !important'}}
            >
                <CardBody className='pt-0'>
                    <Table responsive bordered>
                        <tbody>
                        {cities.map((city, index) => {
                            return (
                                <tr key={`city-${index}`}>
                                    <td style={{ width: '80%' }}>{city.name}</td>
                                    <td className='text-center'>
                                        <CustomCan permissionName={permissionObject?.view}>
                                        <span
                                            className='cursor-pointer mx-1 text-primary me-1'
                                            onClick={()=>{
                                                openViewModal()
                                                setItem(city)
                                            }}>
                                                            <Eye size={17} />
                                        </span>
                                        </CustomCan>

                                        <CustomCan permissionName={permissionObject?.edit}>
                                        <span
                                            className='cursor-pointer mx-1 text-warning me-1'
                                            onClick={()=> {
                                                openEditModal()
                                                setItem(city)
                                            }}>
                                            <Edit size={17} />
                                        </span>
                                        </CustomCan>

                                        <CustomCan permissionName={permissionObject?.delete}>
                                        <span
                                            className='cursor-pointer mx-1 text-danger me-1'
                                            onClick={()=>onDelete(city)}>
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