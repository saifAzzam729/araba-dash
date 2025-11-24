import DataSourceManager from "@src/common/services/DataSourceManager";
import {DefaultRoute} from "@src/router/routes";

export const locales = ['ar', 'en'];

export const defaultLocale = "ar";

export const rtlLocales = ["ar"];

export const checkIsRtl = (locale) => {
    return rtlLocales.includes(locale);
}

export const updateHtmlElementDirection = (isRtl) => {
    const element = document.getElementsByTagName("html")[0];
    if (element) {
        element.setAttribute("dir", isRtl ? "rtl" : "ltr");
    }
}

export const getHomeRoute = (newLang) => {
    const token = DataSourceManager.getUserToken();
    if (!token) return `/${newLang}/login`;
    return `/${newLang}${DefaultRoute}`;
};
