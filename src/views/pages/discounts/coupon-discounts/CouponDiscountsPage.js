import {useMutation, useQuery} from "react-query";
import useTable from "@components/table/useTable";
import DiscountsService from "@src/common/services/DiscountsService";
import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import {createColumns} from "./columns";
import useModal from "@components/modal/useModal";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditCouponDiscountModal from "@src/views/pages/discounts/coupon-discounts/modals/edit";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import ViewCouponDiscountModal from "@src/views/pages/discounts/coupon-discounts/modals/view";
import AddCouponDiscountModal from "@src/views/pages/discounts/coupon-discounts/modals/add";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";

function CouponDiscountsPage() {
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();

    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
        item: editItem,
    } = useModal();

    const {
        isOpen: isViewModalOpen,
        closeModal: closeViewModal,
        openModal: openViewModal,
        item: viewItem,
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

    const { isLoading,  refetch} = useQuery(
        ['coupon-discounts', currentPage, searchTerm, preferredTableContentLocale],
        () => DiscountsService.getPagination({
            page: currentPage,
            search: searchTerm,
            isCoupon: true,
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

    const {mutate: deleteMutation} = useMutation(
        (data) => DiscountsService.deleteObject(data.id),
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

    const {mutate: toggleMutation, isLoading: isToggleLoading} = useMutation(
        (data) => DiscountsService.update(data.id, {active: data.active}),
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

    const onAddSuccess = () => {
        refetch();
        closeAddModal();
        showSuccessAlert({});
    }

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row)
    };

    const {width} = useWindowSize()

    const COLUMNS = createColumns(toggleMutation, isToggleLoading, width);

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_DISCOUNT_ADD,
        PERMISSIONS_NAMES.ROLE_DISCOUNT_UPDATE,
        PERMISSIONS_NAMES.ROLE_DISCOUNT_DELETE,
        PERMISSIONS_NAMES.ROLE_DISCOUNT_SHOW,
        PERMISSIONS_NAMES.ROLE_DISCOUNT_LIST,
    )

    return (
        <>
            <BreadCrumbs title={"coupon-discounts"} data={[]}/>
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onAdd={openAddModal}
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isAddModalOpen && (
                <AddCouponDiscountModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}

            {isEditModalOpen && (
                <EditCouponDiscountModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewCouponDiscountModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}

        </>
    )
}

export default CouponDiscountsPage;
