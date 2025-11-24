// ** React Imports
import {Fragment, useState} from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from "reactstrap";

// ** Icons Imports
import {Info, Bookmark, Package, GitHub, Target} from "react-feather";
import AddressesTab from "./Tabs/AddressesTab";
import OrdersTab from "./Tabs/OrdersTab";
import WishlistTab from "./Tabs/WishlistTab";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CompanyDetailsTab from "@src/views/pages/users/ProfilePage/partials/Tabs/CompanyDetailsTab";

const UserTabs = ({ active, toggleTab, user }) => {
	const [isOrderTab, setIsOrderTab] = useState(false)
	const [isCompanyDetailsTab, setIsCompanyDetailsTab] = useState(true)
	const {translate} = useLocaleContext()
	const orderTab = () => {
		toggleTab('2')
		setIsOrderTab(true)
	}
	const companyDetailsTab = () => {
		toggleTab('3')
		setIsCompanyDetailsTab(true)
	}

	return (
		<Fragment>
			<Nav pills className="mb-2">
				{user.type === "COMPANY" &&
					<NavItem>
						<NavLink active={active === "3"} onClick={companyDetailsTab}>
							<Target className="font-medium-3 me-50" />
							<span className="fw-bold">{translate('users.profile.tabs.company-details')}</span>
						</NavLink>
					</NavItem>
				}
				<NavItem>
					<NavLink active={active === "1"} onClick={() => toggleTab("1")}>
						<Info className="font-medium-3 me-50" />
						<span className="fw-bold">{translate('users.profile.tabs.addresses')}</span>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={active === "2"} onClick={orderTab}>
						<Package className="font-medium-3 me-50" />
						<span className="fw-bold">{translate('users.profile.tabs.orders')}</span>
					</NavLink>
				</NavItem>

				{/*<NavItem>*/}
				{/*	<NavLink active={active === "3"} onClick={() => toggleTab("3")}>*/}
				{/*		<Bookmark className="font-medium-3 me-50" />*/}
				{/*		<span className="fw-bold">Wishlist</span>*/}
				{/*	</NavLink>*/}
				{/*</NavItem>*/}
			</Nav>
			<TabContent activeTab={active}>
				<TabPane tabId="1">
					<AddressesTab addresses={user.addresses}/>
				</TabPane>
				<TabPane tabId="2">
					{isOrderTab && <OrdersTab userId={user.id}/>}

				</TabPane>
				{/*<TabPane tabId="3">*/}
				{/*	<WishlistTab wishlist={user.wishlist}/>*/}
				{/*</TabPane>*/}

				<TabPane tabId="3">
					{user.type === "COMPANY" && isCompanyDetailsTab &&
						<CompanyDetailsTab companyDetails={user.userCompanyDetails[0]}/>
					}
				</TabPane>
			</TabContent>
		</Fragment>
	);
};
export default UserTabs;
