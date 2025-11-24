import TableBase from "@components/table/TableBase";
import {createColumns} from "./columns";


import useTable from "@components/table/useTable";
import {useQuery} from "react-query";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EbayCategoriesService from "@src/common/services/EbayCategoriesService";
import BreadCrumbs from "@components/breadcrumbs";

export default function () {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const navigate = useNavigate()
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

    const {
        isError,
        isLoading,
        refetch
    } = useQuery(["ebay-categories", currentPage, searchTerm, preferredTableContentLocale], () => EbayCategoriesService.getPagination({
        page: currentPage, search: searchTerm, locale: preferredTableContentLocale,
    }), {
        onSuccess: ({pagination: {items, page, totalItems}}) => {
            updateItems(items);
            updateTotalItemsCount(totalItems);
            updateCurrentPage(page);
        },
    });


    const viewPage = (item) => {
        navigate(makeLocaleUrl(`/ebay-categories/view/${item.id}`));
    }

    if (isError) {
        return <ErrorPage title={"eBay Categories"}/>;
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_ADD,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_UPDATE,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_DELETE,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_SHOW,
        PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_LIST);


    const {width} = useWindowSize()

    const COLUMNS = createColumns(width);

    return (<>
        <BreadCrumbs title={"eBay-categories"} data={[]}/>

        <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onView={viewPage}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

        </>);
}
