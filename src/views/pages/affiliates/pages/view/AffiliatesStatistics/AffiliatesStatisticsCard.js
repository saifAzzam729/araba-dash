import {Card, Col, Row} from "reactstrap";
import React from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useQuery} from "react-query";
import AffiliatesService from "@src/common/services/AffiliatesService";
import LinkSaleOrdersTable
    from "@src/views/pages/affiliates/pages/view/AffiliatesStatistics/partials/LinkSaleOrdersTable";
import CouponSaleOrdersTable
    from "@src/views/pages/affiliates/pages/view/AffiliatesStatistics/partials/CouponSaleOrdersTable";
import PaymentsTable from "@src/views/pages/affiliates/pages/view/AffiliatesStatistics/partials/PaymentsTable";
import StatisticsCards from "@src/views/pages/affiliates/pages/view/AffiliatesStatistics/partials/StatisticsCards";


export default function AffiliatesStatisticsCard({affiliateSlug}) {
    const {translate} = useLocaleContext();

    const {data,} = useQuery(
        ['affiliate-statistic', affiliateSlug],
        () => AffiliatesService.getAffiliateStatistic({slug: affiliateSlug}),
        {enabled: !!affiliateSlug,}
    )

    const affiliateStatisticsData = data?.data ?? []

    return (
        <Card className=" py-3 px-2 p-sm-5 bg-white">
            <div>
                <h2>{translate('affiliate-statistics.header')}</h2>
                <p>{translate('affiliate-statistics.sub-header')}</p>
                <hr/>

                <StatisticsCards affiliateStatisticsData={affiliateStatisticsData} />

                <Row>
                    <LinkSaleOrdersTable linkSaleOrders={affiliateStatisticsData.linkSaleOrders}/>

                    <CouponSaleOrdersTable couponSaleOrders={affiliateStatisticsData.couponSaleOrders} />

                    <PaymentsTable payments={affiliateStatisticsData.payments} />
                </Row>
            </div>
        </Card>
    )
}

