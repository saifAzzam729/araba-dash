import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";
import EditPaymentMethodModal from "./modals/edit";
import useTable from "../../../@core/components/table/useTable";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import PaymentMethodsService from "@src/common/services/PaymentMethodsService";
import {Col, Row} from "reactstrap";
import PaymentMethodsViewCard from "./custom-components/PaymentMethodsViewCard";
import {useQuery} from "react-query";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import {PERMISSIONS_NAMES} from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";

export default function () {

    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
        item: editItem,
    } = useModal();

    const {
        items,
        currentPage,
        searchTerm,
        updateItems,
        updateTotalItemsCount,
        updateCurrentPage,
    } = useTable();

    const {translate} = useLocaleContext()


    const {isError, refetch} = useQuery(
        ['payment-methods', currentPage, searchTerm,],
        () => PaymentMethodsService.getPagination({page: currentPage, search: searchTerm}),
        {
            onSuccess: ({pagination: {items, page, totalItems}}) => {
                updateItems(items);
                updateTotalItemsCount(totalItems);
                updateCurrentPage(page);
            }
        }
    );

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    if (isError) {
        return (
            <ErrorPage title={"Payment Methods"}/>
        )
    }

    const permissionObject = createPermissionObjectForUi(
        PERMISSIONS_NAMES.ROLE_PAYMENT_METHOD_ADD,
        PERMISSIONS_NAMES.ROLE_PAYMENT_METHOD_UPDATE,
        PERMISSIONS_NAMES.ROLE_PAYMENT_METHOD_DELETE,
        PERMISSIONS_NAMES.ROLE_PAYMENT_METHOD_SHOW,
        PERMISSIONS_NAMES.ROLE_PAYMENT_METHOD_LIST,
    )
    return (
        <>
            <BreadCrumbs title={"payment-methods"} data={[]}/>
            <p className="mb-2">

                {translate('payment-method.sub-header')}

            </p>
            <Row>
                {items.map((item) => {
                    return (
                        <Col xs={12} md={6} lg={4} key={item.id}>
                            <PaymentMethodsViewCard
                                item={item}
                                onEdit={openEditModal}
                                onDelete={null}
                                onDuplicate={null}
                                permissionObject={permissionObject}
                            />
                        </Col>
                    );
                })}
            </Row>

            {isEditModalOpen && (
                <EditPaymentMethodModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={editItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}

        </>
    );
}
