import TableBase from "@components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";
import AddCountryModal from "../partials/countries/modals/add";
import EditCountryModal from "../partials/countries/modals/edit";
import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import showErrorAlert from "@components/alert/showErrorAlert";
import CountriesService from "../../../../common/services/CountriesService";
import ViewCountryModal from "../partials/countries/modals/view";
import {useQuery, useMutation} from "react-query";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function () {
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
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
        updateSearch,
    } = useTable();


    const {isError, isLoading, refetch} = useQuery(
        ['countries', currentPage, searchTerm,preferredTableContentLocale],
        () => CountriesService.getPagination({
            page: currentPage,
            search: searchTerm,
            locale:preferredTableContentLocale
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
        (data) => CountriesService.deleteObject(data.id),
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
        (data) => CountriesService.update(data.id, {active: data.active}),
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
            <ErrorPage title={"Countries"}/>
        )
    }

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/countries/view/${item.id}`));
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_COUNTRY_ADD,
        PERMISSIONS_NAMES.ROLE_COUNTRY_UPDATE,
        PERMISSIONS_NAMES.ROLE_COUNTRY_DELETE,
        PERMISSIONS_NAMES.ROLE_COUNTRY_SHOW,
        PERMISSIONS_NAMES.ROLE_COUNTRY_LIST,
    )

    const COLUMNS = createColumns(toggleMutation, isToggleLoading);

    return (
        <>
            <BreadCrumbs title={"Countries"} data={[]}/>
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
                <AddCountryModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditCountryModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

        </>
    );
}
