import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import handleToggle from "@components/alert/handleToggle";
import CountriesService from "@src/common/services/CountriesService";

const addSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
  }),
  iso2: yup.string().required("This field is Required"),
  phoneNumberCode: yup.string().required("This field is Required"),
});

const editSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
  }),
  iso2: yup.string().required("This field is Required"),
  phoneNumberCode: yup.string().required("This field is Required"),
});

export const CountriesSchemas = {
  addSchema,
  editSchema,
};

export const CountriesResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};

export const handleTogglePublish = (item, newValue, setValueCb) => {
  const toggleItemCb = () => {
    return CountriesService.update(item.id, {active: newValue});
  };
  return handleToggle(item.id, newValue, setValueCb, toggleItemCb)
};
