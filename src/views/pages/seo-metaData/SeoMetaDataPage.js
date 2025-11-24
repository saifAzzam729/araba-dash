import TableBase from "../../../@core/components/table/TableBase";
import columns from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";
import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import {useQuery} from "react-query";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import EditSeoModal from "./modals/edit";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";

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

    const {isError, isLoading, refetch} = useQuery(
        ['seo-meta-data'],
        () => MultiTypeSettingsService.getPagination({type: "SEO"}),
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
            <ErrorPage title={"seo-page"}/>
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
            <BreadCrumbs title={"seo-page"} data={[]}/>
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
                <EditSeoModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </>
    );
}
