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
import ProfileImage from "@src/views/pages/users/ProfilePage/partials/ProfileImage";
import parseDate from "@src/common/helpers/ParseDate";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {formatDate} from "@fullcalendar/react";

const roleColors = {
    1: "light-danger",
    2: "light-success",
};


const UserInfoCard = ({user}) => {

    const {translate} = useLocaleContext()

    return (
        <Fragment>
            <Card color="white">
                <CardBody>
                    <div className="user-avatar-section mb-2">
                        <div className="d-flex align-items-center flex-column">
                            {<ProfileImage user={user}/>}
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info">
                                    <h4>
                                        {user.fullName}
                                    </h4>
                                        <Badge
                                            color={roleColors[user.rolesGroups[0].id]}
                                            className="text-capitalize"
                                        >
                                            {user.rolesGroups[0].name}
                                        </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="d-flex justify-content-around my-2 pt-75">*/}
                    {/*	<div className="d-flex align-items-start me-2">*/}
                    {/*		<Badge color="light-primary" className="rounded p-75">*/}
                    {/*			<Check className="font-medium-2" />*/}
                    {/*		</Badge>*/}
                    {/*		<div className="ms-75">*/}
                    {/*			<h4 className="mb-0">1.23k</h4>*/}
                    {/*			<small>Tasks Done</small>*/}
                    {/*		</div>*/}
                    {/*	</div>*/}
                    {/*	<div className="d-flex align-items-start">*/}
                    {/*		<Badge color="light-primary" className="rounded p-75">*/}
                    {/*			<Briefcase className="font-medium-2" />*/}
                    {/*		</Badge>*/}
                    {/*		<div className="ms-75">*/}
                    {/*			<h4 className="mb-0">568</h4>*/}
                    {/*			<small>Projects Done</small>*/}
                    {/*		</div>*/}
                    {/*	</div>*/}
                    {/*</div>*/}
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">{translate('users.profile.details')}</h4>
                    <div className="info-container">
                        <ul className="list-unstyled">
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.fullName')}:</span>
                                <span>{user.fullName}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.email')}:</span>
                                <span>{user.email}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.phoneNumber')}:</span>
                                <span>{user.phoneNumber}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.country')}:</span>
                                <span>{user.country.name}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.defaultCurrency')}:</span>
                                <span>{user.defaultCurrency ?? '_'}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.gender')}:</span>
                                <span>{user.gender.value ?? '_'}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.createdAt')}:</span>
                                <span>{formatDate(user.createdAt)}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.dateOfBirth')}:</span>
                                <span>{formatDate(user.dateOfBirth)}</span>
                            </li>

                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">{translate('users.profile.userGroup')}:</span>
                                <span>{user.userGroup.name}</span>
                            </li>
                        </ul>
                    </div>
                    {/*<div className="d-flex justify-content-center pt-2">*/}
                    {/*    <Button color="primary" onClick={() => setShow(true)}>*/}
                    {/*        Edit*/}
                    {/*    </Button>*/}

                    {/*</div>*/}
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default UserInfoCard;
