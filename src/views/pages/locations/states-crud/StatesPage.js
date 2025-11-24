import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import useTable from "@components/table/useTable";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useMutation, useQuery} from "react-query";
import StatesService from "@src/common/services/StatesService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import useModal from "@components/modal/useModal";
import AddStatesModal from "@src/views/pages/locations/partials/states/modals/add";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditStatesModal from "@src/views/pages/locations/partials/states/modals/edit";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import {createColumns} from "./columns";
import StatesFiltersAccordion from "@src/views/pages/locations/states-crud/filters/StatesFiltersAccordion";
import useStatesFilterQueryParamsListener
    from "@src/views/pages/locations/states-crud/filters/hooks/useStatesFilterQueryParamsListener";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function StatesPage() {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();

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
        items,
        totalItemsCount,
        currentPage,
        searchTerm,
        filters,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
        updateSearch,
        updateFilters
    } = useTable();

    useStatesFilterQueryParamsListener({updateParamsObject: updateFilters})

    const {isError, isLoading, refetch} = useQuery(
        ['states', currentPage, searchTerm,preferredTableContentLocale, filters],
        () => StatesService.getPagination({
            page: currentPage,
            search: searchTerm,
            locale:preferredTableContentLocale,
            publish: filters.publish,
            country: filters.country
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
        (data) => StatesService.deleteById(data.id),
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
        (data) => StatesService.update(data.id, {publish: data.publish}),
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

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/states/view/${item.id}`));
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_STATES_ADD,
        PERMISSIONS_NAMES.ROLE_STATES_UPDATE,
        PERMISSIONS_NAMES.ROLE_STATES_DELETE,
        PERMISSIONS_NAMES.ROLE_STATES_SHOW,
        PERMISSIONS_NAMES.ROLE_STATES_LIST,
    )

    const COLUMNS = createColumns(toggleMutation, isToggleLoading);

    if (isError) {
        return (
            <ErrorPage title={"States"}/>
        )
    }

    return (
        <>
            <BreadCrumbs title={"states"} data={[]}/>
            <StatesFiltersAccordion />
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                searchTerm={searchTerm}
                page={currentPage}
                total={totalItemsCount}
                onAdd={openAddModal}
                onView={openViewPage}
                onEdit={openEditModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddStatesModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditStatesModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

        </>
    )
}

export default StatesPage