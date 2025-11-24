import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.BRANDS_URLS.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "",  publish= undefined, locale= 'en'}) => {
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

const create = async ({ translations, image, publish, featured }) => {
	const dataToSend = {
		translations,
		publish,
		image: image.item(0),
		featured
	};
	const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url);

	return res.data;
};

const update = async (id, { translations, image = null, publish, featured }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		translations,
		publish,
		featured
	};
	if (image) {
		dataToSend["image"] = image.item(0);
	}
	const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
	return res.data;
};

const deleteById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.delete(url);
	return res.data;
};

const BrandsService = {
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
};

export default BrandsService;
