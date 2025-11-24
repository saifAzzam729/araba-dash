import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.SUB_HERO_ICON_URL.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "" }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
			search,
		},
	});

	return res.data;
};

const create = async ({ translations, image }) => {
	const dataToSend = {
		translations,
		image: image.item(0),
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

const SubHeroService = {
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
};

export default SubHeroService;
