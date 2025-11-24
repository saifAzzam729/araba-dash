import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const addSchema = yup.object().shape({
  name: yup.string().required("This field is Required"),
});

const editSchema = yup.object().shape({
  name: yup.string().required("This field is Required"),
});

export const RoleSchemas = {
  addSchema,
  editSchema,
};

export const RoleResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};
