import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const addSchema = yup.object().shape({
    title : yup.string().required()
});

const editSchema = yup.object().shape({
  title : yup.string().required()

});

export const BrandSchemas = {
    addSchema,
    editSchema,
};

export const BrandResolvers = {
    addResolver: yupResolver(addSchema),
    editResolver: yupResolver(editSchema),
};
