import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import handleToggle from "@components/alert/handleToggle";
import TagsService from "@src/common/services/TagsService";
import BrandsService from "@src/common/services/BrandsService";

const addSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      title: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      title: yup.string().required("This field is Required"),
    }),
  }),
});

const editSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      title: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      title: yup.string().required("This field is Required"),
    }),
  }),
});

export const TagsSchemas = {
  addSchema,
  editSchema,
};

export const TagsResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};

export const handleTogglePublish = (item, newValue, setValueCb) => {
  const toggleItemCb = () => {
    return TagsService.update(item.id, {publish: newValue});
  };
  return handleToggle(item.id, newValue, setValueCb, toggleItemCb)
};
