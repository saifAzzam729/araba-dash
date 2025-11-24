// ** Reactstrap Imports
import {Card, CardHeader, CardTitle, CardBody} from 'reactstrap'

// ** Avatar Imports
import NoPagingTableBase from "@components/table/NoPagingTableBase";
import columns from './ordersColumns'
import translateColumns from "@src/utility/helpers/translateColumns";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import generateStandardActionColumn from "@components/table/partials/generateStandardActionColumn";
import {useNavigate} from "react-router-dom";


const HomeLatestOrdersTable = ({data, title}) => {
    const {translate, makeLocaleUrl} = useLocaleContext();

    const navigate = useNavigate();

    const openViewPage = (item) => {
        navigate(makeLocaleUrl(`/sale-orders/view/${item.id}`));
    };

    return (
        <Card className='card-employee-task bg-white'>
            <CardHeader>
                <CardTitle tag='h4'>{title}</CardTitle>
            </CardHeader>
            <CardBody className='bg-white'>
                <NoPagingTableBase
                    columns={translateColumns([
                        ...columns,
                        generateStandardActionColumn({onView: openViewPage})
                    ], translate)}
                    data={data}
                    defaultActionButtons={false}
                    headCellJustification={'center'}
                    bodyCellJustification={'center'}
                />
            </CardBody>
        </Card>

    )
}

export default HomeLatestOrdersTable
