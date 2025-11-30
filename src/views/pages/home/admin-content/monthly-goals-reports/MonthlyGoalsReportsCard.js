import MonthSummary from "@components/home-month-summary-card/MonthSummary";
import EditmonthGoalModal from "@src/views/pages/home/admin-content/monthly-goals-reports/modals/edit";
import useModal from "@components/modal/useModal";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import {useQuery} from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import StatisticService from "@src/common/services/StatisticService";

function MonthlyGoalsReportsCard() {

    const {data: websiteOverviewData, refetch} = useQuery({
        queryKey: ['website-overview'],
        queryFn: () => StatisticService.getWebsiteOverview()
    });

    const {data: monthlyOrderGoal} = useQuery({
        queryKey: ['monthly-orders-goal'],
        queryFn: () => MultiTypeSettingsService.getById('MONTHLY_ORDERS_GOAL')
    });

    const monthlyOrderGoalItem = monthlyOrderGoal?.data ?? null
    const websiteOverview = websiteOverviewData?.data ?? null;

    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
    } = useModal();

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    return (
        <>
            <MonthSummary websiteOverview={websiteOverview} openEditModal={openEditModal} />

            {isEditModalOpen && (
                <EditmonthGoalModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={monthlyOrderGoalItem}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </>
    )
}


export default MonthlyGoalsReportsCard