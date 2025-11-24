import { createColumns } from "./columns";
import { useCallback, useEffect, useRef, useState } from "react";
import BreadCrumbs from "../../../../@core/components/breadcrumbs";
import useModal from "../../../../@core/components/modal/useModal";
import useTable from "../../../../@core/components/table/useTable";
import showSuccessAlert from "../../../../@core/components/alert/showSuccessAlert";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../../../@core/components/ErrorPage/ErrorPage";
import { useQuery } from "react-query";
import { useLocaleContext } from "@src/providers/LocaleProvider";
import React, { useContext } from "react";
import translateColumns from "@src/utility/helpers/translateColumns";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import { PERMISSIONS_NAMES } from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";

import OptionsService from "@src/common/services/OptionsService";
import useWindowSize from "@hooks/useWindowSize";

import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";
import DetailedTableBase from "@components/detailed-table/DetailedTableBase";
import detailedColumns from "@src/views/pages/sale-orders/detailedProductsColumns";
import { Button, Col, Row } from "reactstrap";
import ShipCard from "@src/views/pages/eBay/orders/partials/ShipCard";
import useSaleOrdersStore from "@src/store/SaleOrderStore";
import EditSaleOrderAddress from "@src/views/pages/dhl/sale-orders-requests/modals/edit-address";
import { SortTypes } from "@src/views/pages/constants-dhl-deutsche/SortTypes";
import SaleOrdersFiltersAccordion from "@src/views/pages/eBay/orders/filters/SaleOrdersFiltersAccordion";
import WalletBalance from "@src/views/pages/deutsche-post/wallet-accordion/AccordionContent";
import useExpandCollapseAll from "@components/detailed-table/useExpandAllColumns";
import useSaleOrdersFilterQueryParamsListener
  from "@src/views/pages/eBay/orders/filters/hooks/useSaleOrdersFilterQueryParamsListener";

export default function () {
  const navigate = useNavigate();
  const { makeLocaleUrl, translate } = useLocaleContext();
  const { width } = useWindowSize();
  const tableRef = useRef(null);
  const [tableDir, setTableDir] = useState("desc");
  const [tableSort, setTableSort] = useState("so.createdAt");

  const { preferredTableContentLocale } = useSettingsUiContext();

  const { expandCollapseAll } = useExpandCollapseAll(tableRef);

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
    updateFilters,
  } = useTable();

  const { filterParams } = useSaleOrdersFilterQueryParamsListener();


  const onSortChanged = useCallback((params) => {
    const { colId, sort: sortType } = params.columns[1] || params.columns[0];
    if (sortType === null) {
      setTableDir("desc");
      setTableSort(SortTypes.createdAt);
      return;
    } else if (colId === "soipvp.id") {
      setTableSort(colId);
      setTableDir(sortType);
      return;
    } else if (colId === "userFullName") {
      setTableDir(sortType);
      setTableSort(SortTypes.userId);
      return;
    }

    setTableDir(sortType);
    setTableSort(`so.${colId}`);
  }, []);


  function getSaleOrder(filterParams) {
    const isEmptyFilters =
        !filterParams.user &&
        !filterParams.status &&
        !filterParams.itemProduct &&
        !filterParams.searchParam;

    const effectiveStatus = isEmptyFilters ? filterParams.status = "PENDING" : filterParams.status;

    return SaleOrdersService.getPagination({
      page: currentPage,
      userId: filterParams.user,
      status: effectiveStatus,
      itemProduct: filterParams.itemProduct,
      paymentProvideCode: filterParams.paymentProvideCode ?? "EBAY",
      search: filterParams.searchParam,
      locale: preferredTableContentLocale,
      sort: tableSort,
      direction: tableDir,
    });
  }

  const { isError, isLoading, isFetching, refetch } = useQuery(
    [
      "ebay-sale-orders",
      currentPage,
      searchTerm,
      filterParams,
      preferredTableContentLocale,
      tableDir,
      tableSort,
    ],
    () => getSaleOrder(filterParams),
    {
      onSuccess: ({ pagination: { items, page, totalItems } }) => {
        updateItems(items);
        updateTotalItemsCount(totalItems);
        updateCurrentPage(page);
      },
    }
  );

  const { addSaleOrder, clearSaleOrders } = useSaleOrdersStore();

  const openViewPage = (item) => {
    navigate(makeLocaleUrl(`/ebay-sale-orders/view/${item.id}`));
  };
  const openEditPage = (item) => {
    const url = makeLocaleUrl(
      `/sale-orders-shipments/edit/${item.saleOrderShipment?.id}`
    );
    window.open(url, "_blank");
  };
  const onEditSuccess = () => {
    refetch();
    closeEditModal();
    showSuccessAlert({});
  };
  const handleSelectChange = (event) => {
    const selectedData = event.api.getSelectedRows();
    clearSaleOrders();
    selectedData.forEach((item) => {
      addSaleOrder(item);
    });
  };

  if (isError) {
    return <ErrorPage title={"Ebay Sale Orders"} />;
  }

  const permissionObject = createPermissionObjectForUi(
    PERMISSIONS_NAMES.ROLE_SALE_ORDER_ADD,
    PERMISSIONS_NAMES.ROLE_SALE_ORDER_UPDATE,
    PERMISSIONS_NAMES.ROLE_SALE_ORDER_DELETE,
    PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHOW,
    PERMISSIONS_NAMES.ROLE_SALE_ORDER_LIST
  );

  const { data: statusOptions } = useQuery(
    ["option-service", preferredTableContentLocale],
    () =>
      OptionsService.getSaleOrdersStatus({
        locale: preferredTableContentLocale,
      })
  );

  const COLUMNS = createColumns(
    width,
    permissionObject,
    openViewPage,
    openEditModal,
    openEditPage,
    statusOptions,
    onEditSuccess
  );
  useEffect(() => {
    return () => {
      clearSaleOrders();
    };
  }, []);

  return (
    <>
      <BreadCrumbs title={"ebay-sale-orders"} data={[]} />
      <Row>
        <Col md={"10"}>
          <SaleOrdersFiltersAccordion />
        </Col>
        <Col md={"2"} className={"mt-1"}>
          <WalletBalance />
        </Col>
      </Row>

      <Row className={"pb-0"}>
        <Col md={"9"}>
          <DetailedTableBase
            externalRef={tableRef}
            items={items}
            rowSelection={"multiple"}
            columns={translateColumns(COLUMNS, translate)}
            detailedColumns={detailedColumns}
            detailedTableData={"saleOrderItems"}
            permissionObject={permissionObject}
            onPaginate={(page) => {
              updateCurrentPage(page);
            }}
            isDataLoading={isLoading || isFetching}
            handleSelectChange={handleSelectChange}
            page={currentPage}
            total={totalItemsCount}
            onSortChanged={onSortChanged}
            defaultActionButtons={false}
            expandButton={true}
          />
        </Col>
        <Col md={"3"} className={"mt-4"}>
          <ShipCard expandAll={expandCollapseAll} refetchOrders={refetch} />
        </Col>
      </Row>
      {isEditModalOpen && (
        <EditSaleOrderAddress
          closeModal={closeEditModal}
          isOpen={isEditModalOpen}
          item={editItem}
          onEditSuccessCb={onEditSuccess}
        />
      )}
    </>
  );
}
