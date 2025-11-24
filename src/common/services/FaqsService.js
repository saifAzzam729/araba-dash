import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.FAQS_URLS.GENERAL;

const getPagination = async ({ page = 1, limit = 10, question = "" , locale= 'en'}) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
			question,
		},
		headers: {
			'x-locale': locale
		}
	});

	return res.data;
};

const create = async ({ translations }) => {
	const dataToSend = {
		translations,
	};
	const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url);

	return res.data;
};

const update = async (id, { translations, image = null }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		translations,
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

const FaqsService = {
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
};

export default FaqsService;
