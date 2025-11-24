import TableBase from "@components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";


import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import {useQuery} from "react-query";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EbayListingsService from "@src/common/services/EbayListingsService";
import AddEBayListingModal from "@src/views/pages/eBay/listings/modals/add";

export default function () {

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
        ["eBay-listing", currentPage, searchTerm, preferredTableContentLocale],
        () =>
            EbayListingsService.getPagination({
                page: currentPage,
                search: searchTerm,
                locale: preferredTableContentLocale,
            }),
        {
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    );

    // const {mutate: deleteMutation} = useMutation(
    //     (data) => EbayListingsService.deleteObject(data.id),
    //     {
    //         onSuccess: () => {
    //             refetch();
    //             showSuccessAlert({});
    //         },
    //         onError: () => {
    //             showErrorAlert({});
    //         },
    //     }
    // );


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
    const viewPage = (item) => {
        navigate(makeLocaleUrl(`/ebay-listing/view/${item.id}`));
    }

    if (isError) {
        return <ErrorPage title={"eBay listing"}/>;
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
            <BreadCrumbs title={"eBay-listing"} data={[]}/>
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
                onView={viewPage}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddEBayListingModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}


        </>
    );
}
