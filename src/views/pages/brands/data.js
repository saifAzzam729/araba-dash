import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BrandsService from "@src/common/services/BrandsService";
import handleToggle from "@components/alert/handleToggle";


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

export const BrandSchemas = {
  addSchema,
  editSchema,
};

export const BrandResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};

export const handleTogglePublish = (item, newValue, setValueCb) => {
  const toggleItemCb = () => {
    return BrandsService.update(item.id, {publish: newValue});
  };
  return handleToggle(item.id, newValue, setValueCb, toggleItemCb)
};
