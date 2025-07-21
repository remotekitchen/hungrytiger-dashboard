import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import RestaurantnList from "./RestaurantnList";
const options = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    // curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 30,
    labels: {
      formatter: function (value) {
        return value + "K"; // Append "K" to the labels
      },
    },
  },
};
const SalesVolumeChart = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Product One",
        data: [11, 15, 16, 12, 14, 13, 12, 16, 15, 14, 12, 13],
      },
    ],
    yAxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      labels: {
        formatter: function () {
          return this.value + "K"; // Append "K" to the labels
        },
      },
    },
  });

  const [state1, setState1] = useState({
    series: [
      {
        name: "Product Two",
        data: [10, 17, 21, 12, 11, 13, 16, 11, 15, 14, 10, 13],
      },
    ],
    yAxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      labels: {
        formatter: function () {
          return this.value + "K"; // Append "K" to the labels
        },
      },
    },
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default m-4 p-3 sm:px-7.5 xl:col-span-8">
      <h1 className="text-center">Monthly Sales Volume</h1>
     
      <div>
        <div id="chartOne" className="-ml-5">
          { selectedLocation === 'Richmond' ? (
          <ReactApexChart
            options={options}
            series={state.series} // Use the selected location to update the series data
            type="area"
            height={350}
          />
          ):(
            <ReactApexChart
            options={options}
            series={state1.series} // Use the selected location to update the series data
            type="area"
            height={350}
          />
          )
          }
        </div>
      </div>
    </div>
  );
};

export default SalesVolumeChart;
