// ** Dropdowns Imports
import UserDropdown from "./UserDropdown";
import IntlDropdown from "./IntlDropdown";
import DefaultCurrency from "@layouts/components/navbar/DefaultCurrency";
import React from "react";
import NotificationWrapper from "@layouts/components/navbar/NotificationWrapper";

const NavbarUser = () => {

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
        <IntlDropdown />
        <DefaultCurrency />
        <NotificationWrapper />
        <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
