import TableBase from "../../../@core/components/table/TableBase";
import columns from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useTable from "../../../@core/components/table/useTable";
import {useQuery} from "react-query";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import ErrorLogsService from "@src/common/services/ErrorLogsService";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";


export default function () {

    const {
        items,
        totalItemsCount,
        currentPage,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
    } = useTable();

    const {isError, isLoading, refetch} = useQuery(
        ['error-logs', currentPage,],
        () => ErrorLogsService.getPagination({page: currentPage}),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    if (isError) {
        return (
            <ErrorPage title={"Error Logs"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        '',
        '',
        '',
        PERMISSIONS_NAMES.ROLE_ERROR_LOG_SHOW,
        PERMISSIONS_NAMES.ROLE_ERROR_LOG_LIST,
    )


    return (
        <>
            <BreadCrumbs title={"error-logs"} data={[]}/>
            <TableBase
                columns={columns}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                isLoading={isLoading}
                defaultActionButtons={false}
                permissionObject={permissionObject}
            />

        </>
    );
}
