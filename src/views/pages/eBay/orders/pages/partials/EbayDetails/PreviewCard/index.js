// ** Reactstrap Imports
import {Card} from 'reactstrap'
import NoPagingTableBase from "@components/table/NoPagingTableBase";
import {useSaleOrder} from "@src/views/pages/eBay/orders/useSaleOrder";
import EbayInvoiceHeader
    from "@src/views/pages/eBay/orders/pages/partials/EbayDetails/PreviewCard/custom-component/EbayInvoiceHeader";
import ebayColumns from "@src/views/pages/eBay/orders/pages/partials/EbayDetails/ebayColumns";

const EbayPreviewCard = () => {
    const {saleOrder} = useSaleOrder()
    const ebayOrderDetails = saleOrder?.ebayOrderDetails ?? {}

    return saleOrder !== null ? (
        <Card className='invoice-preview-card py-2 px-3 px-half-sm' color="white">
            <EbayInvoiceHeader/>
            {/*HERE GOES THE TRANSACTIONS */}

            <NoPagingTableBase
                data={ebayOrderDetails?.paymentSummary?.payments}
                columns={ebayColumns}
                defaultActionButtons={false}
            />

            <hr className='invoice-spacing'/>

        </Card>
    ) : null
}

export default EbayPreviewCard
