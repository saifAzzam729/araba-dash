import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.ROLE_GROUPS_URL.GENERAL;

const getPagination = async ({ page = 1, limit = 100 }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl, {
		params: {
			page,
			limit,
		},
	});

	return res.data;
};

const create = async ({ name, roles }) => {
	const res = await ApiClient.CustomAxios.post(generalUrl, { name, roles });
	return res.data;
};

const update = async (id, { name, roles }) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.put(url, { name, roles });
	return res.data;
};

const deleteById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.delete(url);
	return res.data;
};

const getRolesBySection = async () => {
	const res = await ApiClient.CustomAxios.get(
		URLS.ROLE_GROUPS_URL.ROLES_BY_SECTION
	);

	return res.data;
};

const RoleGroupsService = {
	getPagination,
	create,
	update,
	deleteObject: deleteById,
	getRolesBySection,
};

export default RoleGroupsService;
