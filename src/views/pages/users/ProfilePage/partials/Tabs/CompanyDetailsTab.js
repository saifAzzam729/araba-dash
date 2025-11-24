import { Button, Card } from "reactstrap";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";
import { useLocaleContext } from "@src/providers/LocaleProvider";

export default function CompanyDetailsTab({ companyDetails }) {
    const { translate } = useLocaleContext();
    const isCompanyRegistrationAPDF = companyDetails?.companyRegisterationImage?.endsWith('.pdf');

    const handleOpenRegistrationDocument = () => {
        window.open(parseImageUrl(companyDetails?.companyRegisterationImage), '_blank');
    };

    return (
        <Card color="white" className="px-2 py-1 gap-1">
            <div className="info-container">
                <span className="fw-bolder">{translate('users.profile.companyName')}:</span>
                <span className="mx-1 text-primary fw-bold">{companyDetails?.companyName}</span>
            </div>

            {(companyDetails?.companyImage || companyDetails?.companyRegisterationImage) &&
                <div className="user-avatar-section mb-2">
                    <div className="d-flex align-items-start flex-column">
                        {companyDetails?.companyImage && (
                            <div className="d-flex align-items-start flex-column mt-1 flex-fill">
                                <span className="fw-bolder">{translate('users.profile.companyLogo')}:</span>
                                <img
                                    height="110"
                                    width="110"
                                    alt="user-avatar"
                                    src={parseImageUrl(companyDetails.companyImage)}
                                    className="img-fluid rounded mt-3 mb-2"
                                />
                            </div>
                        )}
                        {companyDetails?.companyRegisterationImage && (
                            <div className="d-flex align-items-start flex-column mt-1 flex-fill">
                                <span className="fw-bolder me-25">{translate('users.profile.companyCommercialRecord')}:</span>
                                {!isCompanyRegistrationAPDF ? (
                                    <img
                                        alt="user-avatar"
                                        src={parseImageUrl(companyDetails.companyRegisterationImage)}
                                        className="img-fluid rounded mt-1 mb-2"
                                    />
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
                        )}
                    </div>
                </div>
            }
        </Card>
    );
}
