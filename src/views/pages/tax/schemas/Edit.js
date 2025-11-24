import * as yup from "yup";

export const editTaxSchema = (translate) => {
    return yup.object().shape({
        nameEn: yup.string().required(translate('forms.field-required')),
        nameAr: yup.string().required(translate('forms.field-required')),
        taxRate: yup.number().required(translate('forms.field-required')),
    });
};
