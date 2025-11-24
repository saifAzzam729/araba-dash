import TableBase from "@components/table/TableBase";
import {createColumns} from "../columns";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";
import EditUserModal from "../modals/edit";
import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import UsersService from "../../../../common/services/UsersService";
import {useNavigate} from "react-router-dom";
import AddUserModal from "../modals/add";
import {useMutation, useQuery} from "react-query";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import useWindowSize from "@hooks/useWindowSize";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useAuth} from "@src/utility/context/AuthProvider";

export default function () {
    const navigate = useNavigate();
    const {user} = useAuth();
    const {makeLocaleUrl} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

    // add modal
    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();

    // edit modal
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
        ["users", currentPage, searchTerm],
        () =>
            UsersService.getPagination({
                page: currentPage,
                search: searchTerm,
                locale: preferredTableContentLocale,
                type: 'ADMIN'
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
        (data) => UsersService.deleteObject(data.id),
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

    const {mutate: toggleMutation, isLoading: isToggleLoading} = useMutation(
        (data) => {
            if (user.id === data.id) {
                throw new Error('You can\'t block yourself')
            }
            return UsersService.update(data.id, {blocked: data.blocked});
        },
        {
            onSuccess: () => {
                refetch()
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
    };

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    };

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row);
    };

    if (isError) {
        return <ErrorPage title={"Users"}/>;
    }

    const onGoToProfile = (row) => {
        navigate(makeLocaleUrl(`/admins/profile/${row.id}`));
    };

    const {width} = useWindowSize();

    const COLUMNS = createColumns(toggleMutation, isToggleLoading, width);

    return (
        <>
            <BreadCrumbs title={"admins"} data={[]}/>
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
                onEdit={openEditModal}
                // onView={openViewModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                onGoToProfile={onGoToProfile}
                isLoading={isLoading}
            />

            {isAddModalOpen && (
                <AddUserModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                    isAdmin={true}
                />
            )}
            {isEditModalOpen && (
                <EditUserModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </>
    );
}
