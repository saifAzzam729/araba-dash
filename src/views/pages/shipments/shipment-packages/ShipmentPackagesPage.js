import TableBase from "@components/table/TableBase";
import { createColumns } from "./columns";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";

import AddShipmentPackagesModal from "./modals/add";
import EditShipmentPackageModal from "./modals/edit";
import ViewShipmentPackageModal from "./modals/view";

import useTable from "@components/table/useTable";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import { PERMISSIONS_NAMES } from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import ShipmentPackagesService from "@src/common/services/ShipmentPackagesService";

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
		["shipment-packages", currentPage, searchTerm, preferredTableContentLocale],
		() =>
			ShipmentPackagesService.getPagination({
				page: currentPage,
				search: searchTerm,
				locale: preferredTableContentLocale,
			}),
		{
			onSuccess: ({ pagination: { items, page, totalItems } }) => {
				updateItems(items);
				updateTotalItemsCount(totalItems);
				updateCurrentPage(page);
			},
		}
	);

	const { mutate: deleteMutation } = useMutation(
		(data) => ShipmentPackagesService.deleteObject(data.id),
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
		return <ErrorPage title={"Shipment Packages"} />;
	}

	const permissionObject = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_SHIPMENT_PACKAGE_ADD,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_PACKAGE_UPDATE,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_PACKAGE_DELETE,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_PACKAGE_SHOW,
		PERMISSIONS_NAMES.ROLE_SHIPMENT_PACKAGE_LIST
	);

	const COLUMNS = createColumns();

	return (
		<>
			<BreadCrumbs title={"shipment-packages"} data={[]} />
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
				<AddShipmentPackagesModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditShipmentPackageModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewShipmentPackageModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
