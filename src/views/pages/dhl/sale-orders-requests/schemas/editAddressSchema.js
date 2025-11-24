import * as yup from "yup";

export const editAddressSchema = (translate) => {
    return yup.object().shape({
        companyName: yup.string(),
        userFullName: yup.string().required(translate("forms.field-required")),

        email: yup.string(),
        phoneNumber: yup.string().required(translate("forms.field-required")),

        addressLine1: yup.string().required(translate("forms.field-required")),
        addressLine2: yup.string(),

        city: yup.string().required(translate("forms.field-required")),
        userPostalCode: yup.string().required(translate("forms.field-required")),
        
        countryIso3: yup.string().required(translate("forms.field-required")),

        
    });
};

