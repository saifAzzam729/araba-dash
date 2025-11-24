import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import DataSourceManager from "../common/services/DataSourceManager";
import {useLocation, useNavigate } from "react-router-dom";

import {
    checkIsRtl,
    defaultLocale,
    locales,
    updateHtmlElementDirection
} from "@src/providers/localeProviderData";

const LocaleContext = createContext();

export const useLocaleContext  = () => useContext(LocaleContext);

export const LocaleProvider = ({children}) => {

    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const {pathname} = useLocation();

    const s = useLocation();

    const [locale, setLocale] = useState(DataSourceManager.getLanguage() ?? defaultLocale);


    const getLocaleFromPathname = () => {
        const localeInPathname = pathname.split('/')[1].toLowerCase();
        const hasValidLocale = locales.includes(localeInPathname);
        if (hasValidLocale) {
            return localeInPathname;
        } else {
            throw Error('not supported locale');
        }
    }

    const translate = (text) => {
        return t(text);
    };


    const goTo = (newUrl, withReload = false) => {
        if (withReload) {
            window.location.href = newUrl.startsWith('/') ? newUrl : `/${newUrl}`;
        } else {
            navigate(newUrl);
        }
    }


    const changeLocaleStates = (newLocale) => {

        if (!locales.includes(newLocale)) {
            throw Error('not supported locale');
        }

        setLocale(newLocale);
        i18n.changeLanguage(newLocale);
        DataSourceManager.setLanguage(newLocale);
        updateHtmlElementDirection(checkIsRtl(newLocale));
    }

    const changeLocale = useCallback((newLocale) => {
        if (!locales.includes(newLocale)) {
            throw Error('not supported locale');
        }


        const newUrl = pathname.replace(`/${locale}`, `/${newLocale}`)
        window.location.href = newUrl;
    }, [locale, pathname]);


    const makeLocaleUrl = useCallback((url, queryParams = {}) => {
        const hasLeadingSlash = url.startsWith('/');

        // check if you should add locale
        const urlSegments = url.split('/');
        const shouldAddLocale = !locales.some((loc) => {
            return urlSegments.indexOf(loc) !== -1
        })

        // parse query string
        let queryString = '';
        const queryParamsKeys = Object.keys(queryParams);
        if (queryParamsKeys.length > 0) {
            const searchParams = new URLSearchParams();

            queryParamsKeys.map((key) => {
                searchParams.append(key, queryParams[key]);
            });

            queryString = `?${  searchParams.toString()}`;
        }

        let finalUrl = url + queryString;
        if (!hasLeadingSlash) {
            finalUrl = `/${  finalUrl}`;
        }

        if (shouldAddLocale) {
            finalUrl = `/${  locale  }${finalUrl}`;
        }
        return finalUrl;
    }, [locale])


    /*
    *   This code extracts the locale from the pathname and if it's not valid
    *   it will set the locale to a valid one.
    * */
    useEffect(() => {

        if (pathname.includes('login')) {
            return;
        }
        try {

            const pathnameLocale = getLocaleFromPathname();
            changeLocaleStates(pathnameLocale);

        } catch (e) {

            const storedLocale = DataSourceManager.getLanguage() ?? defaultLocale;

            const newUrl = `/${storedLocale}${pathname}`;
            goTo(newUrl, true);

        }

    }, [pathname]);


    if (pathname.includes('login')) {
        return (<LocaleContext.Provider
            value={{
                locale: DataSourceManager.getLanguage() ?? defaultLocale,
                isRtl: checkIsRtl(DataSourceManager.getLanguage() ?? defaultLocale),
                translate,
                changeLocale,
                makeLocaleUrl,
            }}
        >
            {children}
        </LocaleContext.Provider>)
    }

    if (!locale && !pathname.includes('login')) return null;


    return (
        <LocaleContext.Provider
            value={{
                locale,
                isRtl: checkIsRtl(locale),
                translate,
                changeLocale,
                makeLocaleUrl,
            }}
        >
            {children}
        </LocaleContext.Provider>
    );
};
