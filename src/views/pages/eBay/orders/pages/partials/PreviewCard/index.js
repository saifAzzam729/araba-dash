// ** Reactstrap Imports
import {Card} from 'reactstrap'
import NoPagingTableBase from "@components/table/NoPagingTableBase";
import columns from "@src/views/pages/sale-orders/pages/partials/columns";
import {useSaleOrder} from "@src/views/pages/eBay/orders/useSaleOrder";
import InvoiceHeader from "@src/views/pages/eBay/orders/pages/partials/PreviewCard/custom-component/InvoiceHeader";
import InvoiceFooter from "@src/views/pages/eBay/orders/pages/partials/PreviewCard/custom-component/InvoiceFooter";

const PreviewCard = () => {
    const {saleOrder} = useSaleOrder()
    return saleOrder !== null ? (
        <Card className='invoice-preview-card py-2 px-3 px-half-sm' color="white">
            <InvoiceHeader/>

            <NoPagingTableBase
                data={saleOrder.saleOrderItems}
                columns={columns}
                defaultActionButtons={false}
            />

            <hr className='invoice-spacing'/>

            <InvoiceFooter data={saleOrder}/>
        </Card>
    ) : null
}

export default PreviewCard
