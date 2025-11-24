import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {createColumns} from "./columns";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useTable from "@components/table/useTable";

import {useMutation, useQuery} from "react-query";
import CitiesService from "@src/common/services/CitiesService";
import useModal from "@components/modal/useModal";
import AddCitiesModal from "@src/views/pages/locations/partials/cities/modals/add";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditCitiesModal from "@src/views/pages/locations/partials/cities/modals/edit";
import ViewCitiesModal from "@src/views/pages/locations/partials/cities/modals/view";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import CitiesFiltersAccordion from "@src/views/pages/locations/cities/filters/CitiesFiltersAccordion";
import useCitiesFilterQueryParamsListener
    from "@src/views/pages/locations/cities/filters/hooks/useCitiesFilterQueryParamsListener";

export default function CitiesPage() {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {filterParams } = useCitiesFilterQueryParamsListener()

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
        ['cities', currentPage, searchTerm, preferredTableContentLocale, filterParams],
        () => CitiesService.getPagination({
            page: currentPage,
            search: searchTerm,
            locale:preferredTableContentLocale,
            publish: filterParams.publish,
            state: filterParams.state
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
        (data) => CitiesService.deleteById(data.id),
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
        (data) => CitiesService.update(data.id, {publish: data.publish}),
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
        PERMISSIONS_NAMES.ROLE_CITIES_ADD,
        PERMISSIONS_NAMES.ROLE_CITIES_UPDATE,
        PERMISSIONS_NAMES.ROLE_CITIES_DELETE,
        PERMISSIONS_NAMES.ROLE_CITIES_SHOW,
        PERMISSIONS_NAMES.ROLE_CITIES_LIST,
    )

    const COLUMNS = createColumns(toggleMutation, isToggleLoading);

    if (isError) {
        return (
            <ErrorPage title={"States"}/>
        )
    }

    return (
        <>
            <BreadCrumbs title={"cities"} data={[]}/>
            <CitiesFiltersAccordion />
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
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddCitiesModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />

            )}

            {isEditModalOpen && (
                <EditCitiesModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewCitiesModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}

        </>
    )
}