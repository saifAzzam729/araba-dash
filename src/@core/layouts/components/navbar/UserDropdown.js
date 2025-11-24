// ** React Imports
import {Link} from "react-router-dom";

// ** Custom Components

// ** Third Party Components
import {
    User,
    Power,
    Settings,
} from "react-feather";

// ** Reactstrap Imports
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import avatar from "@src/assets/images/logo/default-avatar.jpg";

import {useAuth} from "../../../../utility/context/AuthProvider";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import Avatar from "@mui/material/Avatar";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

const UserDropdown = () => {
    const {user} = useAuth();
    const {logout} = useAuth();
    const {openModal: openSettingsUiModal} = useSettingsUiContext();

    const handleSettingsClicked = (e) => {
        e.preventDefault();
        openSettingsUiModal();
    }

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle
                href="/"
                tag="a"
                className="nav-link dropdown-user-link flex-row-reverse g-1"
                style={{gap: '5px'}}
                onClick={(e) => e.preventDefault()}
            >
                <div className="user-nav d-flex">
                    <span className="user-name fw-bold">{user?.fullName}</span>
                </div>
                <Avatar
                    src={user?.avatarFileUrl ? ParseImageUrl(user?.avatarFileUrl) : avatar}
                    imgHeight="40"
                    imgWidth="40"
                    status="online"
                />
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem tag={Link} to='/admin/profile'>
                    <User size={14} className="me-75"/>
                    <span className="align-middle">Profile</span>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem tag={Link} to='#' onClick={handleSettingsClicked}>
                    <Settings size={14} className="me-75"/>
                    <span className="align-middle">Settings</span>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem tag={Link} to="/login" onClick={() => logout()}>
                    <Power size={14} className="me-75"/>
                    <span className="align-middle">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserDropdown;
