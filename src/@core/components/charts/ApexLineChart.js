// ** Third Party Components
import Chart from 'react-apexcharts';
import {ArrowDown} from 'react-feather';
import {CircularProgress, Stack} from '@mui/material';


// ** Reactstrap Imports
import {Card, CardHeader, CardTitle, CardBody, CardSubtitle, Badge} from 'reactstrap'
import {FormattedMessage} from "react-intl";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ApexLineChart = ({direction, warning, saleOrder}) => {
    if (saleOrder === null) {
        return (
            <>
                <Stack className="d-flex align-items-center justify-content-center mt-5"
                       sx={{color: 'grey.500', margin: 'auto'}} direction="row">
                    <CircularProgress color="secondary"/>
                </Stack>
            </>
        )
    }
    // ** Chart Options
    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            parentHeightOffset: 0,
            toolbar: {
                show: false
            }
        },

        markers: {
            strokeWidth: 7,
            strokeOpacity: 1,
            strokeColors: ['#fff'],
            colors: [warning]
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        colors: [warning],
        grid: {
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        tooltip: {
            custom(data) {
                return `<div className='px-1 py-50'>
              <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
            </div>`
            }
        },
        xaxis: {
            categories: saleOrder.map(date => date.createdAt.replace('2023-', ''))
        },
        yaxis: {
            opposite: direction === 'rtl'
        }
    }
    // ** Chart Series
    const series = [
        {
            data: saleOrder.map(item => item.income)
        }
    ]

    const {translate} = useLocaleContext();

    return (
        <Card className={"h-100 bg-white"}>
            <CardHeader
                className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
                <div>
                    <CardTitle className='mb-75' tag='h4'>
                        {translate('home.income')}
                    </CardTitle>
                    <CardSubtitle className='text-muted'>
                        {translate('home.income-chart')}
                    </CardSubtitle>
                </div>
                {/* <div className='d-flex align-items-center flex-wrap mt-sm-0 mt-1'>
          <h5 className='fw-bolder mb-0 me-1'>$ 100,000</h5>
          <Badge color='light-secondary'>
            <ArrowDown size={13} className='text-danger' />
            <span className='align-middle ms-25'>20%</span>
          </Badge>
        </div> */}
            </CardHeader>
            <CardBody>
                <Chart options={options} series={series} type='line' height={"100%"}/>
            </CardBody>
        </Card>
    )
}

export default ApexLineChart
