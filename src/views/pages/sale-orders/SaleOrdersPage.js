import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";
import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import {useNavigate} from "react-router-dom";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import {useQuery} from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import SaleOrdersFiltersAccordion from "@src/views/pages/sale-orders/filters/SaleOrdersFiltersAccordion";
import React, {useContext} from "react";
import useSaleOrdersFilterQueryParamsListener
    from "@src/views/pages/sale-orders/filters/hooks/useSaleOrdersFilterQueryParamsListener";
import translateColumns from "@src/utility/helpers/translateColumns";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import EditStatusColumn from "@src/views/pages/sale-orders/partials/EditStatusColumn";
import OptionsService from "@src/common/services/OptionsService";
import useWindowSize from "@hooks/useWindowSize";
import {AbilityContext} from "@src/utility/context/PermissionProvider";

import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import DetailedTableBase from "@components/detailed-table/DetailedTableBase";
import detailedColumns from "@src/views/pages/sale-orders/detailedProductsColumns";
import EditSaleOrderAddress from "@src/views/pages/sale-orders/modals/edit-address";


export default function () {
    const navigate = useNavigate();
    const {makeLocaleUrl, translate} = useLocaleContext();
    const {width} = useWindowSize()
    const ability = useContext(AbilityContext);

    const {preferredTableContentLocale} = useSettingsUiContext();


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

    const {filterParams} = useSaleOrdersFilterQueryParamsListener()

    const {isError, isLoading, refetch} = useQuery(
        ['sale-orders', currentPage, searchTerm, filterParams, preferredTableContentLocale],
        () => SaleOrdersService.getPagination({
            page: currentPage,
            search: searchTerm,
            userId: filterParams.user,
            status: filterParams.status,
            itemProduct: filterParams.itemProduct,
            paymentProvideCode: filterParams.paymentProvideCode,
            locale: preferredTableContentLocale,
            sort: 'so.createdAt',
            direction: 'desc',
        }),
        {
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/sale-orders/view/${item.id}`));
    };

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    if (isError) {
        return (
            <ErrorPage title={"Sale Orders"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_ADD,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_UPDATE,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_DELETE,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHOW,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_LIST,
    )

    const {data: statusOptions} = useQuery(
        ['option-service', preferredTableContentLocale],
        () => OptionsService.getSaleOrdersStatus({
            locale: preferredTableContentLocale
        }),
    );

    const COLUMNS = createColumns(width)
    const hasPermissionToUpdateStatus = ability.can(PERMISSIONS_NAMES.ROLE_SALE_ORDER_UPDATE)

    const customColumns = hasPermissionToUpdateStatus
        ? [...COLUMNS,
            {
                field: 'status',
                headerName: "status",
                translateKey: "sale-order.table.status",
                flex: 1,
                cellRenderer: ({data}) => {
                    return (
                        <div>
                            <EditStatusColumn
                                row={data}
                                statusOptions={statusOptions ? statusOptions.data : []}
                                onEditSuccess={onEditSuccess}
                                className={'d-flex'}
                            />
                        </div>
                    )
                },
            },
        ]
        : COLUMNS;


    return (
        <>
            <BreadCrumbs title={"sale-orders"} data={[]}/>
            <SaleOrdersFiltersAccordion/>

            <DetailedTableBase
                items={items}
                columns={translateColumns(customColumns, translate)}
                detailedColumns={detailedColumns}
                detailedTableData={"saleOrderItems"}
                onView={openViewPage}
                onEdit={openEditModal}
                permissionObject={permissionObject}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
            />
            {
                isEditModalOpen &&
                <EditSaleOrderAddress
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                />
            }
        </>
    );
}
