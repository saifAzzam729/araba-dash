import {useMutation, useQuery} from "react-query";
import AffiliatesService from "@src/common/services/AffiliatesService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import BreadCrumbs from "@components/breadcrumbs";
import useModal from "@components/modal/useModal";
import AddAffiliatesModal from "@src/views/pages/affiliates/modals/add";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import EditAffiliatesModal from "@src/views/pages/affiliates/modals/edit";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import useTable from "@components/table/useTable";
import TableBase from "@components/table/TableBase";
import columns from './columns'
import ErrorPage from "@components/ErrorPage/ErrorPage";
import {useNavigate} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function AffiliatesPage() {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();


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
        ['affiliates', preferredTableContentLocale, searchTerm, currentPage],
        () => AffiliatesService.getPagination({
            page: currentPage,
            search: searchTerm,
            locale: preferredTableContentLocale
        }),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => AffiliatesService.deleteById(data.id),
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
    }

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/affiliates/view/${item.id}`));
    }

    if (isError) {
        return (
            <ErrorPage title={"Affiliates"}/>
        )
    }

    return (
        <>
            <BreadCrumbs title={"Affiliates"} data={[]}/>
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
                onEdit={openEditModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                onView={openViewPage}
                isLoading={isLoading}
            />


            {isAddModalOpen && (
                <AddAffiliatesModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}

            {isEditModalOpen && (
                <EditAffiliatesModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </>
    )
}


export default AffiliatesPage