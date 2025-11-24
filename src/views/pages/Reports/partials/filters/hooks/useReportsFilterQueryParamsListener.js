import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export default function useReportsFilterQueryParamsListener({updateParamsObject}) {
    const [params] = useSearchParams();

    useEffect(() => {

        const fromDate = params.get('fromDate');
        const toDate = params.get('toDate');

        const fullObj = {
            fromDate,
            toDate
        }

        updateParamsObject(fullObj)
    }, [params]);
}
