import {useQuery} from "react-query";
import CurrenciesService from "@src/common/services/CurrenciesService";
import Avatar from "@mui/material/Avatar";
import {UncontrolledTooltip} from "reactstrap";
import DataSourceManager from "@src/common/services/DataSourceManager";

export default function DefaultCurrency() {
    const {data} = useQuery(
        ['default'],
        () => CurrenciesService.getDefaultCurrency(),
        {
            onSuccess: (data) => {
                const currencyCode = data?.data?.currencyCode;
                if (currencyCode) {
                    DataSourceManager.setUserCurrency(currencyCode);
                }
            },
        }
    )

    const currencyCode = data?.data?.currencyCode


    return (
        <>
            <Avatar
                id={"default-currency"}
                className="bg-primary bg-opacity-50 mx-1"
                sx={{width: 35, height: 35}}
            >
                <span style={{fontSize: '12px'}}>{currencyCode}</span>
            </Avatar>

            <UncontrolledTooltip target={"default-currency"} placement="bottom">
                default currency
            </UncontrolledTooltip>


        </>
    )
}
