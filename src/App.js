import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

const App = () => {
	return (
		<Suspense fallback={<>Loading</>}>
			<Router />
		</Suspense>
	);
};

export default App;
