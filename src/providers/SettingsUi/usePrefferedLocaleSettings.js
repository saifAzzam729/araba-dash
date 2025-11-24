import {useEffect, useState} from "react";
import DataSourceManager from "@src/common/services/DataSourceManager";

export default function usePrefferedLocaleSettings({locale}) {
    const [preferredTableContentLocale, setPreferredTableContentLocale] = useState(null);
    const [preferredTableContentLocaleStateDescription, setPreferredTableContentLocaleStateDescription] = useState(DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE);

    useEffect(() => {
        const updateTableContentLocale = () => {
            const storedPreferredTableLocale = DataSourceManager.getTableContentLocale();
            const isMatching = storedPreferredTableLocale === DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE;

            if (isMatching) {
                setPreferredTableContentLocale(locale);
                setPreferredTableContentLocaleStateDescription(DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE);
            } else {
                setPreferredTableContentLocale(storedPreferredTableLocale);
                setPreferredTableContentLocaleStateDescription(DataSourceManager.TABLE_CONTENT_VALUES.NOT_MATCHING_THE_LOCALE);
            }
        };

        updateTableContentLocale();
    }, [locale]);

    const updatePreferredLocale = (newValue) => {
        const isMatching = newValue === DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE;
        if (isMatching) {
            setPreferredTableContentLocale(locale);
            setPreferredTableContentLocaleStateDescription(DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE);
        } else {
            setPreferredTableContentLocale(newValue);
            setPreferredTableContentLocaleStateDescription(DataSourceManager.TABLE_CONTENT_VALUES.NOT_MATCHING_THE_LOCALE);
        }
        DataSourceManager.setTableContentLocale(newValue);
    }

    return {
        preferredTableContentLocale,
        updatePreferredLocale,
        isMatching: preferredTableContentLocaleStateDescription === DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE,
    };
}
