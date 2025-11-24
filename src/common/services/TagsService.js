import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.TAGS_URL.GENERAL;

const getPagination = async ({ page = 1, limit = 10, search = "" , locale = 'en'}) => {
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
const getAll = async () => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page: 1,
			limit: 100,
		},
	});

	return res.data.pagination.items;
};

const create = async ({ translations, products, image, publish, backgroundColor, featured }) => {
	const dataToSend = {
		translations,
		products,
		image,
		publish,
		backgroundColor,
		featured
	};
	const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url);
	console.log(res)
	return res.data;
};

const update = async (id, { translations, image = null, products, publish, backgroundColor, featured }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		translations,
		publish,
		products,
		backgroundColor,
		featured,
		image
	};
	if (image) {
		dataToSend["image"] = image;
	}
	const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
	return res.data;
}

const deleteById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.delete(url);
	return res.data;
};

const ProductTypesService = {
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
	getAll
};

export default ProductTypesService;
