import CustomModal from "../../../../@core/components/modal";
import AwardsService from "../../../../common/services/AwardsService";
import {Col, Row} from "reactstrap";
import ViewTextItem from "../../../../@core/components/form-ui/view-item-component/ViewTextItem";
import ViewImageItem from "../../../../@core/components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "../../../../@core/components/form-ui/view-item-component/ViewBooleanItem";
import { useQuery } from "react-query";

const ViewAwardModal = ({ isOpen, closeModal, item }) => {
    if (!item) {
        return null;
    }

    const {data} = useQuery(['award', item.id], () => AwardsService.getById(item.id))

    const award = data?.data ?? null;

    return (
        <CustomModal
            header={"Awards Details"}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={6}>
                    <ViewTextItem label="Description English" value={(award && award.translations.en.description) || item.description}/>
                </Col>
                <Col xs={6}>
                    <ViewTextItem label="Description Arabic" value={(award && award.translations.ar.description) || item.description}/>
                </Col>

                <div className="divider"></div>
                <Col xs={6}>
                    <ViewImageItem label="Image" value={item.imageFileUrl}/>
                </Col>
                <Col xs={6}>
                    <ViewBooleanItem label="Published To Website" value={item.publish}/>
                </Col>
            </Row>
        </CustomModal>
    )
}

export default ViewAwardModal;
