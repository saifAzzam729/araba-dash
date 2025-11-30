import {Fragment} from "react";
import {Card, CardBody, Badge, Button} from "reactstrap";
import {Edit} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {formatDate} from "@fullcalendar/react";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";
import Avatar from "@components/avatar";

const StoreDetailsCard = ({vendor, onEdit}) => {
    const {translate} = useLocaleContext();
    
    const storeName = vendor?.vendor?.storeName || '-';
    const storeDescription = vendor?.vendor?.storeDescription || '-';
    const storeLogoUrl = vendor?.vendor?.storeLogoUrl;
    const registrationDocumentUrl = vendor?.vendor?.registrationDocumentUrl;
    const isActive = vendor?.vendor?.isActive;
    const createdAt = vendor?.vendor?.createdAt;
    const updatedAt = vendor?.vendor?.updatedAt;

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h4 className="fw-bolder mb-0">Store Details</h4>
                        <Button
                            color="primary"
                            outline
                            size="sm"
                            onClick={onEdit}
                            className="d-flex align-items-center gap-1"
                        >
                            <Edit size={16} />
                            Edit
                        </Button>
                    </div>
                    
                    <div className="user-avatar-section mb-3">
                        <div className="d-flex align-items-center flex-column">
                            {storeLogoUrl ? (
                                <img
                                    height="110"
                                    width="110"
                                    alt="store-logo"
                                    src={parseImageUrl(storeLogoUrl)}
                                    className="img-fluid rounded mt-3 mb-2"
                                />
                            ) : (
                                <Avatar
                                    initials
                                    color={"light-primary"}
                                    className="rounded mt-3 mb-2"
                                    content={storeName}
                                    contentStyles={{
                                        borderRadius: 0,
                                        fontSize: "calc(48px)",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    style={{
                                        height: "110px",
                                        width: "110px",
                                    }}
                                />
                            )}
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info">
                                    <h4>{storeName}</h4>
                                    <Badge
                                        color={isActive ? "light-success" : "light-danger"}
                                        className="text-capitalize"
                                    >
                                        {isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">Store Information</h4>
                    <div className="info-container">
                        <ul className="list-unstyled">
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Store Name:</span>
                                <span>{storeName}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Store Description:</span>
                                <span>{storeDescription || '-'}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Status:</span>
                                <Badge
                                    color={isActive ? "light-success" : "light-danger"}
                                    className="text-capitalize"
                                >
                                    {isActive ? "Active" : "Inactive"}
                                </Badge>
                            </li>
                            {createdAt && (
                                <li className="mb-75 d-flex justify-content-between">
                                    <span className="fw-bolder me-25">Created At:</span>
                                    <span>{formatDate(createdAt)}</span>
                                </li>
                            )}
                            {updatedAt && (
                                <li className="mb-75 d-flex justify-content-between">
                                    <span className="fw-bolder me-25">Updated At:</span>
                                    <span>{formatDate(updatedAt)}</span>
                                </li>
                            )}
                            {registrationDocumentUrl && (
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">Registration Document:</span>
                                    <div className="mt-1">
                                        <img
                                            src={parseImageUrl(registrationDocumentUrl)}
                                            alt="Registration Document"
                                            style={{maxWidth: '100%', height: 'auto'}}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default StoreDetailsCard;

