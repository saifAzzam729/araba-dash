import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import { createColumns } from "./columns";
import {useMutation, useQuery} from "react-query";
import useTable from "@components/table/useTable";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import SaleOrdersShipmentsService from "@src/common/services/SaleOrdersShipmentsService";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import showErrorAlert from "@components/alert/showErrorAlert";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";

export default function SaleOrdersShipmentsPage() {
    const { preferredTableContentLocale } = useSettingsUiContext();
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();

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

    const { isError, isLoading, refetch } = useQuery(
        ["sale-orders-shipments", currentPage, searchTerm, preferredTableContentLocale],
        () =>
            SaleOrdersShipmentsService.getPagination({
                page: currentPage,
                search: searchTerm,
                locale: preferredTableContentLocale,
            }),
        {
            onSuccess: ({ pagination: { items, page, pages, totalItems } }) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    );

    const {mutate: manifestMutate} = useMutation(
        (data) => SaleOrdersShipmentsService.createManifest(data),
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

    const COLUMNS = createColumns(manifestMutate);

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_ADD,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_UPDATE,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_DELETE,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_SHOW,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_LIST
    );

    function openEditPage(item) {
        navigate(makeLocaleUrl(`/sale-orders-shipments/edit/${item.id}`));
    }

    if (isError) {
        return <ErrorPage title={"Sale Order Shipments"} />;
    }
    return(
        <>
            <BreadCrumbs title={"sale-orders-shipments"} data={[]} />
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onEdit={openEditPage}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />
        </>
    )
}