import CustomModal from "@components/modal";
import {Col} from "reactstrap";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";

const ViewProductImagesModal = ({ isOpen, closeModal, onAddSuccessCb, item = null, }) => {
    let defaultValues = undefined;
    if (!item) {
        return null;
    }

    return (
        <CustomModal header={"View Image"} isOpen={isOpen} closeModal={closeModal}>
            <Col xs={12} className={'mb-2'}>
                <img
                    alt={item.title}
                    src={ParseImageUrl(item.img)}
                    width={"100%"}
                    height={'400px'}
                    style={{
                        objectFit:'contain'
                    }}
                />
            </Col>
        </CustomModal>
    );
};

export default ViewProductImagesModal;
