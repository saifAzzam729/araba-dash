import {useSearchParams} from "react-router-dom"

export default () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const removeQueryParams = name => {
        const param = searchParams.get(name)

        if (param) {
            searchParams.delete(name)
            setSearchParams(searchParams)
        }
    }
    const removeArrayOfQueryParams = array => {
        array.map(item => {
            const param = searchParams.get(item)

            if (param) {
                searchParams.delete(item)
            }
        })
        setSearchParams(searchParams)
    }

    const getQueryParams = name => {
        return searchParams.get(name)
    }
    const setQueryParams = (name, value) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
    }
    const setArrayOfQueryParams = array => {
        array.map(item => {
            searchParams.set(item.name, item.value)
        })
        setSearchParams(searchParams)
    }

    const isParamsContainAnyOf = array => {
        return array.some(item => getQueryParams(item))
    }

    const toggleValueInQueryParam = (name, value = null) => {
        if (value) {
            setQueryParams(name, value);
        } else {
            removeQueryParams(name);
        }
    }

    return {
        searchParams,
        setQueryParams,
        setArrayOfQueryParams,
        removeArrayOfQueryParams,
        getQueryParams,
        setSearchParams,
        removeQueryParams,
        isParamsContainAnyOf,
        toggleValueInQueryParam,
    }
}
