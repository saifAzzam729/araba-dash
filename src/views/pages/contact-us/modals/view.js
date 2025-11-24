import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import ContactUsApplicationsService from "../../../../common/services/ContactUsApplicationsService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ViewContactModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}

	const {translate} = useLocaleContext()

	const {data} = useQuery(
		['contact', item.id],
		() => ContactUsApplicationsService.getById(item.id)
	)

	const contact = data?.data ?? null;

	return (
		<CustomModal
			translatedHeader={translate('contact-us.common.contact-details')}
			isOpen={isOpen}
			closeModal={closeModal}
			size='xl'
		>
			<Row>
				<Col xs={12} md={4}>
					<ViewTextItem label={translate('contact-us.common.fullName')} value={`${(contact && contact.firstName) || item.firstName} ${(contact && contact.lastName) || item.lastName}`}/>
				</Col>

				<Col xs={12} md={4}>
					<ViewTextItem label={translate('contact-us.common.email')} value={(contact && contact.email) || item.email}/>
				</Col>

				<Col xs={12} md={4}>
					<ViewTextItem label={translate('contact-us.common.phoneNumber')} value={(contact && contact.phoneNumber) || item.phoneNumber}/>
				</Col>
				<div className="divider"></div>
				<Col>
					<ViewTextItem label={translate('contact-us.common.message')} value={(contact && contact.message) || item.message}/>
				</Col>
				<div className="divider"></div>
				<Col>
					<ViewTextItem label={translate('contact-us.common.status')} value={(contact && contact.status) || item.status}/>
				</Col>

			</Row>
		</CustomModal>
	);
};

export default ViewContactModal;
