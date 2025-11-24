// ** Third Party Components
import Chart from 'react-apexcharts'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'
import { CircularProgress, Stack } from '@mui/material'

const areaColors = {
  series3: '#a4f8cd',
  series2: '#60f2ca',
  series1: '#2bdac7'
}

const ApexAreaCharts = ({ direction, users }) => {

  if (users === null) {
    return (
      <>
        <Stack className="d-flex align-items-center justify-content-center mt-5" sx={{ color: 'grey.500', margin: 'auto' }} direction="row">
			    <CircularProgress color="secondary"/>
        </Stack>
      </>
    )
  }

  const labels = users.map(item => item.createdAt);


  // ** Chart Options
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start'
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    xaxis: {
      categories: labels
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    tooltip: {
      shared: false
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }

  // ** Chart Series
  const series = [
    {
      name: 'Users',
      data: users.map(user => user.userCount),
    },
    {
      name: 'Pets',
      data: users.map(user => user.petCount)
    },
    
  ]
  return (
    <Card>
      <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            Users Information
          </CardTitle>
          <CardSubtitle className='text-muted'>information about the user and their pets</CardSubtitle>
        </div>
        <div className='d-flex align-items-center mt-md-0 mt-1'>
          {/* <Calendar size={17} /> */}
          {/* <Flatpickr
            className='form-control flat-picker bg-transparent border-0 shadow-none'
            options={{
              mode: 'range',
              // eslint-disable-next-line no-mixed-operators
              defaultDate: [new Date(), new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)]
            }}
          /> */}
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='area' height={400} />
      </CardBody>
    </Card>
  )
}
export default ApexAreaCharts
