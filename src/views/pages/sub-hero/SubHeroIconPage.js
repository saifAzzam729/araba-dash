import TableBase from "../../../@core/components/table/TableBase";
import columns from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddSubHeroModal from "./modals/add";
import EditSubHeroModal from "./modals/edit";
import ViewSubHeroModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import SubHeroService from "@src/common/services/SubHeroService";
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
        ['sub-heros', currentPage, searchTerm,],
        () => SubHeroService.getPagination({page: currentPage, search: searchTerm})
            .then(({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
				
            })
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => SubHeroService.deleteObject(data.id),
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
            <ErrorPage title={"Sub Hero Icons"}/>
        )
    }

    return (
        <>
            <BreadCrumbs title={"Sub Hero Icons"} data={[]}/>
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
                <AddSubHeroModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditSubHeroModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewSubHeroModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    );
}
