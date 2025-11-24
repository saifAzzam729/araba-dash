import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import { useQuery } from "react-query";
import TagsService from "@src/common/services/TagsService";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import React from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ViewTagsModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}
	const {data} = useQuery(
		['tag', item.id],
		() => TagsService.getById(item.id)
	)
	const tag = data?.data ?? null;
	const {translate} = useLocaleContext()


	return (
		<CustomModal
			translatedHeader={translate("tags.common.tag-details")}
			isOpen={isOpen}
			closeModal={closeModal}
		>
			<Row>
				<Col xs={6}>
					<ViewTextItem label={translate("tags.forms.titleEn")} value={(tag && tag.translations.en.title) || item.title}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("tags.forms.titleAr")} value={(tag && tag.translations.ar.title) || item.title}/>
				</Col>

				<div className="divider"></div>
				<Col xs={6}>
					<ViewTextItem label={translate("tags.forms.descriptionEn")} value={(tag && tag.translations.en.description) || item.description}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("tags.forms.descriptionAr")} value={(tag && tag.translations.ar.description) || item.description}/>
				</Col>

				<div className="divider"></div>

				<Col xs={6}>
					<ViewTextItem label={translate("tags.forms.products")} value={(tag && tag.products[0]?.name)}/>
				</Col>
				<Col xs={6}>
					<ViewTextItem label={translate("tags.forms.backgroundColor")} value={(tag && tag.backgroundColor) || item.backgroundColor}/>
				</Col>
				<div className="divider"></div>

				<Col xs={12} sm={6}>
					<ViewBooleanItem label={translate("tags.forms.publish")} value={(tag && tag.publish) || item.publish}/>
				</Col>
				<Col xs={12} sm={6}>
					<ViewBooleanItem label={translate("tags.forms.featured")} value={(tag && tag.featured) || item.featured}/>
				</Col>
				<div className="divider"></div>

				<Col xs={12} sm={6}>
					<ViewImageItem label={translate("tags.forms.image")} value={(tag && tag.imageFileUrl) || item.imageFileUrl}/>
				</Col>


			</Row>
		</CustomModal>
	);
};

export default ViewTagsModal;
