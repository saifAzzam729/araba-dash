import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.PRODUCT_IMAGES_URL.GENERAL;
const imagesUpsertUrl = URLS.PRODUCT_IMAGES_URL.IMAGES_UPSERT;
const imageGroupsUrl = URLS.PRODUCTS_URLS.GENERAL
const create = async (data) => {
	const res = await ApiClient.CustomMultiPartAxios.post(imagesUpsertUrl, data);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.get(url);
	return res.data;
};

const update = async (id, { image, publish, product }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		publish, product
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
const getImageGroupsList = async ({id, locale= 'en'}) => {
	const url = `${imageGroupsUrl}/${id}/options/image-groups`;
	const res = await ApiClient.CustomAxios.get(url, {
		headers: {
			'x-locale': locale
		}
	});

	return res.data;
};

const ProductImagesServices = {
	create,
    getById,
    deleteObject: deleteById,
	update,
	getImageGroupsList
};

export default ProductImagesServices;
