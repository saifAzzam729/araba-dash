// ** Custom Components
import Avatar from "@mui/material/Avatar";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Avatar Imports
import defaultAvatar from "@src/assets/images/logo/default-avatar.jpg";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import {Link} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const AlmostِOutOfStockCard = ({ productOutOfStock }) => {
    const {translate, makeLocaleUrl} = useLocaleContext();

    const customClassName = productOutOfStock?.length > 2 ? "overflow-scroll height-350" : "";

    return (
        <Card className='card-employee-task bg-white'>
            <CardHeader>
                <CardTitle tag='h4'>
                    {translate('common.productOutOfStock')}
                </CardTitle>
            </CardHeader>
            <CardBody className={customClassName}>
                {productOutOfStock?.length > 0 ?
                    (
                        productOutOfStock.map((product)=>{
                            return (
                                <div key={product.title} className='employee-task d-flex justify-content-between align-items-center'>
                                    <Link to={makeLocaleUrl(`products/view/${product.id}`)}>
                                    <div className='d-flex'>
                                        <Avatar className='me-75' src={ParseImageUrl(product.imageFileUrl)} imgHeight='50' imgWidth='50' />
                                        <div className='my-auto'>
                                            <h6 className='mb-0 text-danger'>{product.name}</h6>
                                            <small className='text-muted me-75'>{product.quantity}</small>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })
                    )
                    :
                    <span>{translate('common.notOutOfStock')}</span>
                }
            </CardBody>
        </Card>
    )
}

export default AlmostِOutOfStockCard
