import BreadCrumbs from "@components/breadcrumbs";
import AffiliatesTabsWrapper from "@src/views/pages/affiliates/pages/view/partials/AffiliatesTabsWrapper";
import {useState} from "react";
import {VIEW_PAGE_TABS_IDS} from "@src/views/pages/affiliates/pages/view/data";
import AffiliatesTabsPanes from "@src/views/pages/affiliates/pages/view/partials/AffiliatesTabsPanes";
import {useQuery} from "react-query";
import AffiliatesService from "@src/common/services/AffiliatesService";
import {useParams} from "react-router-dom";
import Error from "@src/views/Error";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function ViewAffiliatePage() {
    const [activeTab, setActiveTab] = useState(VIEW_PAGE_TABS_IDS.STATISTIC);
    const {id} = useParams()
    const {translate} = useLocaleContext()

    const {data, isError} = useQuery(
        ['affiliate', id],
        () => AffiliatesService.getById(id)
    )

    const affiliate = data?.data ?? null

    if (isError) {
        return (
            <Error />
        )
    }


    return (
        <>
            <BreadCrumbs title={"affiliate-details-page"} data={[{title: translate('common.affiliates'), link: "/affiliates"}]}/>
            <AffiliatesTabsWrapper activeTab={activeTab} setActiveTab={setActiveTab}/>
            <AffiliatesTabsPanes activeTab={activeTab} affiliate={affiliate}/>
        </>
    )
}

export default ViewAffiliatePage
