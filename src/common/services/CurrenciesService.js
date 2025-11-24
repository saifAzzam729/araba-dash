import URLS from "../urls";
import ApiClient from "../api-client";
const generalUrl = URLS.CURRENCIES_URL.GENERAL;
const defaultCurrencyUrl = URLS.CURRENCIES_URL.DEFAULT_CURRENCY;

const getPagination = async ({ page = 1, limit = 10, search = "", locale= 'en' }) => {
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

const create = async ({ translations, active, code, symbol, defaultExchangeRate, countries }) => {
	const dataToSend = {translations, active, code, symbol, defaultExchangeRate, countries};
	const res = await ApiClient.CustomAxios.post(generalUrl, dataToSend);
	return res.data;
};

const getById = async (id) => {
	const url = `${generalUrl}/${id}`;

	const res = await ApiClient.CustomAxios.get(url);

	return res.data;
};

const update = async (id, { translations, active, code, symbol, defaultExchangeRate,countries }) => {
	const url = `${generalUrl}/${id}`;
	const dataToSend = {translations, active, code, symbol, defaultExchangeRate,countries};

	const res = await ApiClient.CustomAxios.put(url, dataToSend);
	return res.data;
};

const deleteById = async (id) => {
	const url = `${generalUrl}/${id}`;
	const res = await ApiClient.CustomAxios.delete(url);
	return res.data;
};

const getDefaultCurrency = async () => {
	const res = await ApiClient.CustomAxios.get(defaultCurrencyUrl);
	return res.data;
};

const CurrenciesService = {
	getPagination,
	create,
	getById,
	update,
	deleteObject: deleteById,
	getDefaultCurrency
};

export default CurrenciesService;
