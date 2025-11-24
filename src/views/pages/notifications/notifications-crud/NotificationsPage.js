import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import useTable from "@components/table/useTable";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useQuery} from "react-query";
import useModal from "@components/modal/useModal";
import useWindowSize from "@hooks/useWindowSize";
import AddNotification from "@src/views/pages/notifications/notifications-crud/modals/add";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import NotificationsCrudService from "@src/common/services/NotificationsCrudService";
import {createColumns} from "@src/views/pages/notifications/notifications-crud/columns";
import ErrorPage from "@components/ErrorPage/ErrorPage";

export default function NotificationsPage() {
    const { preferredTableContentLocale } = useSettingsUiContext();
    const {width} = useWindowSize()

    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();

    const {
        items,
        totalItemsCount,
        currentPage,
        searchTerm,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
    } = useTable();

    const {isError, isLoading,  refetch} = useQuery(
        ['notifications', currentPage, searchTerm, preferredTableContentLocale],
        () => NotificationsCrudService.getPagination({
            page: currentPage,
            search: searchTerm,
            locale: preferredTableContentLocale,
        }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const onAddSuccess = () => {
        refetch();
        closeAddModal();
        showSuccessAlert({});
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_ADD,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_UPDATE,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_DELETE,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_SHOW,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_LIST,
    )

    const COLUMNS  = createColumns(width)

    if (isError) {
        return (
            <ErrorPage title={"notifications"}/>
        )
    }

    return (
        <>
            <BreadCrumbs title={"notifications"} data={[]}/>
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onAdd={openAddModal}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddNotification
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
        </>
    )
}