import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.SLIDERS_URL.GENERAL;

const getAll = async ({direction = 'desc', presentingType = null, locale= 'en'}) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page:1,
			limit:50,
			presentingType,
			direction,
		},
		headers: {
			'x-locale': locale
		}
	});

	return res.data.pagination.items;
};

const getPagination = async ({ page = 1, limit = 10, search = "", locale='en' }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
			search,
		},
		headers: {
			'x-locale': locale
		}
	});

	return res.data;
};

const create = async ({ translations, link, media, type, publish, buttonColor, presentingType }) => {
	const dataToSend = {
		translations,
		media,
        link,
		publish,
		buttonColor,
		type,
		presentingType,
	};
	const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
	return res.data;
};

const update = async (id, { translations, link, media = null , buttonText, publish, buttonColor, type}) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		translations, link , buttonText, publish, buttonColor, type
	};
	if (media) {
		dataToSend["media"] = media;
	}
	const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url);

	return res.data;
};

const deleteById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.delete(url);
	return res.data;
};

const SlidersServices = {
    getAll,
    getPagination,
	create,
	getById,
    update,
    deleteObject: deleteById,
};

export default SlidersServices;