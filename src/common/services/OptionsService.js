import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.OPTIONS_URL;

const getMultiTypesOptions = async () => {
	const res = await ApiClient.CustomAxios.get(generalUrl.MULTI_TYPE);
	return res.data;
};
const getSaleOrdersStatus = async ({ locale = "en" }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl.SALES_ORDER_STATUS, {
		headers: {
			"x-locale": locale,
		},
	});
	return res.data;
};

const getGenderOptions = async ({ locale = "en" }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl.GENDER_TYPE, {
		headers: {
			"x-locale": locale,
		},
	});
	return res.data;
};

const getApplicableToOptions = async ({ locale = "en" }) => {
	const res = await ApiClient.CustomAxios.get(generalUrl.APPLICABLE_TO, {
		headers: {
			"x-locale": locale,
		},
	});
	return res.data;
};

const getPriceTypesOptions = async () => {
	const res = await ApiClient.CustomAxios.get(generalUrl.PRICE_TYPES);
	return res.data;
};

const getUserStatus = async  () => {
	const res = await ApiClient.CustomAxios.get(generalUrl.USER_STATUS);
	return res.data;
}
const getDhlFormatLabelOptions = async  () => {
	const res = await ApiClient.CustomAxios.get(generalUrl.DHL_LABEL_FORMAT);
	return res.data;
}
const getStatisticDimension = async  () => {
	const res = await ApiClient.CustomAxios.get(generalUrl.STATISTIC_DIMENSION);
	return res.data;
}
const getStatisticWeight = async  () => {
	const res = await ApiClient.CustomAxios.get(generalUrl.STATISTIC_WEIGHT);
	return res.data;
}

const getCountriesLocale = async () => {
	const res = await ApiClient.CustomAxios.get(generalUrl.COUNTRY_LOCALE);
	return res.data;
};

const OptionsService = {
	getMultiTypesOptions,
	getSaleOrdersStatus,
	getPriceTypesOptions,
	getGenderOptions,
	getApplicableToOptions,
	getUserStatus,
	getDhlFormatLabelOptions,
	getStatisticDimension,
	getStatisticWeight,
	getCountriesLocale
};

export default OptionsService;
