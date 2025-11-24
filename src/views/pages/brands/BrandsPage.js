import TableBase from "../../../@core/components/table/TableBase";
import { createColumns } from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddBrandModal from "./modals/add";
import EditBrandModal from "./modals/edit";
import ViewBrandModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import BrandsService from "../../../common/services/BrandsService";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import { PERMISSIONS_NAMES } from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";

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
			BrandsService.getPagination({
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
		(data) => BrandsService.deleteObject(data.id),
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
		(data) => BrandsService.update(data.id, { publish: data.publish, featured: data.featured }),
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
		return <ErrorPage title={"Brands"} />;
	}

	const permissionObject = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_BRAND_ADD,
		PERMISSIONS_NAMES.ROLE_BRAND_UPDATE,
		PERMISSIONS_NAMES.ROLE_BRAND_DELETE,
		PERMISSIONS_NAMES.ROLE_BRAND_SHOW,
		PERMISSIONS_NAMES.ROLE_BRAND_LIST
	);

	const {width} = useWindowSize()

	const COLUMNS = createColumns(toggleMutation, isToggleLoading, width);

	return (
		<>
			<BreadCrumbs title={"Brands"} data={[]} />
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
				<AddBrandModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditBrandModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewBrandModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
