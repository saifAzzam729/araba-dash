import React, {useEffect, useState} from 'react'
import DataSourceManager from '../../common/services/DataSourceManager';
import {useQuery} from 'react-query';
import AuthService from "@src/common/services/AuthService";
import GoToLoginErrorPage from '../../@core/components/LoginErrorPage/LoginErrorPage';
import Spinner from "../../@core/components/spinner/Fallback-spinner";
import {useLocation, useNavigate} from "react-router-dom";
import NotificationSessionStorageManager from "@src/common/services/NotitficationSessionStorageManager";

const AuthContext = React.createContext()

function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(DataSourceManager.getUserToken());
    const [refreshToken, setRefreshToken] = useState(DataSourceManager.getRefreshToken());

    const {pathname} = useLocation();

    const logUserIn = (newUser, newToken, refreshToken) => {
        DataSourceManager.setUserToken(newToken);
        DataSourceManager.setRefreshUserToken(refreshToken);
        setUser(newUser)
        setToken(newToken)
        setRefreshToken(refreshToken)
    }

    const {isError, isLoading, refetch} = useQuery(
        'user-data',
        () => {
            if (!token) {
                throw Error();
            }
            return AuthService.Profile()
        },
        {
            onSuccess: (res) => {
                const {data} = res;
                setUser(data.user)
            }
        }
    );

    const refetchUser = () => {
        refetch();
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        DataSourceManager.removeToken();
        DataSourceManager.removeRefreshToken()
        NotificationSessionStorageManager.removeFirebaseSubscribe()
    };

    useEffect(() => {
        if (token) {
            refetchUser();
        }
        if (!token && !pathname.includes('login')) {
            window.location.href = '/login'
        }
    }, [token])

    const isVendor = user?.type === "VENDOR";

    const value = React.useMemo(
        () => ({user, logUserIn, token, refetchUser, logout, isVendor}),
        [user, token, isVendor]
    );

    if (!token || pathname.includes('login')) {
        return <AuthContext.Provider value={value} {...props} />
    }

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <GoToLoginErrorPage/>;
    }

    return (
        <AuthContext.Provider value={value} {...props} />
    )
}

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth}
