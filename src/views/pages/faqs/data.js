import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const addSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      question: yup.string().required("This field is Required"),
      answer: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      question: yup.string().required("This field is Required"),
      answer: yup.string().required("This field is Required"),
    }),
  }),
});

const editSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      question: yup.string().required("This field is Required"),
      answer: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      question: yup.string().required("This field is Required"),
      answer: yup.string().required("This field is Required"),
    }),
  }),
});

export const FaqSchemas = {
  addSchema,
  editSchema,
};

export const FaqResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};
