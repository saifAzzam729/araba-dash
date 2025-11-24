import * as yup from "yup";

export const ebayListingFormSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate("forms.field-required")),
        ebayAccount: yup.object().nullable().required(translate("forms.field-required")),
        ebayAccountLocation: yup.object().nullable().required(translate("forms.field-required")),
        ebayAccountReturnPolicy: yup.object().nullable().required(translate("forms.field-required")),
        ebayAccountShippingPolicy: yup.object().nullable().required(translate("forms.field-required")),
        ebayAccountSellingPolicy: yup.object().nullable().required(translate("forms.field-required")),
    });
};