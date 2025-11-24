import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import useTable from "@components/table/useTable";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import useWindowSize from "@hooks/useWindowSize";
import {createColumns} from "@src/views/pages/user-groups/columns";
import {useMutation, useQuery} from "react-query";
import UserGroupsService from "@src/common/services/UserGroupsService";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import useModal from "@components/modal/useModal";
import AddUserGroupModal from "@src/views/pages/user-groups/modals/add";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditUserGroupModal from "@src/views/pages/user-groups/modals/edit";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useNavigate} from "react-router-dom";

export default function UserGroupsPage() {
    const { preferredTableContentLocale } = useSettingsUiContext();
    const {width} = useWindowSize()
    const {makeLocaleUrl} = useLocaleContext();
    const navigate = useNavigate();


    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();

    const {
        item: editItem,
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
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
        ['user-groups', currentPage, searchTerm, preferredTableContentLocale],
        () => UserGroupsService.getPagination({
            locale: preferredTableContentLocale
        }),
        {
            onSuccess: ({ pagination: { items, page, totalItems } }) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    )

    const { mutate: deleteMutation } = useMutation(
        (data) => UserGroupsService.deleteById(data.id),
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
    };

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row);
    };

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/user-groups/view/${item.id}`));
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_USER_GROUP_ADD,
        PERMISSIONS_NAMES.ROLE_USER_GROUP_UPDATE,
        PERMISSIONS_NAMES.ROLE_USER_GROUP_DELETE,
        PERMISSIONS_NAMES.ROLE_USER_GROUP_SHOW,
        PERMISSIONS_NAMES.ROLE_USER_GROUP_LIST
    );

    const COLUMNS = createColumns(width);

    if (isError) {
        return <ErrorPage title={"User Groups"} />;
    }

    return (
        <>
            <BreadCrumbs title={"user-groups"} data={[]} />
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
                onView={openViewPage}
                onEdit={openEditModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddUserGroupModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}

            {isEditModalOpen && (
                <EditUserGroupModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

        </>
    )
}