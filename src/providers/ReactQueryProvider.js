import * as React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {useLocation} from "react-router-dom";

function ReactQueryProvider({children}) {

    const {pathname} = useLocation();
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                useErrorBoundary: false,
                refetchOnWindowFocus: false,
                retry(failureCount, error) {
                    if (error.response?.status === 401 && !pathname.includes('login')) {
                        window.location.href = '/login'
                    }
                    if (error.status === 404) return false;
                    else if (failureCount < 2) return true;
                    else return false;
                },
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;
