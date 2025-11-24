// ** React Imports
import {Fragment} from "react";

// ** Reactstrap Imports
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";

// ** Icons Imports
import {AlertCircle, FileText} from "react-feather";

import {useLocaleContext} from "@src/providers/LocaleProvider";
import InfoTabPane from "@src/views/pages/eBay/orders/pages/InfoTabPane";
import EbayTabPane from "@src/views/pages/eBay/orders/pages/partials/tabs/EbayTabPane";


const EbayOrderDetailsTabs = ({active, toggleTab}) => {
    const {translate} = useLocaleContext()
    return (
        <Fragment>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
                        <AlertCircle className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('ebay.common.info')}</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
                        <FileText className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('ebay.common.ebay-details')}</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <InfoTabPane/>
                </TabPane>
                <TabPane tabId="2">
                    <EbayTabPane/>
                </TabPane>
            </TabContent>
        </Fragment>
    );
};
export default EbayOrderDetailsTabs;
