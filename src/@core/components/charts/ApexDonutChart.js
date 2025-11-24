// ** Third Party Components
import {CircularProgress, Stack} from '@mui/material'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {Card, CardHeader, CardTitle, CardBody, CardSubtitle} from 'reactstrap'
import {FormattedMessage} from "react-intl";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const ApexRadiarChart = ({categories}) => {

    if (categories === null) {
        return (
            <>
                <Stack className="d-flex align-items-center justify-content-center mt-5"
                       sx={{color: 'grey.500', margin: 'auto'}} direction="row">
                    <CircularProgress color="secondary"/>
                </Stack>
            </>
        )
    }

    const donutColors = {
        series1: '#ffe700',
        series2: '#00d4bd',
        series3: '#826bf8',
        series4: '#2b9bf4',
        series5: '#FFA1A1'
    }

    // ** Chart Options
    const options = {
        legend: {
            show: true,
            position: 'bottom'
        },

        labels: categories.map(item => item.name),

        colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
        dataLabels: {
            enabled: true,
            formatter(val) {
                return `${parseInt(val)}%`
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '2rem',
                            fontFamily: 'Montserrat'
                        },
                        value: {
                            fontSize: '1rem',
                            fontFamily: 'Montserrat',
                            formatter(val) {
                                return `${parseInt(val)}%`
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '1.5rem',
                            label: 'Products',
                        }
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 992,
                options: {
                    chart: {
                        height: 380
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            },
            {
                breakpoint: 576,
                options: {
                    chart: {
                        height: 320
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                    name: {
                                        fontSize: '1.5rem'
                                    },
                                    value: {
                                        fontSize: '1rem'
                                    },
                                    total: {
                                        fontSize: '1.5rem'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    }

    // ** Chart Series
    const series = categories.map(item => item.productCount)
    const {translate} = useLocaleContext();

    return (
        <Card className={"h-100 bg-white"}>
            <CardHeader>
                <div>
                    <CardTitle className='mb-75' tag='h4'>
                        {translate('home.products')}
                    </CardTitle>
                    <CardSubtitle className='text-muted'>{translate('home.products-chart')}</CardSubtitle>
                </div>
            </CardHeader>
            <CardBody>
                <Chart options={options} series={series} type='donut' height={350}/>
            </CardBody>
        </Card>
    )
}

export default ApexRadiarChart
