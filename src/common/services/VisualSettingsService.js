import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.VISUAL_SETTINGS_URLS.GENERAL;

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


const getByKey = async (settingKey) => {
	const url = `${generalUrl}/${settingKey}`;

	const res = await ApiClient.CustomAxios.get(url);

	return res.data;
};

const update = async (id, { translations, link, image = null }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		translations,
		link
	};
	if (image) {
        dataToSend['image'] = image.item(0)
    }
	
	const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
	return res.data;
};


const VisualSettingsService = {
	getPagination,
	getByKey,
	update,
};

export default VisualSettingsService;
