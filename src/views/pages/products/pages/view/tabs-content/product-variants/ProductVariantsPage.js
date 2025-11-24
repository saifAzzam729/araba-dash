import Columns from "./columns";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import ProductVariantsService from "@src/common/services/ProductVariantsService";
import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import useModal from "@components/modal/useModal";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import { PERMISSIONS_NAMES } from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import AddProductVariantModal from "@src/views/pages/products/pages/view/tabs-content/product-variants/modal/add";
import EditProductVariantModal from "@src/views/pages/products/pages/view/tabs-content/product-variants/modal/edit";
import SortableTable from "@components/sortable-table/SortableTable";
import { useState } from "react";
import showBottomAlert from "@components/alert/showBottomAlert";
import { Card } from "reactstrap";
import { useLocaleContext } from "@src/providers/LocaleProvider";

export default function ({ product }) {
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
		items,
		totalItemsCount,
		currentPage,
		searchTerm,
		updateItems,
		updateTotalItemsCount,
		updateCurrentPage,
		updateSearch,
	} = useTable();

	const { translate } = useLocaleContext();

	const { isError, isLoading, refetch } = useQuery(
		["products-variants", currentPage, searchTerm],
		() =>
			ProductVariantsService.getPagination({
				page: currentPage,
				search: searchTerm,
				id: product.id,
			}).then(({ pagination: { items, page, pages, totalItems } }) => {
				updateItems(items);
				updateTotalItemsCount(totalItems);
				updateCurrentPage(page);
			})
	);

	const { mutate: updateOrderMutation } = useMutation(
		(data) => ProductVariantsService.productVariantSortOrder(product.id, data),
		{
			onSuccess: () => {
				refetch();
				showBottomAlert({ description: translate("common.process-done") });
			},
			onError: () => {
				showErrorAlert({});
			},
		}
	);

	const { mutate: deleteMutation } = useMutation(
		(data) => ProductVariantsService.deleteObject(data.id),
		{
			onSuccess: () => {
				refetch();
				showSuccessAlert({});
			},
			onError: () => {
				showErrorAlert({});
			},
		}
	);

	const permissionObjectForUi = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_ADD,
		PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_UPDATE,
		PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_DELETE,
		PERMISSIONS_NAMES.ROLE_PRODUCT_VARIANT_SHOW,
		PERMISSIONS_NAMES.ROLE_PRODUCT_LIST
	);

	const onAddSuccess = () => {
		refetch();
		closeAddModal();
		showSuccessAlert({});
	};

	const onEditSuccess = () => {
		refetch();
		closeEditModal();
		showSuccessAlert({});
	};

	const onDelete = (row) => {
		handleDeleteMutation(deleteMutation, row);
	};

	if (isError) {
		return <ErrorPage title={"Product Variants"} />;
	}

	const handleOrderChange = (newItems) => {
		const data = newItems.map((item, index) => ({
			sortOrder: index,
			productVariant: item.id,
		}));
		const dataToSend = {
			data,
		};
		updateOrderMutation(dataToSend);
	};

	console.log("items", items);
	return (
		<>
			<Card className="p-3 bg-white">
				<SortableTable
					items={items}
					reorderingTable={updateItems}
					columns={Columns}
					onAdd={openAddModal}
					onEdit={openEditModal}
					onDelete={onDelete}
					permissionObject={permissionObjectForUi}
					onOrderChange={handleOrderChange}
				/>
			</Card>

			{isAddModalOpen && (
				<AddProductVariantModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditProductVariantModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}
		</>
	);
}
