import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export default function useCitiesFilterQueryParamsListener() {
    const [params] = useSearchParams();
    const state = params.get('state');
    const publish = params.get('publish');

    return {
        filterParams: {
            state,
            publish
        }
    };

}
