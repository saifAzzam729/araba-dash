import React from 'react'
import { Can } from '../../../utility/context/PermissionProvider'

function CustomCan({permissionName = '', children}) {
    if (permissionName === '') {
        return <>{children}</>
    }
    return (
        <Can I={permissionName}>{children}</Can>
    )
}


export default CustomCan
