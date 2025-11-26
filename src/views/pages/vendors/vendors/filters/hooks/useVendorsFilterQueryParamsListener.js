import {useSearchParams} from "react-router-dom";

export default function useVendorsFilterQueryParamsListener() {
    const [params] = useSearchParams();

    const status = params.get('status');

    return {
        filterParams: {
            status,
        }
    }
}

