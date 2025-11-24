import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import useWindowSize from "@hooks/useWindowSize";
import React, {useCallback, useContext, useState} from "react";
import {AbilityContext} from "@src/utility/context/PermissionProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useModal from "@components/modal/useModal";
import useTable from "@components/table/useTable";
import useSaleOrdersFilterQueryParamsListener
    from "@src/views/pages/sale-orders/filters/hooks/useSaleOrdersFilterQueryParamsListener";
import {useQuery} from "react-query";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import OptionsService from "@src/common/services/OptionsService";
import EditStatusColumn from "@src/views/pages/sale-orders/partials/EditStatusColumn";
import BreadCrumbs from "@components/breadcrumbs";
import {createColumns} from "@src/views/pages/dhl/sale-orders-requests/columns";
import ShipmentRequestModal from "@src/views/pages/dhl/sale-orders-requests/modals/shipment-request-modal";
import {Alert, IconButton} from "@mui/material";
import {Truck, X} from "react-feather";
import {downloadLabel} from "@src/utility/helpers/downloadLabel";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";
import Urls from "@src/common/urls";
import EditSaleOrderAddress from "@src/views/pages/dhl/sale-orders-requests/modals/edit-address";
import DetailedTableBase from "@components/detailed-table/DetailedTableBase";
import translateColumns from "@src/utility/helpers/translateColumns";
import detailedColumns from "@src/views/pages/dhl/sale-orders-requests/detailedProductsColumns";
import useSaleOrdersStore from "@src/store/SaleOrderStore";
import {Button, Tooltip} from "reactstrap";
import SaleOrdersFiltersAccordion from "@src/views/pages/eBay/orders/filters/SaleOrdersFiltersAccordion";
import {SortTypes} from "@src/views/pages/constants-dhl-deutsche/SortTypes";

export default function SaleOrdersRequestsPage() {
    const navigate = useNavigate();
    const {makeLocaleUrl, translate} = useLocaleContext();
    const {width} = useWindowSize();
    const ability = useContext(AbilityContext);

    const {preferredTableContentLocale} = useSettingsUiContext();
    const [validationMessage, setValidationMessage] = useState([]);
    const [openValidationMsg, setOpenValidationMsg] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tableDir, setTableDir] = useState('desc')
    const [tableSort, setTableSort] = useState('so.createdAt')


    const toggleTooltip = () => {
        setTooltipOpen(!tooltipOpen);
    };


    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
        item: editItem,
    } = useModal();

    const {
        isOpen: isShipmentRequestModalOpen,
        closeModal: closeShipmentRequestModal,
        openModal: openShipmentRequestModal,
        item: shipmentRequestItem,
    } = useModal();

    const {
        isOpen: isVerifyRequestModalOpen,
        closeModal: closeVerifyRequestModal,
        openModal: openVerifyRequestModal,
        item: verifyRequestItem,
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
        updateFilters,
    } = useTable();

    useSaleOrdersFilterQueryParamsListener({updateParamsObject: updateFilters});

    const {isError, isLoading, refetch, isFetching} = useQuery(
        ['dhl-sale-orders', currentPage, searchTerm, filters, preferredTableContentLocale, tableDir, tableSort],
        () => SaleOrdersService.getPagination({
            page: currentPage,
            search: searchTerm,
            userId: filters.user,
            status: 'PENDING',
            locale: preferredTableContentLocale,
            sort: filters.sort || tableSort,
            direction: tableDir,
            shipping: SHIPPING_METHODS.DHL,
            itemProduct: filters.itemProduct
        }),
        {
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
                // setOpenValidationMsg(true);
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

    const handleMultiShipClick = () => {
        navigate(makeLocaleUrl(`/multi-shipments`));
    }
    const onShipmentRequestSuccessCb = (shipmentId, validation_message, shipmentLabel) => {
        if (validation_message && validation_message.length > 0) {
            validation_message.forEach(msg => {
                if (msg.validationState === 'Error') {
                    navigate(makeLocaleUrl(`/sale-orders-shipments/edit/${shipmentId[0]}`));
                } else if (msg.validationState === 'Warning') {
                    setValidationMessage(validation_message);
                    setOpenValidationMsg(true);
                }

            });

        }
        if (shipmentLabel && shipmentLabel[0]) {
            downloadLabel(`${Urls.BASE_BACKEND_URL}${shipmentLabel}`)
            setValidationMessage([{
                validationMessage: translate('forms.shipment-created-successfully'),
                validationState: 'Success',
            }]);
            setOpenValidationMsg(true);

        }

        refetch();
        closeShipmentRequestModal();
    };

    if (isError) {
        return (
            <ErrorPage title={"DHL Sale Orders"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_ADD,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_UPDATE,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_DELETE,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHOW,
        PERMISSIONS_NAMES.ROLE_SALE_ORDER_LIST,
    );

    const {data: statusOptions} = useQuery(
        ['option-service', preferredTableContentLocale],
        () => OptionsService.getSaleOrdersStatus({
            locale: preferredTableContentLocale
        }),
    );

    const COLUMNS = createColumns(width);
    const hasPermissionToUpdateStatus = ability.can(PERMISSIONS_NAMES.ROLE_SALE_ORDER_UPDATE);

    const {addSaleOrder, clearSaleOrders} = useSaleOrdersStore();


    const handleSelectChange = (event) => {
        const selectedData = event.api.getSelectedRows();
        clearSaleOrders();
        selectedData.forEach(item => {
            addSaleOrder(item);
        });

    };

    const onSortChanged = useCallback((params) => {
        const {colId, sort: sortType} = params.columns[1] || params.columns[0];

        if (sortType === null) {
            setTableDir('desc');
            setTableSort(SortTypes.createdAt);
            return;
        }

        if (colId === 'userFullName') {
            setTableDir(sortType);
            setTableSort(SortTypes.userId);
            return;
        }
        setTableDir(sortType);
        setTableSort(`so.${colId}`);
    }, []);

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
                    );
                },
            },
        ]
        : COLUMNS;


    return (
        <>
            <BreadCrumbs title={"sale-orders"} data={[]}/>
            <SaleOrdersFiltersAccordion/>


            <Button id="multiShipButton"
                    color="primary"
                    className="d-flex align-items-center justify-content-center"
                    onClick={handleMultiShipClick}
                    style={{position: 'fixed', bottom: 16, right: 16, zIndex: 2}}
            >
                <Truck size={17}/>
            </Button>
            <Tooltip
                isOpen={tooltipOpen}
                target="multiShipButton"
                toggle={toggleTooltip}
                placement="top"
            >
                Multi Shipments
            </Tooltip>

            {openValidationMsg && (
                <div className="validation-messages position-relative">
                    {validationMessage.map((msg, index) => {
                        let severity;
                        if (msg.validationState === 'Warning') {
                            severity = 'warning';
                        } else {
                            severity = 'success';
                        }

                        return (
                            <Alert key={index} severity={severity}>
                                {msg.validationMessage}
                            </Alert>
                        );
                    })}


                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenValidationMsg(false);
                        }}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }}
                    >
                        <X/>
                    </IconButton>
                </div>
            )}

            <DetailedTableBase
                items={items}
                rowSelection={'multiple'}
                columns={translateColumns(customColumns, translate)}
                detailedColumns={detailedColumns}
                detailedTableData={"saleOrderItems"}
                onView={openViewPage}
                onShipment={openShipmentRequestModal}
                onEdit={openEditModal}
                permissionObject={permissionObject}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                isDataLoading={isLoading || isFetching}
                handleSelectChange={handleSelectChange}
                page={currentPage}
                total={totalItemsCount}
                onSortChanged={onSortChanged}
            />
            {
                isShipmentRequestModalOpen && (
                    <ShipmentRequestModal
                        closeModal={closeShipmentRequestModal}
                        isOpen={isShipmentRequestModalOpen}
                        item={shipmentRequestItem}
                        onShipmentRequestSuccessCb={onShipmentRequestSuccessCb}
                    />
                )
            }
            {
                isEditModalOpen && (
                    <EditSaleOrderAddress
                        closeModal={closeEditModal}
                        isOpen={isEditModalOpen}
                        item={editItem}
                        onEditSuccessCb={onEditSuccess}
                    />
                )
            }

        </>
    )
        ;
}
