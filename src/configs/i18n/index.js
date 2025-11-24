// ** I18n Imports
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {defaultLocale, locales} from "@src/providers/localeProviderData";

import enMsg from '../../assets/data/locales/en.json';
import arMsg from '../../assets/data/locales/ar.json';


const createResource = (messages) => {
    return {
        translation: {...messages}
    }
}
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        resources: {
            en: createResource(enMsg),
            ar: createResource(arMsg),
        },
        fallbackLng: defaultLocale,
        supportedLngs: locales,
    }).then(()=>{
    // console.log(i18n)
});


export default i18n;
