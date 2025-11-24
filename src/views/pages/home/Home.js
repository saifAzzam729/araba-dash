import {Col, Row} from "reactstrap";
import {Fragment, useContext, useState} from "react";
import ApexDonutChart from "@components/charts/ApexDonutChart";
import StatisticService from "@src/common/services/StatisticService";
import {useQuery} from "react-query";
import {ThemeColors} from "@src/utility/context/ThemeColors";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import HomeLatestOrdersTable from "@components/home-orders-table/HomeLatestOrdersTable";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import AlmostOutOfStockCard from "@components/home-out-of-stock-card/HomeOutOfStockCard";
import ProductsService from "@src/common/services/ProductsService";
import MonthlyGoalsReportsCard from "@src/views/pages/home/monthly-goals-reports/MonthlyGoalsReportsCard";
import SaleOrdersOverview from "@src/views/pages/home/sale-orders-overview/SaleOrdersOverview";
import ProductCategoriesReport from "@src/views/pages/home/product-categories-report/ProductCategoriesReport";
import LatestOrdersOverview from "@src/views/pages/home/latest-orders-overview/LatestOrdersOverview";
import ProductOutOfStock from "@src/views/pages/home/product-out-of-stock/ProductOutOfStock";

const Home = () => {

    const { colors } = useContext(ThemeColors)
    const trackBgColor = '#e9ecef'

    return (
        <Fragment>
            <Row className="mb-3">
                <Col sm="12" lg={"8"}>
                    <Row className="mb-2 g-2">
                        <Col sm="6">
                            <MonthlyGoalsReportsCard />
                        </Col>
                        <Col sm="6">
                            <SaleOrdersOverview />
                        </Col>
                    </Row>
                    <Col sm="12" lg={"12"}>
                        <LatestOrdersOverview />
                    </Col>
                </Col>

                <Col sm="12" lg={"4"}>
                    {/*<Col>*/}
                    {/*    <HomeNotificationsCard colors={colors} trackBgColor={trackBgColor}/>*/}
                    {/*</Col>*/}
                    <Col>
                        <ProductOutOfStock />
                    </Col>
                    <Col>
                        <ProductCategoriesReport />
                    </Col>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Home;
