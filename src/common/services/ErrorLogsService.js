import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.ERRORS.GENERAL;

const getPagination = async ({page = 1, limit = 10}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            direction: 'desc',
            sort: 'er.createdAt',
        },
    });
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};

const ErrorLogsService = {
    getPagination,
    getById,
}

export default ErrorLogsService;
