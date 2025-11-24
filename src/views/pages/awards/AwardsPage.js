import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";
import AddAwardModal from "./modals/add";
import EditAwardModal from "./modals/edit";
import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import AwardsService from "../../../common/services/AwardsService";
import ViewAwardModal from "./modals/view";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";

export default function () {

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
        isOpen: isViewModalOpen,
        closeModal: closeViewModal,
        openModal: openViewModal,
        item: viewItem,
    } = useModal();


    const {
        items,
        totalItemsCount,
        currentPage,
        searchTerm,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
        updateSearch
    } = useTable();

    const {isError, isLoading,  refetch} = useQuery(
        ['awards', currentPage, searchTerm,],
        () => AwardsService.getPagination({page: currentPage, search: searchTerm})
            .then(({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            })
    );
    
    const {mutate: deleteMutation} = useMutation(
        (data) => AwardsService.deleteObject(data.id),
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
		(data) => AwardsService.update(data.id, {publish: data.publish}),
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
            <ErrorPage title={"Awards"}/>
        )
    }

	const COLUMNS = createColumns(toggleMutation, isToggleLoading);

    return (
        <>
            <BreadCrumbs title={"Awards"} data={[]}/>
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
                <AddAwardModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditAwardModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewAwardModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    )
}
