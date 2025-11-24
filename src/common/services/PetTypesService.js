import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.PETS_URL.PET_TYPES;

const getAll = async () => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page: 1,
			limit: 100,
		},
	});

	return res.data.pagination.items;
};
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

const create = async ({ translations, publish }) => {
	const dataToSend = {
		translations,
		publish,
	};
	const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url);

	return res.data;
};

const update = async (id, { translations, image = null, publish }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		translations,
		publish,
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

const PetTypesService = {
	getAll,
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
};

export default PetTypesService;
