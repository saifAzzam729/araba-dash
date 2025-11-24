import useTable from "@components/table/useTable";
import {useMutation, useQuery} from "react-query";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import showErrorAlert from "@components/alert/showErrorAlert";
import TaxesService from "@src/common/services/TaxesService";
import {createColumns} from "@src/views/pages/tax/columns";
import useModal from "@components/modal/useModal";
import AddTaxModal from "@src/views/pages/tax/modals/add";
import EditTaxModal from "@src/views/pages/tax/modals/edit";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import ViewTaxModal from "@src/views/pages/tax/modals/view";

export default function TaxPage() {
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

    const {isError, isLoading, refetch} = useQuery(
        ["taxes", currentPage, searchTerm, preferredTableContentLocale],
        () =>
            TaxesService.getPagination({
                page: currentPage,
                search: searchTerm,
                locale: preferredTableContentLocale,
            }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => TaxesService.deleteObject(data.id),
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

    const { mutate: toggleMutation, isLoading: isToggleLoading } = useMutation(
        (data) => TaxesService.update(data.id, { publish: data.publish }),
        {
            onSuccess: () => {
                refetch();
                showSuccessAlert({});
            },
            onError: () => {
                showErrorAlert({});
            },
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


    if (isError) {
        return <ErrorPage title={"Tax Page"}/>;
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_TAX_ADD,
        PERMISSIONS_NAMES.ROLE_TAX_UPDATE,
        PERMISSIONS_NAMES.ROLE_TAX_DELETE,
        PERMISSIONS_NAMES.ROLE_TAX_SHOW,
        PERMISSIONS_NAMES.ROLE_TAX_LIST
    );

    const COLUMNS = createColumns(toggleMutation, isToggleLoading);

    return (
        <>
            <BreadCrumbs title={"Tax"} data={[]}/>
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
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen &&
                <AddTaxModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            }

            {isEditModalOpen && (
                <EditTaxModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewTaxModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    )
}