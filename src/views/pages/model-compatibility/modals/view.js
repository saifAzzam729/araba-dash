import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useQuery} from "react-query";
import CustomModal from "@components/modal";
import {Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ModelCompatibilityService from "@src/common/services/ModelCompatibilityService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";

export default function ViewModelCompatibilityModal({ isOpen, closeModal, item }) {
    if (!item) {
        return null;
    }

    const {translate} = useLocaleContext()
    const {preferredTableContentLocale} = useSettingsUiContext();


    const {data} = useQuery(
        ['model-compatibility', item.id],
        () => ModelCompatibilityService.getById(item.id, {locale: preferredTableContentLocale})
    )

    const model = data?.data ?? null;

    return (
        <CustomModal translatedHeader={translate('model-compatibility.common.model-details')}  isOpen={isOpen} closeModal={closeModal}>
            <Row>
                <Col xs={12} md={6}>
                    <ViewTextItem label={translate('model-compatibility.forms.nameEn')} value={(model && model.translations.en.name) || item.name}/>
                </Col>
                <Col xs={12} md={6}>
                    <ViewTextItem label={translate('model-compatibility.forms.nameAr')} value={(model && model.translations.ar.name) || item.name}/>
                </Col>
                <div className="divider"></div>

                <Col xs={12} md={6}>
                    <ViewTextItem label={translate('model-compatibility.forms.descriptionEn')} value={(model && model.translations.en.description) || "_"}/>
                </Col>
                <Col xs={12} md={6}>
                    <ViewTextItem label={translate('model-compatibility.forms.descriptionAr')} value={(model && model.translations.ar.description) || "_"}/>
                </Col>

                <div className="divider"></div>
                <Col xs={12} md={6}>
                    <ViewTextItem label={translate('model-compatibility.forms.brand')} value={(model && model.brand?.name) || "_"}/>
                </Col>
                <Col xs={12} sm={6}>
                    <ViewBooleanItem label={translate("model-compatibility.forms.publish")} value={model && model.publish}/>
                </Col>

                <div className="divider"></div>
                <Col xs={12} sm={6}>
                    <ViewImageItem label={translate("model-compatibility.forms.modelImage")} value={model && model.modelImage}/>
                </Col>
            </Row>
        </CustomModal>
    );
};