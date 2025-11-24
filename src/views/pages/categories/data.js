import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import handleToggle from "@components/alert/handleToggle";
import CategoriesService from "@src/common/services/CategoriesService";

const addSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      name: yup.string().required("This field is Required"),
      description: yup.string().nullable(),
    }),
    ar: yup.object().shape({
      name: yup.string().required("This field is Required"),
      description: yup.string().nullable(),
    }),
  }),
});

const editSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      name: yup.string().required("This field is Required"),
      description: yup.string().nullable(),
    }),
    ar: yup.object().shape({
      name: yup.string().required("This field is Required"),
      description: yup.string().nullable(),
    }),
  }),
});

export const CategorySchemas = {
  addSchema,
  editSchema,
};

export const CategoryResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};

export const handleTogglePublish = (item, newValue, setValueCb) => {
  const toggleItemCb = () => {
    return CategoriesService.update(item.id, {publish: newValue});
  };
  return handleToggle(item.id, newValue, setValueCb, toggleItemCb)
};

