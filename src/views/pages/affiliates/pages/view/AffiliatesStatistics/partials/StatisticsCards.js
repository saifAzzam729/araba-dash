import {Col, Row} from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import {Archive, Cpu, CreditCard, ShoppingBag} from "react-feather";
import React from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function StatisticsCards({affiliateStatisticsData}) {
    const {translate} = useLocaleContext()

    return (
        <Row className="my-2">
            <Col lg="3" sm="6">
                <StatsHorizontal
                    icon={<Archive size={21} />}
                    color="primary"
                    stats={affiliateStatisticsData.linkSaleOrdersCount}
                    statTitle={translate('affiliate-statistics.link-count')}
                    className="bg-opacity-50"
                />
            </Col>
            <Col lg="3" sm="6">
                <StatsHorizontal
                    icon={<CreditCard size={21} />}
                    color="info"
                    stats={affiliateStatisticsData.linkTotalCommission}
                    statTitle={translate('affiliate-statistics.link-commission')}
                    className="bg-opacity-50"

                />
            </Col>
            <Col lg="3" sm="6">
                <StatsHorizontal
                    icon={<ShoppingBag size={21} />}
                    color="success"
                    stats={affiliateStatisticsData.couponSaleOrdersCount}
                    statTitle={translate('affiliate-statistics.coupon-count')}
                    className="bg-opacity-50"
                />
            </Col>
            <Col lg="3" sm="6">
                <StatsHorizontal
                    icon={<CreditCard size={21} />}
                    color="warning"
                    stats={affiliateStatisticsData.couponTotalCommission}
                    statTitle={translate('affiliate-statistics.coupon-commission')}
                    className="bg-opacity-50"
                />
            </Col>
        </Row>
    )
}