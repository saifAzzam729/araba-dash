import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import CategoriesService from "../../../../common/services/CategoriesService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";


const ViewCategoryModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}

	const {translate} = useLocaleContext()
    const { preferredTableContentLocale } = useSettingsUiContext();


	const {data} = useQuery(
		['category', item.id],
		() => CategoriesService.getById(item.id, {
            locale: preferredTableContentLocale
        })
	)

	const category = data?.data ?? null;
	
	return (
		<CustomModal
			translatedHeader={translate("categories.common.category-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("categories.forms.nameEn")} value={(category && category.translations.en.name) || item.name}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("categories.forms.nameAr")} value={(category && category.translations.ar.name) || item.name}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("categories.forms.descriptionEn")} value={(category && category.translations.en.description) || item.description}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("categories.forms.descriptionAr")} value={(category && category.translations.ar.description) || item.description}/>
				</Col>

				<div className="divider"></div>
				<Col xs={12} sm={4}>
					<ViewTextItem label={translate("categories.forms.parent")} value={(category?.parent ? category?.parent?.name : '_') || item?.parent.name}/>
				</Col>
				<Col xs={12} sm={4}>
					<ViewBooleanItem label={translate("categories.forms.publish")} value={item.publish}/>
				</Col>
				<Col xs={12} sm={4}>
					<ViewBooleanItem label={translate("categories.forms.featured")} value={item.featured}/>
				</Col>

				<div className="divider"></div>
				{/* <div className="divider"></div> */}

				<Col xs={12} sm={6}>
					<ViewImageItem label={translate("categories.forms.image")} value={item.imageFileUrl}/>
				</Col>
				<Col xs={12} sm={6}>
					<ViewImageItem label={translate("categories.forms.guide")} value={item.categoryGuideFileUrl}/>
				</Col>

			</Row>
		</CustomModal>
	);
};

export default ViewCategoryModal;
