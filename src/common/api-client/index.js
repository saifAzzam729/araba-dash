import axios from "axios";
import DataSourceManager from "../../common/services/DataSourceManager";
import URLS from "@src/common/urls";

const refreshUrl = URLS.AUTH_URLS.REFRESH_TOKEN;


const CustomAxios = axios.create({
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    // },
});


const tokenExtractor = (config) => {
    if (config.url.includes('/token/refresh') || config.url.includes('/auth/login')) {
        return config;
    }
    const token = DataSourceManager.getUserToken();

    config.headers.Authorization = `Bearer ${token}`;
    return config;
};

CustomAxios.interceptors.request.use(tokenExtractor);

const CustomMultiPartAxios = axios.create({
    headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
    },
});

CustomMultiPartAxios.interceptors.request.use(tokenExtractor);

const createAxiosWithInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (
                error.response.status === 401 &&
                error.response.data.error === 'Expired JWT Token' &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                try {
                    const storedRefreshToken = DataSourceManager.getRefreshToken();
                    const response = await axiosInstance.post(refreshUrl, {
                        refreshToken: storedRefreshToken,
                    });
                    const { token, refreshToken } = response.data;
                    DataSourceManager.setUserToken(token);
                    DataSourceManager.setRefreshUserToken(refreshToken);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

const axiosWithInterceptors = createAxiosWithInterceptors(CustomAxios);
const multiPartAxiosWithInterceptors = createAxiosWithInterceptors(CustomMultiPartAxios);


const ApiClients = {
    CustomAxios:axiosWithInterceptors,
    CustomMultiPartAxios: multiPartAxiosWithInterceptors,

};




export default ApiClients;
