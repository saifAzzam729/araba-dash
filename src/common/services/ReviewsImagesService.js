import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.REVIEWS_URL.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "" }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
			search,
			type: "IMAGE"
		},
	});

	return res.data;
};

const create = async ({ userFullName, translations, media, publish }) => {
	const dataToSend = {
		userFullName,
		translations,
		publish,
		media: media.item(0),
		type: "IMAGE"
	};
	const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url);

	return res.data;
};

const update = async (id, { userFullName, translations, media = null, publish }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		userFullName,
		translations,
		publish,
		type: "IMAGE"
	};
	if (media) {
		dataToSend["media"] = media.item(0);
	}
	const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
	return res.data;
};

const deleteById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.delete(url);
	return res.data;
};
const togglePublish = async (id, {publish}) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomMultiPartAxios.post(url, {publish});
	return res.data;
}

const ReviewsImagesService = {
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
	togglePublish
};

export default ReviewsImagesService;
