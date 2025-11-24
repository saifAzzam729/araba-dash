import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.PRODUCT_REVIEWS_URLS.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "",  publish = undefined, locale = 'en'}) => {
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

const create = async ({ user, image = null, product, title, message, rate, userFullName, userEmail, publish }) => {
	const dataToSend = {
		user,
		publish,
		product,
		title,
		message,
		rate,
		userFullName,
		userEmail,
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

const update = async (id, { user, image = null, product, title, message, rate, userFullName, userEmail, publish }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		user,
		publish,
		product,
		title,
		message,
		rate,
		userFullName,
		userEmail
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

const ProductReviewsService = {
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
};

export default ProductReviewsService;
