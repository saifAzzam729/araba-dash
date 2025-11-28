import TableBase from "@components/table/TableBase";
import BreadCrumbs from "@components/breadcrumbs";
import {createColumns as createVendorRequestColumns} from "../vendor-requests/columns";
import useTable from "@components/table/useTable";
import VendorsService from "@src/common/services/VendorsService";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import VendorsFiltersAccordion from "./filters/VendorsFiltersAccordion";
import useVendorsFilterQueryParamsListener from "./filters/hooks/useVendorsFilterQueryParamsListener";

export default function VendorsPage() {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

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

    const {filterParams} = useVendorsFilterQueryParamsListener();

    const {isError, isLoading} = useQuery(
        ["vendors", currentPage, searchTerm, filterParams],
        () => VendorsService.getPagination({
            page: currentPage,
            search: searchTerm,
            locale: preferredTableContentLocale,
            status: filterParams.status,
        }),
        {
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
        }
    );

    if (isError) {
        return <ErrorPage title={"Vendors"}/>;
    }

    const onGoToProfile = (row) => {
        navigate(makeLocaleUrl(`/vendors/profile/${row.vendorDetails.vendorId}`));
    };

    const COLUMNS = createVendorRequestColumns();

    return (
        <>
            <BreadCrumbs title={"Vendors"} data={[]}/>
            <VendorsFiltersAccordion/>
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onSearch={updateSearch}
                onGoToProfile={onGoToProfile}
                isLoading={isLoading}
            />
        </>
    );
}
