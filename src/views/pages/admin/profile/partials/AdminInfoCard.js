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

const roleColors = {
    1: "light-danger",
    2: "light-success",
};


const AdminInfoCard = ({user}) => {

    return (
        <Fragment>
            <Card color="white">
                <CardBody>
                    <div className="user-avatar-section">
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
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
                    <div className="info-container">
                        <ul className="list-unstyled">
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Full Name:</span>
                                <span>{user.fullName}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Email:</span>
                                <span>{user.email}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Phone Number:</span>
                                <span>{user.phoneNumber}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Country:</span>
                                <span>{user.country.name}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Gender:</span>
                                <span>{user.gender.value}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Created At:</span>
                                <span>{parseDate(user.createdAt)}</span>
                            </li>
                            <li className="mb-75 d-flex justify-content-between">
                                <span className="fw-bolder me-25">Date Of Birth:</span>
                                <span>{parseDate(user.dateOfBirth)}</span>
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

export default AdminInfoCard;
