import {Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import CustomModal from "@components/modal";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useQuery} from "react-query";
import CitiesService from "@src/common/services/CitiesService";

export default function ViewCitiesModal({closeModal, isOpen, item}) {
    const {translate} = useLocaleContext()

    if (!item) {
        return null;
    }

    const {data} = useQuery(
        ['city', item.id],
        () => CitiesService.getById(item.id)
    )

    const city = data?.data ?? null;
    return (
        <CustomModal
            translatedHeader={translate("cities.common.view-city")}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={6}>
                    <ViewTextItem label={translate("cities.forms.nameEn")} value={(city && city.translations.en.name) || item.name } />
                </Col>
                <Col xs={6}>
                    <ViewTextItem label={translate("cities.forms.nameAr")} value={(city && city.translations.ar.name) || item.name}/>
                </Col>

                <div className="divider"></div>
                <Col xs={6}>
                    <ViewTextItem label={translate("cities.forms.state")} value={(city ? city.state.name : "_")}/>
                </Col>
                <Col xs={6}>
                    <ViewBooleanItem label={translate("cities.common.publish")} value={(city ? city.publish : "_")}/>
                </Col>
            </Row>
        </CustomModal>
    )
}