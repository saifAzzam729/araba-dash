import {useState} from "react";
import {useParams} from "react-router-dom";
import ListingTabs from "@src/views/pages/eBay/listings/partials/Tabs";


function EbayListingDetailsPage() {
    const {listId} = useParams()
    const [active, setActive] = useState("1");
    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab);
        }
    };

    return (
        <div className='row'>
            <div className="col-12 card p-4 ">
                <ListingTabs
                    toggleTab={toggleTab} active={active} listId={listId}/>
            </div>
        </div>
    )
}

export default EbayListingDetailsPage
