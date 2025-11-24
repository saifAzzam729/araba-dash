import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import useTable from "@components/table/useTable";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useMutation, useQuery} from "react-query";
import NotificationsEventsService from "@src/common/services/NotificationsEventsService";
import useWindowSize from "@hooks/useWindowSize";
import {createColumns} from "@src/views/pages/notifications/notifications-events/columns";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useModal from "@components/modal/useModal";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditNotificationEvent from "@src/views/pages/notifications/notifications-events/modals/edit";
import showErrorAlert from "@components/alert/showErrorAlert";
import ViewNotificationEvent from "@src/views/pages/notifications/notifications-events/modals/view";

export default function NotificationsEventsPage() {
    const {width} = useWindowSize()
    const { preferredTableContentLocale } = useSettingsUiContext();

    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
        item: editItem,
    } = useModal();

    const {
        isOpen: isViewModalOpen,
        item: viewItem,
        closeModal: closeViewModal,
        openModal: openViewModal,
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
        ['notifications-events', currentPage, searchTerm, preferredTableContentLocale],
        () => NotificationsEventsService.getPagination({
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

    const {mutate: activeToggleMutation, isLoading: isActiveToggleLoading} = useMutation(
        (data) => NotificationsEventsService.update(data.id, {active: data.active}),
        {
            onSuccess: () => {
                refetch();
                showSuccessAlert({});
            },
            onError: () => {
                showErrorAlert({})
            }
        }
    );

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    };

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_ADD,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_UPDATE,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_DELETE,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_SHOW,
        PERMISSIONS_NAMES.ROLE_NOTIFICATION_LIST,
    )

    const COLUMNS = createColumns(activeToggleMutation, isActiveToggleLoading, width)

    if (isError) {
        return (
            <ErrorPage title={"notifications events"}/>
        )
    }

    return (
        <>
            <BreadCrumbs title={"notifications-events"} data={[]}/>
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onEdit={openEditModal}
                onView={openViewModal}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isEditModalOpen && (
                <EditNotificationEvent
                    item={editItem}
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewNotificationEvent
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    )
}