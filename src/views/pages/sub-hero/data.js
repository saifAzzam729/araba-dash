import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg', 'image/webp', 'image/svg+xml'];

const addSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      title: yup.string().required("This field is Required"),
      description: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      title: yup.string().required("This field is Required"),
      description: yup.string().required("This field is Required"),
    }),
  }),
});

const editSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      title: yup.string().required("This field is Required"),
      description: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      title: yup.string().required("This field is Required"),
      description: yup.string().required("This field is Required"),
    }),
  }),
});

export const SubHeroIconSchemas = {
  addSchema,
  editSchema,
};

export const SubHeroIconResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};
