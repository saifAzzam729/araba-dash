import {useNavigate} from "react-router-dom";
import BreadCrumbs from "@components/breadcrumbs";
import {Button} from "reactstrap";
import PreviewCard from "@src/views/pages/sale-orders/pages/partials/PreviewCard";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ViewPage = () => {
    const navigate = useNavigate();
    const {makeLocaleUrl} = useLocaleContext();
    const {translate} = useLocaleContext()

    const goBack = () => {
        navigate(makeLocaleUrl("/sale-orders"));
    };

    return (
        <>
            <BreadCrumbs
                title={"sale-order-details"}
                data={[{title: translate('common.sale-orders'), link: "/sale-orders"}]}
            />
            <div className='invoice-preview'>
                <PreviewCard/>
            </div>
            <div className="d-flex justify-content-between">
                <Button type="button" color="secondary" outline onClick={goBack}>
                    Back
                </Button>
            </div>
        </>
    );
};

export default ViewPage;
