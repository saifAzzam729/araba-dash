// ** Router imports
import {lazy} from "react";

// ** Router imports
import {useRoutes, Navigate} from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";

// ** Hooks Imports
import {useLayout} from "@hooks/useLayout";

// ** Utils

// ** GetRoutes
import {DefaultRoute, getRoutes} from "./routes";
import DataSourceManager from "../common/services/DataSourceManager";
import {useLocaleContext} from "../providers/LocaleProvider";

// ** Components
const Error = lazy(() => import("../views/Error"));
const Login = lazy(() => import("../views/Login"));
const NotAuthorized = lazy(() => import("../views/NotAuthorized"));

const Router = () => {
    // ** Hooks
    const {layout} = useLayout();

    // const allRoutes = getRoutes(layout);

    const {locale} = useLocaleContext();
    const allRoutes = getRoutes(layout, locale);

    /**
     * This function will let the user pass if they hava a token
     * reguardless weither it is valid or not
     *
     * checking if its valid or not is the provider responsibility
     *
     */
    const getHomeRoute = () => {
        const token = DataSourceManager.getUserToken();
        if (!token) return `/${locale}/login`;
        return `/${locale}${DefaultRoute}`;
    };


    const routes = useRoutes([
        {
            path: "/",
            index: true,
            element: <Navigate replace to={getHomeRoute()}/>,
        },
        {
            path: "/login",
            element: <BlankLayout/>,
            children: [{path: "/login", element: <Login/>}],
        },
        {
            path: "/auth/not-auth",
            element: <BlankLayout/>,
            children: [{path: "/auth/not-auth", element: <NotAuthorized/>}],
        },
        {
            path: "*",
            element: <BlankLayout/>,
            children: [{path: "*", element: <Error/>}],
        },
        ...allRoutes,
    ]);

    return routes;
};

export default Router;
