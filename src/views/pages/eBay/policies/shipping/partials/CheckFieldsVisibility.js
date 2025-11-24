export default function CheckFieldsVisibility
    ({children, showChildren}) {
    if (!showChildren) {
        return null
    }
    return (<>{children}</>)
}