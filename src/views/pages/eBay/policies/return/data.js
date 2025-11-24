import * as yup from "yup";


export const addReturnPolicySchema = (translate) => {

    return yup.object().shape({
        // GENERAL
        title: yup.string().required(translate("forms.field-required")),
        description: yup.string().required(translate("forms.field-required")),

    });
};


export const options = [
    {
        label: "yes", value: 'yes'
    },
    {
        label: "no", value: 'no'
    }
]

export const PeriodTypeOptionsFactory = (translate) => {
    return [
        {
            label: '14 Days',
            value: '14'
        },
        {
            label: '30 Days',
            value: '30'
        },
        {
            label: '60 Days',
            value: '60'
        }
    ];
};
export const PayerOptionsFactory = (translate) => {
    return [
        {
            label: translate("ebay.forms.buyer"),
            value: 'BUYER'
        },
        {
            label: translate("ebay.forms.seller"),
            value: 'SELLER'
        },
    ];
};