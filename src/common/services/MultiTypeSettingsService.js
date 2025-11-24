import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.SETTINGS_URL.MULTI_TYPE;
const bulkUpdateUrl = URLS.SETTINGS_URL.MULTI_TYPE_BULK_UPDATE;

const getPagination = async ({ page = 1, limit = 10, type= '', excluded_keys= [], include_keys = []}) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
			type,
			excluded_keys,
			include_keys
		},
	});

	return res.data;
};


const update = async (id, { value, description }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		value,
		description
	};
	const res = await ApiClient.CustomAxios.post(url, dataToSend);
	return res.data;
};

const bulkUpdate = async (objectToSend) => {
	const res = await ApiClient.CustomAxios.post(bulkUpdateUrl, objectToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.get(url);
	return res.data;
};


const MultiTypeSettingsService = {
	getPagination,
	update,
	getById,
	bulkUpdate
};

export default MultiTypeSettingsService;
