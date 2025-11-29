import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddTagsModal from "./modals/add";
import EditTagsModal from "./modals/edit";
import ViewTagsModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import {useMutation, useQuery} from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";

import TagsService from "@src/common/services/TagsService";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";
import {useAuth} from "../../../utility/context/AuthProvider";

export default function () {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {isVendor} = useAuth();

    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();

    const {
        isOpen: isViewModalOpen,
        item: viewItem,
        closeModal: closeViewModal,
        openModal: openViewModal,
    } = useModal();

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
        updateSearch,
    } = useTable();

    const {isError, isLoading, refetch} = useQuery(
        ['tag', currentPage, searchTerm, preferredTableContentLocale],
        () => TagsService.getPagination({
            page: currentPage,
            search: searchTerm,
            locale: preferredTableContentLocale
        }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => TagsService.deleteObject(data.id),
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
        (data) => TagsService.update(data.id, {
            publish: data.publish, featured:data.featured}),
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

    if (isError) {
        return (
            <ErrorPage title={"Tags"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_TAG_ADD,
        PERMISSIONS_NAMES.ROLE_TAG_UPDATE,
        PERMISSIONS_NAMES.ROLE_TAG_DELETE,
        PERMISSIONS_NAMES.ROLE_TAG_SHOW,
        PERMISSIONS_NAMES.ROLE_TAG_LIST,
    )

    const {width} = useWindowSize()

    const COLUMNS = createColumns(toggleMutation, isToggleLoading, width, isVendor);

    return (
        <>
            <BreadCrumbs title={"Tags"} data={[]}/>
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onAdd={isVendor ? null : openAddModal}
                onView={openViewModal}
                onEdit={isVendor ? null : openEditModal}
                onDelete={isVendor ? null : onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddTagsModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditTagsModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewTagsModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    );
}
