import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.REPORTS_URLS.GENERAL;

const getPaginatedReportData = async ({
  url,
  page = 1,
  limit = 10,
  search = "",
  fromDate,
  toDate,
  locale = "en",
}) => {
  const res = await ApiClient.CustomAxios.get(`${generalUrl}/${url}`, {
    params: { page, limit, search, fromDate, toDate },
    headers: {
      "x-locale": locale,
    },
  });
  return res.data;
};

const getReportsPdf = async ({
  url,
  page = 1,
  limit = 10,
  search = "",
  fromDate,
  toDate,
  locale = "en",
}) => {
  const res = await ApiClient.CustomAxios.get(`${generalUrl}/${url}/pdf`, {
    params: { page, limit, search, fromDate, toDate },
    headers: {
      "x-locale": locale,
    },
  });
  return res.data;
};
const getReportsCsv = async ({
  url,
  page = 1,
  limit = 10,
  search = "",
  fromDate,
  toDate,
  locale = "en",
}) => {
  const res = await ApiClient.CustomAxios.get(`${generalUrl}/${url}/csv`, {
    params: { page, limit, search, fromDate, toDate },
    headers: {
      "x-locale": locale,
    },
  });
  return res.data;
};

const ReportsServices = {
  getPaginatedReportData,
  getReportsPdf,
  getReportsCsv,
};

export default ReportsServices;
