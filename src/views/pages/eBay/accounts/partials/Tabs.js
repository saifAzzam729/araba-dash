// ** React Imports
import {Fragment} from "react";

// ** Reactstrap Imports
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";

// ** Icons Imports
import {Codesandbox, FileText, MapPin, Truck} from "react-feather";

import EBayLocationPage from "@src/views/pages/eBay/locations/EBayLocationPage";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EbayPolicyPage from "@src/views/pages/eBay/policies/return/EbayPolicyPage";
import EbayShippingPolicyPage from "@src/views/pages/eBay/policies/shipping/EbayShippingPolicyPage";
import EbaySellingPage from "@src/views/pages/eBay/policies/selling/EbaySellingPage";


const AccountTabs = ({active, toggleTab, accountId}) => {
    const {translate} = useLocaleContext()
    return (
        <Fragment>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
                        <MapPin className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('ebay-locations.common.locations')}</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
                        <FileText className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('ebay.common.return-policy')}</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
                        <Truck className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('ebay.common.shipping-policy')}</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
                        <Codesandbox className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('ebay.common.selling-policy')}</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <EBayLocationPage accountId={accountId}/>
                </TabPane>
                <TabPane tabId="2">
                    <EbayPolicyPage accountId={accountId}/>
                </TabPane>
                <TabPane tabId="3">
                    <EbayShippingPolicyPage accountId={accountId}/>
                </TabPane>
                <TabPane tabId="4">
                    <EbaySellingPage accountId={accountId}/>
                </TabPane>

            </TabContent>
        </Fragment>
    );
};
export default AccountTabs;
