import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.COUNTRIES_URL.GENERAL;

const getPagination = async ({page = 1, limit = 10, search = '', locale = 'en'}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            limit,
            page,
            search,
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async ({translations, iso2, phoneNumberCode, active, iso3, localeCode}) => {
    const res = await ApiClient.CustomAxios.post(generalUrl, {
        translations,
        iso2,
        phoneNumberCode,
        active,
        localeCode,
        iso3,
    });
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

const update = async (id, {translations, iso2, phoneNumberCode, active, iso3, localeCode}) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.put(url, {
        translations,
        iso2,
        phoneNumberCode,
        active,
        localeCode,
        iso3
    });
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const CountriesService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
    getById,
};

export default CountriesService;
