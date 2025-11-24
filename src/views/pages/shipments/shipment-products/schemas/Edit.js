import * as yup from "yup";

export const editShipmentProductSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate('forms.field-required')),
        description: yup.string().required(translate('forms.field-required')),
        code: yup.string().required(translate('forms.field-required')),
        billingNumber: yup
            .string()
            .length(14, translate('forms.invalid-billing-number'))
            .required(translate('forms.field-required')),
        shipping: yup.object().shape({
            value: yup.string().required(translate('forms.field-required')),
        }),
    });
};