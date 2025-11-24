import useTable from "@components/table/useTable";
import {useMutation, useQuery} from "react-query";
import AffiliatePaymentService from "@src/common/services/AffiliatePaymentService";
import {useParams} from "react-router-dom";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import columns from "./columns";
import TableBase from "@components/table/TableBase";
import React from "react";
import useModal from "@components/modal/useModal";
import AddAffiliatePaymentModal from "@src/views/pages/affiliates/pages/view/AffiliatesPayments/modals/add";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ErrorPage from "@components/ErrorPage/ErrorPage";
import EditAffiliatePaymentModal from "@src/views/pages/affiliates/pages/view/AffiliatesPayments/modals/edit";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";

function AffiliatesPaymentsCard() {
    const {id} = useParams()
    const {preferredTableContentLocale} = useSettingsUiContext();

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
        items,
        totalItemsCount,
        currentPage,
        searchTerm,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
        updateSearch,
    } = useTable();

    const {isLoading, refetch, isError} = useQuery(
        ['affiliate-payment', preferredTableContentLocale, searchTerm, currentPage, id],
        () => AffiliatePaymentService.getPagination({
            id,
            page: currentPage,
            search: searchTerm,
            locale: preferredTableContentLocale,
        }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            },
            enabled: !!id
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => AffiliatePaymentService.deleteById(id, data.id),
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
            <ErrorPage title={"Affiliate Payment"}/>
        )
    }


    return (
        <>
            <TableBase
                columns={columns}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onSearch={updateSearch}
                onAdd={openAddModal}
                onEdit={openEditModal}
                onDelete={onDelete}
                isLoading={isLoading}
            />

            {isAddModalOpen &&
                <AddAffiliatePaymentModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            }

            {isEditModalOpen &&
                <EditAffiliatePaymentModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />

            }
        </>
    )
}

export default AffiliatesPaymentsCard