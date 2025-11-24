import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";

import BreadCrumbs from "../../../@core/components/breadcrumbs";

import useModal from "../../../@core/components/modal/useModal";
import useTable from "../../../@core/components/table/useTable";

import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";

import ReviewsImagesService from "../../../common/services/ReviewsImagesService";

import EditReviewImageModal from "./modals/edit";
import AddReviewImageModal from "./modals/add";
import ViewReviewImageModal from "./modals/view";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";


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
    ['reviews-images', currentPage, searchTerm,],
    () => ReviewsImagesService.getPagination({page: currentPage, search: searchTerm})
        .then(({pagination: {items, page, pages, totalItems}}) => {
            updateItems(items);
            updateTotalItemsCount(totalItems);
            updateCurrentPage(page);
        })
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => ReviewsImagesService.deleteObject(data.id),
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
		(data) => ReviewsImagesService.update(data.id, {publish: data.publish}),
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
            <ErrorPage title={"Story Images"}/>
        )
    }

	const COLUMNS = createColumns(toggleMutation, isToggleLoading);

    return (
        <>
            <BreadCrumbs title={"Story Images"} data={[]}/>
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
            />

            {isAddModalOpen && (
                <AddReviewImageModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}

            {isEditModalOpen && (
                <EditReviewImageModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewReviewImageModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    );
}
