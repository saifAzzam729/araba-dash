import ApiClient from "@src/common/api-client";
import URLS from "@src/common/urls";

const generalUrl = URLS.NOTIFICATIONS_EVENTS.GENERAL;

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

const update = async (id, { active, translations }) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        translations,
        active
    };
    const res = await ApiClient.CustomAxios.post(url, dataToSend);
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};


const NotificationsEventsService = {
    getPagination,
    update,
    getById,
};

export default NotificationsEventsService;