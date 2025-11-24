import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddPetBreedModal from "./modals/add";
import EditPetBreedModal from "./modals/edit";
import ViewPetBreedModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import PetBreedsService from "@src/common/services/PetBreedsService";
import {useMutation, useQuery} from "react-query";
import PetTypesService from "@src/common/services/PetTypesService";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
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
		['pet-breeds', currentPage, searchTerm,],
		() => PetBreedsService.getPagination({page: currentPage, search: searchTerm})
			.then(({pagination: {items, page, pages, totalItems}}) => {
				updateItems(items);
				updateTotalItemsCount(totalItems);
				updateCurrentPage(page);

			})
	);

	const {mutate: deleteMutation} = useMutation(
		(data) => PetBreedsService.deleteObject(data.id),
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
		(data) => PetBreedsService.update(data.id, {publish: data.publish}),
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
			<ErrorPage title={"Pet Breeds"}/>
		)
	}

	const COLUMNS = createColumns(toggleMutation, isToggleLoading);

	return (
		<>
			<BreadCrumbs title={"Pet Breeds"} data={[]} />
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
				<AddPetBreedModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditPetBreedModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewPetBreedModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
