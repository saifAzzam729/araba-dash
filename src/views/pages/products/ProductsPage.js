import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useTable from "../../../@core/components/table/useTable";
import ProductsService from "../../../common/services/ProductsService";
import {useNavigate} from "react-router-dom";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import {useMutation, useQuery} from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";
import ProductsFiltersAccordion from "./filters/ProductsFiltersAccordion";
import { Col, Row } from "reactstrap";
import useProductFilterQueryParamsListener from "./filters/hooks/useProductFilterQueryParamsListener";
import {WITH_EXTRA_PRODUCT_DETAILS} from "@src/views/pages/products/config";
import VendorFilterDropdown from "./filters/partials/VendorFilterDropdown";
import useQueryParams from "@hooks/useQueryParams";
import {useState, useEffect} from "react";
import VendorsService from "../../../common/services/VendorsService";


export default function () {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {width} = useWindowSize()

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
    
    const {filterParams} = useProductFilterQueryParamsListener();
    const {toggleValueInQueryParam} = useQueryParams();
    const [selectedVendor, setSelectedVendor] = useState(null);

    const vendorId = filterParams.vendorId;

    // Fetch vendor details using React Query when vendorId exists
    useQuery(
        ['vendor', vendorId, preferredTableContentLocale],
        () => VendorsService.getById(vendorId, {locale: preferredTableContentLocale}),
        {
            enabled: !!vendorId,
            onSuccess: (res) => {
                const vendor = res.data;
                setSelectedVendor({
                    value: vendor.vendorDetails.vendorId,
                    label: vendor.fullName
                });
            },
            onError: () => {
                setSelectedVendor(null);
            }
        }
    );

    // Reset selectedVendor when vendorId is cleared
    useEffect(() => {
        if (!vendorId) {
            setSelectedVendor(null);
        }
    }, [vendorId]);

    const handleVendorChange = (selectedOption) => {
        setSelectedVendor(selectedOption);
        toggleValueInQueryParam('vendorId', selectedOption ? selectedOption.value : null);
        updateCurrentPage(1); // Reset to first page when filter changes
    };

    const {isError, isLoading, refetch} = useQuery(
        ['products', currentPage, searchTerm, filterParams, preferredTableContentLocale],
        () => ProductsService.getPagination({
            page: currentPage,
            search: searchTerm,
            quantity: filterParams.quantity,
            ...(WITH_EXTRA_PRODUCT_DETAILS && { sku: filterParams.sku }),
            ...(filterParams.vendorId && { vendorId: parseInt(filterParams.vendorId) }),
            locale: preferredTableContentLocale
        }),
        {
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const {mutate: publishToggleMutation, isLoading: isPublishToggleLoading} = useMutation(
        (data) => ProductsService.update(data.id, {
            publish: data.publish, featured: data.featured}),
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

    const {mutate: outOfStockToggleMutation, isLoading: isOutOfStockToggleLoading} = useMutation(
        (data) => ProductsService.update(data.id, {outOfStock: data.outOfStock}),
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

    const {mutate: deleteMutation} = useMutation(
        (data) => ProductsService.deleteObject(data.id),
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

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row)
    };

    const openOnAddPage = () => {
        navigate(makeLocaleUrl("/products/add"));
    };

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/products/view/${item.id}`));
    };

    if (isError) {
        return (
            <ErrorPage title={"Products"}/>
        )
    }

	const permissionObject = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_PRODUCT_ADD,
		PERMISSIONS_NAMES.ROLE_PRODUCT_UPDATE,
		PERMISSIONS_NAMES.ROLE_PRODUCT_DELETE,
		PERMISSIONS_NAMES.ROLE_PRODUCT_SHOW,
		PERMISSIONS_NAMES.ROLE_PRODUCT_LIST,
	)

	const COLUMNS = createColumns(publishToggleMutation, isPublishToggleLoading, outOfStockToggleMutation, isOutOfStockToggleLoading, width);

    const vendorFilterComponent = (
        <VendorFilterDropdown
            value={selectedVendor}
            onChange={handleVendorChange}
        />
    );
 
   
    return (
        <>
            <BreadCrumbs title={"Products"} data={[]}/>
            {WITH_EXTRA_PRODUCT_DETAILS && (
                <Row>
                    <Col md={'8'}>
                        <ProductsFiltersAccordion/>
                    </Col>
                </Row>
            )}
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onAdd={openOnAddPage}
                onView={openViewPage}
                onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
				permissionObject={permissionObject}
				customLimit={100}
				customFilterComponent={vendorFilterComponent}
			/>
		</>
	);
}
