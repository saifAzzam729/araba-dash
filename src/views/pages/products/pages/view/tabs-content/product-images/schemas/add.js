import * as yup from "yup";

export const addImagesOptionsSchemaFactory = (translate) => {
    return yup.object().shape({
        images: yup.array().required(translate("forms.field-required")),
        options: yup.array().required(translate("forms.field-required")),

    });
};
