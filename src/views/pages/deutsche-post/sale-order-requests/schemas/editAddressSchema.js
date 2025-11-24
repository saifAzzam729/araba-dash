import * as yup from "yup";

export const editAddressSchema = (translate) => {
    return yup.object().shape({
        country: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
        }).required(translate("forms.field-required")),

        state: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
        }).required(translate("forms.field-required")),

        city: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
        }).required(translate("forms.field-required")),

        userPostalCode: yup.string().required(translate("forms.field-required")),
        userAddressNotes: yup.string().nullable(),
        userStreetAddress: yup.string().required(translate("forms.field-required")),
        userFullName: yup.string().required(translate("forms.field-required")),
    });
};

