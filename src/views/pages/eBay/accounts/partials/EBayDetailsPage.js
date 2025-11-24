import Tabs from "@src/views/pages/eBay/accounts/partials/Tabs";
import {useState} from "react";
import {useParams} from "react-router-dom";


function EBayDetailsPage() {
    const {id:accountId} = useParams()
    const [active, setActive] = useState("1");
    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab);
        }
    };

    return (
        <div className='row'>
            <div className="col-12 card p-4 ">
                <Tabs toggleTab={toggleTab} active={active} accountId={accountId}/>
            </div>
        </div>
    )
}

export default EBayDetailsPage
