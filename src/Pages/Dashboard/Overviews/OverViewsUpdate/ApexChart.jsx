import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// Function to generate zigzag data series
const generateZigZagSeries = (baseval, count, min, max) => {
  let series = [];
  let up = true;
  for (let i = 0; i < count; i++) {
    let y = up ? max : min;
    series.push([baseval, y]);
    baseval += 86400000; // increment by one day
    up = !up; // toggle between min and max to create zigzag
  }
  return series;
};

const ApexChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Delivery",
      data: generateZigZagSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        200,
        10,
        60
      ),
    },
    {
      name: "Pickup",
      data: generateZigZagSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        20,
        500
      ),
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: 350,
      stacked: true,
      events: {
        selection: function (chart, e) {
          // console.log(new Date(e.xaxis.min));
        },
      },
    },
    colors: ["#008FFB", "#00E396"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "monotoneCubic",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      type: "datetime",
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
