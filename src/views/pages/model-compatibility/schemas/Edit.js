import * as yup from "yup";

export const EditModelSchema = (translate) => {
    return yup.object().shape({
        nameEn: yup.string().required(translate('forms.field-required')),
        nameAr: yup.string().required(translate('forms.field-required')),
        brand: yup.object().required(translate('forms.field-required')),
    });
};
