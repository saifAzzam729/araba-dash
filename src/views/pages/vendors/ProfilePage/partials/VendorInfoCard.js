// ** React Imports
import {Fragment} from "react";

// ** Reactstrap Imports
import {
    Card,
    CardBody,
    Badge,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import VendorLogo from "./VendorLogo";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {formatDate} from "@fullcalendar/react";
import parseImageUrl from "@src/common/helpers/ParseImageUrl";

const VendorInfoCard = ({vendor}) => {

    const {translate} = useLocaleContext()
    const storeName = vendor?.vendor?.storeName || vendor?.vendorDetails?.storeName || '-';
    const status = vendor?.status?.label || vendor?.status?.value || '-';
    const storeDescription = vendor?.vendor?.storeDescription || '-';
    const registrationDocument = vendor?.vendorDetails?.registrationDocument || vendor?.vendor?.registrationDocumentUrl;

    return (
        <Fragment>
            <Card color="white">
                <CardBody>
                    <div className="user-avatar-section mb-2">
                        <div className="d-flex align-items-center flex-column">
                            <VendorLogo vendor={vendor} />
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info">
                                    <h4>
                                        {storeName}
                                    </h4>
                                    <Badge
                                        color={vendor?.status?.value === 'ACTIVE' ? "light-success" : "light-danger"}
                                        className="text-capitalize"
                                    >
                                        {status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">{translate('users.profile.details')}</h4>
                    <div className="info-container">
                        <ul className="list-unstyled">
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.fullName')}:</span>
                                <span>{vendor?.fullName || '-'}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.email')}:</span>
                                <span>{vendor?.email || '-'}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.phoneNumber')}:</span>
                                <span>{vendor?.phoneNumber || '-'}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Store Name:</span>
                                <span>{storeName}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Store Description:</span>
                                <span>{storeDescription}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Status:</span>
                                <span>{status}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.createdAt')}:</span>
                                <span>{vendor?.createdAt ? formatDate(vendor.createdAt) : '-'}</span>
                            </li>
                            {vendor?.vendor?.productCount !== undefined && (
                                <li className="mb-75 d-flex justify-content-between">
                                    <span className="fw-bolder me-25">Product Count:</span>
                                    <span>{vendor.vendor.productCount}</span>
                                </li>
                            )}
                            {registrationDocument && (
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">Registration Document:</span>
                                    <div className="mt-1">
                                        <img
                                            src={parseImageUrl(registrationDocument)}
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

export default VendorInfoCard;

