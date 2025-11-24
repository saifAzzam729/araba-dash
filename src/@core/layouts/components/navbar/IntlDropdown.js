// ** Third Party Components
import {useTranslation} from "react-i18next";
import ReactCountryFlag from "react-country-flag";

// ** Reactstrap Imports
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from "reactstrap";

import {useLocaleContext} from "@src/providers/LocaleProvider";

const IntlDropdown = () => {
    // ** Hooks
    const {i18n} = useTranslation();
    const {changeLocale} = useLocaleContext();

    // ** Vars
    const langObj = {
        en: "English",
        de: "German",
        fr: "French",
        pt: "Portuguese",
        ar: "العربية",
    };

    // ** Function to switch Language
    const handleLangUpdate = (e, lang) => {
        e.preventDefault();
        changeLocale(lang);
    };
    const {makeLocaleUrl} = useLocaleContext();

    return (
        <UncontrolledDropdown
            href={makeLocaleUrl("/")}
            tag="li"
            className="dropdown-language nav-item"
            style={{lineHeight: '1'}}
        >
            <DropdownToggle
                href={makeLocaleUrl("/")}
                tag="a"
                className="nav-link"
                onClick={(e) => e.preventDefault()}
            >
                <ReactCountryFlag
                    svg
                    className="country-flag flag-icon"
                    countryCode={
                        i18n.language === "en"
                            ? "us"
                            : i18n.language === "ar"
                                ? "sa"
                                : i18n.language
                    }
                />
                <span className="selected-language">{langObj[i18n.language]}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-0" end>
                <DropdownItem
                    href="/"
                    tag="a"
                    onClick={(e) => handleLangUpdate(e, "en")}
                >
                    <ReactCountryFlag className="country-flag" countryCode="us" svg/>
                    <span className="ms-1">English</span>
                </DropdownItem>

                <DropdownItem
                    href="/"
                    tag="a"
                    onClick={(e) => handleLangUpdate(e, "ar")}
                >
                    <ReactCountryFlag className="country-flag" countryCode="sa" svg/>
                    <span className="ms-1">العربية</span>
                </DropdownItem>

            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default IntlDropdown;
