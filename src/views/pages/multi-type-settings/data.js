import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const editSchema = yup.object().shape({
  value: yup.string(),
});

export const MultiTypeSettingsSchemas = {
  editSchema,
};

export const MultiTypeSettingsResolvers = {
  editResolver: yupResolver(editSchema),
};

export const formatMultiTypeSettingName = (key) => {
  const namesObject = {
    FACEBOOK_LINK: 'Facebook Page Link',
    INSTAGRAM_LINK: 'Instagram Page Link',
    YOUTUBE_LINK: 'YouTube Account Link',
    CONTACT_EMAIL: 'Contact Email',
    CONTACT_HOURS: 'Contact Hours',
    PHONE_NUMBER: 'Phone Number',
  }
  const foundName = namesObject[key];
  return foundName ?? key;
}