// ** React Imports
import {Fragment} from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from "reactstrap";

// ** Icons Imports
import {Info, Bookmark, Package, GitHub} from "react-feather";
import AdminDetailsTab from "@src/views/pages/admin/profile/partials/Tabs/AdminDetailsTab";
import ChangePasswordTab from "@src/views/pages/admin/profile/partials/Tabs/ChangePasswordTab";


const AdminTabs = ({ active, toggleTab, user }) => {

	return (
		<Fragment>
			<Nav pills className="mb-2">
				<NavItem>
					<NavLink active={active === "1"} onClick={() => toggleTab("1")}>
						<Info className="font-medium-3 me-50" />
						<span className="fw-bold">Edit</span>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={active === "2"} onClick={() => toggleTab("2")}>
						<Package className="font-medium-3 me-50" />
						<span className="fw-bold">Change Password</span>
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={active}>
				<TabPane tabId="1">
					<AdminDetailsTab user={user}/>
				</TabPane>
				<TabPane tabId="2">
					<ChangePasswordTab />
				</TabPane>

			</TabContent>
		</Fragment>
	);
};
export default AdminTabs;
