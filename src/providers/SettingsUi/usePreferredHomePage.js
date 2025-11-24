import {useState} from "react";
import {useMutation, useQuery} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import showErrorAlert from "@components/alert/showErrorAlert";
import PreferredHomePageLocalService from "@src/common/services/PreferredHomePageLocalService";

export default function usePreferredHomePage() {
    const [preferredHomePage, setPreferredHomePage] = useState('')

    const {data} = useQuery(
        ['home-page'],
        () => MultiTypeSettingsService.getById('DASHBOARD_STARTUP_PAGE'),{
            onSuccess: (res) => {
                const {data} = res
                setPreferredHomePage(data.description)
            }
        }
    );

    const startUpPage = data?.data ?? '';

    const {mutate, isError, isLoading} = useMutation(
        (data) => MultiTypeSettingsService.update(startUpPage.id, {
            value: data.navLink, description: data.id
        }),
        {
            onSuccess: (res) => {
                const {data} = res
                setPreferredHomePage(data.description);
                PreferredHomePageLocalService.setValue(data.value);
                showSuccessAlert({})
            } ,
            onError: (error) => {
                showErrorAlert({});
            },
        }
    );

    const updatePreferredHomePage = (data) => {
        const {id, navLink} = data;
        setPreferredHomePage(id)
        mutate({
            navLink: navLink,
            id: id
        });
    }


    return {
        preferredHomePage,
        setPreferredHomePage,
        updatePreferredHomePage,
    }
}
