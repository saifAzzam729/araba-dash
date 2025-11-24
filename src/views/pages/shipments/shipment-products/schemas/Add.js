import * as yup from "yup";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";

export const addShipmentProductSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate('forms.field-required')),
        description: yup.string().required(translate('forms.field-required')),
        code: yup.string().required(translate('forms.field-required')),
        billingNumber: yup
            .string()
            .when('shipping', {
                is: (shipping) => shipping?.value === SHIPPING_METHODS.DHL,
                then: yup.string().required(translate('forms.field-required')).length(14, translate('forms.invalid-billing-number')),
                otherwise: yup.string().nullable(),
            }),
        total: yup
            .number()
            .transform((value, originalValue) =>
                originalValue === '' ? null : value
            )
            .positive(translate('forms.invalid-total'))
            .when('shipping', {
                is: (shipping) => shipping?.value === SHIPPING_METHODS.DEUTSCHE_POST,
                then: yup.number().required(translate('forms.field-required')),
                otherwise: yup.number().nullable(),
            }).nullable(),
        shipping: yup.object().shape({
            value: yup.string().required(translate('forms.field-required')),
        }),
    });
};