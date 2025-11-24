import {Button, Card, Col, Row} from "reactstrap";
import {PlusCircle} from "react-feather";
import ProductImageViewer
    from "@src/views/pages/products/pages/view/tabs-content/product-images/partials/ProductImageViewer";
import AddProductImagesModal from "@src/views/pages/products/pages/view/tabs-content/product-images/modals/add";
import EditProductImagesModal from "@src/views/pages/products/pages/view/tabs-content/product-images/modals/edit";
import useModal from "@components/modal/useModal";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import {useMutation, useQuery, useQueryClient} from "react-query";
import ProductImagesServices from "@src/common/services/ProductImagesServices";
import showErrorAlert from "@components/alert/showErrorAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import NoDataYet from "@components/NoDataYet";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomCan from "@components/Authorize/CustomCan";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import TableBase from "@components/table/TableBase";
import Columns, {createColumns} from "./columns";
import useTable from "@components/table/useTable";
import ViewProductImagesModal from "@src/views/pages/products/pages/view/tabs-content/product-images/modals/view";

function ProductImagesTable({product}) {
    const queryClient = useQueryClient();
    const {translate, locale} = useLocaleContext();

    const {
        isOpen: isAddModalOpen, closeModal: closeAddModal, openModal: openAddModal, item: addItem,
    } = useModal();

    const {
        isOpen: isEditModalOpen, closeModal: closeEditModal, openModal: openEditModal, item: editItem,
    } = useModal();
 const {
        isOpen: isViewModalOpen, closeModal: closeViewModal, openModal: openViewModal, item: viewItem,
    } = useModal();

    const {
        items,
        totalItemsCount,
        currentPage,
        searchTerm,
        updateItems,
        updateSearch,
    } = useTable();

    const {isError, isLoading,  refetch} = useQuery(
        ['products-images'],
        () => ProductImagesServices.getImageGroupsList({
            id:product.id,
            locale:locale
        })
            .then(({data}) => {
                updateItems(data);

            })
    );


    const {mutate: deleteMutation} = useMutation((data) =>
        ProductImagesServices.create({...data , product :product?.id}), {
        onSuccess: () => {
            refetch()
            showSuccessAlert({});
        }, onError: () => {
            showErrorAlert({})
        }
    });

    const onDelete = (row) => {
      const   dataToSend = {
          deletedImages : row.images.map((image) => image.id)
        }
        handleDeleteMutation(deleteMutation, dataToSend)
    };

    const onAddSuccess = () => {
        refetch()
        closeAddModal();
        showSuccessAlert({});
    }

    const onEditSuccess = () => {
        refetch()
        closeEditModal();
        showSuccessAlert({});
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_ADD,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_UPDATE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_DELETE,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_SHOW,
        PERMISSIONS_NAMES.ROLE_PRODUCT_IMAGE_LIST,
    )
    const COLUMNS = createColumns(openViewModal);

    return (<>

        <TableBase
            columns={COLUMNS}
            data={items}
            searchTerm={searchTerm}
            page={currentPage}
            total={totalItemsCount}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={onDelete}
            onSearch={updateSearch}
            isLoading={isLoading}
            permissionObject={permissionObject}
        />


        {isAddModalOpen && (<AddProductImagesModal
            closeModal={closeAddModal}
            isOpen={isAddModalOpen}
            item={{...addItem, product}}
            onAddSuccessCb={onAddSuccess}
        />)}

        {isEditModalOpen && (<EditProductImagesModal
            closeModal={closeEditModal}
            isOpen={isEditModalOpen}
            item={{...editItem, product}}
            onEditSuccessCb={onEditSuccess}
        />)}

        {isViewModalOpen && (<ViewProductImagesModal
            closeModal={closeViewModal}
            isOpen={isViewModalOpen}
            item={{...viewItem, product}}
        />)}
    </>)
}

export default ProductImagesTable
