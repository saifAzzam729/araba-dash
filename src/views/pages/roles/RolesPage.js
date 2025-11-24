import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";
import AddRoleModal from "./modals/add";
import EditRoleModal from "./modals/edit";
import {useState} from "react";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import {Col, Row} from "reactstrap";
import RoleGroupsService from "../../../common/services/RoleGroupsService";
import RoleAddCard from "@src/views/pages/roles/custom-components/RoleAddCard";
import RoleViewCard from "@src/views/pages/roles/custom-components/RoleViewCard";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import {useMutation, useQuery} from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import CustomCan from "@components/Authorize/CustomCan";

export default function () {
    // add modal
    const {
        isOpen: isAddModalOpen,
        closeModal: closeAddModal,
        openModal: openAddModal,
        item: addItem,
    } = useModal();

    // edit modal
    const {
        item: editItem,
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
    } = useModal();

    const [items, setItems] = useState([]);
    const {translate} = useLocaleContext()

    const {isError, refetch} = useQuery(
        'roles',
        () => RoleGroupsService.getPagination({}),
        {
            onSuccess: ({pagination: {items, page, pages, totalItems}}) => {
                setItems(items);
            }
        }
    );

    const {mutate: deleteMutation} = useMutation(
        (data) => RoleGroupsService.deleteObject(data.id),
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
            <ErrorPage title={"Roles"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_SYSTEM_ROLE_GROUP_ADD,
        PERMISSIONS_NAMES.ROLE_SYSTEM_ROLE_GROUP_UPDATE,
        PERMISSIONS_NAMES.ROLE_SYSTEM_ROLE_GROUP_DELETE,
        PERMISSIONS_NAMES.ROLE_SYSTEM_ROLE_GROUP_SHOW,
        PERMISSIONS_NAMES.ROLE_SYSTEM_ROLE_GROUP_LIST,
    )

    return (
        <>
            <BreadCrumbs title={"Roles"} data={[]}/>
            <p className="mb-2">
                {translate('roles.sub-header')}
            </p>

            <Row>
                {items.map((item) => {
                    return (
                        <Col xs={12} md={6} lg={4} key={item.id}>
                            <RoleViewCard
                                item={item}
                                onEdit={openEditModal}
                                onDublicate={openAddModal}
                                onDelete={onDelete}
                                permissionObject={permissionObject}
                            />
                        </Col>
                    );
                })}

                <CustomCan permissionName={permissionObject?.add}>
                    <Col xs={12} md={6} lg={4}>
                        <RoleAddCard onAdd={openAddModal}/>
                    </Col>
                </CustomCan>
            </Row>

            {isAddModalOpen && (
                <AddRoleModal
                    closeModal={closeAddModal}
                    isOpen={isAddModalOpen}
                    item={addItem}
                    onAddSuccessCb={onAddSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditRoleModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </>
    );
}
