import CustomModal from "@components/modal";
import { Row, Col } from "reactstrap";
import CountriesService from "../../../../../../common/services/CountriesService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import {useQuery } from "react-query";

const ViewCountryModal = ({ isOpen, closeModal, item }) => {

	if (!item) {
		return null;
	}

	const {data} = useQuery(
		['country', item.id], 
		() => CountriesService.getById(item.id)
	)

	const country = data?.data ?? null;

	return (
		<CustomModal
			header={"View Country"}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label="Name English" value={(country && country.translations.en.name) || item.name}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label="Name Arabic" value={(country && country.translations.ar.name) || item.name}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label="ISO" value={(country && country.iso2) || item.iso2}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label="Phone Number Code" value={(country && country.phoneNumberCode) || item.phoneNumberCode}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewBooleanItem label="Is Acitve" value={item.active}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewCountryModal;
