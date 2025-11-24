import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import handleToggle from "@components/alert/handleToggle";
import ProductReviewsService from "@src/common/services/ProductReviewsService";


const addSchema = yup.object().shape({
  title: yup.string().required("This field is Required"),
  message: yup.string().required("This field is Required"),
  rate: yup.number().required("This field is Required and should be number"),

});

const editSchema = yup.object().shape({
  title: yup.string().required("This field is Required"),
  message: yup.string().required("This field is Required"),
  rate: yup.number().required("This field is Required and should be number"),
});

export const ProductReviewSchemas = {
  addSchema,
  editSchema,
};

export const ProductReviewResolvers = {
  addResolver: yupResolver(addSchema),
  editResolver: yupResolver(editSchema),
};

export const handleTogglePublish = (item, newValue, setValueCb) => {
  const toggleItemCb = () => {
    return ProductReviewsService.update(item.id, {publish: newValue});
  };
  return handleToggle(item.id, newValue, setValueCb, toggleItemCb)
};
