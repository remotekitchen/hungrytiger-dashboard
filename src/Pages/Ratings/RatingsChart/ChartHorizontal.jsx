import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

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
    type: "bar",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    plotOptions: {
      bar: {
        horizontal: true,
      },
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
  },

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
    categories: ["5 stars", "4 stars", "3 stars", "2 stars", "1 stars", "0 stars"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
 
};

const ChartHorizontal = () => {
  const [state, setState] = useState({
    options: {
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#42C2FF", "#80CAEE"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "bar",
        dropShadow: {
          enabled: true,
          color: "#42C2FF",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '20%',
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
      },
     
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#42C2FF", "#80CAEE"],
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
        categories: ["5 stars", "4 stars", "3 stars", "2 stars", "1 stars", "0 stars"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
   
    series: [{
        data: [{
          x: 'category A',
          y: 10
        }, {
          x: 'category B',
          y: 8
        }, {
          x: 'category C',
          y: 5
        },{
            x: 'category D',
            y: 7
        },{
            x: 'category E',
            y: 9
        }]
      }]
  });

  return (
    <div id="chartOne" className="-ml-5">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={options.chart.type}
        height={350}
      />
    </div>
  );
};

export default ChartHorizontal;
