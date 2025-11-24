import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewDateItem from "@components/form-ui/view-item-component/ViewDateItem";
import ViewGenderItem from "@components/form-ui/view-item-component/ViewGenderItem";

const ViewUserPetModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}
	return (
		<CustomModal
			header={"User Pet Details"}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label="Name" value={item.name}/>
				</Col>
				<Col xs={6}>
					<ViewDateItem label="Birth Date" value={item.birthdate}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewGenderItem label="Gender" value={item.gender.value}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label="Weight" value={item.weight}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label="Pet Breed" value={item.petBreed.name}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewUserPetModal;
