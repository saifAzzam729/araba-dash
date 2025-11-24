import * as yup from "yup";

export const editShipmentPackagesSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate('forms.field-required')),
        description: yup.string().required(translate('forms.field-required')),
        dimensionUom: yup.object().shape({
            value: yup.string().required(translate('forms.field-required')),
        }),
        height:  yup.string().required(translate('forms.field-required')) ,
        width:  yup.string().required(translate('forms.field-required')),
        length:  yup.string().required(translate('forms.field-required')),
        weightUom: yup.object().shape({
            value: yup.string().required(translate('forms.field-required')),
        }),
        weight: yup.string().required(translate('forms.field-required'))
    });
};
