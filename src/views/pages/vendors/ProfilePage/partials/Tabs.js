// ** React Imports
import {Fragment} from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import {BarChart2, Package, ShoppingCart} from "react-feather";
import StatisticsTab from "./Tabs/StatisticsTab";
import ProductsTab from "./Tabs/ProductsTab";
import SaleOrdersTab from "./Tabs/SaleOrdersTab";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const VendorTabs = ({ active, toggleTab, vendor }) => {
	const {translate} = useLocaleContext()

	return (
		<Fragment>
			<Nav pills className="mb-2">
				<NavItem>
					<NavLink active={active === "1"} onClick={() => toggleTab("1")}>
						<BarChart2 className="font-medium-3 me-50" />
						<span className="fw-bold">Statistics</span>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={active === "2"} onClick={() => toggleTab("2")}>
						<Package className="font-medium-3 me-50" />
						<span className="fw-bold">Products</span>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={active === "3"} onClick={() => toggleTab("3")}>
						<ShoppingCart className="font-medium-3 me-50" />
						<span className="fw-bold">Sale Orders</span>
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={active}>
				<TabPane tabId="1">
					<StatisticsTab />
				</TabPane>
				<TabPane tabId="2">
					<ProductsTab vendor={vendor} />
				</TabPane>
				<TabPane tabId="3">
					<SaleOrdersTab />
				</TabPane>
			</TabContent>
		</Fragment>
	);
};
export default VendorTabs;

