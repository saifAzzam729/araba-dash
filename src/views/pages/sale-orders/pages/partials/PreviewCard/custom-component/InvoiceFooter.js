import {CardBody, Col, Row} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function InvoiceFooter({data}) {
    const {translate} = useLocaleContext();

    return (
        <CardBody className='invoice-padding pb-0'>
            <Row className='invoice-sales-total-wrapper justify-content-end'>
                <Col className='d-flex justify-content-end'>
                    <div className='invoice-total-wrapper' style={{width: '15rem'}}>
                        <div className='invoice-total-item mb-1 fs-5 d-flex justify-content-between'>
                            <p className='invoice-total-title'> {translate('common.subtotal')}:</p>
                            <p className='invoice-total-amount'>{data.subtotalPrice} {data.buyerCurrencyCode}</p>
                        </div>
                        <div className='invoice-total-item mb-1 fs-5 d-flex justify-content-between'>
                            <p className='invoice-total-title'>{translate('common.coupon-discount')}:</p>
                            <p className='invoice-total-amount'>{data.couponDiscount}</p>
                        </div>
                        <div className='invoice-total-item mb-1 fs-5 d-flex justify-content-between'>
                            <p className='invoice-total-title'>{translate('sale-order.invoice.subtotal-discount')}:</p>
                            <p className='invoice-total-amount'>{data.subtotalDiscount}</p>
                        </div>
                        <div className='invoice-total-item mb-1 fs-5 d-flex justify-content-between'>
                            <p className='invoice-total-title'>{translate('common.shippingValue')}:</p>
                            <p className='invoice-total-amount'>{data.shippingValue}</p>
                        </div>
                        {data.taxValue > 0 &&
                            <div className='invoice-total-item mb-1 fs-5 d-flex justify-content-between'>
                                <p className='invoice-total-title'>{translate('common.tax')}:</p>
                                <p className='invoice-total-amount'>{data.taxValue}</p>
                            </div>
                        }
                        <hr className='my-50' />
                        <div className='invoice-total-item mb-1 fs-5 d-flex justify-content-between'>
                            <p className='invoice-total-title'>{translate('common.total')}:</p>
                            <p className='invoice-total-amount'>{data.totalPrice} {data.buyerCurrencyCode}</p>
                        </div>
                    </div>
                </Col>
                <p className='text-primary text-end'>* The total amount of {data.subtotalPrice} {data.buyerCurrencyCode} (net: {data?.subtotalWithoutProductsTax} {data.buyerCurrencyCode})
                    {" "} {data?.productsTax > 0 &&
                        <span >includes Tax {data?.productsTax} {data?.buyerCurrencyCode}.</span>
                    }
                </p>
            </Row>
        </CardBody>
    )
}

export default InvoiceFooter