// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

// ** Utils
import DataSourceManager from "../../../common/services/DataSourceManager";
import { DefaultRoute } from "../../../router/routes";


const PublicRoute = ({ children, route }) => {
  if (route) {
    const isUserLogged = DataSourceManager.getUserToken();

    const restrictedRoute = route.meta && route.meta.restricted;

    if (isUserLogged && restrictedRoute) {
      return <Navigate to={DefaultRoute} />; 
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PublicRoute;
