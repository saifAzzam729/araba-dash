import * as yup from "yup";

export const createSchema = (translateFunction) => {
    return yup.object().shape({
        nameAr: yup.string().required(translateFunction('forms.field-required')),
        nameEn: yup.string().required(translateFunction('forms.field-required')),
        descriptionAr: yup.string().required(translateFunction('forms.field-required')),
        descriptionEn: yup.string().required(translateFunction('forms.field-required')),
        options: yup.array().of(
            yup.object().shape({
                translations: yup.object().shape({
                    valueEn: yup.string().required(translateFunction('forms.field-required')),
                    valueAr: yup.string().required(translateFunction('forms.field-required')),
                    descriptionEn: yup.string().required(translateFunction('forms.field-required')),
                    descriptionAr: yup.string().required(translateFunction('forms.field-required')),
                }),
            })
        ),
    });
}
