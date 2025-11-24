export default function createPermissionObjectForUi(
    addPermissionName = '',
    editPermissionName = '',
    deletePermissionName = '',
    viewPermissionName = '',
    listPermissionName = '',
) {

    const permissionObject = {};

    if (addPermissionName !== '') {
        permissionObject['add'] = addPermissionName;
    }

    if (editPermissionName !== '') {
        permissionObject['edit'] = editPermissionName;
    }

    if (deletePermissionName !== '') {
        permissionObject['delete'] = deletePermissionName;
    }

    /**
     * view includes the details of the resource
     * and profile is included
     */
    if (viewPermissionName !== '') {
        permissionObject['view'] = viewPermissionName;
    } 
    
    if (listPermissionName !== '') {
        permissionObject['list'] = listPermissionName;
    } 
    return permissionObject;
}