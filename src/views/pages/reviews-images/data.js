import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import handleToggle from "@components/alert/handleToggle";
import ReviewsImagesService from "../../../common/services/ReviewsImagesService";

const addSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      comment: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      comment: yup.string().required("This field is Required"),
    }),
  }),
  userFullName: yup.string().required('This field is Required'),

});

const editSchema = yup.object().shape({
  translations: yup.object().shape({
    en: yup.object().shape({
      comment: yup.string().required("This field is Required"),
    }),
    ar: yup.object().shape({
      comment: yup.string().required("This field is Required"),
    }),
  }),
  userFullName: yup.string().required('This field is Required')
});

export const ReviewsImagesSchemas = {
  addSchema,
  editSchema,
};

export const ReviewsImagesResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};

export const handleTogglePublish = (item, newValue, setValueCb) => {
  const toggleItemCb = () => {
    return ReviewsImagesService.togglePublish(item.id, {publish: newValue});
  };
  return handleToggle(item.id, newValue, setValueCb, toggleItemCb)
};
