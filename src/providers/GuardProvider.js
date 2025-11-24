import {createContext} from "react";
import {useLocation} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useAuth} from "@src/utility/context/AuthProvider";

const GuardContext = createContext();
export const GuardProvider = ({children}) => {

    const {pathname} = useLocation();
    const {locale, makeLocaleUrl} = useLocaleContext();
    const goToPath = pathname.replace(`/${locale}`, '');

    if (!goToPath || goToPath === '' || goToPath === '/') {
        window.location.href = makeLocaleUrl('/home');
    }


    return (
        <GuardContext.Provider value={{}}>
            {children}
        </GuardContext.Provider>
    );
};
