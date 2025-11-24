import * as yup from "yup";

export const ADD_TAB_ID = 'add-tab-id';

export const createTabIndex = (val) => {
    return `tab-index-${val}`
}

export const createAddSchema = (translateFunction) => {
    return yup.object().shape({
        nameAr: yup.string().required(translateFunction('forms.field-required')),
        nameEn: yup.string().required(translateFunction('forms.field-required')),
        descriptionAr: yup.string().required(translateFunction('forms.field-required')),
        descriptionEn: yup.string().required(translateFunction('forms.field-required')),
        options: yup.array().of(
            yup.object().shape({
                translations: yup.array().of(yup.object().shape({
                    valueEn: yup.string().required(translateFunction('forms.field-required')),
                    valueAr: yup.string().required(translateFunction('forms.field-required')),
                    descriptionEn: yup.string().required(translateFunction('forms.field-required')),
                    descriptionAr: yup.string().required(translateFunction('forms.field-required')),
                })),
            })
        ),
    });
}
