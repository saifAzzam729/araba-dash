import * as yup from "yup";

export const editUserSchema = (translate) => {
    return yup.object().shape({
        fullName: yup.string().required(translate('forms.field-required')),
        email: yup.string().required(translate('forms.field-required')),
        phoneNumber: yup.string().required(translate('forms.field-required')),
        gender: yup.object().shape({
            value: yup.string().required(translate('forms.field-required'))
        }),
        country: yup.object().shape({
            value: yup.string().required(translate('forms.field-required')),
        }),
        dateOfBirth: yup.date().required(translate('forms.field-required')),
        roleGroup: yup.object().shape({
            value: yup.string().required(translate('forms.field-required'))
        }),
        userGroup: yup.object().shape({
            value: yup.string().required(translate('forms.field-required'))
        }),
    });
}

