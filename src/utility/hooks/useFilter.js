import React from "react"
import { useSearchParams } from "react-router-dom"

const defalutQueryParams = {
    name: undefined,
    email: undefined,
    publish: false,
    phoneNumber: undefined
}

export function readQueryParams(guards = [], ignore = ['limit', 'type'], specialHandle = [(searchParams) => { }], defaultValues = []) {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = { 
        name: searchParams.get('name') || undefined,
        email: searchParams.get('email') || undefined,
        publish: searchParams.get('publish') || false,
        phoneNumber: searchParams.get('phoneNumber') || undefined
    }

    if (ignore.length > 0) for (const [key, value] of searchParams.entries()) if (!ignore.includes(key)) query[key] = value

    // console.log('ignore', ignore)

    if (guards?.length > 0) for (const [key, value] of searchParams.entries()) {
            if (guards.includes(key)) {
                query[key] = value
            }
        }

    console.log('query', query)

    return query;

    
}

export { defalutQueryParams }