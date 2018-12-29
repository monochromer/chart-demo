import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

const HighChart = ({ ...props }) => {
  return (
    <HighchartsReact
      className="My-Chart"
      highcharts={Highcharts}
      {...props}
    />
  )
}

export default HighChart;