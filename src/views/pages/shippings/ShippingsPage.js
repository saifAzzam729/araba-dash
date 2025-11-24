import TableBase from "../../../@core/components/table/TableBase";
import { createColumns } from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddShippingModal from "./modals/add";
import EditShippingModal from "./modals/edit";
import ViewShippingModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import { PERMISSIONS_NAMES } from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";
import ShippingService from "@src/common/services/ShippingService";

export default function () {
	const { preferredTableContentLocale } = useSettingsUiContext();

	const {
		isOpen: isAddModalOpen,
		closeModal: closeAddModal,
		openModal: openAddModal,
		item: addItem,
	} = useModal();

	const {
		isOpen: isViewModalOpen,
		item: viewItem,
		closeModal: closeViewModal,
		openModal: openViewModal,
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

	const { isError, isLoading, refetch } = useQuery(
		["barnds", currentPage, searchTerm, preferredTableContentLocale],
		() =>
			ShippingService.getPagination({
				page: currentPage,
				search: searchTerm,
				locale: preferredTableContentLocale,
			}),
		{
			onSuccess: ({ pagination: { items, page, pages, totalItems } }) => {
				updateItems(items);
				updateTotalItemsCount(totalItems);
				updateCurrentPage(page);
			},
		}
	);

	const { mutate: deleteMutation } = useMutation(
		(data) => ShippingService.deleteObject(data.id),
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

	const { mutate: toggleMutation, isLoading: isToggleLoading } = useMutation(
		(data) => ShippingService.update(data.id, { publish: data.publish }),
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
		return <ErrorPage title={"Shipping"} />;
	}

	const permissionObject = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_SHIPPING_ADD,
		PERMISSIONS_NAMES.ROLE_SHIPPING_UPDATE,
		PERMISSIONS_NAMES.ROLE_SHIPPING_DELETE,
		PERMISSIONS_NAMES.ROLE_SHIPPING_SHOW,
		PERMISSIONS_NAMES.ROLE_SHIPPING_LIST
	);

	const COLUMNS = createColumns(toggleMutation, isToggleLoading);

	return (
		<>
			<BreadCrumbs title={"Shipping"} data={[]} />
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
				<AddShippingModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditShippingModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewShippingModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
