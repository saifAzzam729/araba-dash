import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import {Badge, CardBody, CardText, Col, Row} from "reactstrap";
import {formatDate} from "@utils";
import {useGlobalContext} from "@src/providers/GlobalProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Link} from "react-router-dom";
import makeGoogleMapsLinkForAddress from "@src/utility/helpers/makeGoogleMapsLinkForAddress";
import {MapPin} from "react-feather";
import EditStatusColumn from "@src/views/pages/sale-orders/partials/EditStatusColumn";
import {useSaleOrder} from "@src/views/pages/sale-orders/useSaleOrder";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)


function InvoiceHeader() {
    const statusObj = {
        NOT_PAID: 'light-danger',
        PAID: 'light-success',
    }
    const {storeLogo} = useGlobalContext();
    const {translate} = useLocaleContext();

    const {
        saleOrder,
        statusOptions,
        refetch,
    } = useSaleOrder()

    function onEditSuccess() {
        refetch()
    }

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
                            {translate('common.invoice')} <span className='invoice-number'>#{saleOrder.refNumber}</span>
                        </h4>
                        <div>
                            <EditStatusColumn
                                row={saleOrder}
                                onEditSuccess={onEditSuccess}
                                statusOptions={statusOptions ? statusOptions.data : []}
                            />
                        </div>
                        <div className='invoice-date-wrapper d-flex align-items-center justify-content-center'>
                            <div className="w-50">
                                <p className='invoice-date-title'>{translate('common.date-issued')}: </p>
                                <p className='invoice-date'>{formatDate(saleOrder.createdAt)}</p>
                            </div>

                            <div className="w-50 text-center">
                                <Badge className='text-capitalize mb-1' color={statusObj[saleOrder.invoice.status.value]}
                                       pill>
                                    {saleOrder.invoice.status.label}
                                </Badge>
                            </div>
                        </div>

                    </div>
                </div>
            </CardBody>
            <hr className='invoice-spacing'/>

            <CardBody className='invoice-padding pt-0'>
                <Row className='invoice-spacing'>
                    <Col className='p-0' xl='8'>
                        <h6 className='mb-2'>{translate('common.invoice-to')}:</h6>
                        <h6 className='mb-25'>{translate('common.name')} : {saleOrder.userFullName}</h6>
                        <Link
                            to={makeGoogleMapsLinkForAddress(
                                saleOrder.country?.name,
                                saleOrder.state?.name,
                                saleOrder.city?.name,
                                saleOrder.userStreetAddress,
                            )}
                            target="_blank"
                            className={"d-flex gap-1"}
                        >

                            <CardText>
                                {saleOrder.country?.name || saleOrder.state?.name || saleOrder.city?.name || saleOrder.userStreetAddress ? (
                                    <>
                                        {translate('common.address')}:
                                        {saleOrder.country?.name && ` ${saleOrder.country.name} / `}
                                        {saleOrder.state?.name && `${saleOrder.state.name} / `}
                                        {saleOrder.city?.name && `${saleOrder.city.name} / `}
                                        {saleOrder.userStreetAddress}
                                    </>
                                ) : null}
                            </CardText>
                            <MapPin/>
                        </Link>
                        {saleOrder.userAddressNotes &&
                            <CardText
                                className='mb-25'>{translate('common.address-notes')}: {saleOrder.userAddressNotes}</CardText>
                        }
                        {saleOrder.userPostalCode &&
                            <CardText
                                className='mb-25'>{translate('common.userPostalCode')}: {saleOrder.userPostalCode}</CardText>
                        }
                        <CardText
                            className='mb-25'>{translate('common.phone-number')}: {saleOrder.userPhoneNumber}</CardText>
                        <CardText className='mb-0'>{translate('common.email')}: {saleOrder.userEmail}</CardText>
                    </Col>
                    <Col className='p-0 mt-xl-0 mt-2' xl='4'>
                        <h6 className='mb-2'>{translate('common.payment-details')} :</h6>
                        <table>
                            <tbody>
                            <tr>
                                <td className='pe-1'>{translate('common.total-due')} :</td>
                                <td>
                                    <span className='fw-bold'>{saleOrder.totalPrice} {saleOrder.buyerCurrencyCode}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className='pe-1'>{translate('common.currency')}:</td>
                                <td>{saleOrder.buyerCurrencyCode} / {saleOrder.buyerCurrencyName}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </CardBody>
        </>
    )
}

export default InvoiceHeader


function DetailedDate({createdAt}){
    const isInLast24Hours = dayjs().diff(dayjs(createdAt), 'hours') <= 24;
    const className = isInLast24Hours ? 'text-primary' : '';
    if (isInLast24Hours) {
        return <span className={className}>{dayjs(createdAt).fromNow()}</span>
    }

    return (
        <span>{dayjs(createdAt).fromNow()} at {dayjs(createdAt).format('hh:mm A')}</span>
    )

}
