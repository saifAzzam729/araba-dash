import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.USERS_URL.USER_GROUPS;

const getPagination = async ({page = 1, limit = 10, search = '', locale = 'en'}) => {
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

const create = async ({translations, users}) => {
    const dataToSend = {translations, users}
    const res = await ApiClient.CustomAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id, {locale = 'en'}) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.get(url, {
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};


const update = async (id, {translations, users}) => {
    const dataToSend = {translations, users}
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
    return res.data.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const UserGroupsService = {
    getPagination,
    create,
    update,
    getById,
    deleteById,
};

export default UserGroupsService;
