import React, {createContext, useMemo} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import useModal from "@components/modal/useModal";
import usePrefferedLocaleSettings from "@src/providers/SettingsUi/usePrefferedLocaleSettings";
import usePreferredHomePage from "@src/providers/SettingsUi/usePreferredHomePage";
import useDashboardMultiSettings from "@src/providers/SettingsUi/useDashboardMultiSettings";

const SettingsUiContext = createContext();
export const SettingsUiProvider = ({children}) => {

    const {locale} = useLocaleContext();

    const {
        isOpen,
        closeModal,
        openModal,
    } = useModal();


    const {preferredTableContentLocale, isMatching, updatePreferredLocale} = usePrefferedLocaleSettings({locale});

    const {preferredHomePage, updatePreferredHomePage, setPreferredHomePage} = usePreferredHomePage()

    const {
        storeNameObject,
        monthlyOrdersGoalObject,
        updateDashMultiSettings
    } = useDashboardMultiSettings()


    const val = useMemo(()=>{
        return{
            isOpen,
            closeModal,
            openModal,

            preferredTableContentLocale,
            isMatching,
            updatePreferredLocale,


            preferredHomePage,
            updatePreferredHomePage,
            setPreferredHomePage,

            storeNameObject,
            monthlyOrdersGoalObject,
            updateDashMultiSettings
        }
    }, [locale, isOpen, preferredTableContentLocale, isMatching, preferredHomePage, storeNameObject, monthlyOrdersGoalObject])

    return (
        <SettingsUiContext.Provider value={val}>
            {children}
        </SettingsUiContext.Provider>
    );
};
export const useSettingsUiContext = () => React.useContext(SettingsUiContext);
