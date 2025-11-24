import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const addSchema = yup.object().shape({
    translations: yup.object().shape({
        en: yup.object().shape({
            name: yup.string().required("This field is Required"),
            description: yup.string().required("This field is Required"),
        }),
        ar: yup.object().shape({
            name: yup.string().required("This field is Required"),
            description: yup.string().required("This field is Required"),
        }),
    }),
});

const editSchema = yup.object().shape({
    translations: yup.object().shape({
        en: yup.object().shape({
            name: yup.string().required("This field is Required"),
            description: yup.string().required("This field is Required"),
        }),
        ar: yup.object().shape({
            name: yup.string().required("This field is Required"),
            description: yup.string().required("This field is Required"),
        }),
    }),
});


export const ShippingResolvers = {
    addResolver: yupResolver(addSchema),
    editResolver: yupResolver(editSchema),
};

