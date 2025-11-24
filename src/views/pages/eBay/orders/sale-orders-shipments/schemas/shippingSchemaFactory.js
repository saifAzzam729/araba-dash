import * as yup from 'yup';

export const shippingSchemaFactory = (translate, saleOrders) =>
    yup.object().shape({
        checkShipmentsValidation: yup.boolean().test(
            'is-shipment-valid',
            translate('sale-orders-shipments.error.missingOrder'),
            value => !saleOrders || (Array.isArray(saleOrders) && saleOrders.length > 0)
        ),
        shipmentShipper: yup.object().required(translate("forms.field-required")),
        shipmentProduct: yup.object().required(translate("forms.field-required")),
    });