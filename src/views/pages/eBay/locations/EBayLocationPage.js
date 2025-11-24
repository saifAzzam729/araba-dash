import TableBase from "@components/table/TableBase";
import {createColumns} from "./columns";
import useModal from "@components/modal/useModal";


import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import {useMutation, useQuery} from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";
import EBayService from "@src/common/services/EBayService";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EBayLocationService from "@src/common/services/EBayLocationService";
import AddEBayLocationModal from "@src/views/pages/eBay/locations/modals/add";

export default function ({accountId}) {

    const {preferredTableContentLocale} = useSettingsUiContext();
    const navigate = useNavigate()
    const {makeLocaleUrl} = useLocaleContext();

    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
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
        ["eBay", currentPage, searchTerm, preferredTableContentLocale],
        () =>
            EBayLocationService.getPagination({
                page: currentPage,
                search: searchTerm,
                locale: preferredTableContentLocale,
                accountId
            }),
        {
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => EBayService.deleteObject(data.id),
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
    };

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    };

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row);
    };
    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/eBay/view/${item.id}`));
    }
    if (isError) {
        return <ErrorPage title={"eBay location"}/>;
    }
    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_ADD,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_UPDATE,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_DELETE,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_SHOW,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_LIST
    );

    const {width} = useWindowSize()

    const COLUMNS = createColumns(width);


    return (
        <>
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
                // onView={openViewPage}
                // onEdit={openEditModal}
                // onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddEBayLocationModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}


        </>
    );
}
