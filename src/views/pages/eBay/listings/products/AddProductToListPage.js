import TableBase from "@components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";


import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import {useMutation, useQuery} from "react-query";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EbayListingProductsService from "@src/common/services/EbayListingProductsService";
import AddEBayListProductModal from "@src/views/pages/eBay/listings/products/modals/AddEBayListProductModal";
import handleEndListMutation from "@components/alert/handleEndList";

export default function ({listId}) {

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
        ["eBay-listing-products", currentPage, searchTerm, preferredTableContentLocale],
        () =>
            EbayListingProductsService.getPagination({
                page: currentPage,
                search: searchTerm,
                locale: preferredTableContentLocale,
                ebayListing: listId
            }),
        {
            refetchInterval: 10000,
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => EbayListingProductsService.deleteObject(data.id),
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
    const {mutate: republishMutation, isLoading: isRepublishLoading} = useMutation(
        (data) => EbayListingProductsService.republish(data.id),
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


    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/ebay-product-details/${item.id}`));
    }

    const onEndList = (row) => {

        handleEndListMutation(deleteMutation, row);
    };


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

    const COLUMNS = createColumns(width, permissionObject, onEndList, openViewPage, republishMutation, isRepublishLoading);


    return (
        <>
            <BreadCrumbs title={"eBay-listing-products"} data={[]}/>
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
                defaultActionButtons={false}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddEBayListProductModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}


        </>
    );
}
