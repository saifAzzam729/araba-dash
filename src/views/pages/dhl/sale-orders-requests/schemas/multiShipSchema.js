import * as yup from 'yup';

export const multiShipSchema = (translate, shipments) =>
    yup.object().shape({
        checkShipmentsValidation: yup.boolean().test(
            'is-shipment-valid',
            translate('sale-orders-shipments.error.missingOrder'),
            value => Array.isArray(shipments) && shipments.every(
                shipment => shipment.selectedOrderId || shipment.orders.length === 1
            )
        ),
        shipmentShipper :yup.object().required(translate("forms.field-required")),
        shipmentProduct: yup.object().required(translate("forms.field-required")),
    });