import CustomModal from "../../../../@core/components/modal";
import { Row, Col } from "reactstrap";
import FaqsService from "../../../../common/services/FaqsService";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import { useQuery } from "react-query";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ViewFaqModal = ({ isOpen, closeModal, item }) => {
	if (!item) {
		return null;
	}

	const {translate} = useLocaleContext()

	const {data} = useQuery(
		['faq', item.id],
		() => FaqsService.getById(item.id)
	)

	const faq = data?.data ?? null;

	return (
		<CustomModal translatedHeader={translate('faq.common.faq-details')}  isOpen={isOpen} closeModal={closeModal}>
			<Row>
				<Col xs={12} md={6}>
					<ViewTextItem label={translate('faq.forms.questionEn')} value={(faq && faq.translations.en.question) || item.question}/>
				</Col>
				<Col xs={12} md={6}>
					<ViewTextItem label={translate('faq.forms.questionAr')} value={(faq && faq.translations.ar.question) || ""}/>
				</Col>

				<div className="divider"></div>
				<Col xs={12} md={6}>
					<ViewTextItem label={translate('faq.forms.answerEn')} value={(faq && faq.translations.en.answer) || item.answer}/>
				</Col>
				<Col xs={12} md={6}>
					<ViewTextItem label={translate('faq.forms.answerAr')} value={(faq && faq.translations.ar.answer) || ""}/>
				</Col>
			</Row>
		</CustomModal>
	);
};

export default ViewFaqModal;
