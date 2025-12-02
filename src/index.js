// ** React Imports
import React, {Suspense, lazy} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {LocaleProvider} from "./providers/LocaleProvider";

// import i18n (needs to be bundled ;))
import "./configs/i18n";

// ** Redux Imports
import {store} from "./redux/store";
import {Provider} from "react-redux";
console.log("YAAAAH")
// ** ThemeColors Context

import {ThemeContext} from "./utility/context/ThemeColors";

// ** ThemeConfig
import themeConfig from "./configs/themeConfig";

// ** Toast
import {Toaster} from "react-hot-toast";

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
import "./assets/scss/style-rtl.scss";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";
import ReactQueryProvider from "@src/providers/ReactQueryProvider";
import {AuthProvider} from "./utility/context/AuthProvider";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryPage from "./views/ErrorBoundryPage";
import {GuardProvider} from "@src/providers/GuardProvider";
import {GlobalProvider} from "@src/providers/GlobalProvider";
import PermissionProvider from "@src/utility/context/PermissionProvider";
import {SettingsUiProvider} from "@src/providers/SettingsUi/SettingsUiProvider";

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <ErrorBoundary
        FallbackComponent={ErrorBoundaryPage}
    >
        <BrowserRouter>
            <Provider store={store}>
                <Suspense fallback={<Spinner/>}>
                    <LocaleProvider>
                        <GuardProvider>
                            <ReactQueryProvider>
                                <ThemeContext>
                                    <AuthProvider>
                                        <GlobalProvider>
                                            <PermissionProvider>
                                                <SettingsUiProvider>
                                                    <LazyApp/>
                                                </SettingsUiProvider>
                                            </PermissionProvider>
                                        </GlobalProvider>
                                    </AuthProvider>
                                    <Toaster
                                        position={themeConfig.layout.toastPosition}
                                        toastOptions={{className: "react-hot-toast"}}
                                    />
                                </ThemeContext>
                            </ReactQueryProvider>
                        </GuardProvider>
                    </LocaleProvider>
                </Suspense>
            </Provider>
        </BrowserRouter>
    </ErrorBoundary>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
