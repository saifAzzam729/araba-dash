import {Fragment} from "react";
import {Col, Row} from "reactstrap";
import {useAuth} from "@src/utility/context/AuthProvider";
import StoreDetailsCard from "@src/views/pages/home/vendor-content/StoreDetailsCard";
import EditStoreModal from "@src/views/pages/home/vendor-content/modals/EditStoreModal";
import useModal from "@components/modal/useModal";

const VendorContent = () => {
    const {user} = useAuth();
    
    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
    } = useModal();

    const onEditSuccess = () => {
        closeEditModal();
    };

    if (!user || !user.vendor) {
        return null;
    }

    return (
        <Fragment>
            <Row className="mb-3">
                <Col sm="12" lg={"12"}>
                    <StoreDetailsCard vendor={user} onEdit={openEditModal} />
                </Col>
            </Row>

            {isEditModalOpen && (
                <EditStoreModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    vendor={user}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </Fragment>
    );
};

export default VendorContent;

