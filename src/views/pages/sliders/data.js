import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const addSchema = yup.object().shape({
  titleEn: yup.string().required("This field is Required"),
  titleAr: yup.string().required("This field is Required"),
  descriptionEn: yup.string().required("This field is Required"),
  descriptionAr: yup.string().required("This field is Required"),
  link: yup.string().required("This field is Required").matches(/^https:\/\//, "Must start with 'https://'"),
});

const editSchema = yup.object().shape({
  titleEn: yup.string().required("This field is Required"),
  titleAr: yup.string().required("This field is Required"),
  descriptionEn: yup.string().required("This field is Required"),
  descriptionAr: yup.string().required("This field is Required"),
  link: yup.string().required("This field is Required").matches(/^https:\/\//, "Must start with 'https://'"),
});

export const SliderSchemas = {
  addSchema,
  editSchema,
};

export const SliderResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};
