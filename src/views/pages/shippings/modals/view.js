import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import { useQuery } from "react-query";
import ShippingService from "@src/common/services/ShippingService";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ViewShippingModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}
	const {translate} = useLocaleContext()

	const {data} = useQuery(
		['shipping', item.id],
		() => ShippingService.getById(item.id)
	)

	const shipping = data?.data ?? null;

	return (
		<CustomModal
			translatedHeader={translate("shipping.common.shipping-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("shipping.forms.nameEn")} value={(shipping && shipping.translations.en.name) || item.name}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipping.forms.nameAr")} value={(shipping && shipping.translations.ar.name) || item.name}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("shipping.forms.descriptionEn")} value={(shipping && shipping.translations.en.description) || item.description}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("shipping.forms.descriptionAr")} value={(shipping && shipping.translations.ar.description) || item.description}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("shipping.forms.value")} value={(shipping && shipping.value) || item.value}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem lanel={translate("shipping.forms.minSubtotalValue")} value={(shipping && shipping.minSubtotalValue) || item.minSubtotalValue}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewBooleanItem label={translate("shipping.forms.publish")} value={item.publish}/>
				</Col>
				<Col xs={6}>
					<ViewBooleanItem label={translate("shipping.forms.defaultMethod")} value={item.defaultMethod}/>
				</Col>
				<div className="divider"></div>
				<Col xs={6}>
					<ViewImageItem label={translate("shipping.forms.icon")} value={item.iconFileUrl}/>
				</Col>
				<Col xs={6}>
					{/* Empty	*/}
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewShippingModal;
