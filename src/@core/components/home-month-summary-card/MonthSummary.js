// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import {Card, CardHeader, CardTitle, CardBody, Col, UncontrolledTooltip} from 'reactstrap'
import {useLocaleContext} from "@src/providers/LocaleProvider";

const MonthSummary = ({websiteOverview, openEditModal}) => {
    const {translate, isRtl} = useLocaleContext();
    return (
        <Card className='card-transaction h-100 bg-white'>
            <CardHeader>
                <CardTitle tag='h1'>{translate('home.month-summary')}</CardTitle>
            </CardHeader>
            <CardBody>
                <div className='transaction-item'>
                    <div className='d-flex align-items-center'>
                        <Avatar className='rounded' color={'light-primary'} icon={<Icon.Users size={18} />} />
                        <div>
                            <h6 className='transaction-title'>{translate('home.visitors')}</h6>
                        </div>
                    </div>
                    <div className={'fw-bolder text-primary'}>
                        {websiteOverview?.visitors === null ?  '-' : websiteOverview?.visitors }
                    </div>
                </div>

                <div className='transaction-item'>
                    <div className='d-flex align-items-center'>
                        <Avatar className='rounded' color={'light-success'} icon={<Icon.Package size={18} />} />
                        <div>
                            <h6 className='transaction-title'>{translate('home.orders-count')}</h6>
                        </div>
                    </div>
                    <div className={'fw-bolder text-success'}>
                        {websiteOverview?.ordersCount === null ?  '-' : websiteOverview?.ordersCount }
                    </div>
                </div>

                <div className='transaction-item'>
                    <div className='d-flex align-items-center'>
                        <Avatar className='rounded' color={'light-danger'} icon={<Icon.DollarSign size={18} />} />
                        <div>
                            <h6 className='transaction-title'>{translate('home.total-paid-orders')}</h6>
                        </div>
                    </div>
                    <div className={'fw-bolder text-danger'}>
                        {websiteOverview?.totalPaidOrders === null ?  '-' : websiteOverview?.totalPaidOrders }
                    </div>
                </div>

                <div className='transaction-item'>
                    <div className='d-flex align-items-center'>
                        <Avatar className='rounded' color={'light-warning'} icon={<Icon.Award size={18} />} />
                        <div>
                            <h6 className='transaction-title d-inline-block me-1'>{translate('home.month-goal')}</h6>
                            {isRtl ? (
                                <Icon.ArrowLeft id={'monthGoal-edit-tooltip'} className={'cursor-pointer'} size={15} onClick={openEditModal} />
                            ) : (
                                <Icon.ArrowRight id={'monthGoal-edit-tooltip'} className={'cursor-pointer'} size={15} onClick={openEditModal} />
                            )}
                            <UncontrolledTooltip
                                placement="top"
                                target={'monthGoal-edit-tooltip'}
                            >
                                {translate('common.edit-month-goal')}
                            </UncontrolledTooltip>
                        </div>
                    </div>
                    <div className={'fw-bolder text-warning'}>
                        {websiteOverview?.monthGoal === null ?  '-' : websiteOverview?.monthGoal }
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default MonthSummary
