import CustomModal from "../../../../@core/components/modal";
import {Row, Col, Button} from "reactstrap";
import ViewTextItem from "@components/form-ui/view-item-component/ViewTextItem";
import ViewDateItem from "@components/form-ui/view-item-component/ViewDateItem";
import ViewImageItem from "@components/form-ui/view-item-component/ViewImageItem";
import ViewGenderItem from "@components/form-ui/view-item-component/ViewGenderItem";
import ViewEmailItem from "@components/form-ui/view-item-component/ViewEmailItem";
import {useQuery} from "react-query";
import TagsService from "@src/common/services/TagsService";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import UsersService from "@src/common/services/UsersService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";

const ViewUserModal = ({isOpen, closeModal, item}) => {
    console.log('userrrr', item, item.id)
    if (!item) {
        return null;
    }
    const {translate} = useLocaleContext()
    const {preferredTableContentLocale} = useSettingsUiContext();


    const {data} = useQuery(
        ['user', item.id],
        () => UsersService.getById(item.id, {locale: preferredTableContentLocale})
    )
    const user = data?.data ?? null;
    const userCompanyDetails = user?.userCompanyDetails[0]
    const isCompanyRegistrationAPDF = userCompanyDetails?.companyRegisterationImage?.endsWith('.pdf');

    const handleOpenRegistrationDocument = () => {
        window.open(parseImageUrl(userCompanyDetails?.companyRegisterationImage), '_blank');
    };

    return (
        <CustomModal translatedHeader={translate("users.common.company-info")} isOpen={isOpen} closeModal={closeModal}>
            <Row>
                <Col xs={12} sm={6}>
                    <ViewTextItem label={translate('users.profile.fullName')} value={item.fullName}/>
                </Col>
                <Col xs={12} sm={6}>
                    <ViewTextItem label={translate('users.profile.companyName')} value={userCompanyDetails?.companyName}/>
                </Col>
                <div className="divider"></div>
                <Col xs={12} sm={6}>
                    <ViewEmailItem label={translate('users.profile.email')} value={item.email}/>
                </Col>
                <Col xs={12} sm={6}>
                    <ViewTextItem label={translate('users.profile.phoneNumber')} value={item.phoneNumber}/>
                </Col>
                <div className="divider"></div>
                <Col xs={12} sm={6}>
                    <ViewImageItem label={translate('users.profile.companyLogo')} value={userCompanyDetails?.companyImage}/>
                </Col>
                {userCompanyDetails?.companyRegisterationImage && (
                    <Col xs={12} sm={6}>
                        <div className="d-flex align-items-start flex-column mt-1 flex-fill">
                            <span
                                className="fw-bolder me-25">{translate('users.profile.companyCommercialRecord')}:</span>
                            {!isCompanyRegistrationAPDF ? (
                                <ViewImageItem label="Image"
                                               value={parseImageUrl(userCompanyDetails.companyRegisterationImage)}/>
                            ) : (
                                <Button
                                    color="primary"
                                    onClick={handleOpenRegistrationDocument}
                                    className="mt-2"
                                    type="button"
                                    outline
                                >
                                    {translate('users.profile.viewCommercialRecord')}
                                </Button>
                            )}
                        </div>

                    </Col>
                )}
            </Row>
        </CustomModal>
    );
};

export default ViewUserModal;
