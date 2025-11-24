import BreadCrumbs from "@components/breadcrumbs";
import columns from "@src/views/pages/website-ui-settings/columns";
import TableBase from "@components/table/TableBase";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import useModal from "@components/modal/useModal";
import useTable from "@components/table/useTable";
import {useQuery} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import EditWebsiteUiSettingModal from "@src/views/pages/website-ui-settings/modals/edit";
import WebsiteUISettingsHeaderCard from "@src/views/pages/website-ui-settings/partials/WebsiteUISettingsHeaderCard";
import {includedSettingsKeys} from "@src/views/pages/website-ui-settings/includedSettingsKeys";

export default function WebsiteUiSettings() {
    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
        item: editItem,
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

    const includedKeys = includedSettingsKeys.join(',')

    const {isError, isLoading,  refetch} = useQuery(
        ['website-Links', currentPage],
        () => MultiTypeSettingsService.getPagination({
            page: currentPage,
            include_keys: includedKeys
        }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    if (isError) {
        return (
            <ErrorPage title={"Website Links"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_ADD,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_UPDATE,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_DELETE,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_SHOW,
        PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_LIST,
    )



    return (
        <>
            <BreadCrumbs title={"website-ui-settings"} data={[]}/>
            <WebsiteUISettingsHeaderCard />
            <TableBase
                columns={columns}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onEdit={openEditModal}
                isLoading={isLoading}
                headCellJustification={'start'}
                bodyCellJustification={'start'}
                permissionObject={permissionObject}
            />

            {isEditModalOpen && (
                <EditWebsiteUiSettingModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

        </>
    )
}