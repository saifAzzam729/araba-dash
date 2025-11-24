import {useSearchParams} from "react-router-dom";

export default function useSaleOrdersFilterQueryParamsListener() {
    const [params] = useSearchParams();

    const user = params.get('user');
    const status = params.get('status');
    const itemProduct = params.get('itemProduct');
    const paymentProvideCode = params.get('paymentProvideCode');
    const sort = params.get('sort');
    const searchParam = params.get("search");


    return {
        filterParams: {
            user,
            status,
            itemProduct,
            paymentProvideCode,
            sort,
            searchParam
        }
    }

}
