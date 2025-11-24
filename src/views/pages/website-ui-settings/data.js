import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const editSchema = yup.object().shape({
  // value: yup.string(),
});

export const MultiTypeSettingsSchemas = {
  editSchema,
};

export const MultiTypeSettingsResolvers = {
  editResolver: yupResolver(editSchema),
};

export const formatMultiTypeSettingName = (key) => {
  const namesObject = {
    Footer_Logo_Brief : 'footer-logo-brief',
    ENABLE_USER_MULTI_ADDRESS: 'enable-user-address',
    Footer_Copy_Right: 'footer-copy-right',
    ENABLE_FOOTER_FLAG: 'enable-footer-flag',
    GUEST_CHECKOUT_REQUIRED_FIELDS: 'guest-checkout-req'
  }
  const foundName = namesObject[key];
  return foundName ?? key;
}