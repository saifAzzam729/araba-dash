import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import {Badge, CardBody, CardText, Col, Row} from "reactstrap";
import {useGlobalContext} from "@src/providers/GlobalProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useSaleOrder} from "@src/views/pages/eBay/orders/useSaleOrder";

dayjs.extend(relativeTime)


function EbayInvoiceHeader() {

    const {storeLogo} = useGlobalContext();
    const {translate} = useLocaleContext();
    const statusObj = {
        NOT_PAID: 'light-danger',
        PAID: 'light-success',
    }
    const {
        saleOrder,
        refetch,
    } = useSaleOrder()

    function onEditSuccess() {
        refetch()
    }

    const ebayData = saleOrder?.ebayOrderDetails

    return (
        <>
            <CardBody className='invoice-padding pb-0'>
                {/* Header */}
                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                    <div className='d-flex align-items-center'>
                        {storeLogo && <img alt={'storeLogo.imageFilename'} src={ParseImageUrl(storeLogo.imageFileUrl)}
                                           height={80}/>}
                    </div>
                    <div className='mt-md-0 mt-2'>
                        <h4 className='invoice-title'>
                            {translate('common.ebay-order-id')} <span className='invoice-number'>#{ebayData?.orderId}</span>
                        </h4>

                        <div className='invoice-date-wrapper d-flex align-items-center justify-content-center'>


                            <div className="w-50 text-center">
                                <Badge className='text-capitalize mb-1'
                                       color={statusObj[ebayData?.orderPaymentStatus]}
                                       pill>
                                    {ebayData?.orderPaymentStatus}
                                </Badge>
                            </div>
                        </div>

                    </div>
                </div>
            </CardBody>
            <hr className='invoice-spacing'/>

            <CardBody className='invoice-padding pt-0'>
                <Row className='invoice-spacing'>
                    <Col className='p-0' xl='12'>
                        <h6 className='mb-2'>{translate('common.buyerData')}:</h6>
                        <h6 className='mb-25'>{translate('common.userName')} : {ebayData?.buyer?.username}</h6>
                        {ebayData?.buyer?.buyerRegistrationAddress?.fullName &&
                            <CardText
                                className='mb-25'>{translate('common.fullName')}: {ebayData?.buyer?.buyerRegistrationAddress?.fullName}</CardText>
                        }
                        <CardText
                            className='mb-25'>{translate('common.phone-number')}: {ebayData?.buyer?.buyerRegistrationAddress?.primaryPhone?.phoneNumber}</CardText>
                        <CardText
                            className='mb-0'>{translate('common.email')}: {ebayData?.buyer?.buyerRegistrationAddress?.email}</CardText>
                        {ebayData?.shippingTrackingNumber &&
                            <CardText
                                className='mb-0'>{translate('common.shippingTrackingNumber')}: {ebayData.shippingTrackingNumber}</CardText>
                        }
                         <CardText
                            className='mb-0'>{translate('common.shippingTrackingNumberSyncedToEbay')}:
                             <Badge className='text-capitalize mb-1'
                                       color={ ebayData?.trackingNumberSyncedToEbay ? 'light-success' :'light-danger' }
                                       pill> { ebayData?.trackingNumberSyncedToEbay ? 'Success':'Failed'}
                                </Badge>
                             </CardText>
                    </Col>
                </Row>
            </CardBody>
        </>
    )
}

export default EbayInvoiceHeader


