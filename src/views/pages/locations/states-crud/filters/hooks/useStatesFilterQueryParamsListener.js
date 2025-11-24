import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export default function useStatesFilterQueryParamsListener({updateParamsObject}) {
    const [params] = useSearchParams();

    useEffect(() => {

        const country = params.get('country');
        const publish = params.get('publish');

        const fullObj = {
            country,
            publish
        }

        updateParamsObject(fullObj)
    }, [params]);
}
