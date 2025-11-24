import {useState} from "react";
import EbayOrderDetailsTabs from "@src/views/pages/eBay/orders/pages/partials/tabs/EbayOrderDetailsTabs";


function OrderDetailsPage() {
    const [active, setActive] = useState("1");
    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab);
        }
    };

    return (
        <div className='row'>
            <div className="col-12 card p-4 ">
                <EbayOrderDetailsTabs toggleTab={toggleTab} active={active} />
            </div>
        </div>
    )
}

export default OrderDetailsPage
