import CustomModal from "@components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import ShipmentPackagesService from "@src/common/services/ShipmentPackagesService";

const ViewShipmentPackageModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()
	const { preferredTableContentLocale } = useSettingsUiContext();


	const {data} = useQuery(
		['shipment-product', item.id],
		() => ShipmentPackagesService.getById(item.id, {
			locale: preferredTableContentLocale
		})
	)

	const shipmentPackage = data?.data ?? null;

	return (
		<CustomModal
			translatedHeader={translate("shipment-packages.common.shipment-package-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-packages.forms.name")} value={(shipmentPackage && shipmentPackage.name) || item.name}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-packages.forms.description")} value={(shipmentPackage && shipmentPackage.description) || item.description}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-packages.forms.dimensionUom")} value={(shipmentPackage && shipmentPackage.dimensionUom?.value) || item.dimensionUom?.value || '_'}/>
				</Col>
				<Col xs={4}>
					<ViewTextItem label={translate("shipment-packages.forms.height")} value={(shipmentPackage && shipmentPackage.height) || item.height}/>
				</Col>
				<div className="divider"></div>

				<Col xs={6}>
					<ViewTextItem label={translate("shipment-packages.forms.width")} value={(shipmentPackage && shipmentPackage.width) || item.width}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-packages.forms.length")} value={(shipmentPackage && shipmentPackage.length) || item.length}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-packages.forms.weightUom")} value={(shipmentPackage && shipmentPackage.weightUom?.value) || item.weightUom?.value || "_"}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-packages.forms.weight")} value={(shipmentPackage && shipmentPackage.weight) || item.weight}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewShipmentPackageModal;
