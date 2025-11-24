import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddPetTypeModal from "./modals/add";
import EditPetTypeModal from "./modals/edit";
import ViewPetTypeModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import PetTypesService from "@src/common/services/PetTypesService";
import {useMutation, useQuery} from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import ErrorPage from "@components/ErrorPage/ErrorPage";
export default function () {
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

	const {isError, isLoading,  refetch} = useQuery(
		['pet-types', currentPage, searchTerm,],
		() => PetTypesService.getPagination({page: currentPage, search: searchTerm})
			.then(({pagination: {items, page, pages, totalItems}}) => {
				updateItems(items);
				updateTotalItemsCount(totalItems);
				updateCurrentPage(page);

			})
	);


	const {mutate: deleteMutation} = useMutation(
		(data) => PetTypesService.deleteObject(data.id),
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
		(data) => PetTypesService.update(data.id, {publish: data.publish}),
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

	if (isError) {
		return (
			<ErrorPage title={"Pet Types"}/>
		)
	}

	const COLUMNS = createColumns(toggleMutation, isToggleLoading);
	return (
		<>
			<BreadCrumbs title={"Pet Types"} data={[]} />
			<TableBase
				columns={COLUMNS}
				data={items}
				onPaginate={(page) => {
					updateCurrentPage(page);
				}}
				searchTerm={searchTerm}
				page={currentPage}
				total={totalItemsCount}
				onAdd={openAddModal}
				onView={openViewModal}
				onEdit={openEditModal}
				onDelete={onDelete}
				onSearch={updateSearch}
				isLoading={isLoading}
			/>

			{isAddModalOpen && (
				<AddPetTypeModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditPetTypeModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewPetTypeModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
