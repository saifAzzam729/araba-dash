// ** React Imports
import {Fragment} from "react";

// ** Reactstrap Imports
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";

// ** Icons Imports
import {Codesandbox} from "react-feather";

import {useLocaleContext} from "@src/providers/LocaleProvider";
import AddProductToListPage from "@src/views/pages/eBay/listings/products/AddProductToListPage";


const ListingTabs = ({active, toggleTab, listId}) => {
    const {translate} = useLocaleContext()
    return (
        <Fragment>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
                        <Codesandbox className="font-medium-3 me-50"/>
                        <span className="fw-bold">{translate('ebay-listing.common.products')}</span>
                    </NavLink>
                </NavItem>

            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <AddProductToListPage listId={listId}/>
                </TabPane>
            </TabContent>
        </Fragment>
    );
};
export default ListingTabs;
