import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AwardsService from "../../../common/services/AwardsService";
import handleToggle from "../../../@core/components/alert/handleToggle";

const addSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      name: yup.string().required("This field is Required"),
    }),
  }),
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
});

export const PetTypeSchemas = {
  addSchema,
  editSchema,
};

export const PetTypeResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};
export const handleTogglePublish = (item, newValue, setValueCb) => {
  const toggleItemCb = () => {
    return AwardsService.update(item.id, {publish: newValue});
  };
  return handleToggle(item.id, newValue, setValueCb, toggleItemCb)
};
