import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.PRODUCT_CATEGORIES_URLS.GENERAL;

const getPagination = async ({ page = 1, limit = 10 }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
		},
	});

	return res.data;
};

const create = async ({ name }) => {
	const res = await ApiClient.CustomAxios.post(generalUrl, { name });
	return res.data;
};

const update = async (id, { image, name }) => {
	const formData = new FormData();
	if (image) {
		formData.append("image", image[0]);
	}
	formData.append("name[en]", name.en);
	formData.append("name[ar]", name.ar);

	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomMultiPartAxios.post(url, formData);
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
	update,
	deleteObject: deleteById,
};

export default BrandsService;
