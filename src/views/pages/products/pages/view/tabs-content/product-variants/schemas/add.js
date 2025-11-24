import * as yup from "yup";

export const addProductVariantSchemaFactory = (translate) => {
    return yup.object().shape({
        cost: yup.string().nullable(),
        price: yup.string().nullable(),
        quantity: yup.string().required(translate("forms.field-required")),
        sku: yup.string().required(translate("forms.field-required")),
        options: yup.array().required(translate("forms.field-required")),

    });
};
