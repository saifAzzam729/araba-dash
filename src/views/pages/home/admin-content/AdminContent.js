import {Col, Row} from "reactstrap";
import {Fragment, useContext} from "react";
import {ThemeColors} from "@src/utility/context/ThemeColors";
import MonthlyGoalsReportsCard from "@src/views/pages/home/admin-content/monthly-goals-reports/MonthlyGoalsReportsCard";
import SaleOrdersOverview from "@src/views/pages/home/admin-content/sale-orders-overview/SaleOrdersOverview";
import ProductCategoriesReport from "@src/views/pages/home/admin-content/product-categories-report/ProductCategoriesReport";
import LatestOrdersOverview from "@src/views/pages/home/admin-content/latest-orders-overview/LatestOrdersOverview";
import ProductOutOfStock from "@src/views/pages/home/admin-content/product-out-of-stock/ProductOutOfStock";

const AdminContent = () => {

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

export default AdminContent;

