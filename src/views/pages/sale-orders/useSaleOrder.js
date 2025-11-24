import {useQuery} from "react-query";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import {useParams} from "react-router-dom";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import OptionsService from "@src/common/services/OptionsService";

export function useSaleOrder() {
    const {id} = useParams();
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {data, isLoading, isError, refetch} = useQuery(
        ['order', id],
        () => SaleOrdersService.getById(id, {locale: preferredTableContentLocale})
    )
    const saleOrder = data?.data ?? null;

    const {data: statusOptions} = useQuery(
        ['option-service', preferredTableContentLocale],
        () => OptionsService.getSaleOrdersStatus({
            locale:preferredTableContentLocale
        }),
    );

    return {
        saleOrder,
        isLoading,
        isError,
        refetch,
        statusOptions,
    }
}