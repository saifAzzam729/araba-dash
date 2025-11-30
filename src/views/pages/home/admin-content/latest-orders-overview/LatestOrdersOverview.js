import HomeLatestOrdersTable from "@components/home-orders-table/HomeLatestOrdersTable";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useState} from "react";
import {useQuery} from "react-query";
import SaleOrdersService from "@src/common/services/SaleOrdersService";

function LatestOrdersOverview() {
    const {translate} = useLocaleContext();

    const [orders, setOrders] = useState([]);

    useQuery(
        ['orders',],
        () => SaleOrdersService.getPagination({direction : 'decs'}),
            {
                onSuccess: (({pagination: {items}}) => {
                    setOrders(items)
                })
            }
    );
    return (
        <HomeLatestOrdersTable
            title={translate('common.latestOrders')}
            data={orders}
        />
    )
}

export default LatestOrdersOverview
