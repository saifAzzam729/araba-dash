import {Nav, NavItem, NavLink} from "reactstrap";
import {CreditCard, Image, Info, Layout, Slack, PieChart} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {VIEW_PAGE_TABS_IDS} from "@src/views/pages/affiliates/pages/view/data";

function AffiliatesTabsWrapper({activeTab, setActiveTab}) {

    const {translate} = useLocaleContext();

    return (
        <Nav tabs className="mb-2">

            {/* STATISTICS TAB */}
            <NavItem>
                <NavLink
                    active={activeTab === VIEW_PAGE_TABS_IDS.STATISTIC}
                    onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.STATISTIC)}
                >
                    <PieChart className="font-medium-3 me-50"/>
                    <span className="fw-bold">{translate('affiliates.common.statistics')}</span>
                </NavLink>
            </NavItem>

            {/* ORDERS TAB */}
            <NavItem>
                <NavLink
                    active={activeTab === VIEW_PAGE_TABS_IDS.ORDERS}
                    onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.ORDERS)}
                >
                    <Layout className="font-medium-3 me-50"/>
                    <span className="fw-bold">{translate('affiliates.common.orders')}</span>
                </NavLink>
            </NavItem>

            {/* PAYMENT TAB */}
            <NavItem>
                <NavLink
                    active={activeTab === VIEW_PAGE_TABS_IDS.PAYMENT}
                    onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.PAYMENT)}
                >
                    <CreditCard className="font-medium-3 me-50"/>
                    <span className="fw-bold">{translate('affiliates.common.payments')}</span>
                </NavLink>
            </NavItem>

            {/* INFO TAB */}
            <NavItem>
                <NavLink
                    active={activeTab === VIEW_PAGE_TABS_IDS.INFO}
                    onClick={() => setActiveTab(VIEW_PAGE_TABS_IDS.INFO)}
                >
                    <Info className="font-medium-3 me-50"/>
                    <span className="fw-bold">{translate('affiliates.common.info')}</span>
                </NavLink>
            </NavItem>


        </Nav>
    )
}

export default AffiliatesTabsWrapper;
