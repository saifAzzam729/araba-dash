import columns from "./columns";
import TableBase from "@components/table/TableBase";
import {useQuery} from "react-query";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import useTable from "@components/table/useTable";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useNavigate, useParams} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import React from "react";

function AffiliatesOrdersCard() {
    const {id: affiliateId} = useParams()
    const {preferredTableContentLocale} = useSettingsUiContext();
    const navigate = useNavigate();
    const {makeLocaleUrl, translate} = useLocaleContext();
    
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

    const {isLoading, refetch, isError} = useQuery(
        ['affiliate-orders', preferredTableContentLocale, searchTerm, affiliateId],
        () => SaleOrdersService.getPagination({
            affiliate: affiliateId,
            page: currentPage,
            search: searchTerm,
            locale: preferredTableContentLocale,
        }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
            enabled: !!affiliateId
        }
    );

    const openOrderView = (item) => {
        //     go to sale order details page
        navigate(makeLocaleUrl(`/sale-orders/view/${item.id}`));
    }

    return (
        <>
            <TableBase
                columns={columns}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onSearch={updateSearch}
                onView={openOrderView}
                isLoading={isLoading}
            />
        </>
    )
}

export default AffiliatesOrdersCard