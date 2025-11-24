import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import useWindowSize from "@hooks/useWindowSize";
import useTable from "@components/table/useTable";
import {useMutation, useQuery} from "react-query";
import ModelCompatibilityService from "@src/common/services/ModelCompatibilityService";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {createColumns} from "@src/views/pages/model-compatibility/columns";
import useModal from "@components/modal/useModal";
import AddModelCompatibilityModal from "@src/views/pages/model-compatibility/modals/add";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditModelCompatibilityModal from "@src/views/pages/model-compatibility/modals/edit";
import ViewFaqModal from "@src/views/pages/faqs/modals/view";
import ViewModelCompatibilityModal from "@src/views/pages/model-compatibility/modals/view";
import CategoriesService from "@src/common/services/CategoriesService";
import showErrorAlert from "@components/alert/showErrorAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";

export default function ModelCompatibilityPage() {
    const {width} = useWindowSize()
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();

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
        updateSearch,
    } = useTable();


    const {isError, isLoading,  refetch} = useQuery(
        ['model-compatibilities', currentPage, searchTerm, preferredTableContentLocale],
        () => ModelCompatibilityService.getPagination({
            page: currentPage, search: searchTerm, locale: preferredTableContentLocale}),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => ModelCompatibilityService.deleteObject(data.id),
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

    const {mutate: toggleMutation, isLoading: isToggleLoading} = useMutation(
        (data) => ModelCompatibilityService.update(data.id, {publish: data.publish}),
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

    const onAddSuccess = () => {
        refetch();
        closeAddModal();
        showSuccessAlert({});
    }

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row)
    };


    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_MODEL_COMPATIBILITY_ADD,
        PERMISSIONS_NAMES.ROLE_MODEL_COMPATIBILITY_UPDATE,
        PERMISSIONS_NAMES.ROLE_MODEL_COMPATIBILITY_DELETE,
        PERMISSIONS_NAMES.ROLE_MODEL_COMPATIBILITY_SHOW,
        PERMISSIONS_NAMES.ROLE_MODEL_COMPATIBILITY_LIST,
    )
    const COLUMNS = createColumns(toggleMutation, isToggleLoading, width);

    if (isError) {
        return (
            <ErrorPage title={"Model Compatibility"}/>
        )
    }

    return(
        <>
            <BreadCrumbs title={"model-compatibility"} data={[]} />
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                searchTerm={searchTerm}
                page={currentPage}
                total={totalItemsCount}
                onSearch={updateSearch}
                onAdd={openAddModal}
                onEdit={openEditModal}
                onView={openViewModal}
                onDelete={onDelete}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen &&
            <AddModelCompatibilityModal
                closeModal={closeAddModal}
                isOpen={isAddModalOpen}
                item={addItem}
                onAddSuccessCb={onAddSuccess}
            />
            }

            {isEditModalOpen && (
                <EditModelCompatibilityModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewModelCompatibilityModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    )
}