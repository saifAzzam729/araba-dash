import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const addSchema = yup.object().shape({
  name: yup.string().required("This field is Required"),
  weight: yup.number().required("This field is Required"),
  petBreed: yup.object().required("This field is Required"),
  birthdate: yup.date().required("This field is Required"),
  gender: yup.object().required("This field is Required"),
  user: yup.object().required("This field is Required"),
});

const editSchema = yup.object().shape({
  name: yup.string().required("This field is Required"),
  weight: yup.number().required("This field is Required"),
  petBreed: yup.object().required("This field is Required"),
  birthdate: yup.date().required("This field is Required"),
  gender: yup.object().required("This field is Required"),
  user: yup.object().required("This field is Required"),
});

export const UserPetSchemas = {
  addSchema,
  editSchema,
};

export const UserPetResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};
