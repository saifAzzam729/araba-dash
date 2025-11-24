import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export default function useProductFilterQueryParamsListener() {
    const [params] = useSearchParams();

    const search = params.get('search');
    const quantity = params.get('quantity');
    const sku = params.get('sku');

    return {
        filterParams: {
            search,
            quantity,
            sku,
        }
    };
}
