const Token_KEY = "user_token";
const Direction_KEY = "direction";
const Language_key = "language";
const TABLE_CONTENT_LOCALE_KEY = "table_content_locale";
const Refresh_Token_KEY = "refresh-user-token";
const Default_Currency = 'default-currency';

const setUserToken = (token) => {
    localStorage.setItem(Token_KEY, token);
};

const removeToken = () => {
    localStorage.removeItem(Token_KEY);
};

const getUserToken = () => {
    return localStorage.getItem(Token_KEY)
};
const getUserCurrency = () => {
    return localStorage.getItem(Default_Currency)
}
const setUserCurrency = (currency) => {
    return localStorage.setItem(Default_Currency, currency)
}
const setLanguage = (lang) => {
    localStorage.setItem(Language_key, lang);
};

const getLanguage = () => {
    return localStorage.getItem(Language_key);
};

const setDirection = (isRTL) => {
    localStorage.setItem(Direction_KEY, isRTL);
};

const getDirection = () => {
    return localStorage.getItem(Direction_KEY);
};


const setTableContentLocale = (value) => {
    localStorage.setItem(TABLE_CONTENT_LOCALE_KEY, value);
};

const getTableContentLocale = () => {
    let locale = localStorage.getItem(TABLE_CONTENT_LOCALE_KEY);
    if (!locale) {
        setTableContentLocale(TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE);
        return TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE;
    }
    return locale;
};

const setRefreshUserToken = (refreshToken) => {
    localStorage.setItem(Refresh_Token_KEY, refreshToken);
};

const getRefreshToken = () => {
    return localStorage.getItem(Refresh_Token_KEY);
};

const removeRefreshToken = () => {
    localStorage.removeItem(Refresh_Token_KEY);
};

export const TABLE_CONTENT_VALUES = {
    MATCHING_THE_LOCALE: 'MATCHING',
    NOT_MATCHING_THE_LOCALE: 'NOT_MATCHING',
    // or just any other locale
}


const DataSourceManager = {
    setUserToken,
    getUserToken,
    removeToken,
    getLanguage,
    getDirection,
    setDirection,
    setLanguage,

    setTableContentLocale,
    getTableContentLocale,
    TABLE_CONTENT_VALUES,

    setRefreshUserToken,
    getRefreshToken,
    removeRefreshToken,

    getUserCurrency,
    setUserCurrency,


};

export default DataSourceManager;
