import React from "react";
import DragItemContainer from "@components/drag-and-drop/DrageItemContainer";
import {Button, Col, Row} from "reactstrap";
import {Delete, Trash} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";


export default function ({shipments, setShipments, addOrderToShipment}) {
    const {translate} = useLocaleContext()
    const addShipment = () => {
        const newShipmentId = `shipment-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        setShipments([...shipments, {id: newShipmentId, name: `Shipment `, orders: []}]);
    };

    const handleBadgeClick = (shipmentId, order) => {
        const updatedShipments = shipments.map((shipment) => shipment.id === shipmentId ? {
            ...shipment,
            selectedOrderId: order.id
        } : shipment);
        setShipments(updatedShipments);
    };

    const handleShipmentDelete = (shipmentId) => {
        const updatedShipments = shipments.filter((ship) => ship.id !== shipmentId)
        setShipments(updatedShipments);

    }
    const handleShipOrderDelete = (orderId) => {
        const updatedShipments = shipments.map((shipment) => {
            const updatedOrders = shipment.orders.filter((order) => order.id !== orderId);
            const updatedSelectedOrderId = shipment.selectedOrderId === orderId ? null : shipment.selectedOrderId;

            return {
                ...shipment, orders: updatedOrders, selectedOrderId: updatedSelectedOrderId
            };
        });

        setShipments(updatedShipments);
    };
    return (<>
            <Row className={'mt-3'}>
                <Col sm={6} md={6}>
                    <p>{translate('sale-orders-shipments.common.ship-containers')}</p>
                </Col>
                <Col sm={6} md={6} className={'text-end'}>
                    <Button color={'primary'}
                            onClick={addShipment}>{translate('sale-orders-shipments.common.add-new-ship')}</Button>

                </Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
                {shipments.map((shipment) => (
                    <Col key={shipment.id} sm="6" md="4" lg="3" style={{marginBottom: '20px'}}>
                        <DragItemContainer
                            item={shipment}
                            addItemToContainer={addOrderToShipment}
                        >
                            <>
                                <div className={'d-flex justify-content-between'}>
                                    <div>
                                        <h4>{shipment.name}</h4>
                                        {
                                            shipment.orders.length > 1 &&
                                            <p className={'text-danger '}>{translate('sale-orders-shipments.common.containers-message')}</p>

                                        }

                                    </div>
                                    {
                                        shipments.length > 1 && (<span className="text-danger cursor-pointer text-end">
                                    <Trash size={17} onClick={() => handleShipmentDelete(shipment.id)}/>
                                     </span>)
                                    }
                                </div>
                                <div className="d-flex flex-column align-items-start">
                                    {shipment.orders.map((order) => (
                                        <div key={order.id} className="d-flex align-items-center my-1">
                                            <span className="text-danger me-2 cursor-pointer">
                                                <Delete size={12}
                                                        onClick={() => handleShipOrderDelete(order.id)}/>
                                            </span>
                                            <p
                                                onClick={() => handleBadgeClick(shipment.id, order)}
                                                className={`mb-0 cursor-pointer ${shipment.selectedOrderId === order.id ? 'text-secondary text-decoration-underline' : 'text-black'}`}
                                            >
                                                {order.refNumber}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        </DragItemContainer>
                    </Col>))}
            </Row>
        </>
    )
}