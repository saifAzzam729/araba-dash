import * as yup from "yup";


export const addSellingPolicySchema = (translate) => {

    return yup.object().shape({
        // GENERAL
        title: yup.string().required(translate("forms.field-required")),
    })
};


export const listingOptions = [
    {
        label: "Fixed Price", value: 'FIXED_PRICE',
    },

]
export const quantityOptions = [
    {
        label: "Product Quantity", value: 'PRODUCT_QUANTITY',
    },

]
export const vatOptions = [
    {
        label: "yes", value: 'yes',
    },
    {
        label: "no", value: 'no',
    },

]

export const priceOptions = [
    {
        label: "Product Price", value: 'PRODUCT_PRICE',
    },


]

