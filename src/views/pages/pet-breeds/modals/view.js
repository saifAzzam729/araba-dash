import CustomModal from "../../../../@core/components/modal";
import {Row, Col} from "reactstrap";
import PetBreedsService from "@src/common/services/PetBreedsService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import {useQuery} from "react-query";


const ViewPetBreedModal = ({isOpen, closeModal, item}) => {
    if (!item) {
        return null;
    }
    const {data} = useQuery(
        ['pet-breeds', item.id],
        () => PetBreedsService.getById(item.id)
    )
    const petBreed = data?.data ?? null;


    return (
        <CustomModal
            header={"Pet Breed Details"}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={6}>
                    <ViewTextItem label="Name English"
                                  value={(petBreed && petBreed.translations.en.name) || item.name}/>
                </Col>
                <Col xs={6}>
                    <ViewTextItem label="Name Arabic" value={(petBreed && petBreed.translations.ar.name) || item.name}/>
                </Col>
                <div className="divider"></div>
                <Col xs={6}>
                    <ViewTextItem label="Pet Type" value={item.pet.name}/>
                </Col>
                <Col xs={6}>
                    <ViewBooleanItem label="Published To Website" value={item.publish}/>
                </Col>
            </Row>
        </CustomModal>
    );
};

export default ViewPetBreedModal;
