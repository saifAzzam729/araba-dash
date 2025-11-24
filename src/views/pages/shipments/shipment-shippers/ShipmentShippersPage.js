import TableBase from "@components/table/TableBase";
import { createColumns } from "./columns";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";

import AddShipmentShipperModal from "./modals/add";
import EditShipmentProductsModal from "./modals/edit";
import ViewShipmentShipperModal from "./modals/view";

import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import { PERMISSIONS_NAMES } from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import ShipmentShippersService from "@src/common/services/ShipmentShippersService";

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
		["shipment-shippers", currentPage, searchTerm, preferredTableContentLocale],
		() =>
			ShipmentShippersService.getPagination({
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
		(data) => ShipmentShippersService.deleteObject(data.id),
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
		return <ErrorPage title={"shipment-shippers"} />;
	}

	const permissionObject = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_SHIPMENT_SHIPPER_ADD,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_SHIPPER_UPDATE,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_SHIPPER_DELETE,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_SHIPPER_SHOW,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_SHIPPER_LIST
	);

	const COLUMNS = createColumns();

	return (
		<>
			<BreadCrumbs title={"shipment-shippers"} data={[]} />
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
				<AddShipmentShipperModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditShipmentProductsModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewShipmentShipperModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
