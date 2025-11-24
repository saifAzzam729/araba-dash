import {useNavigate} from "react-router-dom";
import BreadCrumbs from "@components/breadcrumbs";
import {Button} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import EbayPreviewCard from "@src/views/pages/eBay/orders/pages/partials/EbayDetails/PreviewCard";

const EbayTabPane = () => {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {translate} = useLocaleContext()

    const goBack = () => {
        navigate(makeLocaleUrl("/ebay-sale-orders"));
    };

    return (
        <>
            <BreadCrumbs
                title={"sale-order-details"}
                data={[{title: translate('common.sale-orders'), link: "/ebay-sale-orders"}]}
            />
            <div className='invoice-preview'>
                <EbayPreviewCard/>
            </div>
            <div className="d-flex justify-content-between">
                <Button type="button" color="secondary" outline onClick={goBack}>
                    Back
                </Button>
            </div>
        </>
    );
};

export default EbayTabPane;
