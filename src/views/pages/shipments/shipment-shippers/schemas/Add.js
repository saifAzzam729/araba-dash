import * as yup from "yup";

export const addShipmentShipperSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate('forms.field-required')),
        description: yup.string().required(translate('forms.field-required')),
        addressStreet: yup.string().required(translate('forms.field-required')),
        additionalAddressInformation: yup.string().nullable(),
        email: yup.string().required(translate('forms.field-required')),
        phone: yup.number().required(translate('forms.field-required')),
        postalCode: yup.string().required(translate('forms.field-required')),
        country: yup.object().shape({
            value: yup.string().required(translate('forms.field-required')),
        }),
        city: yup.object().shape({
            value: yup.string().required(translate('forms.field-required')),
        }),
    });
};
