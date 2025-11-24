import {Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import CustomModal from "@components/modal";
import {useQuery} from "react-query";
import StatesService from "@src/common/services/StatesService";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function ViewStatesModal({closeModal, isOpen, item}) {
    const {translate} = useLocaleContext()

    if (!item) {
        return null;
    }

    const {data} = useQuery(
        ['state', item.id],
        () => StatesService.getById(item.id)
    )

    const state = data?.data ?? null;
    
    return (
        <CustomModal
            translatedHeader={translate("states-crud.common.view-state")}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={6}>
                    <ViewTextItem label={translate("states-crud.forms.nameEn")} value={(state && state.translations.en.name) || item.translations.en.name}/>
                </Col>
                <Col xs={6}>
                    <ViewTextItem label={translate("states-crud.forms.nameAr")} value={(state && state.translations.ar.name) || item.translations.ar.name}/>
                </Col>

                <div className="divider"></div>
                <Col xs={6}>
                    <ViewTextItem label={translate("states-crud.forms.country")} value={(state && state.country.name) || item.country.name}/>
                </Col>
                <Col xs={6}>
                    <ViewBooleanItem label={translate("states-crud.common.publish")} value={(state && state.publish) || item.publish}/>
                </Col>
            </Row>
        </CustomModal>
    )
}

export default ViewStatesModal