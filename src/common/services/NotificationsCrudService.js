import ApiClient from "@src/common/api-client";
import URLS from "@src/common/urls";

const generalUrl = URLS.NOTIFICATIONS_URL.GENERAL;

const getPagination = async ({ page = 1, limit = 10, direction = "", search = "", locale= 'en'}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            direction,
            search,
        },
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const create = async (data) => {
    const res = await ApiClient.CustomAxios.post(generalUrl, data);
    return res.data;
};


const NotificationsCrudService = {
    getPagination,
    create
};

export default NotificationsCrudService;