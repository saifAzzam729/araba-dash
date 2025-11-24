import {useQuery} from "react-query";
import {Col, Row} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewBooleanItem from "@components/form-ui/view-item-component/ViewBooleanItem";
import CustomModal from "@components/modal";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import NotificationsEventsService from "@src/common/services/NotificationsEventsService";

export default function ViewNotificationEvent({ isOpen, closeModal, item }) {
    if (!item) {
        return null;
    }

    const {translate} = useLocaleContext()

    const {data} = useQuery(
        ['notification-event', item.id],
        () => NotificationsEventsService.getById(item.id)
    )

    const notificationEvent = data?.data ?? null;

    return (
        <CustomModal
            translatedHeader={translate("notifications.common.event-details")}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row>
                <Col xs={12} md={4}>
                    <ViewTextItem label={translate("notifications.common.event")} value={(notificationEvent && notificationEvent.event) || item.event}/>
                </Col>
                <Col xs={12} md={4}>
                    <ViewTextItem
                        label={translate("notifications.common.target")}
                        value={((notificationEvent && notificationEvent.target) || item.target) ?? '_'}
                        className={'text-center'}
                    />
                </Col>

                <Col xs={12} md={4}>
                    <ViewBooleanItem label={translate("notifications.forms.active")} value={item.active} className={'text-center'}/>
                </Col>

                <div className="divider"></div>

                <Col xs={12} md={6}>
                    <ViewTextItem label={translate("notifications.forms.titleEn")} value={(notificationEvent && notificationEvent.translations.en.title) ?? "_"}/>
                </Col>
                <Col xs={12} md={6}>
                    <ViewTextItem label={translate("notifications.forms.titleAr")} value={(notificationEvent && notificationEvent.translations.ar.title) ?? "_"}/>
                </Col>

                <div className="divider"></div>
                <Col xs={12}>
                    <ViewTextItem label={translate("notifications.forms.bodyEn")} value={(notificationEvent && notificationEvent.translations.en.body) ?? "_"}/>
                </Col>

                <div className="divider"></div>
                <Col xs={12}>
                    <ViewTextItem label={translate("notifications.forms.bodyAr")} value={(notificationEvent && notificationEvent.translations.ar.body) ?? "_"}/>
                </Col>

                <div className="divider"></div>

            </Row>
        </CustomModal>
    )
}