import CustomModal from "@components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import ShipmentShippersService from "@src/common/services/ShipmentShippersService";

const ViewShipmentShipperModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()
	const { preferredTableContentLocale } = useSettingsUiContext();


	const {data} = useQuery(
		['shipment-shipper', item.id],
		() => ShipmentShippersService.getById(item.id, {
			locale: preferredTableContentLocale
		})
	)

	const shipmentShipper = data?.data ?? null;

	return (
		<CustomModal
			translatedHeader={translate("shipment-shippers.common.shipment-shipper-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-shippers.forms.name")} value={(shipmentShipper && shipmentShipper.name) || item.name}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-shippers.forms.description")} value={(shipmentShipper && shipmentShipper.description) || item.description}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-shippers.forms.email")} value={(shipmentShipper && shipmentShipper.email) || item.email}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-shippers.forms.phone")} value={(shipmentShipper && shipmentShipper.phone) || item.phone}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-shippers.forms.addressStreet")} value={(shipmentShipper && shipmentShipper.addressStreet) || item.addressStreet}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-shippers.forms.additionalAddressInformation")} value={(shipmentShipper && shipmentShipper.additionalAddressInformation) || item.additionalAddressInformation}/>
				</Col>
				<div className="divider"></div>
				<Col xs={4}>
					<ViewTextItem label={translate("shipment-shippers.forms.postalCode")} value={(shipmentShipper && shipmentShipper.postalCode) || item.postalCode}/>
				</Col>
				<Col xs={4}>
					<ViewTextItem label={translate("shipment-shippers.forms.country")} value={(shipmentShipper && shipmentShipper.country.name) || item.country.name}/>
				</Col>
				<Col xs={4}>
					<ViewTextItem label={translate("shipment-shippers.forms.city")} value={(shipmentShipper && shipmentShipper.city.name) || item.city.name}/>
				</Col>
				<div className="divider"></div>

			</Row>
		</CustomModal>
	);
};

export default ViewShipmentShipperModal;
