import {useMutation, useQuery, useQueryClient} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";

export default function useDashboardMultiSettings() {
    const queryClient = useQueryClient()

    const {data} = useQuery(
        ['dashboard-multi-settings'],
        () => MultiTypeSettingsService.getPagination({
            limit: 50
        })
    );

    const items = data?.pagination.items ?? undefined;

    const storeNameObject = items?.find(item => item.settingKey === 'STORE_NAME')
    const monthlyOrdersGoalObject = items?.find(item => item.settingKey === 'MONTHLY_ORDERS_GOAL')

    const {mutate: updateDashMultiSettings, isError, isLoading} = useMutation(
        (data) => MultiTypeSettingsService.bulkUpdate(data),
        {
            onSuccess: ()=> {
                queryClient.invalidateQueries({queryKey: ['store-name']})
                queryClient.invalidateQueries({queryKey: ['website-overview']})
            },
        }
    );

    return {
        storeNameObject,
        monthlyOrdersGoalObject,
        updateDashMultiSettings
    }
}