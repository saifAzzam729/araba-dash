import ApexLineChart from "@components/charts/ApexLineChart";
import {useQuery} from "react-query";
import StatisticService from "@src/common/services/StatisticService";

function SaleOrdersOverview() {

    const {data: saleOrderReportsData} = useQuery({
        queryKey: ['sale-orders-reports'],
        queryFn: () => StatisticService.getSaleOrders()
    });
    const saleOrder = saleOrderReportsData?.data?.details ?? null;

    return (
        <ApexLineChart saleOrder={saleOrder} direction={"ltr"} warning={"#ff9f43"}/>
    )
}

export default SaleOrdersOverview