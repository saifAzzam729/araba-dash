import CustomModal from "@components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import ShipmentProductsService from "@src/common/services/ShipmentProductsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {SHIPPING_METHODS} from "@src/views/pages/constants-dhl-deutsche/ShippingMethods";

const ViewShipmentProductModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()
	const { preferredTableContentLocale } = useSettingsUiContext();


	const {data} = useQuery(
		['shipment-product', item.id],
		() => ShipmentProductsService.getById(item.id, {
			locale: preferredTableContentLocale
		})
	)

	const shipmentProduct = data?.data ?? null;

	return (
		<CustomModal
			translatedHeader={translate("shipment-products.common.shipment-product-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-products.forms.name")}
								  value={(shipmentProduct && shipmentProduct.name) || item.name}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-products.forms.code")}
								  value={(shipmentProduct && shipmentProduct.code) || item.code}/>
				</Col>
				<hr/>

				<Col xs={6}>
					{
						item.shipping.id === SHIPPING_METHODS.DHL ?
					<ViewTextItem label={translate("shipment-products.forms.billingNumber")}
								  value={(shipmentProduct && shipmentProduct.billingNumber) || item.billingNumber}/>
							: <ViewTextItem label={translate("shipment-products.forms.price")}
											value={(shipmentProduct && shipmentProduct.price) || item.price}/>
					}
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipment-products.forms.shipping")}
								  value={(shipmentProduct && shipmentProduct.shipping.name) || item.shipping.name}/>
				</Col>

				<hr/>

				<Col xs={6}>
					<ViewTextItem label={translate("shipment-products.forms.description")}
								  value={(shipmentProduct && shipmentProduct.description) || item.description}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewShipmentProductModal;
