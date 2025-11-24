import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useLocaleContext } from "@src/providers/LocaleProvider";

export default function LanguagePath() {
    const { i18n } = useTranslation();
    const { locale, changeLanguage } = useLocaleContext();
    const { lang } = useParams();
    const navigate = useNavigate();
    const curPath = location.pathname;
    useEffect(() => {
        console.log("location.pathname", location.pathname);
        console.log("location.pathname", lang);
        if (!!lang) {
            if (i18n.options.fallbackLng.includes(lang)) {
                console.log("langlanglanglanglang", lang);
                changeLanguage(lang);

                console.log("i18n.resolvedLanguage", lang);
            } else {
                console.log(
                    "i18n.resolvedLanguage",
                    i18n.resolvedLanguage,
                    "curPath:",
                    curPath.slice(2)
                );
                navigate("/" + locale + curPath, { replace: true });
            }
        }
    }, [lang]);
    return <Outlet />;
}
