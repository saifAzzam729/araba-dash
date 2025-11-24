export default function CheckShippingValue({children, hasValue}) {
    if (hasValue) {
        return <>
            {children}
        </>
    }
    return null
}