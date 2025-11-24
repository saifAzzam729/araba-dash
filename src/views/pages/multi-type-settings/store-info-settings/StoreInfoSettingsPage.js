import TableBase from "@components/table/TableBase";
import columns from "../columns";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";
import EditMultiTypeSettingModal from "../modals/edit";
import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import { useQuery } from "react-query";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {includedSettingsKeys} from "@src/views/pages/multi-type-settings/store-info-settings/includedSettingsKeys";

export default function () {

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
            <ErrorPage title={"Store Info"}/>
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
            <BreadCrumbs title={"store-info"} data={[]}/>
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
                <EditMultiTypeSettingModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </>
    );
}
