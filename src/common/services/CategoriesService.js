import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.PRODUCT_CATEGORIES_URLS.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "", publish = undefined, locale = 'en' }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
			search,
			publish
		},
		headers: {
			'x-locale': locale
		}
	});
	return res.data;
};

const create = async ({ translations, image, publish, parent, featured, guide }) => {
	const dataToSend = {
		translations,
		image,
		publish,
		parent,
		featured,
		guide
	};
	const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
	return res.data;
};

const getById = async (id, {locale = 'en'}) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url, {
		headers: {
			'x-locale': locale
		}
	});

	return res.data;
};

const update = async (
  id,
  { translations, image = null, publish, parent, featured, guide }
) => {
  const url = `${generalUrl}/${id}`;
  const dataToSend = {
    translations,
    publish,
    parent,
    featured,
    image,
    guide,
  };

  const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
  return res.data;
};

const deleteById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.delete(url);
	return res.data;
};

const CategoriesService = {
	getPagination,
	create,
	update,
	deleteObject: deleteById,
	getById,
};

export default CategoriesService;
