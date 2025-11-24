import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import ReviewsVideosService from "../../../common/services/ReviewsVideosService";

import AddReviewVideoModal from "./modals/add";
import EditReviewVideoModal from "./modals/edit";
import ViewReviewVideoModal from "./modals/view";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import { useMutation, useQuery } from "react-query";
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
    ['reviews-videos', currentPage, searchTerm,],
    () => ReviewsVideosService.getPagination({page: currentPage, search: searchTerm})
        .then(({pagination: {items, page, pages, totalItems}}) => {
            updateItems(items);
            updateTotalItemsCount(totalItems);
            updateCurrentPage(page);
        })
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => ReviewsVideosService.deleteObject(data.id),
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
		(data) => ReviewsVideosService.update(data.id, {publish: data.publish}),
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
            <ErrorPage title={"Stories Videos"}/>
        )
    }

	const COLUMNS = createColumns(toggleMutation, isToggleLoading);

    return (
        <>
            <BreadCrumbs title={"Stories Videos"} data={[]}/>
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
                <AddReviewVideoModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditReviewVideoModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewReviewVideoModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    );
}
