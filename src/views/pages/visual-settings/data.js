import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const editSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
  }),
  identifier: yup.string().required("This field is Required")
});

export const VisualSettingsSchemas = {
  editSchema,
};

export const VisualSettingsResolvers = {
  editResolver: yupResolver(editSchema),
};
