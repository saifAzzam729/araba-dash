import TableBase from "../../../@core/components/table/TableBase";
import {createColumns} from "./columns";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";

import AddCategoryModal from "./modals/add";
import EditCategoryModal from "./modals/edit";
import ViewCategoryModal from "./modals/view";

import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import CategoriesService from "../../../common/services/CategoriesService";
import { useMutation, useQuery } from "react-query";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import useWindowSize from "@hooks/useWindowSize";


export default function () {
	const {preferredTableContentLocale} = useSettingsUiContext();

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
        ['categories', currentPage, searchTerm, preferredTableContentLocale],
        () => CategoriesService.getPagination({
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
        (data) => CategoriesService.deleteObject(data.id),
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
		(data) => CategoriesService.update(data.id, {
			publish: data.publish, featured: data.featured}),
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
            <ErrorPage title={"Product Categories"}/>
        )
    }

	const permissionObject = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_CATEGORY_ADD,
		PERMISSIONS_NAMES.ROLE_CATEGORY_UPDATE,
		PERMISSIONS_NAMES.ROLE_CATEGORY_DELETE,
		PERMISSIONS_NAMES.ROLE_CATEGORY_SHOW,
		PERMISSIONS_NAMES.ROLE_CATEGORY_LIST,
	)

	const { width } = useWindowSize()

	const COLUMNS = createColumns(toggleMutation, isToggleLoading,width);

	return (
		<>
			<BreadCrumbs title={"Categories"} data={[]} />
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
				permissionObject={permissionObject}
			/>

			{isAddModalOpen && (
				<AddCategoryModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditCategoryModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}

			{isViewModalOpen && (
				<ViewCategoryModal
					closeModal={closeViewModal}
					isOpen={isViewModalOpen}
					item={viewItem}
				/>
			)}
		</>
	);
}
