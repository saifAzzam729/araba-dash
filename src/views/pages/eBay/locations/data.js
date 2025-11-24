import * as yup from "yup";


export const addEBayLocationsSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate("forms.field-required")),
        city: yup.string().required(translate("forms.field-required")),
        country: yup.object().required(translate("forms.field-required")),
        postalCode: yup.string().required(translate("forms.field-required")),
    });
};
export const editSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate("forms.field-required")),
        city: yup.string().required(translate("forms.field-required")),
        country: yup.string().required(translate("forms.field-required")),
        postalCode: yup.string().required(translate("forms.field-required")),
    });
};


export const locationOptions = [
    {
        label: "US", value: 'US'
    }, {
        label: "DE", value: 'DE'
    },
]
