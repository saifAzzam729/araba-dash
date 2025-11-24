import TableBase from "../../../@core/components/table/TableBase";
import columns, {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";
import ViewContactModal from "./modals/view";
import EditContactModal from "./modals/edit";
import useTable from "../../../@core/components/table/useTable";
import ContactUsApplicationsService from "../../../common/services/ContactUsApplicationsService";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import {useMutation, useQuery} from "react-query";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import showErrorAlert from "@components/alert/showErrorAlert";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import useWindowSize from "@hooks/useWindowSize";


export default function () {

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
        updateSearch
    } = useTable();

    const {isError, isLoading, refetch} = useQuery(
        ['contact-us', currentPage, searchTerm,],
        () => ContactUsApplicationsService.getPagination({page: currentPage, search: searchTerm}),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => ContactUsApplicationsService.deleteObject(data.id),
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
            <ErrorPage title={"Contact US"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_CONTACT_US_ADD,
        PERMISSIONS_NAMES.ROLE_CONTACT_US_UPDATE,
        PERMISSIONS_NAMES.ROLE_CONTACT_US_DELETE,
        PERMISSIONS_NAMES.ROLE_CONTACT_US_SHOW,
        PERMISSIONS_NAMES.ROLE_CONTACT_US_LIST,
    )

    const {width} = useWindowSize()

    const COLUMNS = createColumns(width)

    return (
        <>
            <BreadCrumbs title={"contact-us"} data={[]}/>
            <TableBase
                columns={COLUMNS}
                data={items}
                onPaginate={(page) => {
                    updateCurrentPage(page);
                }}
                page={currentPage}
                total={totalItemsCount}
                searchTerm={searchTerm}
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={onDelete}
                onSearch={updateSearch}
                isLoading={isLoading}
                permissionObject={permissionObject}
            />

            {isEditModalOpen && (
                <EditContactModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

            {isViewModalOpen && (
                <ViewContactModal
                    closeModal={closeViewModal}
                    isOpen={isViewModalOpen}
                    item={viewItem}
                />
            )}
        </>
    );
}
