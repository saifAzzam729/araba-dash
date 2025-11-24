import {TabContent, TabPane} from "reactstrap";
import React from "react";
import {VIEW_PAGE_TABS_IDS} from "@src/views/pages/affiliates/pages/view/data";
import AffiliateInfoCard from "@src/views/pages/affiliates/pages/view/Info/AffiliateInfoCard";
import AffiliatesOrdersCard from "@src/views/pages/affiliates/pages/view/AffiliatesOrders/AffiliatesOrdersCard";
import AffiliatesPaymentsCard from "@src/views/pages/affiliates/pages/view/AffiliatesPayments/AffiliatesPaymentsCard";
import AffiliatesStatisticsCard
    from "@src/views/pages/affiliates/pages/view/AffiliatesStatistics/AffiliatesStatisticsCard";

function AffiliatesTabsPanes({activeTab, affiliate}) {

    return (
        <TabContent activeTab={activeTab}>
            {/* INFO PANE */}
            <TabPane tabId={VIEW_PAGE_TABS_IDS.INFO}>
                <AffiliateInfoCard affiliate={affiliate}/>
            </TabPane>

            {/* STATISTICS PANE */}
            <TabPane tabId={VIEW_PAGE_TABS_IDS.STATISTIC}>
                <AffiliatesStatisticsCard affiliateSlug={affiliate?.slug}/>
            </TabPane>

            {/* ORDERS PANE */}
            <TabPane tabId={VIEW_PAGE_TABS_IDS.ORDERS}>
                <AffiliatesOrdersCard />
            </TabPane>

            {/* PAYMENT PANE */}
            <TabPane tabId={VIEW_PAGE_TABS_IDS.PAYMENT}>
                <AffiliatesPaymentsCard />
            </TabPane>

        </TabContent>
    )
}

export default AffiliatesTabsPanes
