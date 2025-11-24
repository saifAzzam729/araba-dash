import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const editSchema = yup.object().shape({
  status: yup.object().required(),
});

export const SaleOrdersSchemas = {
  editSchema,
};

export const SaleOrderResolvers = {
  editResolver: yupResolver(editSchema),
};
