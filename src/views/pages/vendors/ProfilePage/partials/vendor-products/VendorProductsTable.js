import TableBase from "@components/table/TableBase";
import {createColumns} from "./columns";
import useTable from "@components/table/useTable";
import ProductsService from "@src/common/services/ProductsService";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

const VendorProductsTable = ({vendor}) => {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

    // Get vendorId from vendor object
    const vendorId = vendor?.vendorDetails?.vendorId || vendor?.id;

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
        ['vendor-products', vendorId, currentPage, searchTerm, preferredTableContentLocale],
        () => ProductsService.getPagination({
            page: currentPage,
            search: searchTerm,
            vendorId: parseInt(vendorId),
            locale: preferredTableContentLocale
        }),
        {
            enabled: !!vendorId,
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/products/view/${item.id}`));
    };

    const handleToggleSuccess = () => {
        refetch();
    };

    if (isError) {
        return (
            <ErrorPage title={"Vendor Products"}/>
        );
    }

    if (!vendorId) {
        return null;
    }

    const COLUMNS = createColumns(vendorId, handleToggleSuccess);

    return (
        <TableBase
            columns={COLUMNS}
            data={items}
            onPaginate={(page) => {
                updateCurrentPage(page);
            }}
            page={currentPage}
            total={totalItemsCount}
            searchTerm={searchTerm}
            onView={openViewPage}
            onSearch={updateSearch}
            isLoading={isLoading}
            defaultActionButtons={true}
            headCellJustification="start"
            bodyCellJustification="start"
        />
    );
};

export default VendorProductsTable;

