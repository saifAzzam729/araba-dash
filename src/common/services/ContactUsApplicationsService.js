import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.CONTACT_US_APPLICATIONS_URLS.GENERAL;

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

const update = async (id, { status }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {
		status
	};
	const res = await ApiClient.CustomAxios.post(url, dataToSend);
	console.log('res', res)
	return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
}

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.get(url);
	return res.data;
};

const ContactUsApplicationsService = {
    getPagination,
	update,
	getById,
    deleteObject: deleteById,
}

export default ContactUsApplicationsService;
