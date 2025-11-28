import {Row, Col, Button} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewEmailItem from "@components/form-ui/view-item-component/ViewEmailItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";
import CustomModal from "../../../../../@core/components/modal";

const ViewVendorRequestModal = ({isOpen, closeModal, item}) => {
    const {translate} = useLocaleContext();

    if (!item) {
        return null;
    }

    const vendorDetails = item?.vendorDetails ?? {};
    const registrationDocument = vendorDetails?.registrationDocument;
    const isRegistrationPdf = registrationDocument?.toLowerCase?.().endsWith(".pdf");

    const handleOpenRegistrationDocument = () => {
        if (!registrationDocument) {
            return;
        }
        window.open(parseImageUrl(registrationDocument), "_blank");
    };

    return (
        <CustomModal
            translatedHeader={translate("vendor-requests.modal.title") ?? "Vendor Request Details"}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <Row className="gy-2">
                <Col xs={12} sm={6}>
                    <ViewEmailItem label={translate("users.profile.email")} value={item.email}/>
                </Col>
                <Col xs={12} sm={6}>
                    <ViewTextItem label={translate("users.profile.fullName")} value={item.fullName}/>
                </Col>
                <Col xs={12} sm={6}>
                    <ViewTextItem label={translate("users.profile.phoneNumber")} value={item.phoneNumber}/>
                </Col>
                <Col xs={12} sm={6}>
                    <ViewTextItem label={translate("users.profile.companyName")} value={vendorDetails?.storeName}/>
                </Col>
                <Col xs={12} sm={6}>
                    <ViewImageItem
                        label={translate("users.profile.companyLogo")}
                        value={vendorDetails?.storeLogo}
                        width="120px"
                    />
                </Col>
                {registrationDocument && (
                    <Col xs={12} sm={6}>
                        <div className="d-flex align-items-start flex-column mt-1 flex-fill">
                            <span className="fw-bolder me-25">
                                {translate("users.profile.companyCommercialRecord")}
                            </span>
                            {!isRegistrationPdf ? (
                                <ViewImageItem
                                    label=""
                                    value={registrationDocument}
                                    width="160px"
                                />
                            ) : (
                                <Button
                                    color="primary"
                                    onClick={handleOpenRegistrationDocument}
                                    className="mt-1"
                                    type="button"
                                    outline
                                >
                                    {translate("users.profile.viewCommercialRecord")}
                                </Button>
                            )}
                        </div>
                    </Col>
                )}
            </Row>
        </CustomModal>
    );
};

export default ViewVendorRequestModal;

