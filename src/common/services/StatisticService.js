import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.STATISTIC_URL.GENERAL;

const getSaleOrders = async () => {
    const url = `${generalUrl}/sale-orders`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};

const getGeneral = async () => {
    const url = `${generalUrl}/general`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};

const getCategoryProducts = async () => {
    const url = `${generalUrl}/category-products`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
};

const getUsers = async () => {
    const url = `${generalUrl}/users`;
    const res = await ApiClient.CustomAxios.get(url);
    console.log('users', res.data)
    return res.data;
};

const getWebsiteOverview = async () => {
    const url = `${generalUrl}/report/website-overview`;
    const res = await ApiClient.CustomAxios.get(url);
    return res.data;
}
const getDeutscheWalletBalance = async ({ sync }) => {
    const baseUrl = `${generalUrl}/shipping/deutsche-post/wallet-balance`;
    const url = sync ? `${baseUrl}?sync=${sync}` : baseUrl;
    const response = await ApiClient.CustomAxios.get(url);
    return response.data;
};


const StatisticService = {
    getSaleOrders,
    getGeneral,
    getUsers,
    getCategoryProducts,
    getWebsiteOverview,
    getDeutscheWalletBalance
};

export default StatisticService;
