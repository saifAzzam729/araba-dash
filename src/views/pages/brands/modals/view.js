import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import BrandsService from "../../../../common/services/BrandsService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ViewBrandModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}

	const {translate} = useLocaleContext()


	const {data} = useQuery(
		['brand', item.id],
		() => BrandsService.getById(item.id)
	)

	const brand = data?.data ?? null;

	return (
		<CustomModal
			translatedHeader={translate("brands.common.brand-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("brands.forms.nameEn")} value={(brand && brand.translations.en.name) || item.name}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("brands.forms.nameAr")} value={(brand && brand.translations.ar.name) || item.name}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("brands.forms.descriptionEn")} value={(brand && brand.translations.en.description) || item.description}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("brands.forms.descriptionAr")} value={(brand && brand.translations.ar.description) || item.description}/>
				</Col>

				<div className="divider"></div>
				<Col xs={12} sm={6}>
					<ViewBooleanItem label={translate("brands.forms.publish")} value={item.publish}/>
				</Col>

				<Col xs={12} sm={6}>
					<ViewBooleanItem label={translate("brands.forms.featured")} value={item.featured}/>
				</Col>
				<div className="divider"></div>

				<Col xs={12} sm={6}>
					<ViewImageItem label={translate("brands.forms.image")} value={item.imageFileUrl}/>
				</Col>

			</Row>
		</CustomModal>
	);
};

export default ViewBrandModal;
