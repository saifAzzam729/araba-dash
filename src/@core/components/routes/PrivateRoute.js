// ** React Imports
import { Navigate } from "react-router-dom";
import { useContext, Suspense } from "react";

// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can";

// ** Spinner Import
import Spinner from "../spinner/Loading-spinner";
import { useAuth } from "../../../utility/context/AuthProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const PrivateRoute = ({ children, route }) => {
	// ** Hooks & Vars
	const ability = useContext(AbilityContext);

	const {user} = useAuth();
	const {makeLocaleUrl} = useLocaleContext();

	if (route) {
		let action = null;
		let resource = null;
		let restrictedRoute = false;

		if (route.meta) {
			action = route.meta.action;
			resource = route.meta.resource;
			restrictedRoute = route.meta.restricted;
		}
		if (!user) {
			return <Navigate to={makeLocaleUrl("/login")} />;
		}
		if (user && restrictedRoute) {
			return <Navigate to={makeLocaleUrl("/")} />;
		}
		if (user && restrictedRoute && user.role === "client") {
			return <Navigate to={makeLocaleUrl("/access-control")} />;
		}
		// if (user && !ability.can(action || "read", resource)) {
		//   return <Navigate to="/misc/not-authorized" replace />;
		// }
	}

	return (
		<Suspense fallback={<Spinner className="content-loader" />}>
			{children}
		</Suspense>
	);
};

export default PrivateRoute;
