import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import showErrorAlert from "@components/alert/showErrorAlert";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function useEBayPageRedirector(refetch) {
    const {search: queryParams} = useLocation();
    const {translate} = useLocaleContext()

    useEffect(() => {
        if (queryParams) {
            const params = new URLSearchParams(queryParams);
            const isSuccess = params.get("success") === "1";

            const urlWithoutSearchParams = window.location.pathname;
            if (isSuccess) {
                refetch();
                showSuccessAlert({title: translate("common.account-created")});
            } else {
                showErrorAlert({});
            }
            window.history.replaceState({}, document.title, urlWithoutSearchParams);
        }
    }, [queryParams]);
}
