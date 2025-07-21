import {React,useState} from 'react'
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
      categories: [
        "January",
        "February",
        "March",
        "Aprill",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
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
      max: 5,
      labels: {
        formatter: function (value) {
          return value + 1;
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
    },
  };
  

const Chart = () => {
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
              horizontal: false,
              columnWidth: '20%',
              endingShape: 'rounded'
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
            categories: [
                "January",
                "February",
                "March",
                "Aprill",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
        },
        yaxis: {
          title: {
            style: {
              fontSize: "0px",
            },
          },
          min: 0,
          max: 5,
          labels: {
            formatter: function (value) {
              return value + 1;
            },
          },
        },
        series: [
          {
            name: "Ratings",
            data: [0, 100, 200, 300, 400, 600, 700, 800, 900, 1000, 1100, 1200],
          },
        ],
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
  )
}

export default Chart