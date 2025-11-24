import React from "react";
import {Card} from "reactstrap";
import TableBase from "../../../../../../@core/components/table/TableBase";
import ordersColumns from "../tabsColumns/ordersColumns";
import {useNavigate} from "react-router-dom";
import SaleOrdersService from "../../../../../../common/services/SaleOrdersService";
import showSuccessAlert from "../../../../../../@core/components/alert/showSuccessAlert";
import useModal from "../../../../../../@core/components/modal/useModal";
import useTable from "../../../../../../@core/components/table/useTable";
import EditSaleOrderModal from "../../../../sale-orders/modals/edit";
import {useQuery} from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ErrorPage from "@components/ErrorPage/ErrorPage";

export default function OrdersTab({userId}) {
    const navigate = useNavigate();
    const {makeLocaleUrl, translate} = useLocaleContext();

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
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
    } = useTable();

    const {isError, isLoading, refetch} = useQuery(
        ['orders', currentPage,],
        () => SaleOrdersService.getPagination({userId, page: currentPage,})
            .then(({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);

            })
    );

    const openViewPageSaleOrder = (item) => {
        navigate(makeLocaleUrl(`/sale-orders/view/${item.id}`));
    };

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    if (isError) {
        return (
            <ErrorPage title={"Orders"}/>
        )
    }

    return (
        <Card color="white" className="p-1">
            <TableBase
                columns={ordersColumns}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                onView={openViewPageSaleOrder}
                onEdit={openEditModal}
                isLoading={isLoading}
                noDataComponent={<div>{translate('common.no-data-table')}</div>}
            />
            {isEditModalOpen && (
                <EditSaleOrderModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </Card>

    )
}
