import * as yup from "yup";


export const addShippingPolicySchema = (translate) => {
    return yup.object().shape({
        title: yup.string().required(translate("forms.field-required")),
        // description: yup.string().required(translate("forms.field-required")),

    });
};
export const editSchema = (translate) => {
    return yup.object().shape({
        name: yup.string().required(translate("forms.field-required")),
        city: yup.string().required(translate("forms.field-required")),
        country: yup.string().required(translate("forms.field-required")),
        postalCode: yup.string().required(translate("forms.field-required")),
    });
};


export const options = [
    {
        label: "flat", value: 'FLAT_RATE'
    },
    {
        label: "no-shipping", value: 'NOT_SPECIFIED'
    }
]
export const timeOptions = [
    {
        label: "1 Day", value: '1',
    },
    {
        label: "2 Days", value: '2',
    },
    {

        label: "3 Days", value: '3'
    },

]

export const ShippingServiceUsOptions = [
    {
        label: "FedEx", value: 'FedEx2Day'
    },

]

export const ShippingServiceDeOptions = [
    {
        label: "Deutsche Post Brief", value: 'DE_DeutschePostBrief'
    },
    // {
    //     label: "Selbstabholung", value: 'DE_Pickup'
    // },
    {
        label: "Hermes Päckchen", value: 'DE_HermesPackchen'
    },
    {
        label: "DHL Päckchen", value: 'DE_DHLPackchen'
    },
]
export const intShippingServiceDeOptions = [
    {
        label: "Deutsche Post Brief International", value: 'DE_DeutschePostBriefInternational'
    },

]
export const intShippingServiceUsOptions = [
    {
        label: "USPS Priority Mail International", value: 'USPSPriorityMailInternational'
    },

]
export const ShippingModeOptions = [
    {
        label: "FREE", value: true
    }, {
        label: "CUSTOM", value: false
    },
]
