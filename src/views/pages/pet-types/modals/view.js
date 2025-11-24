import CustomModal from "../../../../@core/components/modal";
import {Row, Col} from "reactstrap";
import PetTypesService from "@src/common/services/PetTypesService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import {useQuery} from "react-query";

const ViewPetTypeModal = ({isOpen, closeModal, item}) => {
    if (!item) {
        return null;
    }
    const {data} = useQuery(
        ['pet-types', item.id],
        () => PetTypesService.getById(item.id)
    )
    const petType = data?.data ?? null;


    return (
        <CustomModal
            header={"Pet Type Details"}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={6}>
                    <ViewTextItem label="Name English" value={(petType && petType.translations.en.name) || item.name}/>
                </Col>
                <Col xs={6}>
                    <ViewTextItem label="Name Arabic" value={(petType && petType.translations.ar.name) || item.name}/>
                </Col>

                <div className="divider"></div>
                <Col xs={6}>
                    <ViewBooleanItem label="Published To Website" value={item.publish}/>
                </Col>
            </Row>
        </CustomModal>
    );
};

export default ViewPetTypeModal;
