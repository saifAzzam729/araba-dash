import TableBase from "../../../@core/components/table/TableBase";
import columns from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddUserPetModal from "./modals/add";
import EditUserPetModal from "./modals/edit";
import ViewUserPetModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import UserPetsService from "@src/common/services/UserPetsService";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import { useMutation, useQuery } from "react-query";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import showErrorAlert from "@components/alert/showErrorAlert";

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
        ['user-pets', currentPage, searchTerm,],
        () => UserPetsService.getPagination({page: currentPage, search: searchTerm})
            .then(({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            })
    );

	const {mutate: deleteMutation} = useMutation(
        (data) => UserPetsService.deleteObject(data.id),
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
            <ErrorPage title={"User Pets"}/>
        )
    }

	return (
		<>
			<BreadCrumbs title={"User Pets"} data={[]} />
			<TableBase
				columns={columns}
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
			/>

			{isAddModalOpen && (
				<AddUserPetModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditUserPetModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewUserPetModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
